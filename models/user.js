const bcrypt = require("bcryptjs");
var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

var userSchema = new Schema({
  name: { type: String },
  lastName: { type: String },
  secondLastName:{ type: String },
  place: { type: String },
  email: { type: String , unique: true},
  phone: { type: String },
  professionalLicense: { type: String},
  password: { type: String},
  role: { type: String }
});

userSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(12);
  return await bcrypt.hash(password, salt);
};

userSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword);
};
module.exports = mongoose.model("User", userSchema)