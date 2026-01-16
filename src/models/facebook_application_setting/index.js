const mongoose = require('mongoose');

const facebookApplicationSettingSchema = new mongoose.Schema(
   {
      facebook_profile_link: {
         type: String,
         required: true,
         trim: true,
      },
      bussiness_manager_id: {
         type: String,
         required: true,
         trim: true,
      },
   },
   { timestamps: true }
);

const FacebookApplicationSetting = mongoose.model(
   'FacebookApplicationSetting',
   facebookApplicationSettingSchema
);
module.exports = FacebookApplicationSetting;
