const paymentMethod = require('../../models/payment_method');

exports.getAllPaymentMethods = async () => {
   const response = await paymentMethod.find();
   return response;
};

exports.getPaymentMethodById = async (id) => {
   const response = await paymentMethod.findById(id);
   return response;
};

exports.createPaymentMethod = async (data) => {
   const response = await paymentMethod.create(data);
   return response;
};

exports.updatePaymentMethod = async (id, data) => {
   const response = await paymentMethod.findByIdAndUpdate(id, data, {
      new: true,
   });
   return response;
};

exports.deletePaymentMethod = async (id) => {
   const response = await paymentMethod.findByIdAndDelete(id);
   return response;
};

exports.getActivePaymentMethods = async () => {
   const response = await paymentMethod.find({ is_active: true });
   return response;
};
