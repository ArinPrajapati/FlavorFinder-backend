const express = require("express");

const router = express.Router();
const {
  createMenuItem,
  getAllItems,
} = require("../controller/menu.restaurant.control");

const validateToken = require("../middleware/validatedTokenHandler");

router.use(validateToken);
console.log("till");
router.route("/").get(getAllItems).post(validateToken, createMenuItem);

module.exports = router;
