const { response } = require("express");
const path = require("path");
const fs = require("fs");
const { validationResult } = require("express-validator");
const Group = require("../models/groups.model");
const { uploadFile } = require("../helpers/uploadFile.helper");

// GET ALL GROUPS
const getGroups = async (req = response, res = response) => {
  const groups = await Group.find(
    {},
    "groupName sentence bibleQuote meetings link phone image"
  );
  let groupsModified = groups.map(({ _doc,_id }) => ({
    ..._doc,
    id:_id,
    image: path.join(__dirname, "../uploads", "groups", _doc.image).replace(/\\/g,'/'),
  }));
  res.json(groupsModified);
};

// Create new Group
const postGroup = async (req, res) => {
  const errores = validationResult(req);

  try {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.image) {
      res.status(400).json({ message: "No se cargaron archivos" });
      return;
    }

    if (!errores.isEmpty()) {
      return res.status(400).json({
        statusCode: 400,
        errors: errores.mapped(),
      });
    }

    const group = new Group(req.body);
    const pathFile = await uploadFile(req.files, "groups");
    group.image = pathFile;
    await group.save();
    res.json({
      statusCode: 200,
      message: "Registro Exitoso",
      group,
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
    if (groupDB.image) {
      const pathImg = path.join(
        __dirname,
        "../uploads",
        "groups",
        groupDB.image
      );
      if (fs.existsSync(pathImg)) {
        fs.unlinkSync(pathImg);
      }
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

    if (groupDB.image) {
      const pathImg = path.join(
        __dirname,
        "../uploads",
        "groups",
        groupDB.image
      );
      if (fs.existsSync(pathImg)) {
        fs.unlinkSync(pathImg);
      }
    }

    const campos = req.body;
    const pathFile = await uploadFile(req.files, "groups");
    campos.image = pathFile;

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
