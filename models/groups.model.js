const { Schema, model } = require("mongoose");

const GroupsSchema = Schema({
  groupName: {
    type: String,
    require: true,
  },
  sentence: {
    type: String,
    require: true,
  },
  bibleQuote: {
    type: String,
    require: true,
  },
  meetings: {
    type: String,
    require: true,
  },
  link: {
    type: String,
    require: false,
  },
  phone: {
    type: String,
    require: false,
  },
  image: {
    type: String,
    require: true,
  },
});

GroupsSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model("Groups", GroupsSchema);
