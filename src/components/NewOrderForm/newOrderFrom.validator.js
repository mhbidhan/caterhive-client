import joi from 'joi';

const newOrderValidatorSchema = joi.object({
  caterer: joi.string().min(3).max(255).required().label('Caterer'),
  orderedProducts: joi.array().label('orderedProducts'),
  shippingAddress: joi
    .string()
    .min(3)
    .max(255)
    .required()
    .label('Shipping Address'),
  specialInstruction: joi.string().max(255).label('Special Instruction'),
});

export default newOrderValidatorSchema;
