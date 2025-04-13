const Banner = require("../models/Banner");
const cloudinary = require("../config/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Get All Banners
exports.getBanners = async (req, res) => {
  try {
    const banners = await Banner.find();
    res.status(200).json(banners);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getDetailBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const banner = await Banner.findById(id);
    if (!banner) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(banner);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Create Banner
exports.createBanner = async (req, res) => {
  try {
    const banner = new Banner({
      ...req.body,
      thumbnail: req.file?.path, // Ini sudah berisi secure_url dari Cloudinary
      cloudinaryId: req.file?.filename, // Ini adalah public_id dari Cloudinary
    });

    await banner.save();

    res.status(201).json(banner);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete Banner
exports.deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    await cloudinary.uploader.destroy(banner.cloudinaryId);

    await banner.deleteOne();

    res.status(200).json({ message: "Banner deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete banner" });
  }
};

// Update Banner
exports.updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    let banner = await Banner.findById(id);
    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }
    console.log("req.file", req.file);
    console.log("req.body", req.body);

    let secure_url = banner.thumbnail;
    let public_id = banner.cloudinaryId;

    if (req.file) {
      await cloudinary.uploader.destroy(banner.cloudinaryId);

      // Gunakan file baru dari multer-storage-cloudinary
      secure_url = req.file.path; // ini secure_url
      public_id = req.file.filename; // ini public_id
    }
    const updatedBanner = {
      ...req.body,
      thumbnail: secure_url,
      cloudinaryId: public_id,
      description1: req.body.description1 || banner.description1,
      description2: req.body.description2 || banner.description2,
      disconnect: req.body.disconnect || banner.disconnect,
    };

    banner = await Banner.findByIdAndUpdate(id, updatedBanner, { 
      new: true,
    });

    res.status(200).json(banner);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
