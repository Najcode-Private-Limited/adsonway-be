const mongoose = require('mongoose');

const refundApplicationSchema = new mongoose.Schema(
   {
      user: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
         required: true,
      },
      platform: {
         type: String,
         enum: ['google', 'facebook'],
         required: true,
      },
      account_name: {
         type: String,
         required: true,
      },
      account_id: {
         type: String,
         required: false,
      },
      requested_amount: {
         type: Number,
         required: true,
      },
      fees_amount: {
         type: Number,
         required: true,
      },
      total_refund_amount: {
         type: Number,
         required: true,
      },
      status: {
         type: String,
         enum: ['pending', 'approved', 'rejected'],
         default: 'pending',
      },
      reason: {
         type: String,
         required: true,
      },
      remarks: {
         type: String,
         default: '',
      },
   },
   { timestamps: true }
);

const RefundApplication = mongoose.model(
   'RefundApplication',
   refundApplicationSchema
);

module.exports = RefundApplication;
