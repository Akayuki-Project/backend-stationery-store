const express = require("express");
const multer = require("multer");
const {
  getBanners,
  getDetailBanner,
  createBanner,
  deleteBanner,
  updateBanner,
} = require("../controllers/BannerController.js");
const cloudinary = require("../config/cloudinary.js");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const bannerstorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "uploads/banners/", // folder di Cloudinary
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
    transformation: [{ width: 800, height: 800, crop: "limit" }],
  },
});

const upload = multer({ storage: bannerstorage });
const router = express.Router();

router.get("/", getBanners);
router.get("/:id", getDetailBanner);
router.post("/", upload.single("thumbnail"), createBanner);
router.delete("/:id", deleteBanner);
router.patch("/:id", upload.single("thumbnail"), updateBanner);

module.exports = router;
