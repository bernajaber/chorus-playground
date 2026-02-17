import { greet } from './greet';

test('greet returns correct string', () => {
  expect(greet('Alice')).toBe('Hello, Alice!');
});
