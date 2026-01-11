const WalletLedger = require('../../models/wallet_ledger');

exports.createNewWalletLedger = async (ledgerData, session) => {
   const newLedger = await WalletLedger.create([ledgerData], { session });
   return newLedger;
};

exports.getWalletLedgersByWalletId = async (walletId) => {
   const ledgers = await WalletLedger.find({ walletId });
   return ledgers;
};

exports.getAllWalletLedgers = async () => {
   const ledgers = await WalletLedger.find();
   return ledgers;
};

exports.deleteWalletLedger = async (id) => {
   const deletedLedger = await WalletLedger.findByIdAndDelete(id);
   return deletedLedger;
};

exports.getWalletLedgerByUser = async (userId) => {
   const ledgers = await WalletLedger.find({ userId });
   return ledgers;
};
