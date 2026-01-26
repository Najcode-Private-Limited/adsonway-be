const { mongoose } = require('mongoose');

const requestTopupGoogleIdSchema = new mongoose.Schema(
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
         ref: 'GoogleAccount',
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
      remarks: {
         type: String,
         default: '',
      },
      rejectReason: {
         type: String,
         default: null,
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

const RequestTopupGoogleId = mongoose.model(
   'RequestTopupGoogleId',
   requestTopupGoogleIdSchema
);

module.exports = RequestTopupGoogleId;
