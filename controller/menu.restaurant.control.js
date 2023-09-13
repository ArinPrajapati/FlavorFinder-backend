const asyncHandler = require("express-async-handler");
const Menu = require("../module/menu.model");

//@desc get all items in menu
//@route get /api/menu
//@access public (only for visitors)

const getAllItems = asyncHandler(async (req, res) => {
  const menu = await Menu.find();
  res.status(200).json(menu);
});

//@desc add menu item
//@route post /api/menu
//@access private(only restaurant owner)
const createMenuItem = asyncHandler(async (req, res) => {
  const item = req.body;

  if (!item.name || !item.price) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  } else {
    // Associate the menu item with the restaurant using req.restaurant.id
    const menu = await Menu.create({
      restaurant: req.restaurant.id, // Link the menu item to the restaurant
      name: item.name,
      veg: item.veg,
      non_veg: item.non_veg,
      description: item.description,
      price: item.price,
    });

    console.log("Menu item created");
    res.status(201).json(menu);
    console.log(`the request body is : `, req.body);
  }
});

module.exports = {
  createMenuItem,
  getAllItems,
};
