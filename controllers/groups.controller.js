const { response } = require("express");
const { validationResult } = require("express-validator");
const Group = require("../models/groups.model");

// GET ALL GROUPS
const getGroups = async (req = response, res = response) => {
  const groups = await Group.find(
    {},
    "groupName sentence bibleQuote meetings link phone image"
  );
  res.json(groups);
};

// Create new Group
const postGroup = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({
      statusCode: 400,
      errors: errores.mapped(),
    });
  }
  try {
    const newGroup = new Petition(req.body);
    await newGroup.save();
    res.json({
      statusCode: 200,
      message: "Registro Exitoso",
      newGroup,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      statusCode: 500,
      message: "Error inesperado",
    });
  }
};

//Delete Group
const deleteGroup = async (req, res = response) => {
  const id = req.params.id;
  try {
    const groupDB = await Group.findById(id);
    if (!groupDB) {
      return res.status(400).json({
        statusCode: 400,
        message: "No se encontraron resultados",
      });
    }
    await Group.findByIdAndDelete(id);
    res.json({
      statusCode: 200,
      message: "Grupo eliminado",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error Inesperado",
    });
  }
};

// Update Group
const putGroup = async (req, res = response) => {
  const id = req.params.id;
  try {
    const groupDB = await Group.findById(id);
    if (!groupDB) {
      return res.status(404).json({
        ok: false,
        message: "No se encontraron resultados",
      });
    }
    const campos = req.body;

    // Actualizacion
    const groupUpdated = await Group.findByIdAndUpdate(id, campos, {
      new: true,
    });

    res.status(200).json({
      statusCode: 200,
      message: "Grupo Creado",
      group: groupUpdated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error Inesperado",
    });
  }
};

module.exports = {
  getGroups,
  postGroup,
  deleteGroup,
  putGroup,
};
