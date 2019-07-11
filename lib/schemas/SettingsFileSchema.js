const campaignGoalSchema = {
  type: 'object',
  properties: {
    id: { type: ['number', 'string'] },
    identifier: { type: 'string' },
    type: { type: 'string' }
  }
};

const campaignVariationSchema = {
  type: 'object',
  properties: {
    id: { type: ['number', 'string'] },
    name: { type: 'string' },
    weight: { type: ['number', 'string'] }
  }
};

const campaignObjectSchema = {
  type: 'object',
  properties: {
    id: { type: ['number', 'string'] },
    key: { type: 'string' },
    status: { type: 'string' },
    percentTraffic: { type: 'number' },
    goals: {
      type: 'array',
      items: campaignGoalSchema
    },
    variations: {
      type: 'array',
      items: campaignVariationSchema
    }
  }
};

const settingsFileSchema = {
  properties: {
    version: {
      type: ['number', 'string']
    },
    accountId: {
      type: ['number', 'string']
    },
    campaigns: {
      if: { type: 'array' },
      then: { items: campaignObjectSchema },
      else: { properties: {} }
    }
  }
};

module.exports = settingsFileSchema;
