const FacebookApplication = require('../../models/facebook_application');

exports.createNewFacebookAdApplication = async (userId, applicationData) => {
   const result = await FacebookApplication.create({
      user: userId,
      ...applicationData,
   });
   return result;
};

exports.getFacebookAdApplicationByUser = async (userId, query, options) => {
   const application = await FacebookApplication.find({
      user: userId,
      ...query,
   })
      .sort({ createdAt: Number(options.sort) || -1 })
      .limit(options.limit)
      .skip((options.page - 1) * options.limit)
      .populate({ path: 'user', select: 'username email full_name' });
   return application;
};

exports.updateFacebookAdApplication = async (applicationId, payload) => {
   const updatedApplication = await FacebookApplication.findOneAndUpdate(
      { _id: applicationId },
      { status: payload.status, adminNote: payload.adminNote || '' },
      { new: true }
   );
   return updatedApplication;
};

exports.deleteFacebookAdApplication = async (applicationId) => {
   const deletedApplication = await FacebookApplication.findOneAndDelete({
      _id: applicationId,
   });
   return deletedApplication;
};

exports.getAllFacebookAdApplications = async (query, options) => {
   const applications = await FacebookApplication.find(query)
      .sort({ createdAt: Number(options.sort) || -1 })
      .limit(options.limit)
      .skip((options.page - 1) * options.limit)
      .populate({ path: 'user', select: 'username email full_name' });
   return applications;
};
