const GoogleAdApplication = require('../../models/google_application');

exports.createNewGoogleAdApplication = async (userId, applicationData) => {
   const result = await GoogleAdApplication.create({
      user: userId,
      ...applicationData,
   });
   return result;
};

exports.getGoogleAdApplicationByUser = async (userId, query, options) => {
   const application = await GoogleAdApplication.find({
      user: userId,
      ...query,
   })
      .sort({ createdAt: Number(options.sort) || -1 })
      .limit(options.limit)
      .skip((options.page - 1) * options.limit)
      .populate({ path: 'user', select: 'username email full_name' });
   return application;
};

exports.updateGoogleAdApplication = async (userId, updateData) => {
   const updatedApplication = await GoogleAdApplication.findOneAndUpdate(
      { user: userId },
      updateData,
      { new: true }
   );
   return updatedApplication;
};

exports.deleteGoogleAdApplication = async (userId) => {
   const deletedApplication = await GoogleAdApplication.findOneAndDelete({
      user: userId,
   });
   return deletedApplication;
};

exports.getAllGoogleAdApplications = async (query, options) => {
   const applications = await GoogleAdApplication.find(query)
      .sort({ createdAt: Number(options.sort) || -1 })
      .limit(options.limit)
      .skip((options.page - 1) * options.limit)
      .populate({ path: 'user', select: 'username email full_name' });
   return applications;
};
