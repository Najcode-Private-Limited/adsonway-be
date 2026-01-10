const PaymentMethod = require('../../models/payment_fee_rules/index');

exports.createPaymentFeeRule = async (feeRule) => {
   const newFeeRule = await PaymentMethod.create(feeRule);
   return newFeeRule;
};

exports.getPaymentFeeRuleForUser = async (userId) => {
   const feeRule = await PaymentMethod.findOne({ userId });
   return feeRule;
};

exports.updatePaymentFeeRule = async (userId, feeRule) => {
   const updatedFeeRule = await PaymentMethod.findOneAndUpdate(
      { userId },
      { $set: feeRule },
      { new: true }
   );
   return updatedFeeRule;
};

exports.deletePaymentFeeRule = async (userId) => {
   const deletedFeeRule = await PaymentMethod.findOneAndDelete({ userId });
   return deletedFeeRule;
};
