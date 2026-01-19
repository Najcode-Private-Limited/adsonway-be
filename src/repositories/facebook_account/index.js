const FacebookAccount = require('../../models/facebook_account');

exports.createNewFacebookAccount = async (payload) => {
   const response = await FacebookAccount.create(payload);
   return response;
};

exports.getFacebookAccountById = async (id) => {
   const response = await FacebookAccount.findById(id).populate({
      path: 'user',
      select: 'full_name email username',
   });
   return response;
};

exports.getAllFacebookAccountForUser = async (userId, query, options) => {
   const response = await FacebookAccount.find({ user: userId, ...query })
      .sort({ createdAt: Number(options.sort) || -1 })
      .limit(options.limit)
      .skip((options.page - 1) * options.limit)
      .populate({
         path: 'user',
         select: 'full_name email username',
      });
   return response;
};

exports.getAllFacebookAccounts = async (query, options) => {
   const response = await FacebookAccount.find(query)
      .sort({ createdAt: Number(options.sort) || -1 })
      .limit(options.limit)
      .skip((options.page - 1) * options.limit)
      .populate({
         path: 'user',
         select: 'full_name email username',
      });
   return response;
};

exports.updateFacebookAccountById = async (id, status) => {
   const response = await FacebookAccount.findByIdAndUpdate(
      id,
      { status },
      {
         new: true,
      }
   );
   return response;
};

exports.deleteFacebookAccountById = async (id) => {
   const response = await FacebookAccount.findByIdAndDelete(id);
   return response;
};
