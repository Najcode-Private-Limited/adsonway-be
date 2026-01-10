const { mongoose } = require('mongoose');

const walletLedgerSchema = new mongoose.Schema(
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
      type: {
         type: String,
         enum: ['credit', 'debit', 'refund'],
         required: true,
      },
      amount: {
         type: Number,
         required: true,
      },
      status: {
         type: String,
         enum: ['pending', 'completed', 'failed'],
         default: 'pending',
      },
      source: {
         type: String,
         enum: ['user', 'admin', 'system'],
         required: true,
      },
      description: {
         type: String,
         default: '',
      },
      balanceBefore: {
         type: Number,
         required: true,
      },
      balanceAfter: {
         type: Number,
         required: true,
      },
      approvedAt: {
         type: Date,
         default: null,
      },
      meta: {
         screenshotUrl: { type: String, default: null },
         adminId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Admin',
            default: null,
         },
         reason: { type: String, default: '' },
      },
   },
   { timestamps: true }
);

walletLedgerSchema.index({ userId: 1, createdAt: -1 });
module.exports = mongoose.model('WalletLedger', walletLedgerSchema);
