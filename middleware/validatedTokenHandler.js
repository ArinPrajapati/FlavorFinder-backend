const asyncHandler = require("express-async-handler");

const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;

  let authHeader = req.headers.Authorization || req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    console.log("til token");
    if ((token == null)) {
      res.status(401);
      throw new Error("restaurant is not authorized or token is missing");
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, restaurant) => {
      if (err) {
        res.status(401);
        throw new Error("restaurant is not authorized");
      }
      req.restaurant = restaurant;
      next();
    });
  }
});

module.exports = validateToken;
