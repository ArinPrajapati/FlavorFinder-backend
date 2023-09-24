const asyncHandler = require("express-async-handler");
const Menu = require("../middleware/module/menu.model");
const jwt = require("jsonwebtoken");

//@desc get all items in menu
//@route get /api/menu
//@access public (only for visitors)

const getAllItems = async (req, res) => {
  try {
    console.log("enter get item");
    const menu = await Menu.find();
    res.status(200).json(menu);
  } catch (error) {
    res.status(400).json({ message: "this is an error" });
  }
};

//@desc add menu item
//@route post /api/menu
//@access private (only restaurant owner)
const createMenuItem = asyncHandler(async (req, res) => {
  console.log("hello in createMenuItem");
  try {
    // You can access all restaurant data from decoded.restaurant

    const item = req.body;

    if (!item.name || !item.price) {
      res.status(400);
      return;
    }

    if (!req.restaurant) {
      res.status(302).json({ message: "somthing is wrong" });
    }
    // Include the restaurant field when creating the menu item
    console.log(req.restaurant);
    console.log(Object.keys(req.restaurant));
    const menu = await Menu.create({
      restaurant: req.restaurant.restaurant.id, // Include the restaurant ID
      name: item.name,
      veg: item.veg,
      non_veg: item.non_veg,
      description: item.description,
      price: item.price,
    });
    console.log(menu);
    if (menu) {
      res.status(201).json(menu);
      console.log("Menu item created");
      console.log(`the request body is : `, req.body);
    } else {
      res.status(400).json({ message: "data is not valid" });
    }
  } catch (error) {
    res.json({ message: error });
  }
});

//@desc get all items belong to restaurant use restaurant code
//@route post /api/menu/:id
//@access private (only restaurant owner)

const getRestaurantMenu = async (req, res) => {
  try {
    console.log("enter get item");
    const menu = await Menu.find({
      restaurant: req.restaurant.restaurant.restaurant_code,
    });
    res.status(200).json(menu);
  } catch (error) {
    res.status(400).json({ message: "this is an error" });
  }
};

const getItems = asyncHandler(async (req, res) => {
  console.log("enter get item");
  const menu = await Menu.find({ restaurant: req.params.id });

  if (!menu) {
    console.log(error);
  }
  res.status(200).json(menu);
});

//@desc get all items belong to restaurant use restaurant code
//@route post /api/menu/:id
//@access private (only user who)

module.exports = {
  createMenuItem,
  getAllItems,
  getRestaurantMenu,
  getItems,
};
