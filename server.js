const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/dbConnection");

const app = express();
connectDB();
const port = process.env.PORT || 3400;

app.use(express.json());
console.log("hlel")
    
app.use("/api/restaurant", require("./routes/restaurant"));

app.listen(port,() =>{
    console.log('server is running',port)
})