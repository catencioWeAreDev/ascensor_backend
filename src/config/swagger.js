const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const constants = require('./constants');

const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Ascensor Premium Edition',
        version: '1.0.0',
        description: 'Api de Ascensor',
        contact: {
          name: 'AscensorGolden',
        },
        servers: [`http://localhost:${constants.PORT}`],
      },
    },
    apis: ['./src/routes/*.js'],
};
  
const swaggerDocs = swaggerJsDoc(swaggerOptions);
const setupSwagger = (app) => {
    app.use(
        '/api-docs', 
        swaggerUI.serve, 
        swaggerUI.setup(swaggerDocs)
    );
};

module.exports = setupSwagger;