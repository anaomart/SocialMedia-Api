const { auth } = require('../security/jwtAuth');
const { add, update, getAllPosts, userPosts, deletePost } = require('../services/post.service');

const app = require('express').Router();

app.post('/add', auth, add)
app.put('/update', auth, update)
app.get('/getAllPosts', auth, getAllPosts)
app.get('/userPosts', auth, userPosts)
app.delete('/deletePost', auth, deletePost)


module.exports = app;