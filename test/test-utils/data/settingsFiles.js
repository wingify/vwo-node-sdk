const settingsFile1 = require('./settingsFile-1');
const settingsFile2 = require('./settingsFile-2');
const settingsFile3 = require('./settingsFile-3');
const settingsFile4 = require('./settingsFile-4');
const settingsFile5 = require('./settingsFile-5');
const settingsFile6 = require('./settingsFile-6');
const settingsFile7 = require('./settingsFile-7');
const settingsFile8 = require('./settingsFile-8');
const settingsFile9 = require('./settingsFile-9');
const settingsFile10 = require('./settingsFile-10');
const settingsFile11 = require('./settingsFile-11');
const settingsFileEventProperties = require('./settingsFile-eventProperties');
const settingsFileExtraKeyValidation = require('./settingsFile-extra-key-validation');
const settingsFileMeg = require('./settingsFile-meg');
const settingsFileNewMeg = require('./settingsFile-NewMeg');
const MABTrueSettingsFile = require('./MABTrueSettingsFile');
const settingsFileHasProps = require('./settingsFileHasProps');
const {
  settingsWithoutSeedAndWithoutisOB,
  settingsWithSeedAndWithoutisOB,
  settingsWithisNBAndWithisOB,
  settingsWithisNBAndWithoutisOB,
  settingsWithisNBAndWithoutisOBAndWithoutSeedFlag,
  settingsWithisNBAndisNBv2
} = require('./settingsFile-bucketing');

module.exports = {
  settingsFile1,
  settingsFile2,
  settingsFile3,
  settingsFile4,
  settingsFile5,
  settingsFile6,
  settingsFile7,
  settingsFile8,
  settingsFile9,
  settingsFile10,
  settingsFile11,
  settingsFileEventProperties,
  settingsFileMeg,
  settingsFileNewMeg,
  settingsFileExtraKeyValidation,
  settingsWithoutSeedAndWithoutisOB,
  settingsWithSeedAndWithoutisOB,
  settingsWithisNBAndWithisOB,
  settingsWithisNBAndWithoutisOB,
  settingsWithisNBAndWithoutisOBAndWithoutSeedFlag,
  MABTrueSettingsFile,
  settingsFileHasProps,
  settingsWithisNBAndisNBv2
};
