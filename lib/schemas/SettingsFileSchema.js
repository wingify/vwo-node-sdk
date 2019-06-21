const Joi = require('@hapi/joi');

const campaignVariationSchema = Joi.object().keys({
  id: Joi.number().required(),
  name: Joi.string().required(),
  variables: Joi.array().items(Joi.object())
});

const campaignObjectSchema = Joi.object().keys({
  id: Joi.number().required(),
  type: Joi.string().required(),
  status: Joi.string().required(),
  percentTraffic: Joi.number().required(),
  variations: Joi.array().items(campaignVariationSchema)
});

const settingsFileSchema = Joi.object().keys({
  version: Joi.number().required(),
  accountId: Joi.number().required(),
  campaigns: Joi.array().items(campaignObjectSchema)
});

module.exports = settingsFileSchema;
