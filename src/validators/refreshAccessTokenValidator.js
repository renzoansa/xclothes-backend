import Joi from 'joi';

const refreshAccessTokenValidator = Joi.object({
  refreshToken: Joi.string().required(),
}).options({ allowUnknown: true });

export default refreshAccessTokenValidator;
