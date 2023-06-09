import joi from 'joi';

const customerValidatorSchema = joi.object({
  fullName: joi.string().min(3).max(255).required().label('Full Name'),
  email: joi
    .string()
    .email({ tlds: false })
    .min(3)
    .max(255)
    .required()
    .label('Email'),
  phone: joi.string().min(9).max(15).required().label('Phone'),
  password: joi.string().min(8).max(255).required().label('Password'),
  confirmPassword: joi.string().min(8).max(255).required().label('Password'),
  address: joi.string().min(3).max(255).required().label('business Name'),
  profileImg: joi.string().label('Profile Image'),
  area: joi.string().min(24).max(24).required().label('Area'),
});

export default customerValidatorSchema;
