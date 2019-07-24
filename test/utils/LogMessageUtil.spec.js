const LogMessageUtil = require('../../lib/utils/LogMessageUtil');

let output;

describe('LogMessageUtil', () => {
  describe('method: build', () => {
    it('should output correct string', () => {
      const template = '{text1} is some {text2}. {text3} will be {text4}.';
      const expectation = 'This is some template. Placeholder will be replaced.';

      output = LogMessageUtil.build(template, {
        text1: 'This',
        text2: 'template',
        text3: 'Placeholder',
        text4: 'replaced'
      });

      expect(output).toBe(expectation);
    });

    it('should output correct string', () => {
      const template = '{text1} is some {text2}. {text3} will be {text4}.';
      const expectation = '123 is some . Placeholder will be replaced.';

      output = LogMessageUtil.build(template, {
        text1: 123,
        text2: null,
        text3: function() {
          return 'Placeholder';
        },
        text4: 'replaced'
      });

      expect(output).toBe(expectation);
    });
  });
});
