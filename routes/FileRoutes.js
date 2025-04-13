const express = require("express");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const { uploadFile } = require("../controllers/FileController");

// Konfigurasi Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Konfigurasi penyimpanan Cloudinary
const filestorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads", // folder di Cloudinary
    allowed_formats: ["jpg", "jpeg", "png", "pdf", "docx", "xlsx"], // kamu bisa sesuaikan
  },
});

const upload = multer({ storage: filestorage });

const router = express.Router();

router.post("/uploads", upload.single("file"), uploadFile);

module.exports = router;