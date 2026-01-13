const { path } = require('../../app');
const WalletLedger = require('../../models/wallet_ledger');

exports.createNewWalletLedger = async (ledgerData, session) => {
   const newLedger = await WalletLedger.create([ledgerData], { session });
   return newLedger;
};

exports.getWalletLedgersByWalletId = async (walletId) => {
   const ledgers = await WalletLedger.find({ walletId });
   return ledgers;
};

exports.getAllWalletLedgers = async (query, options) => {
   const ledgers = await WalletLedger.find(query)
      .sort({ createdAt: Number(options.sort) || -1 })
      .limit(options.limit)
      .skip((options.page - 1) * options.limit)
      .populate({
         path: 'userId',
         select: 'username email full_name',
      });
   return ledgers;
};

exports.deleteWalletLedger = async (id) => {
   const deletedLedger = await WalletLedger.findByIdAndDelete(id);
   return deletedLedger;
};

exports.getWalletLedgerByUser = async (userId, query, options) => {
   const ledgers = await WalletLedger.find({ userId, ...query })
      .sort({ createdAt: Number(options.sort) || -1 })
      .limit(options.limit)
      .skip((options.page - 1) * options.limit)
      .populate({
         path: 'userId',
         select: 'username email full_name',
      });
   return ledgers;
};

exports.getWalletLedgerAssociatedToAgent = async (userIds, query, options) => {
   console.log('User IDs in getWalletLedgerAssociatedToAgent:', userIds);
   console.log('Query in getWalletLedgerAssociatedToAgent:', query);
   const ledgers = await WalletLedger.find({
      userId: { $in: userIds },
      ...query,
   })
      .sort({ createdAt: Number(options.sort) || -1 })
      .limit(options.limit)
      .skip((options.page - 1) * options.limit)
      .populate({
         path: 'userId',
         select: 'username email full_name',
      });
   return ledgers;
};
