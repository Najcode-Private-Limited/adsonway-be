const ObjectId = require('mongoose').Types.ObjectId;
const {
   createNewBMShare,
   getBMShareById,
   getAllBMShareForUser,
   getAllBMShares,
   updateBMShareById,
} = require('../../repositories/bm_share');
const ApiResponse = require('../../utils/api_response');
const { asyncHandler } = require('../../utils/async_handler');
const validateRequiredFields = require('../../utils/validate_fields');

exports.handleApplyBMShare = asyncHandler(async (req, res) => {
   const requiredFields = ['shared_id', 'account'];

   const validation = validateRequiredFields(req.body, requiredFields);

   if (!validation.isValid) {
      return res.status(400).json(validation.response);
   }

   const payload = {
      user: req.user._id,
      shared_id: req.body.shared_id,
      account: req.body.account,
      notes: req.body.notes || '',
   };

   const newBMShare = await createNewBMShare(payload);

   if (!newBMShare) {
      return res
         .status(500)
         .json(new ApiResponse(500, null, 'Failed to create BM Share', false));
   }
   return res
      .status(201)
      .json(
         new ApiResponse(201, newBMShare, 'BM Share created successfully', true)
      );
});

exports.handleGetBMShareById = asyncHandler(async (req, res) => {
   const { id } = req.params;

   if (!ObjectId.isValid(id)) {
      return res
         .status(400)
         .json(new ApiResponse(400, null, 'Invalid BM Share ID', false));
   }

   const bmShare = await getBMShareById(id);

   if (!bmShare) {
      return res
         .status(404)
         .json(new ApiResponse(404, null, 'BM Share not found', false));
   }
   return res
      .status(200)
      .json(
         new ApiResponse(200, bmShare, 'BM Share retrieved successfully', true)
      );
});

exports.handleGetAllBMShareForUser = asyncHandler(async (req, res) => {
   const { _id } = req.user;
   const filters = req.query || {};

   if (!ObjectId.isValid(_id)) {
      return res
         .status(400)
         .json(new ApiResponse(400, null, 'Invalid User ID', false));
   }
   const options = {
      sort: filters.sort || -1,
      limit: parseInt(filters.limit, 10) || 10,
      page: parseInt(filters.page, 10) || 1,
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

   const userBMShares = await getAllBMShareForUser(_id, query, options);

   if (!userBMShares) {
      return res
         .status(500)
         .json(
            new ApiResponse(500, null, 'Failed to retrieve BM Shares', false)
         );
   }
   return res
      .status(200)
      .json(
         new ApiResponse(
            200,
            userBMShares,
            'BM Shares retrieved successfully',
            true
         )
      );
});

exports.handleGetAllBMShares = asyncHandler(async (req, res) => {
   const filters = req.query || {};
   const options = {
      page: parseInt(filters.page, 10) || 1,
      limit: parseInt(filters.limit, 10) || 10,
      sort: filters.sort || -1,
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
   const allBMShares = await getAllBMShares(query, options);

   if (!allBMShares) {
      return res
         .status(500)
         .json(
            new ApiResponse(500, null, 'Failed to retrieve BM Shares', false)
         );
   }
   return res
      .status(200)
      .json(
         new ApiResponse(
            200,
            allBMShares,
            'BM Shares retrieved successfully',
            true
         )
      );
});

exports.handleUpdateBMShareById = asyncHandler(async (req, res) => {
   const { id } = req.params;

   if (ObjectId.isValid(id) === false) {
      return res
         .status(400)
         .json(new ApiResponse(400, null, 'Invalid BM Share ID', false));
   }

   const checkExistance = await getBMShareById(id);

   if (!checkExistance) {
      return res
         .status(404)
         .json(new ApiResponse(404, null, 'BM Share not found', false));
   }
   if (
      checkExistance.status === 'rejected' ||
      checkExistance.status === 'approved'
   ) {
      return res
         .status(400)
         .json(
            new ApiResponse(
               400,
               null,
               'This BM Share request has been finalized and cannot be updated',
               false
            )
         );
   }

   const updatedBMShare = await updateBMShareById(id, req.body);

   if (!updatedBMShare) {
      return res
         .status(500)
         .json(new ApiResponse(500, null, 'Failed to update BM Share', false));
   }
   return res
      .status(200)
      .json(
         new ApiResponse(
            200,
            updatedBMShare,
            'BM Share updated successfully',
            true
         )
      );
});
