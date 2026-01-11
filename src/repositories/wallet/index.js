const wallet = require('../../models/wallet');

exports.getWalletById = async (id) => {
   const wallet = await wallet.findById(id);
   return wallet;
};

exports.createWallet = async (data) => {
   const newWallet = await wallet.create(data);
   return newWallet;
};

exports.updateWalletBalance = async (id, amount) => {
   const updatedWallet = await wallet.findByIdAndUpdate(
      id,
      { $inc: { balance: amount } },
      { new: true }
   );
   return updatedWallet;
};

exports.getWalletByUserId = async (userId) => {
   const userWallet = await wallet.findOne({ userId });
   return userWallet;
};

exports.deleteWallet = async (id) => {
   const deletedWallet = await wallet.findByIdAndDelete(id);
   return deletedWallet;
};
