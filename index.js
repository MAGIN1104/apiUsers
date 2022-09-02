require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./database/config");

// Crear el servidor express
const app = express();

// Configurar CORS
app.use(cors());

// Lectura y paseo del Body
app.use(express.json());

//Base de dato
dbConnection();

// Rutas
app.use("/api/users", require("./routes/usuarios"));

app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo en el puero: " + process.env.PORT);
});
