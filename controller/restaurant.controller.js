//@IMPORTS
const asyncHandler = require("express-async-handler");
const Restaurant = require("../middleware/module/restaurant.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

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
    restaurant_code: uuidv4(),
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
  if (!process.env.ACCESS_TOKEN_SECRET) {
    res.status(400).json({ message: "worng access token" });
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
          restaurant_code: restaurant.restaurant_code,
        },
      },

      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "20m" }
    );

    res.status(200).json({ accessToken });
  } else {
    res.status(400).json({ message: "Error in input or not found" });
  }
});

const currentRestaurant = asyncHandler(async (req, res) => {
  const accessToken = req.header("Authorization").split(" ")[1];

  if (!accessToken) {
    res.status(401).json({ message: "Access token not found" });
    return;
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    if (!decoded.restaurant) {
      res.status(401).json({ message: "Invalid access token 1" });
      return;
    }

    // You can access all restaurant data from decodedToken.restaurant
    const restaurantData = decoded.restaurant;

    // Here, you can return all restaurant data as JSON
    res.status(200).json(restaurantData);
    if (!!restaurantData) {
      res.status(401).json({ message: "Invalid access tokenn 3" });
    }
  } catch (error) {
    res.status(401).json({ message: error });
  }
});

module.exports = {
  createRestaurant,
  getAllRestaurants,
  loginRestaurant,
  currentRestaurant,
};
