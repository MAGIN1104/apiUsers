require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./database/config");

// swagger
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const options = {
  explorer: true,
  definition: {
    openapi: '3.0.3',
    info: {
      title: "API CRUD USERS",
      version: "1.0.0",
    },
    servers: [
      {
        url: "https://api-practice-node.herokuapp.com",
      },
    ],
  },
  apis: ["./documentation/*.yaml"],
};

const specs = swaggerJsDoc(options);
// Crear el servidor express
const app = express();

// Configurar CORS
app.use(cors());

// Lectura y paseo del Body
app.use(express.json());

//Base de dato
dbConnection();

//Middleware
app.use(express.json());

// Rutas
app.use("/", swaggerUI.serve);
app.get("/",  swaggerUI.setup(specs));
app.use("/api/users", require("./routes/usuarios"));

app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo en el puero: " + process.env.PORT);
});
