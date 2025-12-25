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
      disabled: {
         type: Boolean,
         default: false,
      },
      isVerified: {
         type: Boolean,
         default: false,
      },
      role: {
         type: String,
         enum: ['admin', 'agent', 'super_admin', 'user'],
         default: 'admin',
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

const User = mongoose.model('User', userSchema);
module.exports = User;
