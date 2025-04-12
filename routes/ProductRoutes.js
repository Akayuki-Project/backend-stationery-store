const express = require("express");
const multer = require("multer");
const {
  getProducts,
  createProduct,
  getDetailProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/ProductController.js");
const cloudinary = require("../config/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const productstorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "uploads/products/", // folder di Cloudinary
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
    transformation: [{ width: 800, height: 800, crop: "limit" }],
  },
});
const upload = multer({ storage: productstorage });
const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getDetailProduct);
router.delete("/:id", deleteProduct);
router.patch("/:id", upload.single("thumbnail"), updateProduct);
router.post("/", upload.single("thumbnail"), createProduct);

module.exports = router;
