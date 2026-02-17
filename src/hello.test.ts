import { helloWorld } from './hello';

test('helloWorld returns correct string', () => {
  expect(helloWorld()).toBe('Hello, World!');
});
