const mongoose = require('mongoose');


const commentSchema = mongoose.Schema({
    content: String,
    createdBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
    },
    postId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'post'
    }
})
module.exports = mongoose.model('comment', commentSchema);