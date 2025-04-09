const express = require('express');
const multer = require('multer');
const { uploadFile } = require('../controllers/FileController');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Buat folder upload kalau belum ada
const createFolderIfNotExist = (folderPath) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
};

// Storage untuk produk
const productStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folderPath = 'uploads/products/';
    createFolderIfNotExist(folderPath);
    cb(null, folderPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const uploadProduct = multer({ storage: productStorage });

// Storage untuk banner
const bannerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folderPath = 'uploads/banners/';
    createFolderIfNotExist(folderPath);
    cb(null, folderPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const uploadBanner = multer({ storage: bannerStorage });

// Rute upload produk
router.post('/uploads/products', uploadProduct.single('file'), uploadFile);

// Rute upload banner
router.post('/uploads/banners', uploadBanner.single('file'), uploadFile);

module.exports = router;
