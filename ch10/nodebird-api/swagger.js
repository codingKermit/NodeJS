const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Description'
  },
  host: 'localhost:8002/v2',
  origin: 'http://localhost:8002',
  securityDefinitions:{
    jwt:{
      type:'apiKey',
      in:'header',
      name:'Authorization'
    }
  },
};

const outputFile = './swagger-output.json';
const routes = ['./routes/v2.js'];

swaggerAutogen(outputFile, routes, doc);