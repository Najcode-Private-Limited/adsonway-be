const { hashPassword } = require('../../functions');
const { getUserById, updateUser } = require('../../repositories/user');
const { getWalletByUserId } = require('../../repositories/wallet');

exports.updateUserProfileService = async (userId, updateData) => {
   const checkUserExistance = await getUserById(userId);

   if (!checkUserExistance) {
      return {
         statusCode: 404,
         success: false,
         message: 'User not found',
         data: null,
      };
   }

   const payload = {};
   if (updateData.full_name) payload.full_name = updateData.full_name;
   if (updateData.username) payload.username = updateData.username;
   if (updateData.password) {
      if (comparePassword(updateData.password, checkUserExistance.password)) {
         return {
            statusCode: 400,
            success: false,
            message: 'New password cannot be the same as the old password',
            data: null,
         };
      }
      const hashedPassword = await hashPassword(updateData.password);
      payload.password = hashedPassword;
   }
   if (updateData.display_picture)
      payload.display_picture = updateData.display_picture;
   if (updateData.phone_number) payload.phone_number = updateData.phone_number;
   if (updateData.organization) payload.organization = updateData.organization;
   const updatedUser = await updateUser(userId, payload);

   if (!updatedUser) {
      return {
         statusCode: 500,
         success: false,
         message: 'Failed to update user profile',
         data: null,
      };
   }
   return {
      statusCode: 200,
      success: true,
      message: 'User profile updated successfully',
      data: updatedUser,
   };
};

exports.getUserWalletService = async (userId) => {
   const checkUserExistance = await getUserById(userId);

   if (!checkUserExistance) {
      return {
         statusCode: 404,
         success: false,
         message: 'User not found',
         data: null,
      };
   }

   const wallet = await getWalletByUserId(userId);

   if (!wallet) {
      return {
         statusCode: 500,
         success: false,
         message: 'Failed to retrieve wallet',
         data: null,
      };
   }
   return {
      statusCode: 200,
      success: true,
      message: 'Wallet retrieved successfully',
      data: wallet,
   };
};
