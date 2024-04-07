const Joi = require('joi');
const userInputValidate = Joi.object({
    email: Joi.string()
        .email()
        .min(5)
        .max(100)
        .required(),
    userType: Joi.string()
        .min(5)
        .max(100)
        .required(),
    password: Joi.string()
        .min(8)
        .pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{};:\\\'",.<>/?]{3,30}$'))
        .required()
});

module.exports = userInputValidate
