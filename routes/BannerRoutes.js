const express = require("express");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const {
  getBanners,
  getDetailBanner,
  createBanner,
  deleteBanner,
  updateBanner,
} = require("../controllers/BannerController.js");

const bannerstorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "banners",
    allowed_formats: ["jpg", "jpeg", "png"],
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
