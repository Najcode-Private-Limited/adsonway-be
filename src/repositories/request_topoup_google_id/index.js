const RequestTopupGoogleId = require('../../models/request_topoup_google_id');

exports.createNewRequestTopupGoogleId = async (topupPayload, session) => {
   const response = await RequestTopupGoogleId.create([topupPayload], {
      session,
   });
   return response;
};

exports.getRequestTopupGoogleIdById = async (id) => {
   const response = await RequestTopupGoogleId.findById(id)
      .populate({ path: 'accountId', select: 'account_name' })
      .populate({ path: 'userId', select: 'full_name email username' })
      .populate({ path: 'walletId', select: 'amount' });

   return response;
};

exports.getRequestTopupGoogleIds = async (query = {}, options = {}) => {
   const page = Math.max(Number(options.page) || 1, 1);
   const limit = Math.max(Number(options.limit) || 10, 1);
   const sortOrder = options.sort === 'asc' ? 1 : -1;

   const response = await RequestTopupGoogleId.find(query)
      .sort({ createdAt: sortOrder })
      .limit(limit)
      .skip((page - 1) * limit)
      .populate('accountId', 'account_name')
      .populate('userId', 'full_name email username')
      .populate('walletId', 'amount');

   return response;
};

exports.getRequestTopupGoogleIdsForUser = async (
   userId,
   query = {},
   options = {}
) => {
   const page = Math.max(Number(options.page) || 1, 1);
   const limit = Math.max(Number(options.limit) || 10, 1);
   const sortOrder = options.sort === 'asc' ? 1 : -1;

   const response = await RequestTopupGoogleId.find({
      ...query,
      userId: userId,
   })
      .sort({ createdAt: sortOrder })
      .limit(limit)
      .skip((page - 1) * limit)
      .populate('accountId', 'account_name')
      .populate('userId', 'full_name email username')
      .populate('walletId', 'amount');

   return response;
};

exports.updateRequestTopupGoogleIdById = async (id, payload) => {
   const response = await RequestTopupGoogleId.findByIdAndUpdate(id, payload, {
      new: true,
   });
   return response;
};

exports.deleteRequestTopupGoogleIdById = async (id) => {
   const response = await RequestTopupGoogleId.findByIdAndDelete(id);
   return response;
};
