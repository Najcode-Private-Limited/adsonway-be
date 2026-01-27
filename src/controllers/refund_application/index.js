const ObjectId = require('mongoose').Types.ObjectId;
const {
   createNewRefundApplication,
   getRefundApplicationForUser,
   getRefundApplications,
   getRefundApplicationById,
} = require('../../repositories/refund_application');
const ApiResponse = require('../../utils/api_response');
const { asyncHandler } = require('../../utils/async_handler');
const validateRequiredFields = require('../../utils/validate_fields');

exports.handleCreateNewRefundApplication = asyncHandler(async (req, res) => {
   const { _id } = req.user;
   if (!ObjectId.isValid(_id)) {
      return res
         .status(400)
         .json(new ApiResponse(400, null, 'Invalid user ID', false));
   }

   const requiredFields = [
      'platform',
      'account_name',
      'requested_amount',
      'fees_amount',
      'total_refund_amount',
      'account_id',
      'reason',
   ];

   const validation = validateRequiredFields(req.body, requiredFields);

   if (!validation.isValid) {
      return res.status(400).json(validation.response);
   }

   const payload = { ...req.body, user: _id };

   const newRefundApplication = await createNewRefundApplication(payload);

   if (!newRefundApplication) {
      return res
         .status(500)
         .json(
            new ApiResponse(
               500,
               null,
               'Failed to create refund application',
               false
            )
         );
   }

   return res.status(201).json({
      status: 201,
      data: newRefundApplication,
      message: 'Refund application created successfully',
      success: true,
   });
});

exports.handleGetMyRefundApplications = asyncHandler(async (req, res) => {
   const { _id } = req.user;
   const filters = req.query || {};

   if (!ObjectId.isValid(_id)) {
      return res
         .status(400)
         .json(new ApiResponse(400, null, 'Invalid user ID', false));
   }

   const options = {
      page: parseInt(filters.page, 10) || 1,
      limit: parseInt(filters.limit, 10) || 10,
      sort: filters.sort || '-1',
   };

   const query = {};
   if (filters.status) {
      query.status = filters.status;
   }
   if (filters.startDate || filters.endDate) {
      query.createdAt = {};
      if (filters.startDate) {
         query.createdAt.$gte = filters.startDate;
      }
      if (filters.endDate) {
         query.createdAt.$lte = filters.endDate;
      }
   }

   const userRefundApplications = await getRefundApplicationForUser(
      _id,
      query,
      options
   );

   if (!userRefundApplications) {
      return res
         .status(500)
         .json(
            new ApiResponse(
               500,
               null,
               'Failed to retrieve refund applications',
               false
            )
         );
   }

   const curatedData = {
      userRefundApplications: userRefundApplications,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(userRefundApplications.length / options.limit),
   };

   return res
      .status(200)
      .json(
         new ApiResponse(
            200,
            curatedData,
            'Refund applications retrieved successfully',
            true
         )
      );
});

exports.handleGetAllRefundApplications = asyncHandler(async (req, res) => {
   const filters = req.query || {};
   const options = {
      page: parseInt(filters.page, 10) || 1,
      limit: parseInt(filters.limit, 10) || 10,
      sort: filters.sort || '-1',
   };

   const query = {};
   if (filters.status) {
      query.status = filters.status;
   }
   if (filters.startDate || filters.endDate) {
      query.createdAt = {};
      if (filters.startDate) {
         query.createdAt.$gte = filters.startDate;
      }
      if (filters.endDate) {
         query.createdAt.$lte = filters.endDate;
      }
   }

   const userRefundApplications = await getRefundApplications(query, options);

   if (!userRefundApplications) {
      return res
         .status(500)
         .json(
            new ApiResponse(
               500,
               null,
               'Failed to retrieve refund applications',
               false
            )
         );
   }

   const curatedData = {
      userRefundApplications: userRefundApplications,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(userRefundApplications.length / options.limit),
   };

   return res
      .status(200)
      .json(
         new ApiResponse(
            200,
            curatedData,
            'Refund applications retrieved successfully',
            true
         )
      );
});

exports.handleGetRefundApplicationById = asyncHandler(async (req, res) => {
   const { id } = req.params;

   if (!ObjectId.isValid(id)) {
      return res
         .status(400)
         .json(
            new ApiResponse(400, null, 'Invalid refund application ID', false)
         );
   }

   const refundApplication = await getRefundApplicationById(id);

   if (!refundApplication) {
      return res
         .status(404)
         .json(
            new ApiResponse(404, null, 'Refund application not found', false)
         );
   }

   return res
      .status(200)
      .json(
         new ApiResponse(
            200,
            refundApplication,
            'Refund application retrieved successfully',
            true
         )
      );
});
