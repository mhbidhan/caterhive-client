import joi from 'joi';

const loginValidator = joi.object({
  email: joi
    .string()
    .email({ tlds: false })
    .min(3)
    .max(255)
    .required()
    .label('Email'),
  password: joi.string().min(8).max(255).required().label('Password'),
});

export default loginValidator;
