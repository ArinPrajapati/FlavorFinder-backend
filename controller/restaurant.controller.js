//@IMPORTS
const asyncHandler = require("express-async-handler");
const Restaurant = require("../module/restaurant.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc get all restaurants
//@route get /api/restaurant
//@access (admin only) private

const getAllRestaurants = asyncHandler(async (req, res) => {
  const restaurants = await Restaurant.find();
  res.status(200).json(restaurants);
});

//@desc create a restaurant
//@route post /api/restaurant
//@access (restaurant owner only) private

const createRestaurant = asyncHandler(async (req, res) => {
  const Data = req.body;

  if (
    !Data.restaurant_name ||
    !Data.restaurant_location ||
    !Data.password ||
    !Data.restaurant_owner_name ||
    !Data.restaurant_email
  ) {
    res.status(400).json({ message: "All fields are mandatory" });
    return; // Return early if fields are missing
  }

  const hashedPassword = await bcrypt.hash(Data.password, 10);

  const restaurant = await Restaurant.create({
    restaurant_name: Data.restaurant_name,
    restaurant_type: Data.restaurant_type,
    restaurant_email: Data.restaurant_email,
    restaurant_desc: Data.restaurant_desc,
    restaurant_op_time: Data.restaurant_op_time,
    restaurant_cl_time: Data.restaurant_cl_time,
    restaurant_logo: Data.restaurant_logo,
    restaurant_location: Data.restaurant_location,
    password: hashedPassword,
    restaurant_owner_name: Data.restaurant_owner_name,
  });

  console.log(`Created restaurant: ${restaurant}`);
  if (restaurant) {
    res.status(201).json(restaurant);
  } else {
    res.status(400).json({ message: "User data is not valid" });
  }
});

//@desc login a restaurant
//@route post /api/restaurant/login
//@access  public

const loginRestaurant = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "All fields are mandatory" });
    return;
  }
  const restaurant = await Restaurant.findOne({ restaurant_email: email });
  if (restaurant && (await bcrypt.compare(password, restaurant.password))) {
    const accessToken = jwt.sign(
      {
        restaurant: {
          restaurant_name: restaurant.restaurant_name,
          restaurant_type: restaurant.restaurant_type,
          restaurant_email: restaurant.restaurant_email,
          restaurant_desc: restaurant.restaurant_desc,
          restaurant_op_time: restaurant.restaurant_op_time,
          restaurant_cl_time: restaurant.restaurant_cl_time,
          restaurant_logo: restaurant.restaurant_logo,
          restaurant_location: restaurant.restaurant_location,
          restaurant_id: restaurant.restaurant_id,
          restaurant_owner_name: restaurant.restaurant_owner_name,
        },
      },
      process.env.ACCESS_TOKEN_SECERT,
      { expiresIn: "20m" }
    );

    res.status(200).json({ accessToken });
  } else {
    res.status(400).json({ message: "Error in input or not found" });
  }
});

const currentRestaurant = asyncHandler(async (req, res) => {
  res.status(200).json(res.restaurant_id);
});

module.exports = {
  createRestaurant,
  getAllRestaurants,
  loginRestaurant,
  currentRestaurant,
};
