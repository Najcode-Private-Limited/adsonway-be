const { mongoose } = require('mongoose');

const platformFeeSchema = new mongoose.Schema(
   {
      facebook_commission: {
         type: Number,
         required: true,
      },
      google_commission: {
         type: Number,
         required: true,
      },
      snapchat_commission: {
         type: Number,
         required: true,
      },
      tiktok_commission: {
         type: Number,
         required: true,
      },
      facebook_application_fee: {
         type: Number,
         required: true,
      },
      google_application_fee: {
         type: Number,
         required: true,
      },
      snapchat_application_fee: {
         type: Number,
         required: true,
      },
      tiktok_application_fee: {
         type: Number,
         required: true,
      },
      userId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
         required: true,
      },
      is_active: {
         type: Boolean,
         default: true,
      },
   },
   { timestamps: true }
);

const PlatformFee = mongoose.model('PlatformFee', platformFeeSchema);
module.exports = PlatformFee;
