const {
   createTopUpRequest,
   getAllTopUpRequests,
   getAllTopUpRequestByUser,
} = require('../../repositories/top_up_request');
const { getPureUser } = require('../../repositories/user');

exports.createNewTopUpRequestService = async (topupData, userId) => {
   const payload = { ...topupData, userId };

   const checkUserExistance = await getPureUser(userId);
   if (!checkUserExistance) {
      return {
         statusCode: 404,
         success: false,
         message: 'User not found',
         data: null,
      };
   }
   payload.status = 'pending';
   payload.walletId = checkUserExistance.wallet._id;

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
   const checkUserExistance = await getPureUser(userId);
   if (!checkUserExistance) {
      return {
         statusCode: 404,
         success: false,
         message: 'User not found',
         data: null,
      };
   }
   const topUpRequests = await getAllTopUpRequestByUser(userId);
   if (!topUpRequests) {
      return {
         statusCode: 500,
         success: false,
         message: 'Failed to retrieve top-up requests for the user',
         data: null,
      };
   }
};

exports.updateTopUpRequestStatusService = async (requestId, status) => {};
