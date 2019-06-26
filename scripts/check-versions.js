const CheckVersionUtil = require('./utils/CheckVersionUtil');

const warnings = CheckVersionUtil.verify(['node']);

if (warnings && warnings.length) {
  process.exit(1);
}
