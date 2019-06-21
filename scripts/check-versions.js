const CheckVersionUtil = require('./utils/CheckVersionUtil');

const warnings = CheckVersionUtil.verify(['node', 'yarn']);

if (warnings && warnings.length) {
  process.exit(1);
}
