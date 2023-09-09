const express = require("express");
const router = express.Router();

router.route("/").get(async (req, res) => {
  try {
    const data = { message: "Hello, this is the restaurant API!" };
    console.log("here");
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.route("/").post(async (req, res) => {
  try {
    const data = res.body;
    console.log(`the request body is : `, req.body);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

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
