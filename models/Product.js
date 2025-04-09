const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  ratingCount: {
    type: Number,
    default: 0,
  },
  sales: {
    type: Number,
    required: true,
    default: 0,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  cloudinaryId: {
    type: String,
  },
});

module.exports = mongoose.model("Product", productSchema);
