const { default: mongoose } = require('mongoose');
const app = require('../../app');
const {
   createTopUpRequest,
   getAllTopUpRequests,
   getAllTopUpRequestByUser,
   getTopUpRequestById,
   getTopUpRequestByTransactionId,
} = require('../../repositories/top_up_request');
const { getUserById } = require('../../repositories/user');
const { getWalletByUserId } = require('../../repositories/wallet');
const { createNewWalletLedger } = require('../../repositories/wallet_ledger');

exports.createNewTopUpRequestService = async (topupData, userId) => {
   const payload = { ...topupData, userId };

   const checkUserExistance = await getUserById(userId);
   if (!checkUserExistance) {
      return {
         statusCode: 404,
         success: false,
         message: 'User not found',
         data: null,
      };
   }

   const checkIfTransactionIdExists = await getTopUpRequestByTransactionId(
      topupData.transcationId
   );

   if (checkIfTransactionIdExists !== null) {
      return {
         statusCode: 400,
         success: false,
         message: 'Transaction ID already exists',
         data: null,
      };
   }
   payload.status = 'pending';
   const walletForUser = await getWalletByUserId(userId);
   if (!walletForUser) {
      return {
         statusCode: 404,
         success: false,
         message: 'Wallet for user not found',
         data: null,
      };
   }
   payload.walletId = walletForUser._id;

   const newTopUpRequest = await createTopUpRequest(payload);

   if (!newTopUpRequest) {
      return {
         statusCode: 500,
         success: false,
         message: 'Failed to create top-up request',
         data: null,
      };
   }
   return {
      statusCode: 201,
      success: true,
      message: 'Top-up request created successfully',
      data: newTopUpRequest,
   };
};

exports.getAllTopUpRequestsService = async () => {
   const topUpRequests = await getAllTopUpRequests();
   if (!topUpRequests) {
      return {
         statusCode: 500,
         success: false,
         message: 'Failed to retrieve top-up requests',
         data: null,
      };
   }
   return {
      statusCode: 200,
      success: true,
      message: 'Top-up requests retrieved successfully',
      data: topUpRequests,
   };
};

exports.getAllTopUpRequestsByUserService = async (userId) => {
   const checkUserExistance = await getUserById(userId);
   if (!checkUserExistance) {
      return {
         statusCode: 404,
         success: false,
         message: 'User not found',
         data: null,
      };
   }
   const topUpRequests = await getAllTopUpRequestByUser(userId);
   console.log(topUpRequests);
   if (!topUpRequests) {
      return {
         statusCode: 500,
         success: false,
         message: 'Failed to retrieve top-up requests for the user',
         data: null,
      };
   }
   return {
      statusCode: 200,
      success: true,
      message: 'User top-up requests retrieved successfully',
      data: topUpRequests,
   };
};

exports.updateTopUpRequestStatusService = async (
   requestId,
   status,
   rejectReason = null,
   adminId
) => {
   const session = await mongoose.startSession();
   const topUpRequest = await getTopUpRequestById(requestId);
   if (!topUpRequest) {
      return {
         statusCode: 404,
         success: false,
         message: 'Top-up request not found',
         data: null,
      };
   }
   if (topUpRequest.status === status) {
      return {
         statusCode: 400,
         success: false,
         message: `Top-up request is already ${status}`,
         data: null,
      };
   }
   if (
      (status === 'approved' || status === 'rejected') &&
      status === 'pending'
   ) {
      return {
         statusCode: 400,
         success: false,
         message: `Cannot change status from pending to ${status}`,
         data: null,
      };
   }

   // Two case: 1, if status is reject:
   if (status === 'rejected') {
      topUpRequest.status = 'rejected';
      if (rejectReason) {
         topUpRequest.rejectReason = rejectReason;
      }
      topUpRequest.rejectedAt = new Date();
      await topUpRequest.save();

      return {
         statusCode: 200,
         success: true,
         message: 'Top-up request rejected successfully',
         data: topUpRequest,
      };
   }

   // Case 2: status is approved
   if (status === 'approved') {
      session.startTransaction();
      const userWallet = await getWalletByUserId(topUpRequest.userId._id);

      if (!userWallet) {
         await session.abortTransaction();
         return {
            statusCode: 404,
            success: false,
            message: 'Wallet for user not found',
            data: null,
         };
      }

      topUpRequest.status = 'approved';
      topUpRequest.approvedAt = new Date();
      await topUpRequest.save({ session });

      // If Top-up request is approved, we need to add the amount to the user's wallet and aslo create a wallet ledger entry

      const payload = {
         userId: topUpRequest.userId._id,
         walletId: topUpRequest.walletId._id,
         type: 'credit',
         amount: topUpRequest.amount,
         status: 'completed',
         description: `Top-up approved for amount ${topUpRequest.amount}`,
         balanceBefore: userWallet.amount,
         balanceAfter: userWallet.amount + topUpRequest.amount,
         approvedAt: new Date(),
         meta: {
            adminId: adminId,
         },
      };

      const createNewLedgerEntry = await createNewWalletLedger(
         payload,
         session
      );
      if (!createNewLedgerEntry) {
         await session.abortTransaction();
         return {
            statusCode: 500,
            success: false,
            message: 'Failed to create wallet ledger entry',
            data: null,
         };
      }
      //   Update the user's wallet balance
      userWallet.amount += topUpRequest.amount;
      await userWallet.save({ session });

      await session.commitTransaction();
      await session.endSession();
      return {
         statusCode: 200,
         success: true,
         message: 'Top-up request approved successfully',
         data: topUpRequest,
      };
   }
};

exports.getTopUpRequestByIdService = async (requestId) => {
   const topUpRequest = await getTopUpRequestById(requestId);
   if (!topUpRequest) {
      return {
         statusCode: 404,
         success: false,
         message: 'Top-up request not found',
         data: null,
      };
   }
   return {
      statusCode: 200,
      success: true,
      message: 'Top-up request retrieved successfully',
      data: topUpRequest,
   };
};
