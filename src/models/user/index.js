const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
   {
      full_name: {
         type: String,
         required: true,
      },
      email: {
         type: String,
         required: true,
         unique: true,
      },
      username: {
         type: String,
         required: true,
         unique: true,
      },
      password: {
         type: String,
         required: true,
      },
      role: {
         type: String,
         enum: ['admin', 'agent', 'user'],
         default: 'user',
      },
      createdBy: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
         default: null,
      },
      disabled: {
         type: Boolean,
         default: false,
      },
      isVerified: {
         type: Boolean,
         default: false,
      },

      display_picture: {
         type: String,
         default: null,
      },
      phone_number: {
         type: String,
         default: null,
      },
      organization: {
         type: String,
         default: '',
      },
   },
   { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
