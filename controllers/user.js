var mongoose = require("mongoose")
require('../models/user');
var User = mongoose.model("User")


var FormData = require('form-data');
var axios = require('axios');



//GET - Return all users in the DB
exports.findAllUsers = function (req, res) {
    User.find(function (err, users) {
        if (err) res.send(500, err.message);

        console.log("GET /users");
        res.status(200).jsonp(users)
    });
};

//POST - Insert a new User in the DB
exports.addUser = async function (req, res) {
    const body = req.body;
    const { MMERGE3: name, FNAME: lastName, LNAME: secondLastName, MMERGE6: place, EMAIL: email, PHONE: phone, MMERGE7: professionalLicense } = body;
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
        if (err) return res.status(500).send(err.message)
        res.status(200).jsonp(user)
    })


}
const sendToForm = async (cb) => {
    /*     var form = new FormData();
        form.append('my_field', 'my value');
        form.submit('https://coiner.us1.list-manage.com/subscribe/post?u=37892f6a3c3f15b6ba401af59&id=744ea1621c', function (err, res) {
            if (err) {
                console.log(err);
            }
            // res – response object (http.IncomingMessage)  //
            res.resume();
            res.status(200).send()
    
        }); */

    const data = new URLSearchParams();
    data.append('key', 'value');
    try {
        const response = await axios.post('https://coiner.us1.list-manage.com/subscribe/post?u=37892f6a3c3f15b6ba401af59&id=744ea1621c', data, { headers: { 'Content-Type': 'multipart/form-data' } })
        console.log(response)
    } catch (error) {
        console.log(error)

    }
}