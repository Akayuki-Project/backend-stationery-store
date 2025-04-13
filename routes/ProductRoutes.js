const express = require("express");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const {
  getProducts,
  createProduct,
  getDetailProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/ProductController.js");

const productstorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "products",
    allowed_formats: ["jpg", "jpeg", "png"],
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
