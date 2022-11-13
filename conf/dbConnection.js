const mongoose = require('mongoose');

module.exports.dbConnection = function() {
    mongoose.connect('mongodb://localhost:27017/socialMedia')
        .then(() => console.log('Connection established'));
}