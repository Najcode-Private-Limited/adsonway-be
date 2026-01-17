const mongoose = require('mongoose');
const { hashPassword } = require('../../functions');
const WalletLedger = require('../../models/wallet_ledger');
const {
   createNewGoogleAdApplication,
   getGoogleAdApplicationByUser,
} = require('../../repositories/google_application');
const { getUserById, updateUser } = require('../../repositories/user');
const { getWalletByUserId } = require('../../repositories/wallet');
const {
   getPaymentFeeRuleForUser,
} = require('../../repositories/payment_fee_rules');

const {
   createNewFacebookAdApplication,
   getFacebookAdApplicationByUser,
} = require('../../repositories/facebook_application');

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

   const rule = await getPaymentFeeRuleForUser(userId);
   if (!rule) {
      return {
         statusCode: 500,
         success: false,
         message: 'Failed to retrieve payment fee rule',
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
      data: {
         wallet,
         paymentFeeRule: rule,
      },
   };
};

exports.applyGoogleAdService = async (userId, applicationData) => {
   const session = await mongoose.startSession();
   session.startTransaction();

   try {
      const newApplication = await createNewGoogleAdApplication(
         userId,
         applicationData,
         session
      );

      if (!newApplication) {
         await session.abortTransaction();
         session.endSession();

         return {
            statusCode: 500,
            success: false,
            message: 'Failed to create Google Ad application',
            data: null,
         };
      }
      const userWallet = await getWalletByUserId(userId, session);

      if (!userWallet) {
         await session.abortTransaction();
         session.endSession();

         return {
            statusCode: 500,
            success: false,
            message: 'User wallet not found',
            data: null,
         };
      }

      if (userWallet.amount < applicationData.submissionFee) {
         await session.abortTransaction();
         session.endSession();

         return {
            statusCode: 400,
            success: false,
            message: 'Insufficient wallet balance',
            data: null,
         };
      }
      userWallet.amount -= applicationData.submissionFee;
      const updatedWallet = await userWallet.save({ session });

      if (!updatedWallet) {
         await session.abortTransaction();
         session.endSession();

         return {
            statusCode: 500,
            success: false,
            message: 'Failed to update user wallet',
            data: null,
         };
      }

      const ledger = await WalletLedger.create(
         [
            {
               userId: userId,
               walletId: updatedWallet._id,
               type: 'debit',
               amount: applicationData.submissionFee,
               description: 'Google Ad application submission fee',
               status: 'completed',
               balanceBefore: userWallet.amount + applicationData.submissionFee,
               balanceAfter: userWallet.amount,
            },
         ],
         { session }
      );

      if (!ledger || !ledger.length) {
         await session.abortTransaction();
         session.endSession();

         return {
            statusCode: 500,
            success: false,
            message: 'Failed to create wallet ledger',
            data: null,
         };
      }
      await session.commitTransaction();
      session.endSession();

      return {
         statusCode: 201,
         success: true,
         message: 'Google Ad application created successfully',
         data: newApplication,
      };
   } catch (error) {
      await session.abortTransaction();
      session.endSession();

      return {
         statusCode: 500,
         success: false,
         message: 'Transaction failed',
         error: error.message,
         data: null,
      };
   }
};

exports.getMyGoogleAdApplicationsService = async (userId, filters, options) => {
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
   const applications = await getGoogleAdApplicationByUser(
      userId,
      query,
      options
   );
   if (!applications) {
      return {
         statusCode: 500,
         success: false,
         message: 'Failed to retrieve Google Ad applications',
         data: null,
      };
   }
   return {
      statusCode: 200,
      success: true,
      message: 'Google Ad applications retrieved successfully',
      data: {
         applications,
         page: options.page,
         limit: options.limit,
         totalPages: Math.ceil(applications.length / options.limit),
      },
   };
};

exports.getMyFacebookAdApplicationsService = async (
   userId,
   filters,
   options
) => {
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
   const applications = await getFacebookAdApplicationByUser(
      userId,
      query,
      options
   );
   if (!applications) {
      return {
         statusCode: 500,
         success: false,
         message: 'Failed to retrieve Google Ad applications',
         data: null,
      };
   }
   return {
      statusCode: 200,
      success: true,
      message: 'Google Ad applications retrieved successfully',
      data: {
         applications,
         page: options.page,
         limit: options.limit,
         totalPages: Math.ceil(applications.length / options.limit),
      },
   };
};

exports.applyFacebookAdService = async (userId, applicationData) => {
   const session = await mongoose.startSession();
   session.startTransaction();

   try {
      const newApplication = await createNewFacebookAdApplication(
         userId,
         applicationData,
         session
      );

      if (!newApplication) {
         await session.abortTransaction();
         session.endSession();

         return {
            statusCode: 500,
            success: false,
            message: 'Failed to create Facebook Ad application',
            data: null,
         };
      }
      const userWallet = await getWalletByUserId(userId, session);

      if (!userWallet) {
         await session.abortTransaction();
         session.endSession();

         return {
            statusCode: 500,
            success: false,
            message: 'User wallet not found',
            data: null,
         };
      }

      if (userWallet.amount < applicationData.submissionFee) {
         await session.abortTransaction();
         session.endSession();

         return {
            statusCode: 400,
            success: false,
            message: 'Insufficient wallet balance',
            data: null,
         };
      }
      userWallet.amount -= applicationData.submissionFee;
      const updatedWallet = await userWallet.save({ session });

      if (!updatedWallet) {
         await session.abortTransaction();
         session.endSession();

         return {
            statusCode: 500,
            success: false,
            message: 'Failed to update user wallet',
            data: null,
         };
      }

      const ledger = await WalletLedger.create(
         [
            {
               userId: userId,
               walletId: updatedWallet._id,
               type: 'debit',
               amount: applicationData.submissionFee,
               description: 'Google Ad application submission fee',
               status: 'completed',
               balanceBefore: userWallet.amount + applicationData.submissionFee,
               balanceAfter: userWallet.amount,
            },
         ],
         { session }
      );

      if (!ledger || !ledger.length) {
         await session.abortTransaction();
         session.endSession();

         return {
            statusCode: 500,
            success: false,
            message: 'Failed to create wallet ledger',
            data: null,
         };
      }
      await session.commitTransaction();
      session.endSession();

      return {
         statusCode: 201,
         success: true,
         message: 'Google Ad application created successfully',
         data: newApplication,
      };
   } catch (error) {
      await session.abortTransaction();
      session.endSession();

      return {
         statusCode: 500,
         success: false,
         message: 'Transaction failed',
         error: error.message,
         data: null,
      };
   }
};
