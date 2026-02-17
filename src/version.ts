// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require('../package.json');

export function getVersion(): string {
  return pkg.version as string;
}

if (require.main === module) {
  console.log(getVersion());
}
