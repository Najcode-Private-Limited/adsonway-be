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
      facebook_credit_commission: {
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
      facebook_credit_application_fee: {
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
