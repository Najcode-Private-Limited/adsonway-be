const {
   getAllPaymentMethods,
   getPaymentMethodById,
   createPaymentMethod,
   updatePaymentMethod,
   deletePaymentMethod,
} = require('../../repositories/payment_method');

exports.getAllPaymentMethodService = async (isUser) => {
   const response = await getAllPaymentMethods(isUser);
   if (!response) {
      return {
         status: false,
         statusCode: 400,
         message: 'No payment methods found',
      };
   }
   return {
      status: true,
      statusCode: 200,
      data: response,
      message: 'Payment methods retrieved successfully',
   };
};

exports.getSinglePaymentMethodService = async (id) => {
   const response = await getPaymentMethodById(id);
   if (!response) {
      return {
         status: false,
         statusCode: 400,
         message: 'Payment method not found',
      };
   }
   return {
      status: true,
      statusCode: 200,
      data: response,
      message: 'Payment method retrieved successfully',
   };
};

exports.createPaymentMethodService = async (data) => {
   const response = await createPaymentMethod(data);
   if (!response) {
      return {
         status: false,
         statusCode: 400,
         message: 'Failed to create payment method',
      };
   }
   return {
      status: true,
      statusCode: 201,
      data: response,
      message: 'Payment method created successfully',
   };
};

exports.updatePaymentMethodService = async (id, data) => {
   const response = await updatePaymentMethod(id, data);
   if (!response) {
      return {
         status: false,
         statusCode: 400,
         message: 'Failed to update payment method',
      };
   }
   return {
      status: true,
      statusCode: 200,
      data: response,
      message: 'Payment method updated successfully',
   };
};

exports.deletePaymentMethodService = async (id) => {
   const response = await deletePaymentMethod(id);
   if (!response) {
      return {
         status: false,
         statusCode: 400,
         message: 'Failed to delete payment method',
      };
   }
   return {
      status: true,
      statusCode: 200,
      data: response,
      message: 'Payment method deleted successfully',
   };
};
