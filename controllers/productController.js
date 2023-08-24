const Product = require("../models/Product");

exports.getProducts = async (req, res) => {
  try {
    const { category, minPrice, maxPrice } = req.query;
    console.log("fkdfjdkfd::", typeof category);
    
    const filters = {};
    if (category !== undefined && category !== null && category !== "") {
      filters.category = category;
    }
    if (minPrice !== undefined && !isNaN(minPrice) && minPrice !== "") {
      filters.price = { $gte: Number(minPrice) };
    }
    if (maxPrice !== undefined && !isNaN(maxPrice) && maxPrice !== "") {
      filters.price = { ...filters.price, $lte: Number(maxPrice) };
    }

    const products = await Product.find(filters);
    res.json(products);
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const newProduct = new Product({ ...req.body, category: "category 1" });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.log("ERROR::", error.message);
    res.status(400).json({ error: error.message });
  }
};

exports.updateProductStatus = async (req, res) => {
  const productId = req.params.id; 

  try {
    const product = await Product.findOne({ _id: productId }); 

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    product.status = true; 
    await product.save();

    res.json(product);
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
