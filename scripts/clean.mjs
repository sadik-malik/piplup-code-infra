// @ts-check
import { rimraf } from 'rimraf';

const patterns = ['build', ".eslintcache"];

async function main() {
  try {
    await rimraf(patterns, { glob: true });
    process.exit(0);
  } catch (err) {
    console.error('Clean failed:', err);
    process.exit(1);
  }
}

main();
