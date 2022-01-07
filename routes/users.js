var express = require("express");
var UserCtrl = require("../controllers/user")

var usersR = express.Router()

usersR
    .route("/")
    .get(UserCtrl.findAllUsers)
    .post(UserCtrl.addUser)

module.exports = usersR;