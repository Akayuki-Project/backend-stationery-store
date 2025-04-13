const Product = require("../models/Product");
const cloudinary = require("../config/cloudinary");

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getDetailProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const product = new Product({
      ...req.body,
      thumbnail: req.file?.path, // Ini sudah berisi secure_url dari Cloudinary
      cloudinaryId: req.file?.filename, // Ini adalah public_id dari Cloudinary
    });

    await product.save();

    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req, params.id);
    await cloudinary.uploader.destroy(product.cloudinaryId);

    await product.deleteOne();

    res.status(200).json({ message: "Product deleted succesfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete product" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    let product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    console.log("req.file", req.file);
    console.log("req.body", req.body);

    let secure_url = product.thumbnail;
    let public_id = product.cloudinaryId;

    if (req.file) {
      await cloudinary.uploader.destroy(product.cloudinaryId);

      // Gunakan file baru dari multer-storage-cloudinary
      secure_url = req.file.path; // ini secure_url
      public_id = req.file.filename; // ini public_id
    }
    const updatedProduct = {
      ...req.body,
      thumbnail: secure_url,
      cloudinaryId: public_id,
      rating:
        req.body.rating !== undefined
          ? Number(req.body.rating)
          : product.rating,
      ratingCount:
        req.body.ratingCount !== undefined
          ? Number(req.body.ratingCount)
          : product.ratingCount,
      sales:
        req.body.sales !== undefined ? Number(req.body.sales) : product.sales,
    };

    product = await Product.findByIdAndUpdate(id, updatedProduct, {
      new: true,
    });

    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
