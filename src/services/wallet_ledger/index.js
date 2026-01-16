const { getUsersCreatedByAgent } = require('../../repositories/user');
const {
   getAllWalletLedgers,
   getWalletLedgerByUser,
   getWalletLedgerAssociatedToAgent,
} = require('../../repositories/wallet_ledger');

exports.getAllTransactionService = async (filters, options) => {
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
   const ledgers = await getAllWalletLedgers(query, options);
   if (!ledgers) {
      return {
         statusCode: 500,
         success: false,
         message: 'Failed to retrieve wallet ledgers',
         data: null,
      };
   }
   return {
      statusCode: 200,
      success: true,
      message: 'Wallet ledgers retrieved successfully',
      data: {
         ledgers,
         page: options.page,
         limit: options.limit,
         totalPages: Math.ceil(ledgers.length / options.limit),
      },
   };
};

exports.getMyTransactionService = async (userId, filters, options) => {
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
   const ledgers = await getWalletLedgerByUser(userId, query, options);
   if (!ledgers) {
      return {
         statusCode: 500,
         success: false,
         message: 'Failed to retrieve user wallet ledgers',
         data: null,
      };
   }
   return {
      statusCode: 200,
      success: true,
      message: 'User wallet ledgers retrieved successfully',
      data: {
         ledgers,
         page: options.page,
         limit: options.limit,
         totalPages: Math.ceil(ledgers.length / options.limit),
      },
   };
};

exports.getMyUserTransactionService = async (agentId, filters, options) => {
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
   const getAllAssociateUser = await getUsersCreatedByAgent(agentId);
   if (!getAllAssociateUser) {
      return {
         statusCode: 500,
         success: false,
         message: 'Failed to retrieve associate users',
         data: null,
      };
   }
   const allUser = getAllAssociateUser.map((user) => user._id);
   const ledgersAssociatedToAgent = await getWalletLedgerAssociatedToAgent(
      allUser,
      query,
      options
   );
   if (!ledgersAssociatedToAgent) {
      return {
         statusCode: 500,
         success: false,
         message: 'Failed to retrieve wallet ledgers for associated users',
         data: null,
      };
   }
   return {
      statusCode: 200,
      success: true,
      message: 'Wallet ledgers for associated users retrieved successfully',
      data: {
         ledgers: ledgersAssociatedToAgent,
         page: options.page,
         limit: options.limit,
         totalPages: Math.ceil(ledgersAssociatedToAgent.length / options.limit),
      },
   };
};
