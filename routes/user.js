const express = require("express");
const validateToken = require("../middleware/validatedTokenHandler");
const router = express.Router();

router.route("/createUser").post();
router.route("/").get();
router.get("/currentUser", validateToken);

module.exports = router;
