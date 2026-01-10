const { mongoose } = require('mongoose');

const walletSchema = new mongoose.Schema(
   {
      userId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
         required: true,
      },
      amount: {
         type: Number,
         required: true,
         default: 0,
      },
      status: {
         type: String,
         enum: ['active', 'inactive', 'suspended'],
         default: 'active',
      },
      currency: {
         type: String,
         required: true,
         default: 'INR',
      },
   },
   { timestamps: true }
);

module.exports = mongoose.model('Wallet', walletSchema);
