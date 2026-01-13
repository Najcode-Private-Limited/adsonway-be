const ObjectId = require('mongoose').Types.ObjectId;
const {
   getAllTransactionService,
   getMyTransactionService,
   getMyUserTransactionService,
} = require('../../services/wallet_ledger');
const ApiResponse = require('../../utils/api_response');
const { asyncHandler } = require('../../utils/async_handler');

exports.handleGetAllTransaction = asyncHandler(async (req, res, next) => {
   const { page = 1, limit = 10, sort, status, startDate, endDate } = req.query;

   const result = await getAllTransactionService(
      {
         status,
         startDate: startDate ? new Date(startDate) : undefined,
         endDate: endDate ? new Date(endDate) : undefined,
      },
      {
         page: parseInt(page, 10),
         limit: parseInt(limit, 10),
         sort,
      }
   );

   if (!result.success) {
      return res
         .status(result.statusCode)
         .json(new ApiResponse(result.statusCode, null, result.message));
   }
   return res
      .status(200)
      .json(new ApiResponse(result.statusCode, result.data, result.message));
});

exports.handleGetMyTransaction = asyncHandler(async (req, res, next) => {
   const userId = req.user._id;
   const { page = 1, limit = 10, sort, status, startDate, endDate } = req.query;

   if (!ObjectId.isValid(userId)) {
      return res
         .status(400)
         .json(new ApiResponse(400, null, 'Invalid user ID'));
   }
   const result = await getMyTransactionService(
      userId,
      {
         status,
         startDate: startDate ? new Date(startDate) : undefined,
         endDate: endDate ? new Date(endDate) : undefined,
      },
      {
         page: parseInt(page, 10),
         limit: parseInt(limit, 10),
         sort,
      }
   );
   if (!result.success) {
      return res
         .status(result.statusCode)
         .json(new ApiResponse(result.statusCode, null, result.message));
   }
   return res
      .status(200)
      .json(new ApiResponse(result.statusCode, result.data, result.message));
});

exports.handleGetMyUserTransaction = asyncHandler(async (req, res, next) => {
   const agentId = req.agent._id;

   const { page = 1, limit = 10, sort, status, startDate, endDate } = req.query;
   if (!ObjectId.isValid(agentId)) {
      return res
         .status(400)
         .json(new ApiResponse(400, null, 'Invalid agent ID'));
   }

   const result = await getMyUserTransactionService(
      agentId,
      {
         status,
         startDate: startDate ? new Date(startDate) : undefined,
         endDate: endDate ? new Date(endDate) : undefined,
      },
      {
         page: parseInt(page, 10),
         limit: parseInt(limit, 10),
         sort,
      }
   );
   if (!result.success) {
      return res
         .status(result.statusCode)
         .json(new ApiResponse(result.statusCode, null, result.message));
   }
   return res
      .status(200)
      .json(new ApiResponse(result.statusCode, result.data, result.message));
});
