const { response } = require("express");
const { validationResult } = require("express-validator");
const News = require("../models/news.model");
const StateEnum = require("../enums/state.enum");

// Get all News
const getNews = async (req = response, res = response) => {
  const { state } = req.query;
  const news = await News.find(
    { state: { $eq: state } },
    "date description imageFile link title urlVideo"
  );
  res.json(news);
};

// Create News
const postNews = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({
      statusCode: 400,
      errors: errores.mapped(),
    });
  }
  try {
    const news = new News(req.body);
    news.state = StateEnum.ACTIVE;
    await news.save();
    res.status(200).json({
      statusCode: 200,
      news,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      statusCode: 500,
      message: "Error inesperado",
    });
  }
};

// Update News
const putNews = async (req, res = response) => {
  const id = req.params.id;
  try {
    const newsDB = await News.findById(id);
    if (!newsDB) {
      return res.status(404).json({
        statusCode: 404,
        message,
      });
    }
    const fields = req.body;
    const newsUpdated = await News.findByIdAndUpdate(id, fields, {
      new: true,
    });
    res.statusCode(200).json({
      statusCode: 200,
      news: newsUpdated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error Inesperado",
    });
  }
};

// Delete News
const deleteNews = async (req, res = response) => {
  const id = req.params.id;
  try {
    const newsDB = await News.findById(id);
    if (!newsDB) {
      return res.status(404).json({
        statusCode: 404,
        message,
      });
    }
    await News.findByIdAndDelete(id);
    res.statusCode(200).json({
      statusCode: 200,
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
  getNews,
  postNews,
  putNews,
  deleteNews,
};
