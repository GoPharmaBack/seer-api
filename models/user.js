var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

var userSchema = new Schema({
  name: { type: String },
  lastName: { type: String },
  secondLastName:{ type: String },
  place: { type: String },
  email: { type: String },
  phone: { type: Number },
  professionalLicense: { type: Number}
});

module.exports = mongoose.model("User", userSchema)