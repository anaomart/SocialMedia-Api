const express = require('express');
const { dbConnection } = require('./conf/dbConnection');
require('dotenv').config;
const app = express();
const PORT = process.env.PORT || 3200
app.use(express.json()); // buffer into JSON

dbConnection(); // database connection

// Routes 
app.use("/user", require('./api/user.api'))
app.use("/post", require('./api/post.api'));
app.use("/comment", require('./api/comment.api'))


app.listen(PORT, () => console.log("Listening on port: " + PORT))