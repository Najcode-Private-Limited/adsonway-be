const ObjectId = require('mongoose').Types.ObjectId;
const {
   updateUserProfileService,
   getUserWalletService,
   applyGoogleAdService,
   getMyGoogleAdApplicationsService,
   applyFacebookAdService,
   getMyFacebookAdApplicationsService,
   getAllGoogleAccountForUserService,
   getAllFacebookAccountForUserService,
   requestTopupGoogleIdService,
   requestTopupFacebookIdService,
   getAllRequestTopupGoogleIdService,
   getAllRequestTopupFacebookIdService,
} = require('../../services/user');
const ApiResponse = require('../../utils/api_response');
const { asyncHandler } = require('../../utils/async_handler');
const validateRequiredFields = require('../../utils/validate_fields');

exports.handleUpdateUserProfile = asyncHandler(async (req, res) => {
   const userId = req.user._id;
   const updateData = req.body;

   const updatedUser = await updateUserProfileService(userId, updateData);
   if (!updatedUser.success) {
      return res
         .status(400)
         .json(new ApiResponse(400, null, updatedUser.message, false));
   }

   return res
      .status(200)
      .json(
         new ApiResponse(
            200,
            updatedUser.data,
            'User profile updated successfully',
            true
         )
      );
});

exports.handleGetMyWallet = asyncHandler(async (req, res) => {
   const userId = req.user._id;

   if (!ObjectId.isValid(userId)) {
      return res
         .status(400)
         .json(new ApiResponse(400, null, 'Invalid User ID format', false));
   }

   const wallet = await getUserWalletService(userId);
   if (!wallet.success) {
      return res
         .status(400)
         .json(new ApiResponse(400, null, wallet.message, false));
   }
   return res
      .status(200)
      .json(
         new ApiResponse(
            200,
            wallet.data,
            'Wallet retrieved successfully',
            true
         )
      );
});

exports.handleApplyGoogleAd = asyncHandler(async (req, res) => {
   const userId = req.user._id;
   const applicationData = req.body;

   if (!ObjectId.isValid(userId)) {
      return res
         .status(400)
         .json(new ApiResponse(400, null, 'Invalid User ID format', false));
   }

   const requiredFields = [
      'numberOfAccounts',
      'gmailId',
      'promotionalWebsite',
      'adAccounts',
   ];

   const validation = validateRequiredFields(req.body, requiredFields);

   if (!validation.isValid) {
      return res.status(400).json(validation.response);
   }
   const result = await applyGoogleAdService(userId, applicationData);
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
            'Google Ad application submitted successfully',
            true
         )
      );
});

exports.handleGetMyGoogleAdApplications = asyncHandler(async (req, res) => {
   const userId = req.user._id;
   const filters = req.query;
   const options = {
      page: parseInt(req.query.page, 10) || 1,
      limit: parseInt(req.query.limit, 10) || 10,
      sort: req.query.sort || '-1',
   };
   if (!ObjectId.isValid(userId)) {
      return res
         .status(400)
         .json(new ApiResponse(400, null, 'Invalid User ID format', false));
   }

   const result = await getMyGoogleAdApplicationsService(
      userId,
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
            'Google Ad applications retrieved successfully',
            true
         )
      );
});

exports.handleApplyFacebookAd = asyncHandler(async (req, res) => {
   const userId = req.user._id;
   const applicationData = req.body;

   if (!ObjectId.isValid(userId)) {
      return res
         .status(400)
         .json(new ApiResponse(400, null, 'Invalid User ID format', false));
   }

   const requiredFields = [
      'licenseType',
      'licenseNumber',
      'numberOfPages',
      'hasFullAdminAccess',
      'numberOfDomains',
      'numberOfAccounts',
      'submissionFee',
   ];

   const validation = validateRequiredFields(req.body, requiredFields);

   if (!validation.isValid) {
      return res.status(400).json(validation.response);
   }
   const result = await applyFacebookAdService(userId, applicationData);
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
            'Facebook Ad application submitted successfully',
            true
         )
      );
});

exports.handleGetMyFacebookAdApplications = asyncHandler(async (req, res) => {
   const userId = req.user._id;
   const filters = req.query;
   const options = {
      page: parseInt(req.query.page, 10) || 1,
      limit: parseInt(req.query.limit, 10) || 10,
      sort: req.query.sort || '-1',
   };
   if (!ObjectId.isValid(userId)) {
      return res
         .status(400)
         .json(new ApiResponse(400, null, 'Invalid User ID format', false));
   }

   const result = await getMyFacebookAdApplicationsService(
      userId,
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
            'Facebook Ad applications retrieved successfully',
            true
         )
      );
});

exports.handleGetAllMyGoogleAccounts = asyncHandler(async (req, res) => {
   const userId = req.user._id;
   const filters = req.query;
   const options = {
      page: parseInt(req.query.page, 10) || 1,
      limit: parseInt(req.query.limit, 10) || 10,
      sort: req.query.sort || '-1',
   };
   if (!ObjectId.isValid(userId)) {
      return res
         .status(400)
         .json(new ApiResponse(400, null, 'Invalid User ID format', false));
   }

   const result = await getAllGoogleAccountForUserService(
      userId,
      filters,
      options
   );
   if (!result) {
      return res
         .status(400)
         .json(
            new ApiResponse(
               400,
               null,
               'Failed to retrieve Google accounts',
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
            'Google accounts retrieved successfully',
            true
         )
      );
});

exports.handleGetAllMyFacebookAccounts = asyncHandler(async (req, res) => {
   const userId = req.user._id;
   const filters = req.query;
   const options = {
      page: parseInt(req.query.page, 10) || 1,
      limit: parseInt(req.query.limit, 10) || 10,
      sort: req.query.sort || '-1',
   };
   if (!ObjectId.isValid(userId)) {
      return res
         .status(400)
         .json(new ApiResponse(400, null, 'Invalid User ID format', false));
   }
   const result = await getAllFacebookAccountForUserService(
      userId,
      filters,
      options
   );
   if (!result) {
      return res
         .status(400)
         .json(
            new ApiResponse(
               400,
               null,
               'Failed to retrieve Facebook accounts',
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
            'Facebook accounts retrieved successfully',
            true
         )
      );
});

exports.handleAddMoneyToGoogleAccount = asyncHandler(async (req, res) => {
   const { id } = req.params;
   const userId = req.user._id;

   if (!ObjectId.isValid(id)) {
      return res
         .status(400)
         .json(new ApiResponse(400, null, 'Invalid Google Account ID', false));
   }

   const requiredFields = [
      'amount',
      'transcationId',
      'screenshotUrl',
      'paymentMethodId',
   ];

   const validation = validateRequiredFields(req.body, requiredFields);

   if (!validation.isValid) {
      return res.status(400).json(validation.response);
   }

   const result = await requestTopupGoogleIdService(id, req.body, userId);

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
            'Request for topup to Google account generated successfully',
            true
         )
      );
});

exports.handleAddMoneyToFacebookAccount = asyncHandler(async (req, res) => {
   const { id } = req.params;
   const userId = req.user._id;

   if (!ObjectId.isValid(id)) {
      return res
         .status(400)
         .json(
            new ApiResponse(400, null, 'Invalid Facebook Account ID', false)
         );
   }

   const requiredFields = [
      'amount',
      'transcationId',
      'screenshotUrl',
      'paymentMethodId',
   ];

   const validation = validateRequiredFields(req.body, requiredFields);

   if (!validation.isValid) {
      return res.status(400).json(validation.response);
   }

   const result = await requestTopupFacebookIdService(id, req.body, userId);

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
            'Request for topup to Facebook account generated successfully',
            true
         )
      );
});

exports.handleGetAllMyGoogleAccountTopupRequests = asyncHandler(
   async (req, res) => {
      const userId = req.user._id;
      const filters = req.query;
      const options = {
         page: parseInt(req.query.page, 10) || 1,
         limit: parseInt(req.query.limit, 10) || 10,
         sort: req.query.sort || '-1',
      };
      if (!ObjectId.isValid(userId)) {
         return res
            .status(400)
            .json(new ApiResponse(400, null, 'Invalid User ID format', false));
      }
      const result = await getAllRequestTopupGoogleIdService(
         userId,
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
               'Google account topup requests retrieved successfully',
               true
            )
         );
   }
);

exports.handleGetAllMyFacebookAccountTopupRequests = asyncHandler(
   async (req, res) => {
      const userId = req.user._id;
      const filters = req.query;
      const options = {
         page: parseInt(req.query.page, 10) || 1,
         limit: parseInt(req.query.limit, 10) || 10,
         sort: req.query.sort || '-1',
      };
      if (!ObjectId.isValid(userId)) {
         return res
            .status(400)
            .json(new ApiResponse(400, null, 'Invalid User ID format', false));
      }
      const result = await getAllRequestTopupFacebookIdService(
         userId,
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
               'Facebook account topup requests retrieved successfully',
               true
            )
         );
   }
);
