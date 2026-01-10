const { updateUserProfileService } = require('../../services/user');
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
