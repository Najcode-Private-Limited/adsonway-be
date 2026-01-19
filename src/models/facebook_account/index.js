const mongoose = require('mongoose');

const facebookAccountSchema = new mongoose.Schema({
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
   },
   license_number: {
      type: String,
      required: true,
   },
   account_name: {
      type: String,
      required: true,
   },
   account_id: {
      type: String,
      required: true,
   },
   timezone: {
      type: String,
      required: true,
   },
   deposit_amount: {
      type: Number,
      required: true,
   },
   application_fee: {
      type: Number,
      required: true,
   },
   deposit_fee: {
      type: Number,
      required: true,
   },
   status: {
      type: String,
      enum: ['active', 'disabled', 'deactivated'],
      default: 'active',
   },
});

const FacebookAccount = mongoose.model(
   'FacebookAccount',
   facebookAccountSchema
);

module.exports = FacebookAccount;
