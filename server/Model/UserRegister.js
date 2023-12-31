const mongoose = require('mongoose');

let UserRegister = new mongoose.Schema({
    fname: {type: String, required: true},
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
});

module.exports = mongoose.model('UserRegister', UserRegister);