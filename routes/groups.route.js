const { Router } = require("express");
const { check } = require("express-validator");
const {
  getGroups,
  postGroup,
  putGroup,
  deleteGroup,
} = require("../controllers/groups.controller");
const router = require("./petition.route");

// GET GROUPS
router.get("/", getGroups);

// CREATE GROUPS
router.post(
  "/",
  [
    check("groupName", "El nombre es obligatorio").not().isEmpty(),
    check("sentence", "La cita es obligatoria").not().isEmpty(),
    check("bibleQuote", "La versiculo es obligatorio").not().isEmpty(),
    check("meetings", "El campo meetings es obligatorio").not().isEmpty(),
    check("sentence", "La cita es obligatoria").not().isEmpty(),
    check("image", "La imagen es obligatoria").not().isEmpty(),
  ],
  postGroup
);

// UPDATE GROUP
router.put(
  "/:id",
  [
    check("groupName", "El nombre es obligatorio").not().isEmpty(),
    check("sentence", "La cita es obligatoria").not().isEmpty(),
    check("bibleQuote", "La versiculo es obligatorio").not().isEmpty(),
    check("meetings", "El campo meetings es obligatorio").not().isEmpty(),
    check("sentence", "La cita es obligatoria").not().isEmpty(),
    check("image", "La imagen es obligatoria").not().isEmpty(),
  ],
  putGroup
);

//DELETE GROUP
router.delete("/:id", deleteGroup);

module.exports = router;
