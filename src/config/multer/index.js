const multer = require('multer');
const path = require('path');

const allowedFileTypes = {
   images: /jpeg|jpg|png|gif|webp/,
   audio: /mp3|wav|ogg|mpeg/,
   pdf: /pdf/,
};

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      let folder = '';

      if (allowedFileTypes.images.test(file.mimetype)) {
         folder = 'images';
      } else if (allowedFileTypes.audio.test(file.mimetype)) {
         folder = 'audio';
      } else if (allowedFileTypes.pdf.test(file.mimetype)) {
         folder = 'pdfs';
      } else if (file.mimetype.startsWith('video/')) {
         folder = 'video';
      } else {
         return cb(new Error('Invalid file type.'));
      }

      const uploadPath = path.join(__dirname, '../../uploads', folder);
      cb(null, uploadPath);
   },

   filename: function (req, file, cb) {
      const fileExtension = path.extname(file.originalname).toLowerCase();
      const uniqueFilename = `${Date.now()}-${file.originalname}`;
      cb(null, uniqueFilename);
   },
});

const fileFilter = (req, file, cb) => {
   if (
      allowedFileTypes.images.test(file.mimetype) ||
      allowedFileTypes.audio.test(file.mimetype) ||
      allowedFileTypes.pdf.test(file.mimetype) ||
      file.mimetype.startsWith('video/')
   ) {
      cb(null, true);
   } else {
      cb(
         new Error(
            'Invalid file type. Only images, audio, video, and PDFs are allowed.'
         ),
         false
      );
   }
};

module.exports = {
   storage,
   fileFilter,
};
