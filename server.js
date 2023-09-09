const express = require("express");
const dotenv = require("dotenv").config();

const app = express();
const port = process.env.PORT || 3400;

app.use(express.json());
    
app.use("/api/restaurant", require("./routes/restaurant"));

app.listen(port,() =>{
    console.log('server is running',port)
})