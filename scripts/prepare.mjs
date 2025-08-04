// @ts-check
if (!process.env.CI) {
  const { default: husky } = await import('husky');
  husky();
}
