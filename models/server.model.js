const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");
// const swaggerUI = require("swagger-ui-express");
// const swaggerJsDoc = require("swagger-jsdoc");
const fileUpload = require("express-fileupload")

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      user: "/api/users",
      petitions: "/api/petitions",
      groups: "/api/groups",
      news: "/api/news",
    };
    this.conectionDB();
    this.middlewares();
    this.routes();
  }

  async conectionDB() {
    await dbConnection();
  }

  middlewares() {
    // Configurar CORS
    this.app.use(cors());
    // Lectura y paseo del Body
    this.app.use(express.json());
    // Fileupload
    this.app.use(fileUpload({
        useTempFiles : true,
        tempFileDir : '/tmp/'
    }));
  }

//   swaggerConfig() {
//     const options = {
//       explorer: true,
//       definition: {
//         openapi: "3.0.3",
//         info: {
//           title: "API CRUD USERS",
//           version: "1.0.0",
//         },
//         servers: [
//           {
//             url: "https://api-practice-node.herokuapp.com",
//           },
//         ],
//       },
//       apis: ["./documentation/*.yaml"],
//     };
//     return swaggerJsDoc(options);
//   }

  routes() {
    // this.app.use(this.paths.swagger, swaggerUI.serve, swaggerUI.setup(this.swaggerConfig()));
    this.app.use(this.paths.user, require("../routes/usuarios.route"));
    this.app.use(this.paths.petitions, require("../routes/petition.route"));
    this.app.use(this.paths.groups, require("../routes/groups.route"));
    this.app.use(this.paths.news, require("../routes/news.route"));
  }

  listen() {
    this.app.listen(process.env.PORT, () => {
      console.log("Servidor corriendo en el puero: " + process.env.PORT);
    });
  }
}

module.exports = Server;
