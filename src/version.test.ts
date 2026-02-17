import { getVersion } from './version';

test('getVersion returns version from package.json', () => {
  expect(getVersion()).toBe('1.0.0');
});
