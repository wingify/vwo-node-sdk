const semver = require('semver');
const shell = require('shelljs');
const childProcess = require('child_process');

const packageConfig = require('../../package.json');
const AnsiColorEnum = require('../../lib/enums/AnsiColorEnum');

const versionRequirements = [];

function _exec(cmd) {
  return childProcess
    .execSync(cmd)
    .toString()
    .trim();
}

function getWarnings(mods) {
  if (!mods || !mods.length) {
    return [];
  }

  if (mods.indexOf('node') !== -1 && shell.which('node')) {
    versionRequirements.push({
      name: 'node',
      currentVersion: semver.clean(process.version),
      versionRequirement: packageConfig.engines.node
    });
  }
  if (mods.indexOf('yarn') !== -1 && shell.which('yarn')) {
    versionRequirements.push({
      name: 'yarn',
      currentVersion: _exec('yarn --version'),
      versionRequirement: packageConfig.engines.yarn
    });
  }

  const warnings = [];

  for (let i = 0; i < versionRequirements.length; i++) {
    const mod = versionRequirements[i];

    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(
        `${mod.name}: ${AnsiColorEnum.RED}${mod.currentVersion}${AnsiColorEnum.RESET} should be ${AnsiColorEnum.GREEN}${
          mod.versionRequirement
        }${AnsiColorEnum.RESET}`
      );
    }
  }

  return warnings;
}
function verify(mods) {
  if (!mods || !mods.length) {
    return [];
  }

  let warnings = getWarnings(mods);

  if (warnings.length) {
    console.log('');
    console.log(
      `${AnsiColorEnum.YELLOW}To contribute in VWO SDK development, you must update the following to:${
        AnsiColorEnum.RESET
      }`
    );
    console.log();
    for (let i = 0; i < warnings.length; i++) {
      const warning = warnings[i];
      console.log('  ' + warning);
    }
    console.log();
  }

  return warnings;
}

module.exports = {
  verify,
  getWarnings
};
