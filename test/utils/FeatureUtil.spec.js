/**
 * Copyright 2019 Wingify Software Pvt. Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const FeatureUtil = require('../../lib/utils/FeatureUtil');
const CampaignTypeEnum = require('../../lib/enums/CampaignTypeEnum');
const FeatureVariableTypeEnum = require('../../lib/enums/FeatureVariableTypeEnum');

describe('FeatureUtil', () => {
  describe('method: getVariableForFeature', () => {
    it('should return empty object if campaign is not feature rollout', () => {
      let campaign = { type: CampaignTypeEnum.AB };

      expect(FeatureUtil.getVariableForFeature(campaign)).toEqual({});

      campaign = { type: CampaignTypeEnum.FEATURE_TEST };

      expect(FeatureUtil.getVariableForFeature(campaign)).toEqual({});
    });
    it('should return empty object if campaign has no variables', () => {
      let campaign = {
        type: CampaignTypeEnum.FEATURE_ROLLOUT,
        variables: []
      };

      expect(FeatureUtil.getVariableForFeature(campaign)).toEqual({});
    });
    it('should return empty object if campaign has variables but variable passed is not found', () => {
      let campaign = {
        type: CampaignTypeEnum.FEATURE_ROLLOUT,
        variables: [
          {
            key: 'my-feature'
            // other properties
          }
        ]
      };

      expect(FeatureUtil.getVariableForFeature(campaign, 'my-feature-garbage')).toEqual({});
    });

    it('should return variable object if campaign has variable passed', () => {
      let campaign = {
        type: CampaignTypeEnum.FEATURE_ROLLOUT,
        variables: [
          {
            key: 'my-feature'
            // other properties
          }
        ]
      };

      expect(FeatureUtil.getVariableForFeature(campaign, 'my-feature')).toEqual(campaign.variables[0]);
    });
  });

  describe('method: getVariableValueForVariation', () => {
    it('should return empty object if campaign is not feature rollout', () => {
      let campaign = { type: CampaignTypeEnum.AB };

      expect(FeatureUtil.getVariableValueForVariation(campaign)).toEqual({});

      campaign = { type: CampaignTypeEnum.FEATURE_ROLLOUT };

      expect(FeatureUtil.getVariableValueForVariation(campaign)).toEqual({});
    });
    it("should return empty object if campaign's variation has no variables", () => {
      let campaign = {
        type: CampaignTypeEnum.FEATURE_TEST,
        variations: [
          {
            id: 1,
            isFeatureEnabled: false,
            key: 'Control',
            variables: []
          },
          {
            id: 2,
            isFeatureEnabled: true,
            key: 'Variation-1',
            variables: []
          }
        ]
      };
      expect(FeatureUtil.getVariableValueForVariation(campaign, campaign.variations[0], 'my-feature')).toEqual({});
    });
    it('should return empty object if campaign has variables but variable passed is not found', () => {
      let campaign = {
        type: CampaignTypeEnum.FEATURE_TEST,
        variations: [
          {
            id: 1,
            isFeatureEnabled: false,
            key: 'Control',
            variables: [
              {
                key: 'my-feature',
                value: 1
                // other properties
              }
            ]
          },
          {
            id: 2,
            isFeatureEnabled: true,
            key: 'Variation-1',
            variables: [
              {
                key: 'my-feature',
                value: 2
                // other properties
              }
            ]
          }
        ]
      };

      expect(FeatureUtil.getVariableValueForVariation(campaign, campaign.variations[0], 'my-feature-garbage')).toEqual(
        {}
      );
    });

    it('should return variable object if campaign has variable passed', () => {
      let campaign = {
        type: CampaignTypeEnum.FEATURE_TEST,
        variations: [
          {
            id: 1,
            isFeatureEnabled: false,
            key: 'Control',
            variables: [
              {
                key: 'my-feature',
                value: 1
                // other properties
              }
            ]
          },
          {
            id: 2,
            isFeatureEnabled: true,
            key: 'Variation-1',
            variables: [
              {
                key: 'my-feature',
                value: 2
                // other properties
              }
            ]
          }
        ]
      };

      expect(FeatureUtil.getVariableValueForVariation(campaign, campaign.variations[0], 'my-feature')).toEqual(
        campaign.variations[0].variables[0]
      );
    });

    it('should return variable object if campaign has variable passed and feature is NOT enabled', () => {
      let campaign = {
        type: CampaignTypeEnum.FEATURE_TEST,
        variations: [
          {
            id: 1,
            isFeatureEnabled: false,
            key: 'Control',
            variables: [
              {
                key: 'my-feature',
                value: 1
                // other properties
              }
            ]
          },
          {
            id: 2,
            isFeatureEnabled: false,
            key: 'Variation-1',
            variables: [
              {
                key: 'my-feature',
                value: 2
                // other properties
              }
            ]
          }
        ]
      };

      expect(FeatureUtil.getVariableValueForVariation(campaign, campaign.variations[1], 'my-feature')).toEqual(
        campaign.variations[0].variables[0]
      );
    });

    it('should return variable object if campaign has variable passed and feature is enabled', () => {
      let campaign = {
        type: CampaignTypeEnum.FEATURE_TEST,
        variations: [
          {
            id: 1,
            isFeatureEnabled: false,
            key: 'Control',
            variables: [
              {
                key: 'my-feature',
                value: 1
                // other properties
              }
            ]
          },
          {
            id: 2,
            isFeatureEnabled: true,
            key: 'Variation-1',
            variables: [
              {
                key: 'my-feature',
                value: 2
                // other properties
              }
            ]
          }
        ]
      };

      expect(FeatureUtil.getVariableValueForVariation(campaign, campaign.variations[1], 'my-feature')).toEqual(
        campaign.variations[1].variables[0]
      );
    });
  });

  describe('method: getTypeCastVariableValue', () => {
    it('should return null if value passed is not typecastable to integer', () => {
      let intValue = 'string';

      expect(FeatureUtil.getTypeCastVariableValue(intValue, FeatureVariableTypeEnum.INTEGER)).toEqual(null);
    });
    it('should return integer as it is if passed correctly', () => {
      let intValue = 2;

      expect(FeatureUtil.getTypeCastVariableValue(intValue, FeatureVariableTypeEnum.INTEGER)).toEqual(intValue);
    });
    it('should return integer after typecasting it if passed as string', () => {
      let intValue = '2';

      expect(FeatureUtil.getTypeCastVariableValue(intValue, FeatureVariableTypeEnum.INTEGER)).toEqual(2);
    });

    it('should return null if value passed is not typecastable to double', () => {
      let doubleValue = 'string';

      expect(FeatureUtil.getTypeCastVariableValue(doubleValue, FeatureVariableTypeEnum.DOUBLE)).toEqual(null);
    });
    it('should return double as it is if passed correctly', () => {
      let doubleValue = 123.456;

      expect(FeatureUtil.getTypeCastVariableValue(doubleValue, FeatureVariableTypeEnum.DOUBLE)).toEqual(doubleValue);
    });
    it('should return double after typecasting it if passed as string', () => {
      let doubleValue = '123.456';

      expect(FeatureUtil.getTypeCastVariableValue(doubleValue, FeatureVariableTypeEnum.DOUBLE)).toEqual(123.456);
    });

    it('should return null if value passed is not boolean', () => {
      let booleanValue = 'string';

      expect(FeatureUtil.getTypeCastVariableValue(booleanValue, FeatureVariableTypeEnum.BOOLEAN)).toEqual(null);

      booleanValue = 222;

      expect(FeatureUtil.getTypeCastVariableValue(booleanValue, FeatureVariableTypeEnum.BOOLEAN)).toEqual(null);

      booleanValue = 123.456;

      expect(FeatureUtil.getTypeCastVariableValue(booleanValue, FeatureVariableTypeEnum.BOOLEAN)).toEqual(null);
    });
    it('should return boolean as it is if passed correctly', () => {
      let booleanValue = true;

      expect(FeatureUtil.getTypeCastVariableValue(booleanValue, FeatureVariableTypeEnum.BOOLEAN)).toEqual(booleanValue);

      booleanValue = false;

      expect(FeatureUtil.getTypeCastVariableValue(booleanValue, FeatureVariableTypeEnum.BOOLEAN)).toEqual(booleanValue);
    });

    it('should return value as is if type is string', () => {
      let strValue = 'string';

      expect(FeatureUtil.getTypeCastVariableValue(strValue, FeatureVariableTypeEnum.STRING)).toEqual(strValue);
    });
  });
});
