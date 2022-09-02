require("dotenv").config();
const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN);
    console.log("DB Connected...");
  } catch (error) {
    console.log(error);
    throw new Error("Error a la hora de conectar la BD");
  }
};

module.exports = {
  dbConnection,
};
