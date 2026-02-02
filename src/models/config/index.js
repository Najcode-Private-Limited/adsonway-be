const mongoose = require('mongoose');

const config = new mongoose.Schema(
   {
      platform_fee: {
         type: Number,
         required: true,
      },
   },
   { timestamps: true }
);

const Config = mongoose.model('Config', config);
module.exports = Config;
