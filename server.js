const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const app = express();
connectDB();
const port = process.env.PORT || 3400;

app.use(express.json());
console.log("hlel");

app.use("/api/restaurant", require("./routes/restaurant"));
app.use("/api/menu", require("./routes/menu"));
app.use(errorHandler);
app.listen(port, () => {
  console.log("server is running", port);
});
