const app = require('express').Router();
const { auth } = require('../security/jwtAuth');
const { add, update, deleteComment } = require('../services/comment.service');

app.post('/add', auth, add);
app.put('/update', auth, update);
app.delete('/deleteComment', auth, deleteComment);




module.exports = app