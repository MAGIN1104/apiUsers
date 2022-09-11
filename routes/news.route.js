const { Router } = require("express");
const { check } = require("express-validator");
const {
  getNews,
  postNews,
  putNews,
  deleteNews,
} = require("../controllers/news.controller");
const router = Router();

// GET NEWS
router.get("/", getNews);

// POST NEWS
router.post(
  "/",
  [
    check("description", "El campo << descripción >> es requerido")
      .not()
      .isEmpty(),
    check("title", "El campo << título >> es requerido").not().isEmpty(),
  ],
  postNews
);

// PUT NEWS
router.put(
  "/:id",
  [
    check("description", "El campo << descripción >> es requerido")
      .not()
      .isEmpty(),
    check("title", "El campo << título >> es requerido").not().isEmpty(),
  ],
  putNews
);

// DELETE USER
router.delete("/:id", deleteNews);

module.exports = router;
