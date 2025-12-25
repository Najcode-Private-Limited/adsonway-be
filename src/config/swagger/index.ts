import swaggerAutogen from 'swagger-autogen';

const swagger = swaggerAutogen();

const doc = {
   info: {
      title: 'My API',
      description: 'Auto generated Swagger (no manual docs)',
   },
   host: 'localhost:3000',
   schemes: ['http'],
};

const outputFile = './swagger-output.json';

/**
 * IMPORTANT:
 * Point to your REAL entry file
 * swagger-autogen will follow imports automatically
 */
const endpointsFiles = ['./src/index.ts'];

swagger(outputFile, endpointsFiles, doc);
