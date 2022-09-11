const { Schema, model } = require("mongoose");

const NewsSchema = Schema({
  date: {
    type: String,
  },
  description: {
    type: String,
    require: true,
    length: 300,
  },
  imageFile: {
    type: String,
  },
  link: {
    type: String,
  },
  title: {
    type: String,
    require: true,
  },
  urlVideo: {
    type: String,
  },
});

NewsSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model("News", NewsSchema);
