const ApiResponse = require('../api_response');

const validateRequiredFields = (body, requiredFields) => {
   const missingFields = [];

   requiredFields.forEach((field) => {
      const value = body[field];

      if (
         value === undefined ||
         value === null ||
         (typeof value === 'string' && value.trim() === '') ||
         (Array.isArray(value) && value.length === 0)
      ) {
         missingFields.push(field);
      }
   });

   if (missingFields.length > 0) {
      return {
         isValid: false,
         response: new ApiResponse(
            400,
            null,
            `Missing required fields: ${missingFields.join(', ')}`,
            false
         ),
      };
   }

   return { isValid: true };
};

module.exports = validateRequiredFields;
