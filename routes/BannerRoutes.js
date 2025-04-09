const express = require("express");
const multer = require("multer");
const {
  getBanners,
  getDetailBanner,
  createBanner,
  deleteBanner,
  updateBanner,
} = require("../controllers/BannerController.js");
const upload = multer({ dest: "uploads/banners" });
const router = express.Router();

router.get("/", getBanners);
router.get("/:id", getDetailBanner);
router.post("/", upload.single("thumbnail"), createBanner);
router.delete("/:id", deleteBanner);
router.patch("/:id", upload.single("thumbnail"), updateBanner);

module.exports = router;
