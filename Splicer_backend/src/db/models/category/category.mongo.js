const mongoose = require("mongoose");
const { Schema } = mongoose;

const category = new Schema({
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
  category_name: {
    type: String,
    required: true,
  },
  category_image: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
    
  }
});

module.exports = mongoose.model("Category", category);
