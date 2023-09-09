const mongoose = require("mongoose");

const restaurantSchema = mongoose.Schema(
  {
    restaurant_name: {
      type: String,
      required: [true, "Please add the restaurant Name"],
    },
    restaurant_type: {
      type: String,
      required: [true, "Please add the type of restaurant"],
    },
    restaurant_email: {
      type: String,
      required: [true, "Please add the restaurant eamil"],
    },
    restaurant_desc: {
      type: String,
      required: [true, "Please add the restaurant Description "],
    },
    restaurant_owner_name: {
      type: String,
      required: [true, "Please add the restaurant owner name"],
    },
    password: {
      type: String,
      required: [true, "Please add the password "],
    },

    restaurant_op_time: {
      type: String,
      required: [true, "Please add the opening time  "],
    },

    restaurant_cl_time: {
      type: String,
      required: [true, "Please add the closing time  "],
    },

    restaurant_location: {
      type: String,
      required: [true, "Please add the closing time  "],
    },

    restaurant_logo: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Restaurant", restaurantSchema);
