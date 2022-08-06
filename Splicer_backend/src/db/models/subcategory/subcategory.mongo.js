const mongoose = require("mongoose");
const { Schema } = mongoose;

const subCategory = new Schema({
  _id: Number,
  id: {
    unique: true,
    type: Number,
    min: 1,
    max: 20,
    required: true,
  },
  parent_id: {
    type: Number,
    min: 1,
    max: 20,
    required: true,
  },
  parent_name: {
    type: String,
    required: true,
  },
  sub_category_name: {
    type: String,
    required: true,
  },
  sub_category_image: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("SubCategory", subCategory);
