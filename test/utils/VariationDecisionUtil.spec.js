const VariationDecisionUtil = require('../../lib/utils/VariationDecisionUtil');
const VariationDecider = require('../../lib/core/VariationDecider');
const ProjectConfigManager = require('../../lib/services/ProjectConfigManager');

const logging = require('../../lib/logging');
const logger = logging.getLogger();

const {
  settingsFile1
} = require('../test-utils/data/settingsFiles');

const globalConfig = {
  settingsFile: settingsFile1,
  logger
};

const userId = 'Alice';
const campaign = settingsFile1.campaigns[0];

let spyOnResolveBucketMap;
let spyOnGetStoredVariation;
let spyOnVariationAllotted;
let spyOnSaveUserProfiel;
let output;

beforeEach(() => {
  let projectConfigManager = new ProjectConfigManager(globalConfig);

  projectConfigManager.processsettingsFile(globalConfig);
});

describe('VariationDecisionUtil', () => {
  describe('method: get', () => {
    beforeEach(() => {
      spyOnResolveBucketMap = jest.spyOn(VariationDecisionUtil, '__resolveCampaignBucketMap');
      spyOnGetStoredVariation = jest.spyOn(VariationDecisionUtil, '__getStoredVariation');
      spyOnVariationAllotted = jest.spyOn(VariationDecider, 'getVariationAllotted');
      spyOnSaveUserProfiel = jest.spyOn(VariationDecisionUtil, '__saveUserProfile');

      output = VariationDecisionUtil.get(globalConfig, campaign, 'DEV_TEST_1', userId);
    });

    it('should first look into UPS for fetching stored variation', () => {
      expect(spyOnResolveBucketMap).toHaveBeenCalled();
      expect(spyOnGetStoredVariation).toHaveBeenCalled();
    });

    it('should use method to allot variation if UPS is not provided', () => {
      expect(spyOnVariationAllotted).toHaveBeenCalled();
      expect(output).toBeDefined();
      expect(output.variationName).toBe('Control');
      expect(output.variationId).toBe(1);
    });

    it('should save data into UPS if provided', () => {
      expect(spyOnSaveUserProfiel).toHaveBeenCalled();
    });
  });

  describe('method: __getStoredVariation', () => {
    it('should return null if data not found in campaignBucketMap', () => {
      expect(VariationDecisionUtil.__getStoredVariation(globalConfig, 'DEV_TEST_1', userId)).toBe(null);
    });

    it('should return variation if data found in campaignBucketMap', () => {
      const campaignBucketMap = {
        'DEV_TEST_1': {
          variationName: 'Control'
        }
      };

      output = VariationDecisionUtil.__getStoredVariation(globalConfig, 'DEV_TEST_1', userId, campaignBucketMap);

      expect(output).toBeDefined();
      expect(typeof output).toBe('object');
      expect(output.id).toBe(1);
      expect(output.name).toBe('Control');
    });
  });

  describe('method: __resolveCampaignBucketMap', () => {
    it('should output an object if no UPS provided', () => {
      output = VariationDecisionUtil.__resolveCampaignBucketMap(globalConfig, userId);

      expect(typeof output).toBe('object');
      expect(Object.keys(output).length).toBe(0);
    });
  });

  describe('method: __getUserProfile', () => {
    it('should return if UPS is not provided', () => {
      output = VariationDecisionUtil.__getUserProfile(globalConfig, userId);
      expect(output).toBeDefined();
      expect(output.userId).toBeDefined();

      expect(output.campaignBucketMap).toBeDefined();
      expect(Object.keys(output.campaignBucketMap).length).toBe(0);
    });

    it('should return UPS stored data', () => {
      const userProfileService = {
        lookup: (userId, campaignTestKey) => {
          // Perform user profile lookup
          // return an object like:
          return {
            userId: userId,
            campaignBucketMap: {
              'DEV_TEST_1': {
                variationName: 'Control'
              }
            }
          }
        }
      }

      const config = Object.assign({}, globalConfig, { userProfileService });

      output = VariationDecisionUtil.__getUserProfile(config, userId);

      expect(output.campaignBucketMap).toBeDefined();
      expect(Object.keys(output.campaignBucketMap).length).toBe(1);

      expect(output.campaignBucketMap['DEV_TEST_1']).toBeDefined();
      expect(output.campaignBucketMap['DEV_TEST_1'].variationName).toBe('Control');
    });

    it('should return UPS stored data even if end-user manipulated it', () => {
      const userProfileService = {
        lookup: (userId, campaignTestKey) => {
          // Perform user profile lookup
          // return an object like:
          return {
            userId: userId,
            campaignBucketMap: {
              'DEV_TEST_1': {
                variationName: 'Control - Garbage added'
              }
            }
          }
        }
      }

      const config = Object.assign({}, globalConfig, { userProfileService });

      output = VariationDecisionUtil.__getUserProfile(config, userId);

      expect(output.campaignBucketMap).toBeDefined();
      expect(Object.keys(output.campaignBucketMap).length).toBe(1);

      expect(output.campaignBucketMap['DEV_TEST_1']).toBeDefined();
      expect(output.campaignBucketMap['DEV_TEST_1'].variationName).toBe('Control - Garbage added');
    });
  });

  describe('method: __saveUserProfile', () => {
    it('should return false if UPS is not provided', () => {
      output = VariationDecisionUtil.__saveUserProfile(globalConfig, campaign, 'Control', userId, {});
      expect(output).toBe(false);
    });

    it('should return UPS stored data even if end-user manipulated it', () => {
      const userProfileService = {
        save: () => {

        }
      };
      const config = Object.assign({}, globalConfig, { userProfileService });

      output = VariationDecisionUtil.__saveUserProfile(config, campaign, 'Control', userId, {});
      expect(output).toBe(true);
    });
  });
});
