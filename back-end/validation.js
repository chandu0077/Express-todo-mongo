const Joi = require("joi");

// register Validation

const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required().min(6),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

// login Validation

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().min(6),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

module.exports = { registerValidation, loginValidation };
