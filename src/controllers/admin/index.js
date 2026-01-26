const ObjectId = require('mongoose').Types.ObjectId;
const WalletLedger = require('../../models/wallet_ledger');
const {
   createNewFacebookAccount,
} = require('../../repositories/facebook_account');
const {
   updateFacebookAdApplication,
   getFacebookAdApplicationById,
} = require('../../repositories/facebook_application');
const { createNewGoogleAccount } = require('../../repositories/google_account');
const {
   updateGoogleAdApplication,
   getGoogleAdApplicationById,
} = require('../../repositories/google_application');
const { getWalletByUserId } = require('../../repositories/wallet');
const {
   createAdmin,
   createAgent,
   getAllAdminService,
   getAllAgentService,
   updateAdminProfileService,
   getAllGoogleAdApplicationsService,
   getAllFacebookAdApplicationsService,
   createNewFacebookAdAccountService,
   createNewGoogleAdAccountService,
   getAllGoogleAccountsService,
   getAllFacebookAdAccountsService,
   getAllUsersService,
   getAllRequestTopupGoogleIdAdminService,
   getAllRequestTopupFacebookIdAdminService,
   updateFacebookAdAccountDepositService,
   updateGoogleAdAccountDepositService,
} = require('../../services/admin');
const { getAllUsersForSpecificAgentService } = require('../../services/agent');
const ApiResponse = require('../../utils/api_response/index');
const { asyncHandler } = require('../../utils/async_handler/index');
const validateRequiredFields = require('../../utils/validate_fields');

exports.handleCreateAdmin = asyncHandler(async (req, res) => {
   const { email, username, password, full_name, role = 'admin' } = req.body;

   if (!email || !username || !password || !full_name) {
      return res
         .status(400)
         .json(new ApiResponse(400, null, 'All fields are required', false));
   }

   if (role !== 'admin') {
      return res
         .status(400)
         .json(new ApiResponse(400, null, 'Role must be admin', false));
   }

   const admin = await createAdmin(req.body);
   if (!admin.success) {
      return res
         .status(400)
         .json(new ApiResponse(400, null, admin.message, false));
   }
   return res
      .status(201)
      .json(
         new ApiResponse(201, admin.data, 'Admin created successfully', true)
      );
});

exports.handleCreateAgent = asyncHandler(async (req, res) => {
   const { email, username, password, full_name, role = 'agent' } = req.body;

   if (!email || !username || !password || !full_name) {
      return res
         .status(400)
         .json(new ApiResponse(400, null, 'All fields are required', false));
   }

   if (role !== 'agent') {
      return res
         .status(400)
         .json(new ApiResponse(400, null, 'Role must be agent', false));
   }

   const agent = await createAgent(req.body);
   if (!agent.success) {
      return res
         .status(400)
         .json(new ApiResponse(400, null, agent.message, false));
   }
   return res
      .status(201)
      .json(
         new ApiResponse(201, agent.data, 'Agent created successfully', true)
      );
});

exports.handleGetAllAdmins = asyncHandler(async (req, res) => {
   const admins = await getAllAdminService();
   if (!admins.success) {
      return res
         .status(400)
         .json(new ApiResponse(400, null, admins.message, false));
   }
   return res
      .status(200)
      .json(
         new ApiResponse(
            200,
            admins.data,
            'Admins retrieved successfully',
            true
         )
      );
});

exports.handleGetAllAgents = asyncHandler(async (req, res) => {
   const agents = await getAllAgentService();
   if (!agents.success) {
      return res
         .status(400)
         .json(new ApiResponse(400, null, agents.message, false));
   }
   return res
      .status(200)
      .json(
         new ApiResponse(
            200,
            agents.data,
            'Agents retrieved successfully',
            true
         )
      );
});

exports.handleGetAllUsersForSpecificAgent = asyncHandler(async (req, res) => {
   const { id } = req.params;
   const users = await getAllUsersForSpecificAgentService(id);
   if (!users.success) {
      return res
         .status(400)
         .json(new ApiResponse(400, null, users.message, false));
   }
   return res
      .status(200)
      .json(
         new ApiResponse(200, users.data, 'Users retrieved successfully', true)
      );
});

exports.handleUpdateAdminProfile = asyncHandler(async (req, res) => {
   const adminId = req.admin._id;
   const updateData = req.body;

   const updatedAdmin = await updateAdminProfileService(adminId, updateData);

   if (!updatedAdmin.success) {
      return res
         .status(400)
         .json(new ApiResponse(400, null, updatedAdmin.message, false));
   }

   return res
      .status(200)
      .json(
         new ApiResponse(
            200,
            updatedAdmin.data,
            'Admin profile updated successfully',
            true
         )
      );
});

exports.handleGetAllGoogleAdApplications = asyncHandler(async (req, res) => {
   const filters = req.query;
   const options = {
      page: parseInt(req.query.page, 10) || 1,
      limit: parseInt(req.query.limit, 10) || 10,
      sort: req.query.sort || '-1',
   };
   const result = await getAllGoogleAdApplicationsService(filters, options);
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
            'Google Ad applications retrieved successfully',
            true
         )
      );
});

exports.handleUpdateGoogleAdApplicationStatus = asyncHandler(
   async (req, res) => {
      const { id } = req.params;
      const { status } = req.body;
      const adminNote = req.body.admin_note || '';
      const checkExistance = await getGoogleAdApplicationById(id);
      if (!checkExistance) {
         return res
            .status(404)
            .json(
               new ApiResponse(
                  404,
                  null,
                  'Google Ad application not found',
                  false
               )
            );
      }

      if (
         checkExistance.status === 'approved' ||
         checkExistance.status === 'rejected'
      ) {
         return res
            .status(400)
            .json(
               new ApiResponse(
                  400,
                  null,
                  'Cannot update status of an application that is already approved or rejected',
                  false
               )
            );
      }

      if (status === 'rejected') {
         const userId = checkExistance.user._id;
         const userWallet = await getWalletByUserId(userId);

         if (userWallet) {
            userWallet.amount += checkExistance.submissionFee;
            await userWallet.save();
         }

         const walletLedgerEntry = {
            walletId: userWallet._id,
            userId: userId,
            type: 'refund',
            amount: checkExistance.submissionFee,
            status: 'completed',
            description: `Refund for rejected Google Ad application ID: ${id}`,
            balanceBefore:
               Number(userWallet.amount) - checkExistance.submissionFee,
            balanceAfter: Number(userWallet.amount),
         };

         await WalletLedger.create(walletLedgerEntry);
      }

      // if (status === 'approved') {
      //    const userId = checkExistance.user._id;

      //    const newAccountPayload = {
      //       user: userId,
      //       account_name: checkExistance.account_name,
      //       account_id: checkExistance.account_id,
      //       timezone: checkExistance.timezone,
      //       deposit_amount: checkExistance.deposit_amount,
      //       application_fee: checkExistance.application_fee,
      //       deposit_fee: checkExistance.deposit_fee,
      //       promotional_website: checkExistance.promotional_website,
      //       gmail_id: checkExistance.gmail_id,
      //    };

      //    const newAccount = await createNewGoogleAccount(newAccountPayload);

      //    if (!newAccount) {
      //       return res
      //          .status(500)
      //          .json(
      //             new ApiResponse(
      //                500,
      //                null,
      //                'Failed to create Google Ad account after application approval',
      //                false
      //             )
      //          );
      //    }
      // }
      const result = await updateGoogleAdApplication(id, { status, adminNote });
      if (!result) {
         return res
            .status(400)
            .json(
               new ApiResponse(
                  400,
                  null,
                  'Failed to update application status',
                  false
               )
            );
      }
      return res
         .status(200)
         .json(
            new ApiResponse(
               200,
               result,
               'Google Ad application status updated successfully',
               true
            )
         );
   }
);

exports.handleUpdateFacebookAdApplicationStatus = asyncHandler(
   async (req, res) => {
      const { id } = req.params;
      const { status } = req.body;
      const adminNote = req.body.admin_note || '';

      const checkExistance = await getFacebookAdApplicationById(id);
      if (!checkExistance) {
         return res
            .status(404)
            .json(
               new ApiResponse(
                  404,
                  null,
                  'Facebook Ad application not found',
                  false
               )
            );
      }

      if (
         checkExistance.status === 'approved' ||
         checkExistance.status === 'rejected'
      ) {
         return res
            .status(400)
            .json(
               new ApiResponse(
                  400,
                  null,
                  'Cannot update status of an application that is already approved or rejected',
                  false
               )
            );
      }

      if (status === 'rejected') {
         const userId = checkExistance.user._id;
         const userWallet = await getWalletByUserId(userId);

         if (userWallet) {
            userWallet.amount += checkExistance.submissionFee;
            await userWallet.save();
         }

         const walletLedgerEntry = {
            walletId: userWallet._id,
            userId: userId,
            type: 'refund',
            amount: checkExistance.submissionFee,
            status: 'completed',
            description: `Refund for rejected Facebook Ad application ID: ${id}`,
            balanceBefore:
               Number(userWallet.amount) - checkExistance.submissionFee,
            balanceAfter: Number(userWallet.amount),
         };

         await WalletLedger.create(walletLedgerEntry);
      }

      // if (status === 'approved') {
      //    const userId = checkExistance.user._id;

      //    const newAccountPayload = {
      //       user: userId,
      //       license_number: checkExistance.licenseNumber,
      //       account_name: checkExistance.account_name,
      //       account_id: checkExistance.account_id,
      //       timezone: checkExistance.timezone,
      //       deposit_amount: checkExistance.submissionFee,
      //       application_fee: checkExistance.application_fee,
      //       deposit_fee: checkExistance.deposit_fee,
      //    };

      //    console.log('New Account Payload:', newAccountPayload);

      //    const newAccount = await createNewFacebookAccount(newAccountPayload);

      //    if (!newAccount) {
      //       return res
      //          .status(500)
      //          .json(
      //             new ApiResponse(
      //                500,
      //                null,
      //                'Failed to create Facebook Ad account after application approval',
      //                false
      //             )
      //          );
      //    }
      // }

      const result = await updateFacebookAdApplication(id, {
         status,
         adminNote,
      });

      if (!result) {
         return res
            .status(400)
            .json(
               new ApiResponse(
                  400,
                  null,
                  'Failed to update application status',
                  false
               )
            );
      }
      return res
         .status(200)
         .json(
            new ApiResponse(
               200,
               result,
               'Facebook Ad application status updated successfully',
               true
            )
         );
   }
);

exports.handleGetAllFacebookAdApplications = asyncHandler(async (req, res) => {
   const filters = req.query;
   const options = {
      page: parseInt(req.query.page, 10) || 1,
      limit: parseInt(req.query.limit, 10) || 10,
      sort: req.query.sort || '-1',
   };
   const result = await getAllFacebookAdApplicationsService(filters, options);
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
            'Facebook Ad applications retrieved successfully',
            true
         )
      );
});

exports.handleCreateNewGoogleAdAccount = asyncHandler(async (req, res) => {
   const { user } = req.body;

   if (!ObjectId.isValid(user)) {
      return res
         .status(400)
         .json(new ApiResponse(400, null, 'Invalid user ID', false));
   }

   const requiredFields = [
      'user',
      'account_name',
      'account_id',
      'timezone',
      'deposit_amount',
      'application_fee',
      'deposit_fee',
      'promotional_website',
      'gmail_id',
   ];

   const validation = validateRequiredFields(req.body, requiredFields);

   if (!validation.isValid) {
      return res.status(400).json(validation.response);
   }

   const result = await createNewGoogleAdAccountService(req.body);

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
            'Google Ad account created successfully',
            true
         )
      );
});

exports.handleCreateNewFacebookAdAccount = asyncHandler(async (req, res) => {
   const { user } = req.body;

   if (!ObjectId.isValid(user)) {
      return res
         .status(400)
         .json(new ApiResponse(400, null, 'Invalid user ID', false));
   }

   const requiredFields = [
      'user',
      'license_number',
      'account_name',
      'account_id',
      'timezone',
      'deposit_amount',
      'application_fee',
      'deposit_fee',
   ];

   const validation = validateRequiredFields(req.body, requiredFields);

   if (!validation.isValid) {
      return res.status(400).json(validation.response);
   }

   const result = await createNewFacebookAdAccountService(req.body);

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
            'Facebook Ad account created successfully',
            true
         )
      );
});

exports.handleGetAllFacebookAdAccounts = asyncHandler(async (req, res) => {
   const filters = req.query;
   const options = {
      page: parseInt(req.query.page, 10) || 1,
      limit: parseInt(req.query.limit, 10) || 10,
      sort: req.query.sort || '-1',
   };
   const result = await getAllFacebookAdAccountsService(filters, options);

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
            'Facebook Ad accounts retrieved successfully',
            true
         )
      );
});

exports.handleGetAllGoogleAdAccounts = asyncHandler(async (req, res) => {
   const filters = req.query;
   const options = {
      page: parseInt(req.query.page, 10) || 1,
      limit: parseInt(req.query.limit, 10) || 10,
      sort: req.query.sort || '-1',
   };

   const result = await getAllGoogleAccountsService(filters, options);
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
            'Google Ad accounts retrieved successfully',
            true
         )
      );
});

exports.handleUpdateGoogleAdAccount = asyncHandler(async (req, res) => {
   const { id } = req.params;

   if (!ObjectId.isValid(id)) {
      return res
         .status(400)
         .json(
            new ApiResponse(400, null, 'Invalid Google Ad account ID', false)
         );
   }

   const result = await updateGoogleAccountService(id, req.body);
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
            'Google Ad account updated successfully',
            true
         )
      );
});

exports.handleUpdateFacebookAdAccount = asyncHandler(async (req, res) => {
   const { id } = req.params;

   if (!ObjectId.isValid(id)) {
      return res
         .status(400)
         .json(
            new ApiResponse(400, null, 'Invalid Facebook Ad account ID', false)
         );
   }
   const result = await updateFacebookAccountService(id, req.body);

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
            'Facebook Ad account updated successfully',
            true
         )
      );
});

exports.handleGetAllUser = asyncHandler(async (req, res) => {
   const filters = req.query;
   const result = await getAllUsersService(filters);
   if (!result.success) {
      return res
         .status(400)
         .json(new ApiResponse(400, null, result.message, false));
   }
   return res
      .status(200)
      .json(
         new ApiResponse(200, result.data, 'Users retrieved successfully', true)
      );
});

exports.handleGetAllGoogleIdTopupRequests = asyncHandler(async (req, res) => {
   const filters = req.query;
   const options = {
      page: parseInt(req.query.page, 10) || 1,
      limit: parseInt(req.query.limit, 10) || 10,
      sort: req.query.sort || '-1',
   };
   const result = await getAllRequestTopupGoogleIdAdminService(
      filters,
      options
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
            'Google ID top-up requests retrieved successfully',
            true
         )
      );
});

exports.handleGetAllFacebookIdTopupRequests = asyncHandler(async (req, res) => {
   const filters = req.query;
   const options = {
      page: parseInt(req.query.page, 10) || 1,
      limit: parseInt(req.query.limit, 10) || 10,
      sort: req.query.sort || '-1',
   };

   const result = await getAllRequestTopupFacebookIdAdminService(
      filters,
      options
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
            'Facebook ID top-up requests retrieved successfully',
            true
         )
      );
});

exports.handleUpdateGoogleAdAccountDeposit = asyncHandler(async (req, res) => {
   const { id } = req.params;
   const { reject_reason, status } = req.body;
   if (!ObjectId.isValid(id)) {
      return res
         .status(400)
         .json(
            new ApiResponse(400, null, 'Invalid Google Ad account ID', false)
         );
   }

   const payload = { status };
   if (reject_reason) {
      payload.rejectReason = reject_reason;
   }

   const result = await updateGoogleAdAccountDepositService(id, payload);
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
            'Google Ad account deposit updated successfully',
            true
         )
      );
});

exports.handleUpdateFacebookAdAccountDeposit = asyncHandler(
   async (req, res) => {
      const { id } = req.params;
      const { reject_reason, status } = req.body;
      if (!ObjectId.isValid(id)) {
         return res
            .status(400)
            .json(
               new ApiResponse(
                  400,
                  null,
                  'Invalid Facebook Ad account ID',
                  false
               )
            );
      }
      const payload = { status };
      if (reject_reason) {
         payload.rejectReason = reject_reason;
      }
      const result = await updateFacebookAdAccountDepositService(id, payload);
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
               'Facebook Ad account deposit updated successfully',
               true
            )
         );
   }
);

exports.handleModifyUserWallet = asyncHandler(async (req, res) => {
   const { id } = req.params;
   const { transcationType, amount, transcationId, paymentMethod, remarks } =
      req.body;

   if (!ObjectId.isValid(id)) {
      return res
         .status(400)
         .json(new ApiResponse(400, null, 'Invalid User ID', false));
   }

   const userWallet = await getWalletByUserId(id);
   if (!userWallet) {
      return res
         .status(404)
         .json(new ApiResponse(404, null, 'User wallet not found', false));
   }

   const requiredFields = [
      'transcationType',
      'amount',
      'transcationId',
      'paymentMethod',
   ];

   const validation = validateRequiredFields(req.body, requiredFields);

   if (!validation.isValid) {
      return res.status(400).json(validation.response);
   }

   if (transcationType === 'credit') {
      userWallet.amount += amount;
      await userWallet.save();

      const walletLedgerEntry = {
         walletId: userWallet._id,
         userId: id,
         type: transcationType,
         amount: amount,
         status: 'completed',
         description: `Admin modified wallet - Transaction ID: ${transcationId}, Payment Method: ${paymentMethod}, Remarks: ${remarks ? remarks : 'N/A'}`,
         balanceBefore: Number(userWallet.amount) - amount,
         balanceAfter: Number(userWallet.amount),
      };

      await WalletLedger.create(walletLedgerEntry);
   } else if (transcationType === 'debit') {
      if (userWallet.amount < amount) {
         return res
            .status(400)
            .json(new ApiResponse(400, null, 'Insufficient balance', false));
      }
      userWallet.amount -= amount;
      await userWallet.save();
      const walletLedgerEntry = {
         walletId: userWallet._id,
         userId: id,
         type: transcationType,
         amount: amount,
         status: 'completed',
         description: `Admin modified wallet - Transaction ID: ${transcationId}, Payment Method: ${paymentMethod}, Remarks: ${remarks}`,
         balanceBefore: Number(userWallet.amount) + amount,
         balanceAfter: Number(userWallet.amount),
      };
      await WalletLedger.create(walletLedgerEntry);
   }
   return res
      .status(200)
      .json(
         new ApiResponse(200, null, 'User wallet modified successfully', true)
      );
});
