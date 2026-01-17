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

const facebookApplicationSchema = new mongoose.Schema(
   {
      user: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
         required: true,
         index: true,
      },

      licenseType: {
         type: String,
         enum: ['new', 'existing'],
         required: true,
         default: 'new',
      },

      licenseNumber: {
         type: String,
         trim: true,
         default: '',
      },

      numberOfPages: {
         type: Number,
         required: true,
         min: 1,
         max: 5,
      },

      pageUrls: {
         type: [String],
         validate: {
            validator(value) {
               return value.length === this.numberOfPages;
            },
            message: 'Page URLs count must match numberOfPages',
         },
      },

      hasFullAdminAccess: {
         type: Boolean,
         required: true,
         default: false,
      },

      numberOfDomains: {
         type: Number,
         required: true,
         min: 1,
      },

      domainUrls: {
         type: [String],
         validate: {
            validator(value) {
               return value.length === this.numberOfDomains;
            },
            message: 'Domain URLs count must match numberOfDomains',
         },
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
            validator(value) {
               return value.length === this.numberOfAccounts;
            },
            message: 'Ad accounts count must match numberOfAccounts',
         },
      },
      remarks: {
         type: String,
         default: '',
         trim: true,
      },

      submissionFee: {
         type: Number,
         default: 20,
      },

      status: {
         type: String,
         enum: ['pending', 'approved', 'rejected'],
         default: 'pending',
         index: true,
      },

      adminNote: {
         type: String,
         default: '',
      },
   },
   {
      timestamps: true,
   }
);

module.exports = mongoose.model(
   'FacebookApplication',
   facebookApplicationSchema
);
