// @ts-check
import { execSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import enquirer from 'enquirer';
import semver from 'semver';

const { prompt } = enquirer;

/**
 * Executes a shell command synchronously, inheriting stdio by default.
 *
 * @param {string} cmd - The command to execute.
 * @param {Object} [opts={}] - Optional options to pass to execSync.
 * @returns {string} The stdout from the executed command.
 */
function run(cmd, opts = {}) {
  return execSync(cmd, { stdio: 'inherit', ...opts });
}

async function main() {
  // 1. Ensure git working tree is clean
  try {
    run('git diff-index --quiet HEAD --');
  } catch {
    console.error(
      'Git working directory not clean. Commit or stash your changes before releasing.',
    );
    process.exit(1);
  }

  // 2. Ensure on main branch
  const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
  if (branch !== 'main') {
    console.error('You must be on the main branch to release.');
    process.exit(1);
  }

  // 3. Prompt for version bump using semver
  let version = null;
  let currentVersion = null;
  if (existsSync('package.json')) {
    const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
    currentVersion = pkg.version;
  }

  if (currentVersion && semver.valid(currentVersion)) {
    /** @type {import('semver').ReleaseType[]} */
    const bumps = ['patch', 'minor', 'major'];
    const { bump } = /** @type {{bump: typeof bumps[number]}} */ (
      await prompt({
        choices: bumps,
        message: `Current version is ${currentVersion}. Select release type:`,
        name: 'bump',
        type: 'select',
      })
    );
    version = semver.inc(currentVersion, bump);
  } else {
    // fallback to manual input if version not found or invalid
    const { version: manualVersion } = /** @type {{version: string}} */ (
      await prompt({
        message: 'Enter new version (leave blank to skip version bump):',
        name: 'version',
        type: 'input',
      })
    );
    version = manualVersion && manualVersion.trim();
  }
  if (version) {
    run(`pnpm version ${version} --no-git-tag-version`);
    run(`git add package.json`);
    run(`git commit -m "chore: v${version}"`);
  }

  // 4. Run build script if defined in package.json
  if (existsSync('package.json')) {
    const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
    if (pkg.scripts && pkg.scripts.build) {
      run('pnpm run build');
    }
  }

  // 5. Publish to npm
  run('pnpm publish --access public');

  // 6. Tag and push
  if (version) {
    run(`git tag v${version}`);
    run('git push');
    run('git push --tags');
  }

  console.warn('🚀 Release complete!');
}

main();
