const mongoose = require('mongoose');

const paymentMethodSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
         unique: true,
      },
      description: {
         type: String,
         default: '',
      },
      qr_image: {
         type: String,
         default: '',
      },
      is_active: {
         type: Boolean,
         default: true,
      },
   },
   { timestamps: true }
);

module.exports = mongoose.model('PaymentMethod', paymentMethodSchema);
