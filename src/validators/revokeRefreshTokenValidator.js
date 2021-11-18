import Joi from 'joi';

const revokeRefreshTokenValidator = Joi.object({
  refreshToken: Joi.string().required(),
});

export default revokeRefreshTokenValidator;
