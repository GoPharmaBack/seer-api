var mongoose = require("mongoose")
require('../models/user');
var User = mongoose.model("User")

//GET - Return all users in the DB
exports.findAllUsers = function(req,res) {
    User.find(function (err, users){
        if (err) res.send(500, err.message);

        console.log("GET /users");
        res.status(200).jsonp(users)
    });
};

//POST - Insert a new User in the DB
exports.addUser = function (req, res) {
    console.log("POST")
    console.log(req.body)

    var user = new User({
      name: req.body.name,
      lastName: req.body.lastName,
      secondLastName: req.body.secondLastName,
      place: req.body.place,
      email: req.body.email,
      phone: req.body.phone,
      professionalLicense: req.body.professionalLicense
    })
    user.save(function (err, user) {
        if (err) return res.status(500).send(err.message)
        res.status(200).jsonp(user)
    })

}