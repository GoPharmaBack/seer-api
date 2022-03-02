var express = require("express");
var UserCtrl = require("../controllers/user");
const { findById } = require("../models/user");

var usersR = express.Router()

usersR
    .route("/")
    .post(UserCtrl.addUser).get(UserCtrl.findById);
module.exports = usersR;