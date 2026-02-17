import { countdown } from './countdown';

test('countdown(5) returns [5, 4, 3, 2, 1, 0]', () => {
  expect(countdown(5)).toEqual([5, 4, 3, 2, 1, 0]);
});

test('countdown(0) returns [0]', () => {
  expect(countdown(0)).toEqual([0]);
});

test('countdown(3) returns [3, 2, 1, 0]', () => {
  expect(countdown(3)).toEqual([3, 2, 1, 0]);
});
