const ObjectId = require('mongoose').Types.ObjectId;
const WalletLedger = require('../../models/wallet_ledger');
const {
   createNewRefundApplication,
   getRefundApplicationForUser,
   getRefundApplications,
   getRefundApplicationById,
   updateRefundApplicationById,
} = require('../../repositories/refund_application');
const {
   getWalletById,
   getWalletByUserId,
} = require('../../repositories/wallet');
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

exports.handleUpdateRefundApplicationStatus = asyncHandler(async (req, res) => {
   const { id } = req.params;

   if (!ObjectId.isValid(id)) {
      return res
         .status(400)
         .json(
            new ApiResponse(400, null, 'Invalid refund application ID', false)
         );
   }

   const payload = {};

   if (req.body.status) {
      payload.status = req.body.status;
   }
   if (req.body.admin_notes) {
      payload.admin_notes = req.body.admin_notes;
   }
   if (req.body.requested_amount) {
      payload.requested_amount = req.body.requested_amount;
   }

   const checkExistance = await getRefundApplicationById(id);

   if (!checkExistance) {
      return res
         .status(404)
         .json(
            new ApiResponse(404, null, 'Refund application not found', false)
         );
   }

   if (checkExistance.status === 'approved') {
      return res
         .status(400)
         .json(
            new ApiResponse(
               400,
               null,
               `Refund application is already approved and cannot be modified`,
               false
            )
         );
   }

   const userWallet = await getWalletByUserId(checkExistance.user._id);
   console.log('User Wallet:', userWallet);

   if (!userWallet) {
      return res
         .status(404)
         .json(new ApiResponse(404, null, 'User wallet not found', false));
   }

   if (req.body.status === 'approved') {
      userWallet.amount += checkExistance.total_refund_amount;
      await userWallet.save();

      const ledgerEntry = {
         userId: checkExistance.user._id,
         walletId: userWallet._id,
         type: 'refund',
         amount: checkExistance.total_refund_amount,
         description: `Refund approved for application ID: ${checkExistance.account_id}`,
         balanceAfter: userWallet.amount,
         balanceBefore: userWallet.amount - checkExistance.total_refund_amount,
      };

      await WalletLedger.create(ledgerEntry);
   }

   const updatedRefundApplication = await updateRefundApplicationById(
      id,
      payload
   );

   if (!updatedRefundApplication) {
      return res
         .status(500)
         .json(
            new ApiResponse(
               500,
               null,
               'Failed to update refund application',
               false
            )
         );
   }

   return res
      .status(200)
      .json(
         new ApiResponse(
            200,
            updatedRefundApplication,
            'Refund application updated successfully',
            true
         )
      );
});
