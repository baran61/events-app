const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, require: true},
    password: { type: String, unique: true },
    isAdmin: { type: Boolean, default: false },
})

module.exports = mongoose.model('User', userSchema );