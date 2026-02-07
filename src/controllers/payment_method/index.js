const ObjectId = require('mongoose').Types.ObjectId;
const ApiResponse = require('../../utils/api_response');
const { asyncHandler } = require('../../utils/async_handler');
const {
   getAllPaymentMethodService,
   getSinglePaymentMethodService,
   createPaymentMethodService,
   updatePaymentMethodService,
   deletePaymentMethodService,
} = require('../../services/payment_method');

exports.handleGetAllPaymentMethod = asyncHandler(async (req, res) => {
   const isUser = req.query.isUser === 'true';
   const response = await getAllPaymentMethodService(isUser);
   if (!response.status) {
      return res
         .status(400)
         .json(new ApiResponse(response.statusCode, null, response.message));
   }
   return res
      .status(200)
      .json(
         new ApiResponse(
            200,
            response.data,
            'Payment methods retrieved successfully'
         )
      );
});

exports.handleGetSinglePaymentMethod = asyncHandler(async (req, res) => {
   const { id } = req.params;

   if (!id) {
      return res.status(400).json(new ApiResponse(400, null, 'ID is required'));
   }

   if (!ObjectId.isValid(id)) {
      return res
         .status(400)
         .json(new ApiResponse(400, null, 'Invalid ID format'));
   }

   const response = await getSinglePaymentMethodService(id);
   if (!response.status) {
      return res
         .status(400)
         .json(new ApiResponse(response.statusCode, null, response.message));
   }
   return res
      .status(200)
      .json(
         new ApiResponse(
            200,
            response.data,
            'Payment method retrieved successfully'
         )
      );
});

exports.handleCreatePaymentMethod = asyncHandler(async (req, res) => {
   const { name, description, qr_image } = req.body;
   if (!name) {
      return res
         .status(400)
         .json(new ApiResponse(400, null, 'Name is required'));
   }
   const response = await createPaymentMethodService({
      name,
      description,
      qr_image,
   });
   if (!response.status) {
      return res
         .status(400)
         .json(new ApiResponse(response.statusCode, null, response.message));
   }
   return res
      .status(201)
      .json(
         new ApiResponse(
            201,
            response.data,
            'Payment method created successfully'
         )
      );
});

exports.handleUpdatePaymentMethod = asyncHandler(async (req, res) => {
   const { id } = req.params;
   const { name, description, is_active, qr_image } = req.body;

   if (!id) {
      return res.status(400).json(new ApiResponse(400, null, 'ID is required'));
   }

   if (!ObjectId.isValid(id)) {
      return res
         .status(400)
         .json(new ApiResponse(400, null, 'Invalid ID format'));
   }

   if (!name) {
      return res
         .status(400)
         .json(new ApiResponse(400, null, 'Name is required'));
   }
   const response = await updatePaymentMethodService(id, {
      name,
      description,
      is_active,
      qr_image,
   });
   if (!response.status) {
      return res
         .status(400)
         .json(new ApiResponse(response.statusCode, null, response.message));
   }
   return res
      .status(200)
      .json(
         new ApiResponse(
            200,
            response.data,
            'Payment method updated successfully'
         )
      );
});

exports.handleDeletePaymentMethod = asyncHandler(async (req, res) => {
   const { id } = req.params;

   if (!id) {
      return res.status(400).json(new ApiResponse(400, null, 'ID is required'));
   }

   if (!ObjectId.isValid(id)) {
      return res
         .status(400)
         .json(new ApiResponse(400, null, 'Invalid ID format'));
   }

   const response = await deletePaymentMethodService(id);
   if (!response.status) {
      return res
         .status(400)
         .json(new ApiResponse(response.statusCode, null, response.message));
   }
   return res
      .status(200)
      .json(
         new ApiResponse(
            200,
            response.data,
            'Payment method deleted successfully'
         )
      );
});
