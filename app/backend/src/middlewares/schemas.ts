import Joi = require('joi');

const requiredError = 'Some required fields are missing';

const loginRequestSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
}).required().messages({
  'string.empty': requiredError,
  'any.required': requiredError,
});

export default loginRequestSchema;
