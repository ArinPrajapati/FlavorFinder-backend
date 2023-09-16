const express = require("express");
const router = express.Router();
const {
  getAllRestaurants,
  createRestaurant,
  loginRestaurant,
  currentRestaurant,
} = require("../controller/restaurant.controller");
const validateToken = require("../middleware/validatedTokenHandler");

router.route("/").get(getAllRestaurants).post(createRestaurant);

router.route("/login").post(loginRestaurant);

router.get("/current", validateToken, currentRestaurant);

module.exports = router;
