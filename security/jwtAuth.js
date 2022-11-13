const jwt = require('jsonwebtoken');
require('dotenv').config();
module.exports.auth = (req, res, next) => {
    let token = req.header('token');
    jwt.verify(token, process.env.TOKEN || 'omar', (err, decoded) => {
        if (err) {
            res.json(err);
        } else {
            req.user = decoded;
            next();
        }
    })
}