const AudienceEvaluator = require('../../lib/core/AudienceEvaluator');

describe('AudienceEvaluator', () => {
  describe('method: evaluate', () => {
    test('should return true if no conditions are passed', () => {
      // Initially, we are not giving pre-segmentation support
      const conditions = [];

      const result = AudienceEvaluator.evaluate(conditions);
      expect(result).toBe(true);
    });

    test('should return false if conditions are passed', () => {
      // Initially, we are not giving pre-segmentation support
      const conditions = [{ device: 'iPhone' }];

      const result = AudienceEvaluator.evaluate(conditions);
      expect(result).toBe(false);
    });
  });
});
