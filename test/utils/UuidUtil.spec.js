const uuidv5 = require('uuid/v5');
const UuidUtil = require('../../lib/utils/UuidUtil');

const namespace = uuidv5('https://vwo.com', uuidv5.URL);

describe('UuidUtil', () => {
  describe('method: generateFor', () => {
    it('should return desired UUID for userId and accountId', () => {
      expect(UuidUtil.generateFor('Varun', 12345)).toBe('C4D95C097902569F9A2D2E87CD3201C8');
      expect(UuidUtil.generateFor('Alice', 12345)).toBe('E3B732864F315FB6974BC3EF4E2FD920');
      expect(UuidUtil.generateFor('__123__', 12345)).toBe('50A5B167FB6356A796F91D8951E480EE');
      expect(UuidUtil.generateFor('We@#dcs3232.f3', 12345)).toBe('AAB4580A6BB3525FAA31DC341752D501');
    });
  });

  describe('method: generate', () => {
    it('return undefined if no name is passed', () => {
      expect(UuidUtil.generate()).toBeUndefined();
    });

    it('return undefined if no namespace is passed', () => {
      expect(UuidUtil.generate('Alice')).toBeUndefined();
    });

    it('should return a UUID', () => {
      expect(UuidUtil.generate('Alice', namespace).length).toBe(36);
    });
  });
});
