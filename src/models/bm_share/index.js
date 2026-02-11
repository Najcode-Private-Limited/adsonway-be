const mongoose = require('mongoose');

const bmShareSchema = new mongoose.Schema({
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
   },
   type: {
      type: String,
      default: 'bm_share',
   },
   shared_id: {
      type: String,
      required: true,
   },
   account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FacebookAccount',
      required: true,
   },
   notes: {
      type: String,
      default: '',
   },
   isCard: {
      type: Boolean,
      default: false,
      required: true
   },
   status: {
      type: String,
      enum: ['approved', 'rejected', 'pending'],
      default: 'pending',
   },
});

const BMShare = mongoose.model('BMShare', bmShareSchema);

module.exports = BMShare;
