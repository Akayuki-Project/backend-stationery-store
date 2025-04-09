const Banner = require("../models/Banner");
const cloudinary = require("../config/cloudinary");

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
const {id} = req.params;
const banner = await Banner.findById(id); 
if (!banner) { 
return res.status(404).json({ message: "Product not found" }); 
} 
res.json(banner); 
} catch (error) { 
console.error(error);
res.status(500).json({message: "Server error"});
}
};

// Create Banner
exports.createBanner = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);

    const banner = new Banner({
      ...req.body,
      thumbnail: result?.secure_url,
      cloudinaryId: result.public_id,
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
    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }

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
    console.log('req.file', req.file);
    let result;
    if (req.file) {
      await cloudinary.uploader.destroy(banner.cloudinaryId);
      result = await cloudinary.uploader.upload(req.file.path);
    }

    const updatedBanner = {
      ...req.body,
      thumbnail: result?.secure_url || banner.thumbnail,
      cloudinaryId: result?.public_id || banner.cloudinaryId,
      description1: req.body.description || banner.description1,
      description2: req.body.description || banner.description2,
      disconnect: req.body.disconnect || banner.disconnect,

    };

    banner = await Banner.findByIdAndUpdate(id, updatedBanner, { new: true });

    res.status(200).json(banner);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
