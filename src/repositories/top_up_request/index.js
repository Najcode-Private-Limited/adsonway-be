const WalletTopupRequest = require('../../models/wallet_topup_request');

exports.getAllTopUpRequests = async () => {
   const topUpRequests = await WalletTopupRequest.find();
   return topUpRequests;
};

exports.createTopUpRequest = async (payload) => {
   const newTopUpRequest = new WalletTopupRequest(payload);
   return await newTopUpRequest.save();
};

exports.getAllTopUpRequestByUser = async (id) => {
   const topUpRequests = await WalletTopupRequest.find({ userId: id });
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
