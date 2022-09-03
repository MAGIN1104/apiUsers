const { Router } = require("express");
const { check } = require("express-validator");
const {
  getPetition,
  postPetition,
  deletePetition,
} = require("../controllers/petitions.controller");
const router = Router();

// GET USER
router.get("/", getPetition);

// POST USER
router.post(
  "/",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("phone", "El nombre es obligatorio").not().isEmpty(),
    check("petition", "El nombre es obligatorio").not().isEmpty(),
  ],
  postPetition
);

// DELETE USER
router.delete("/:id", deletePetition);

module.exports = router;
