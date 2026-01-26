const { mongoose } = require('mongoose');

const requestTopupFacebokIdSchema = new mongoose.Schema(
   {
      userId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
         required: true,
      },
      walletId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Wallet',
         required: true,
      },
      accountId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'FacebookAccount',
         required: true,
      },
      amount: {
         type: Number,
         required: true,
      },
      status: {
         type: String,
         enum: ['pending', 'approved', 'rejected'],
         default: 'pending',
      },
      transcationId: {
         type: String,
         required: true,
      },
      screenshotUrl: {
         type: String,
         default: null,
      },
      remarks: {
         type: String,
         default: '',
      },
      rejectReason: {
         type: String,
         default: null,
      },
      paymentMethodId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'PaymentMethod',
         required: true,
      },
      approvedAt: {
         type: Date,
         default: null,
      },
      rejectedAt: {
         type: Date,
         default: null,
      },
   },
   { timestamps: true }
);

requestTopupFacebokIdSchema.index({ transcationId: 1 }, { unique: true });

const RequestTopupFacebookId = mongoose.model(
   'RequestTopupFacebookId',
   requestTopupFacebokIdSchema
);

module.exports = RequestTopupFacebookId;
