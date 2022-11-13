const userModel = require('../models/user.model');
const postModel = require('../models/post.model');
const commentModel = require('../models/comment.model');
//--------------------------1
module.exports.add = async(req, res) => {
    const { title, content } = req.body;
    console.log(req.user.user._id)
    let post = await postModel.insertMany({ content, title, createdBy: req.user.user._id });
    res.json({ message: "post created successfully" })
};
//--------------------------2

module.exports.update = async(req, res) => {
    const { title, content, postId } = req.body;
    let postOwner = await postModel.findOne({ _id: postId })
    if (postOwner.createdBy.toString() == req.user.user._id) {
        let post = await postModel.updateOne({ _id: postId }, { content, title, createdBy: req.user.user._id });
        res.json({ message: "post updated successfully" })
    } else {
        res.json({ message: "operation not allowed" })
    }
};
//--------------------------3

module.exports.getAllPosts = async(req, res) => {
    let allPost = await postModel.find()
        .populate("createdBy", "-password -__v  ")
        .populate("comments")
    res.json({ allPost });
};
//--------------------------4
module.exports.userPosts = async(req, res) => {
    let allPost = await postModel.find({ createdBy: req.user.user._id })
        .populate("createdBy", "-password -__v  ")
        .populate("comments")
    res.json({ allPost });
};
//--------------------------5

module.exports.deletePost = async(req, res) => {
    const { postId } = req.body;
    let post = await postModel.findOne({ _id: postId });
    if (post.createdBy.toString() === req.user.user._id) {
        await postModel.deleteOne({ _id: postId });
        res.json({ message: 'post Deleted successfully' })
    } else {
        console.log(post.createdBy.toString())
        res.json({ message: "Operation Not Authorized" })
    }
}