//@IMPORTS
const asyncHandler = require("express-async-handler");
const Restaurant = require("../module/restaurant.model");
const bcrypt = require("bcrypt");

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
  const Data = req.body; // Changed from res.body to req.body

  // Check if any of the required fields is missing
  if (
    !Data.restaurant_name ||
    !Data.restaurant_location ||
    !Data.password ||
    !Data.restaurant_owner_name ||
    !Data.restaurant_email
  ) {
    res.status(400);
    console.error("All fields are mandatory");
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
    res.status(400);
    console.error("User data is not valid");
  }
});

module.exports = {
  createRestaurant,
  getAllRestaurants,
};
