const { request } = require("express");
const commentModel = require("../models/comment.model");
const postModel = require("../models/post.model");
//--------------------------1
module.exports.add = async(req, res) => {
    const { content, postId } = req.body;
    if (postId) {
        let comment = await commentModel.insertMany({
            content,
            createdBy: req.user.user._id,
            postId,
        });
        let addedComment = await postModel.updateOne({ _id: postId }, { $push: { comments: comment } });
        res.json({ message: "comment added successfully" });
    } else {
        res.json({ message: "Post not found" });
    }
};
// ---------------------------2
module.exports.update = async(req, res) => {
    const { content, commentId } = req.body;
    if (content & commentId) {
        let commentOwner = await commentModel.findOne({ _id: commentId });
        if (commentOwner.createdBy.toString() == req.user.user._id) {
            let updated = await commentModel.updateOne({ _id: commentOwner }, { content });
            res.json({ message: "updated" });
        } else {
            res.json({ message: "operation not Authorized" });
        }
    } else {
        res.json({ message: "Missing  Values" });
    }
};
// ---------------------------3
module.exports.deleteComment = async(req, res) => {
    const { commentId, postId } = req.body;
    if (commentId & postId) {
        let commentOwner = await commentModel.findOne({ _id: commentId });
        let postOwner = await postModel.findOne({ _id: postId });
        if (
            commentOwner.createdBy.toString() == req.user.user._id ||
            postOwner.createdBy.toString() == req.user.user._id
        ) {
            await commentModel.deleteOne({ _id: commentId });
            await postModel.updateOne({ _id: postId }, { $pull: { comments: commentId } });
            res.json({ message: "Comment deleted successfully" });
        } else {
            res.json({ message: "operation not Authorized" });
        }
    } else {
        res.json({ message: "Missing  Values" });
    }
};