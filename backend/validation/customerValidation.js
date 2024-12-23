const Joi = require("joi");

const createCustomerSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).required(),
  lastName: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string()
    .pattern(/^\d{10}$/)
    .required()
    .messages({ "string.pattern.base": "Phone number must be 10 digits" }),
  address: Joi.string().min(5).max(255).required(),
});

const updateCustomerSchema = Joi.object({
  firstName: Joi.string().min(2).max(50),
  lastName: Joi.string().min(2).max(50),
  email: Joi.string().email(),
  phoneNumber: Joi.string()
    .pattern(/^\d{10}$/)
    .messages({ "string.pattern.base": "Phone number must be 10 digits" }),
  address: Joi.string().min(5).max(255),
}).min(1);

module.exports = { createCustomerSchema, updateCustomerSchema };
