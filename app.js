const express=require("express");
const cors=require("cors");
const teacherRoute=require("./Routes/teacherRoute");
const childRoute=require("./Routes/childRoute");
const classRoute=require("./Routes/classRoute");
const loginRoute=require("./Routes/loginRoute");
const changePassRoute=require("./Routes/changePass");
const auth = require("./Middleware/auth"); 
const mongoose = require("mongoose");
require('dotenv').config();
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
/************** server */
const server=express();   //http.createServer()
let port=process.env.PORT||8080; //swagger

mongoose.set('strictQuery', true);
mongoose.connect(process.env.DB_URL || "mongodb://127.0.0.1:27017/nodeJs")
        .then(()=>{
            console.log("DB Connected");
            server.listen(port,()=>{
            console.log("server is listenng.....",port);
});
        })
        .catch((error)=>{
            console.log("DB Problem: "+error);
        })
/******************* */

server.use(cors());  
server.use((request,response,next)=>{
    console.log(request.url,request.method);
    next();
});

server.use(express.json());
server.use(express.urlencoded({extended:true}));

// Swagger options
const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Nursery API',
        description: 'API for managing nursery data',
        version: '1.0.0',
      },
      servers: [
        {
          url: 'http://localhost:3000/',
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
      security: [{
        bearerAuth: [],
      }],
    },
    
    apis: ['./Routes/*.js'],
  };
  
  const specs = swaggerJsdoc(options);
  
  // Set up Swagger UI
  server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

 

//Routes  
server.use(loginRoute);
server.use(auth);
server.use(teacherRoute);
server.use(childRoute);
server.use(classRoute);
server.use(changePassRoute);


//-------Not found MW
server.use((request,response)=>{

    response.status(404).json({message:"Not Found"});

});
//-------Error MW
server.use((error,request,response,next)=>{
    let status=error.status||500;
    response.status(status).json({message:error+""});
})






