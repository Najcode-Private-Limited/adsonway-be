const WalletTopupRequest = require('../../models/wallet_topup_request');

exports.getAllTopUpRequests = async () => {
   const topUpRequests = await WalletTopupRequest.find()
      .populate('userId', 'full_name email username')
      .populate('walletId', 'amount currency')
      .populate('paymentMethodId', 'name description');
   return topUpRequests;
};

exports.createTopUpRequest = async (payload) => {
   const newTopUpRequest = new WalletTopupRequest(payload);
   return await newTopUpRequest.save();
};

exports.getAllTopUpRequestByUser = async (id) => {
   const topUpRequests = await WalletTopupRequest.find({ userId: id })
      .populate('walletId', 'amount currency')
      .populate('userId', 'full_name email username')
      .populate('paymentMethodId', 'name description');
   return topUpRequests;
};

exports.updateTopUpRequestStatus = async (id, status) => {
   const updatedTopUpRequest = await WalletTopupRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true }
   );
   return updatedTopUpRequest;
};

exports.getTopUpRequestById = async (id) => {
   const topUpRequest = await WalletTopupRequest.findById(id)
      .populate('userId', 'full_name email username')
      .populate('walletId', 'amount currency')
      .populate('paymentMethodId', 'name description');
   return topUpRequest;
};

exports.getTopUpRequestByTransactionId = async (transcationId) => {
   const topUpRequest = await WalletTopupRequest.findOne({ transcationId });
   return topUpRequest;
};
