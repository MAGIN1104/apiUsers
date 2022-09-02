const { Router } = require("express");
const { check } = require("express-validator");
const {
  getUsers,
  postUser,
  putUser,
  deleteUser,
} = require("../controllers/usuarios");
const router = Router();

router.get("/", getUsers);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
  ],
  postUser
);

router.put(
  "/:id",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("role", "El email es obligatorio").not().isEmpty(),
  ],
  putUser
);

router.delete("/:id", deleteUser);
module.exports = router;
