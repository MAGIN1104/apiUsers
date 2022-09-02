const { response } = require("express");
const { validationResult } = require("express-validator");
const Usuario = require("../models/user");

// OBTENER LISTA DE USUARIOS
const getUsers = async (req, res = response) => {
  const usuario = await Usuario.find({}, "nombre email role google");
  res.json({
    ok: true,
    message: "Get Users",
    usuario,
  });
};

// CREAR USUARIO
const postUser = async (req, res) => {
  const { nombre, password, email } = req.body;

  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errores.mapped(),
    });
  }
  try {
    const existeEmail = await Usuario.findOne({ email });

    if (existeEmail) {
      return res.status(400).json({
        message: "El usuario ya existe",
      });
    }

    const usuario = new Usuario(req.body);
    await usuario.save();

    res.json({
      ok: true,
      usuario,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error Inesperado",
    });
  }
};

// ACTUALIZAR USUARIO
const putUser = async (req, res = response) => {
  const uid = req.params.id;
  try {
    const usuarioDB = await Usuario.findById(uid);
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        message: "No se encontraron resultados",
      });
    }
    const campos = req.body;
    if (usuarioDB.email === req.body.email) {
      delete campos.email;
    } else {
      const existeEmail = await Usuario.findOne({ email: req.body.email });
      if (existeEmail) {
        return res.status(400).json({
          ok: false,
          message: "Ya existe un usuario con el email: " + req.body.email,
        });
      }
    }

    // Actualizacion
    delete campos.password;
    delete campos.google;
    const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {
      new: true,
    });

    res.json({
      ok: true,
      user: usuarioActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error Inesperado",
    });
  }
};
// BORRAR USUARIO
const deleteUser = async (req, res = response) => {
  const uid = req.params.id;
  try {
    const usuarioDB = await Usuario.findById(uid);
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        message: "No se encontraron resultados",
      });
    }
    // eliminacion
    await Usuario.findOneAndDelete(uid);

    res.json({
      ok: true,
      message: "Se elimino el registro",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error Inesperado",
    });
  }
};

module.exports = {
  getUsers,
  postUser,
  putUser,
  deleteUser,
};
