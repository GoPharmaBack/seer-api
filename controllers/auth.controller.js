const User = require("../models/user");
var FormData = require('form-data');
var http = require('http');
var axios = require('axios');

const sendToForm = () => {
    var form = new FormData();
    form.append('my_field', 'my value');
    return form.submit('https://coiner.us1.list-manage.com/subscribe/post');
}



exports.logIn = async (req, res) => {
    const userExist = await User.findOne({ email: req.body.email });
    if (!userExist)
        return res.status(404).json({
            message: 'User not exists'
        });
    const matchPassword = await User.comparePassword(req.body.password, userExist.password)
    if (!matchPassword)
        return res.status(401).json({
            message: 'Invalid password'
        })
    res.status(200).send();
};