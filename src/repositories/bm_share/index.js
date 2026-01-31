const BMShare = require('../../models/bm_share');

exports.createNewBMShare = async (payload) => {
   const response = await BMShare.create(payload);
   return response;
};

exports.getBMShareById = async (id) => {
   const response = await BMShare.findById(id)
      .populate({
         path: 'user',
         select: 'full_name email username',
      })
      .populate({
         path: 'account',
         select: 'account_name account_id',
      });
   return response;
};

exports.getAllBMShareForUser = async (userId, query, options) => {
   const response = await BMShare.find({ user: userId, ...query })
      .sort({ createdAt: Number(options.sort) || -1 })
      .limit(options.limit)
      .skip((options.page - 1) * options.limit)
      .populate({
         path: 'user',
         select: 'full_name email username',
      })
      .populate({
         path: 'account',
         select: 'account_name account_id',
      });
   return response;
};

exports.getAllBMShares = async (query, options) => {
   const response = await BMShare.find(query)
      .sort({ createdAt: Number(options.sort) || -1 })
      .limit(options.limit)
      .skip((options.page - 1) * options.limit)
      .populate({
         path: 'user',
         select: 'full_name email username',
      })
      .populate({
         path: 'account',
         select: 'account_name account_id',
      });
   return response;
};
exports.updateBMShareById = async (id, payload) => {
   const response = await BMShare.findByIdAndUpdate(id, payload, {
      new: true,
   });
   return response;
};

exports.deleteBMShareById = async (id) => {
   const response = await BMShare.findByIdAndDelete(id);
   return response;
};
