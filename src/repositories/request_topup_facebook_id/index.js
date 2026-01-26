const RequestTopupFacebookId = require('../../models/request_topup_facebook_id');
const user = require('../../models/user');

exports.createNewRequestTopupFacebookId = async (
   topupPayload,
   userId,
   session
) => {
   const payloadWithUser = {
      ...topupPayload,
      user: userId,
   };
   const response = await RequestTopupFacebookId.create([payloadWithUser], {
      session,
   });
   return response;
};

exports.getRequestTopupFacebookIdById = async (id) => {
   const response = await RequestTopupFacebookId.findById(id)
      .populate({ path: 'accountId', select: 'account_name' })
      .populate({ path: 'userId', select: 'full_name email username' })
      .populate({ path: 'walletId', select: 'amount' });

   return response;
};

exports.getRequestTopupFacebookIds = async (query = {}, options = {}) => {
   const page = Math.max(Number(options.page) || 1, 1);
   const limit = Math.max(Number(options.limit) || 10, 1);
   const sortOrder = options.sort === 'asc' ? 1 : -1;

   const response = await RequestTopupFacebookId.find(query)
      .sort({ createdAt: sortOrder })
      .limit(limit)
      .skip((page - 1) * limit)
      .populate('accountId', 'account_name')
      .populate('userId', 'full_name email username')
      .populate('walletId', 'amount');

   return response;
};

exports.getRequestTopupFacebookIdsForUser = async (
   userId,
   query = {},
   options = {}
) => {
   const page = Math.max(Number(options.page) || 1, 1);
   const limit = Math.max(Number(options.limit) || 10, 1);
   const sortOrder = options.sort === 'asc' ? 1 : -1;

   const response = await RequestTopupFacebookId.find({
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

exports.updateRequestTopupFacebookIdById = async (id, payload) => {
   const response = await RequestTopupFacebookId.findByIdAndUpdate(
      id,
      payload,
      {
         new: true,
      }
   );
   return response;
};

exports.deleteRequestTopupFacebookIdById = async (id) => {
   const response = await RequestTopupFacebookId.findByIdAndDelete(id);
   return response;
};
