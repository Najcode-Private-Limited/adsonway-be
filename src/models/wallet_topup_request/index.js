const { mongoose } = require('mongoose');

const walletTopupRequestSchema = new mongoose.Schema(
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
      paymentMedthodId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'PaymentMethod',
         required: true,
      },
   },
   { timestamps: true }
);

walletTopupRequestSchema.index({ transcationId: 1 }, { unique: true });

module.exports = mongoose.model('WalletTopupRequest', walletTopupRequestSchema);
