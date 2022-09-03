const { response } = require("express");
const { validationResult } = require("express-validator");
const Petition = require("../models/petitions.model");

//Get all Petitions
const getPetition = async (req = response, res = response) => {
  const { state } = req.query;
  const petitions = await Petition.find(
    { state: { $eq: state } },
    "name phone petition state"
  );
  res.json(petitions);
};

//Create new Petition
const postPetition = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({
      statusCode: 400,
      errors: errores.mapped(),
    });
  }
  try {
    const petition = new Petition(req.body);
    petition.state = true;
    await petition.save();
    res.json({
      statusCode: 200,
      petition,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      statusCode: 500,
      message: "Error inesperado",
    });
  }
};

//Delete petition
const deletePetition = async (req, res = response) => {
  const id = req.params.id;
  try {
    const petitionDB = await Petition.findById(id);
    if (!petitionDB) {
      return res.status(400).json({
        statusCode: 400,
        message: "No se encontraron resultados",
      });
    }
    petitionDB.state = false;
    await Petition.findByIdAndUpdate(id, petitionDB);
    res.json({
      statusCode: 200,
      message: "Peticion eliminada",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error Inesperado",
    });
  }
};

module.exports = {
  getPetition,
  postPetition,
  deletePetition,
};
