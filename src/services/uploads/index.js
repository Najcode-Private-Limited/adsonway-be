const { uploadSingleFile } = require('../../utils/cloudniary');

exports.uploadFileService = async (files) => {
   const uploadedFiles = [];

   for (const file of files) {
      const fileType = file.mimetype.split('/')[0];
      let folder;

      switch (fileType) {
         case 'image':
            folder = 'images';
            break;
         case 'audio':
            folder = 'audio';
            break;
         case 'video':
            folder = 'video';
            break;
         case 'pdf':
            folder = 'pdfs';
            break;
         default:
            folder = 'pdfs';
      }
      const url = await uploadSingleFile(file.path, folder);

      uploadedFiles.push({
         originalName: file.originalname,
         fileName: file.filename,
         fileType: file.mimetype,
         fileSize: file.size,
         url: url,
      });
   }

   return {
      message: 'Files uploaded successfully',
      data: uploadedFiles,
      statusCode: 200,
   };
};
