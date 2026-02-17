import { goodbyeWorld } from './goodbye';

test('goodbyeWorld returns correct string', () => {
  expect(goodbyeWorld()).toBe('Goodbye, World!');
});
