var mongoose = require("mongoose")
require('../models/user');
var User = mongoose.model("User")
let ejs = require("ejs");
let pdf = require("html-pdf");
let path = require("path");



//GET - Return all users in the DB
exports.findAllUsers = function (req, res) {
    User.find(function (err, users) {
        if (err) res.send(500, err.message);

        console.log("GET /users");
        res.status(200).jsonp(users)
    });
};

exports.findById = function (req, res) {
    User.findById(req.query.id, function (err, userData) {
        if (err) res.send(500, err.message);
        generatePDF(userData, function (err, pdfStream) {
            if (err) {
                console.log(err)
                return res.sendStatus(500)
            } else {
                res.statusCode = 200
                pdfStream.on('end', () => {
                    return res.end()
                })
                pdfStream.pipe(res)
            }
        })
    });
};


//POST - Insert a new User in the DB
exports.addUser = async function (req, res) {
    const body = req.body;
    const { MMERGE3: name, FNAME: lastName, LNAME: secondLastName, MMERGE6: place, EMAIL: email, PHONE: phone, MMERGE7: professionalLicense } = body;
    if (!email) {
        res.status(400).send({ required: "no contiene email " })
    }
    var user = new User({
        name,
        lastName,
        secondLastName,
        place,
        email,
        phone,
        professionalLicense,
        password: await User.encryptPassword(process.env.PASSWORD || 'w'),
        role: 'user'
    })
    user.save(function (err, user) {
        if (err?.keyValue?.email) {
            res.status(400).send({ msg: "email ya fue registrado" })
        } else {

            res.status(200).jsonp(user)
        }
    })


}


const generatePDF = (user, fun) => {
    ejs.renderFile(path.join(__dirname, '../views/', "report-template.ejs"), { user }, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            let options = {
                "height": "11.25in",
                "width": "8.5in",
                "header": {
                    "height": "20mm"
                },
                "footer": {
                    "height": "20mm",
                },
            };
            pdf.create(data, options).toStream(fun);
        }
    });
}