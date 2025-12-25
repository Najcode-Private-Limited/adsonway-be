class ApiError extends Error {
   statusCode;
   data;
   message = 'Something went wrong';
   success;
   errors;
   stack;

   constructor(
      statusCode,
      message = 'Something went wrong',
      errors = [],
      stack = ''
   ) {
      super(message);
      this.statusCode = statusCode;
      this.data = null;
      this.success = false;
      this.errors = errors;

      if (stack) {
         this.stack = stack;
      } else {
         Error.captureStackTrace(this, this.constructor);
      }
   }
}

module.exports = ApiError;
