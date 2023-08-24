const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String },
  status: { type: Boolean, default: false },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
