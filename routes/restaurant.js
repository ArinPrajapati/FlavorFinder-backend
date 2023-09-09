const express = require("express");
const {
    getAllRestaurants,
    createRestaurant,
} = require("../controller/restaurant.controller");
const router = express.Router();

router.route("/").get(getAllRestaurants).post(createRestaurant);

router.route("/:id").delete(async (req, res) => {
  try {
    const data = req.params.id;
    console.log(`the request body is : `, data);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.route("/:id").get(async (req, res) => {
  try {
    const data = req.params.id;
    console.log(`the request body is : `, data);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.route("/:id").put(async (req, res) => {
  try {
    const data = req.params.id;
    console.log(`the request body is : `, data);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
