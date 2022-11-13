const Joi = require('joi')
let methods = ['body', 'params']
require('dotenv').config();
let schema = {
    body: Joi.object({
        name: Joi.string().required().min(3).max(30),
        email: Joi.string().email().required(),
        password: Joi.string().required().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$/),
        repassword: Joi.ref('password'),
        age: Joi.number().min(12).max(80).required(),
        phone: Joi.number().required()
    }),

    params: Joi.object({
        id: Joi.string().min(24).max(24)
    })
}

module.exports.userValidation = (req, res, next) => {
    let errArray = []
    methods.map((key) => {
        let { error } = schema[key].validate(req[key], { abortEarly: false })
        if (error) {
            error.details.map((msg) => {
                errArray.push(msg.message)
            })
        }
    })
    if (errArray.length > 0) {
        res.json(errArray)
    } else {
        next()
    }
}