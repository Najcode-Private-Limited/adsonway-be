const ObjectId = require('mongoose').Types.ObjectId;
const {
   updateUserProfileService,
   getUserWalletService,
} = require('../../services/user');
const ApiResponse = require('../../utils/api_response');
const { asyncHandler } = require('../../utils/async_handler');

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
