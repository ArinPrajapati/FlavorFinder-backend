const express = require("express");

const router = express.Router();
const {
  createMenuItem,
  getAllItems,
  getRestaurantMenu,
  getItems,
} = require("../controller/menu.restaurant.control");

const validateToken = require("../middleware/validatedTokenHandler");
router.route("/:id").get(getItems);

router.use(validateToken);
console.log("till");
router.route("/").get(getAllItems);
router.route("/create").post(validateToken, createMenuItem);
router.route("/item").get(getRestaurantMenu);
module.exports = router;
