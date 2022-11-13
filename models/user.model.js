const mongoose = require('mongoose');


const UserSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    age: Number,
    phone: Number,
})
module.exports = mongoose.model('user', UserSchema);