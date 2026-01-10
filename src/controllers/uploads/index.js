const { uploadFileService } = require('../../services/uploads');
const { asyncHandler } = require('../../utils/async_handler');

exports.handleFileUpload = asyncHandler(async (req, res) => {
   if (!req.files || req.files.length === 0) {
      return res.status(400).json({
         statusCode: 400,
         success: false,
         message: 'No files were uploaded. Missing "files" field in form-data.',
      });
   }

   const response = await uploadFileService(req.files);
   if (!response) {
      return res.status(500).json({
         statusCode: response.statusCode,
         success: response.success,
         message: response.message,
         data: null,
      });
   }
   res.status(200).json({
      statusCode: response.statusCode,
      success: response.success,
      message: 'Files uploaded successfully',
      data: response,
   });
});
