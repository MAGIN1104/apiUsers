const { Schema, model } = require("mongoose");

const PetitionsSchema = Schema({
  name: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  petition: {
    type: String,
    require: true,
  },
  state: {
    type: Boolean,
  },
});

PetitionsSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model("Petitions", PetitionsSchema);
