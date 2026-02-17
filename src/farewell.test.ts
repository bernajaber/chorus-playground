import { farewell } from './farewell';

test('farewell returns correct string', () => {
  expect(farewell('Alice')).toBe('Goodbye, Alice! See you later.');
});
