const express = require("express");

const router = express.Router();
const {
  createMenuItem,
  getAllItems,
} = require("../controller/menu.restaurant.control");

const validateToken = require("../middleware/validatedTokenHandler");

router.use(validateToken);
router.route("/").get(getAllItems).post(createMenuItem);


module.exports = router;