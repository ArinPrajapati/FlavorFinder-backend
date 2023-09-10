const asyncHandler = require("express-async-handler");
const Menu = require("../controller/menu.restaurant.control");

//@desc get all items in menu
//@route get /api/menu
//@access public (only for vister)

const getAllItems = asyncHandler(async (req, res) => {
  const menu = await Menu.find();
  res.status(200).json(menu);
});

//@desc add menu item
//@route post /api/menu
//@access private(only restaurant owner)
const createMenuItem = asyncHandler(async (req, res) => {
  console.log(`the request body is : `, req.body);
  const { item } = req.body;

  if (!item.name || !item.price) {
    res.status(400);
    throw new Error("All fields are mandotary !");
  }

  const menu = await Menu.create({
    restaurant: req.restaurant.id,
    name,
    veg,
    non_veg,
    description,
    price,
  });
  console.log("til create contact");
  res.status(201).json(contact);
});

module.exports = {
  createMenuItem,
  getAllItems,
};
