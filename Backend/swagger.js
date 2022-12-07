const swaggerAutogen = require('swagger-autogen')();
const outputFile = './swagger/swagger.json';
const arrEndPoints = ['./index.js'];

const docs = {
    info: {
        version: "1.0.0",
        title: "API MPS - Management Patrimony System",
        description: "Documentation automatically generated by the <b>swagger-autogen</b> module."
    },
    host: "localhost:3000",
    basePath: "/",
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        { name: "Users controll", description: "Endpoints" },
        { name: "Patrimony controll", description: "Endpoints" },
        { name: "Rooms n departments controll", description: "Endpoints" }, 
    ],
}

swaggerAutogen(outputFile, arrEndPoints, docs);