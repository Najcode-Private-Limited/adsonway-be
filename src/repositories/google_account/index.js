const GoogleAccount = require('../../models/google_account');

exports.createNewGoogleAccount = async (payload) => {
   const response = await GoogleAccount.create(payload);
   return response;
};

exports.getGoogleAccountById = async (id) => {
   const response = await GoogleAccount.findById(id).populate({
      path: 'user',
      select: 'name email',
   });
   return response;
};

exports.getAllGoogleAccountForUser = async (userId, query, options) => {
   const response = await GoogleAccount.find({ userId, ...query })
      .sort({ createdAt: Number(options.sort) || -1 })
      .limit(options.limit)
      .skip((options.page - 1) * options.limit)
      .populate({
         path: 'user',
         select: 'name email',
      });
   return response;
};

exports.getAllGoogleAccounts = async (query, options) => {
   const response = await GoogleAccount.find(query)
      .sort({ createdAt: Number(options.sort) || -1 })
      .limit(options.limit)
      .skip((options.page - 1) * options.limit);
   return response;
};

exports.updateGoogleAccountById = async (id, status) => {
   const response = await GoogleAccount.findByIdAndUpdate(
      id,
      { status },
      {
         new: true,
      }
   );
   return response;
};

exports.deleteGoogleAccountById = async (id) => {
   const response = await GoogleAccount.findByIdAndDelete(id);
   return response;
};
