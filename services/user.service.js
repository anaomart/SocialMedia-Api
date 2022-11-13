const userModel = require('../models/user.model');
const postModel = require('../models/post.model');
const commentModel = require('../models/comment.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { json } = require('express');
require('dotenv').config();
// ---------------------------signup-------------------------------------1
module.exports.signup = async(req, res) => {
    const { name, email, password, age, phone } = req.body;
    let user = await userModel.findOne({ email });
    if (user) {
        res.json({ message: "User already exists" })
    } else {
        bcrypt.hash(password, process.env.ROUNDS || 4, async function(err, hash) {
            let newUser = await userModel.insertMany({ name, email, password: hash, age, phone })
            res.json({ message: "User Added successfully" })
        });

    }
};
// ---------------------------signIn-------------------------------------2
module.exports.signin = async(req, res) => {
    const { email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (user) {
        let match = await bcrypt.compare(password, user.password)
        if (match) {
            let token = jwt.sign({
                user
            }, process.env.TOKEN || "omar")
            res.json({ message: "Login", token });
        } else {
            res.json({ message: "Wrong email or Password" })
        }
    } else {
        res.json({ message: "Wrong email or Password" })
    }
};
// ---------------------------changePassword------------------------------3
module.exports.changePassword = async(req, res) => {
    const { oldPassword, newPassword, rePassword } = req.body;
    let user = await userModel.findOne({ _id: req.user.user._id })
    let match = await bcrypt.compare(oldPassword, user.password)
    if (match & newPassword == rePassword) {
        bcrypt.hash(newPassword, process.env.ROUNDS || 4, async function(err, hash) {
            let updatedUser = await userModel.updateOne({ _id: user._id }, { password: hash })
            res.json({ message: "Password Updated Successfully" })
        });
    } else {
        res.json({ message: "Wrong Password", })
    }
};
// ---------------------------update------------------------------4
module.exports.update = async(req, res) => {
    const { name, email, age, phone } = req.body;
    let exists = await userModel.findOne({ email: email });
    if (exists) {
        let user = await userModel.updateOne({ _id: req.user.user._id }, { name, email, age, phone })
        res.json({ message: "Updated", });
    } else {
        res.json({ message: "Email already exists" });
    }
};
// ---------------------------delete------------------------------5
module.exports.deleteUser = async(req, res) => {
    let user = await userModel.deleteOne({ _id: req.user.user._id })
    let posts = await postModel.deleteMany({ createdBy: req.user.user._id })
    let comments = await commentModel.deleteMany({ createdBy: req.user.user._id })
    res.json({ message: "Deleted" })
}