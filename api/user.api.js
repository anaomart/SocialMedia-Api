const { auth } = require('../security/jwtAuth');
const { signup, signin, changePassword, update, deleteUser } = require('../services/user.service');
const { userValidation } = require('../security/validation');
const app = require('express').Router();

app.post('/signup', userValidation, signup)
app.post('/signin', signin)
app.patch('/changePassword', auth, changePassword)
app.put('/update', auth, update)
app.delete('/deleteUser', auth, deleteUser)
module.exports = app;