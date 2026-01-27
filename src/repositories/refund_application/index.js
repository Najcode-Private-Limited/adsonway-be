const RefundApplication = require('../../models/refund_application');

exports.createNewRefundApplication = async (data) => {
   const response = await RefundApplication.create(data);
   return response;
};

exports.getRefundApplicationById = async (id) => {
   const response = await RefundApplication.findById(id).populate({
      path: 'user',
      select: 'username email full_name',
   });
   return response;
};

exports.getRefundApplications = async (query = {}, options = {}) => {
   const page = Math.max(Number(options.page) || 1, 1);
   const limit = Math.max(Number(options.limit) || 10, 1);
   const sortOrder = options.sort === 'asc' ? 1 : -1;
   const response = await RefundApplication.find(query)
      .populate({
         path: 'user',
         select: 'username email full_name',
      })
      .sort({ createdAt: sortOrder })
      .limit(limit)
      .skip((page - 1) * limit);
   return response;
};

exports.getRefundApplicationForUser = async (
   userId,
   query = {},
   options = {}
) => {
   const page = Math.max(Number(options.page) || 1, 1);
   const limit = Math.max(Number(options.limit) || 10, 1);
   const sortOrder = options.sort === 'asc' ? 1 : -1;
   const response = await RefundApplication.find({
      ...query,
      user: userId,
   })
      .populate({
         path: 'user',
         select: 'username email full_name',
      })
      .sort({ createdAt: sortOrder })
      .limit(limit)
      .skip((page - 1) * limit);
   return response;
};

exports.updateRefundApplicationById = async (id, payload) => {
   const response = await RefundApplication.findByIdAndUpdate(id, payload, {
      new: true,
   });
   return response;
};

exports.deleteRefundApplicationById = async (id) => {
   const response = await RefundApplication.findByIdAndDelete(id);
   return response;
};
