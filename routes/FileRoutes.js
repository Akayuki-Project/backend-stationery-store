const express = require('express');
const multer = require('multer');
const { uploadFile } = require('../controllers/FileController');

const upload = multer({ dest: 'upload/'});

const router = express.Router();

router.post('/upload', upload.single('file'), uploadFile);

module.exports = router;