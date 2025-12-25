interface ApiErrorInterface {
   statusCode: number;
   data: any;
   message: string;
   success: boolean;
   errors: any[];
   stack?: string;
}
class ApiError extends Error implements ApiErrorInterface {
   statusCode: number;
   data: any;
   message: string = 'Something went wrong';
   success: boolean;
   errors: any[];
   stack?: string;
   constructor(
      statusCode: number,
      message: string = 'Something went wrong',
      errors: any[] = [],
      stack: string = ''
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
