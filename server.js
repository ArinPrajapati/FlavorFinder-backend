const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
const port = process.env.PORT || 3400;
connectDB();
app.use(express.json());
console.log("hlel");

app.use("/api/restaurant", require("./routes/restaurant"));
app.use("/api/menu", require("./routes/menu"));
app.use("/api/user", require("./routes/user"));
app.use(errorHandler);
app.listen(port, () => {
  console.log("server is running", port);
});
