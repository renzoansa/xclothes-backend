import Joi from 'joi';

const createPaymentIntentValidator = Joi.object({
  paymentMethodId: Joi.string().required(),
  checkoutItems: Joi.array().min(1).items({
    clothingId: Joi.string().required(),
    quantity: Joi.number().required(),
  }),
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  address: Joi.string().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
});

export default createPaymentIntentValidator;
