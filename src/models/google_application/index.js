const mongoose = require('mongoose');

const adAccountSchema = new mongoose.Schema(
   {
      accountName: {
         type: String,
         required: true,
         trim: true,
      },

      timeZone: {
         type: String,
         required: true,
      },

      amount: {
         type: Number,
         required: true,
         min: 100,
      },
   },
   { _id: false }
);

const googleAdApplicationSchema = new mongoose.Schema(
   {
      user: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
         required: true,
         index: true,
      },

      numberOfAccounts: {
         type: Number,
         required: true,
         min: 1,
         max: 5,
      },

      adAccounts: {
         type: [adAccountSchema],
         validate: {
            validator: function (value) {
               return value.length === this.numberOfAccounts;
            },
            message: 'Ad accounts count must match numberOfAccounts',
         },
      },

      promotionalWebsite: {
         type: String,
         required: true,
         trim: true,
      },

      gmailId: {
         type: String,
         required: true,
         lowercase: true,
         trim: true,
      },

      remarks: {
         type: String,
         default: '',
      },

      submissionFee: {
         type: Number,
         default: 20,
      },

      status: {
         type: String,
         enum: ['pending', 'approved', 'rejected'],
         default: 'pending',
      },

      adminNote: {
         type: String,
         default: '',
      },
   },
   { timestamps: true }
);
const GoogleAdApplication = mongoose.model(
   'GoogleAdApplication',
   googleAdApplicationSchema
);
module.exports = GoogleAdApplication;
