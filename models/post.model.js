const mongoose = require('mongoose');


const postSchema = mongoose.Schema({
    title: String,
    content: String,
    createdBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
    },
    comments: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: 'comment'
    },
})
module.exports = mongoose.model('post', postSchema);