const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');

const options = {
   definition: {
      openapi: '3.0.0',
      info: {
         title: 'Adsonway API Documentation',
         version: '1.0.0',
         description: 'API documentation for Adsonway application',
      },
      servers: [
         {
            url: process.env.API_URL,
         },
      ],
      components: {
         securitySchemes: {
            bearerAuth: {
               type: 'http',
               scheme: 'bearer',
               bearerFormat: 'JWT',
            },
         },
      },
   },
   apis: [path.resolve(__dirname, '../../docs/**/*.js')],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
