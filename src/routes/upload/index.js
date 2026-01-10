const express = require('express');
const multer = require('multer');
const { generalAuthenticate } = require('../../middlewares/auth');
const { storage } = require('../../config/multer');
const { handleFileUpload } = require('../../controllers/uploads');

router = express.Router();

const upload = multer({ storage: storage });

router
   .route('/upload-file')
   .post(generalAuthenticate, upload.array('files', 10), handleFileUpload);

module.exports = router;
