const ObjectId = require('mongoose').Types.ObjectId;
const {
   getAllTopUpRequestsService,
   getAllTopUpRequestsByUserService,
   createNewTopUpRequestService,
   updateTopUpRequestStatusService,
} = require('../../services/top_up_request');
const ApiResponse = require('../../utils/api_response');
const { asyncHandler } = require('../../utils/async_handler');

exports.handleCreateNewTopUpRequest = asyncHandler(async (req, res) => {
   const userId = req.user._id;
   const { amount, transcationId, screenshotUrl, paymentMedthodId } = req.body;
   if (!amount || !transcationId || !paymentMedthodId || !screenshotUrl) {
      return res
         .status(400)
         .json(new ApiResponse(400, null, 'All fields are required', false));
   }

   if (!ObjectId.isValid(userId)) {
      return res
         .status(400)
         .json(new ApiResponse(400, null, 'Invalid ID format'));
   }

   const result = await createNewTopUpRequestService(req.body, userId);
   if (!result.success) {
      return res
         .status(400)
         .json(new ApiResponse(400, null, result.message, false));
   }
   return res
      .status(201)
      .json(
         new ApiResponse(
            201,
            result.data,
            'Top-up request created successfully',
            true
         )
      );
});

exports.handleGetAllTopUpRequests = asyncHandler(async (req, res) => {
   const result = await getAllTopUpRequestsService();
   if (!result.success) {
      return res
         .status(400)
         .json(new ApiResponse(400, null, result.message, false));
   }
   return res
      .status(200)
      .json(
         new ApiResponse(
            200,
            result.data,
            'Top-up requests retrieved successfully',
            true
         )
      );
});

exports.handleGetAllTopUpRequestsByUser = asyncHandler(async (req, res) => {
   const { id } = req.params;

   if (!ObjectId.isValid(id)) {
      return res
         .status(400)
         .json(new ApiResponse(400, null, 'Invalid User ID format'));
   }

   const result = await getAllTopUpRequestsByUserService(id);
   if (!result.success) {
      return res
         .status(400)
         .json(new ApiResponse(400, null, result.message, false));
   }
   return res
      .status(200)
      .json(
         new ApiResponse(
            200,
            result.data,
            'User top-up requests retrieved successfully',
            true
         )
      );
});

exports.handleUpdateTopUpRequestStatus = asyncHandler(async (req, res) => {
   const { id } = req.params;
   const { status } = req.body;
   const adminId = req.admin._id;

   if (!ObjectId.isValid(id)) {
      return res
         .status(400)
         .json(new ApiResponse(400, null, 'Invalid Top-Up Request ID format'));
   }

   if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res
         .status(400)
         .json(
            new ApiResponse(
               400,
               null,
               'Status must be one of: pending, approved, rejected',
               false
            )
         );
   }

   let rejectReason = null;
   if (status === 'rejected') {
      rejectReason = req.body.rejectReason;
   }

   const result = await updateTopUpRequestStatusService(
      id,
      status,
      rejectReason,
      adminId
   );
   if (!result.success) {
      return res
         .status(400)
         .json(new ApiResponse(400, null, result.message, false));
   }
   return res
      .status(200)
      .json(
         new ApiResponse(
            200,
            result.data,
            'Top-up request status updated successfully',
            true
         )
      );
});
