import { help, commands } from './help';

test('help returns string containing "Available commands:"', () => {
  expect(help()).toContain('Available commands:');
});

test('help lists all commands', () => {
  const output = help();
  for (const cmd of commands) {
    expect(output).toContain(cmd.name);
    expect(output).toContain(cmd.description);
  }
});

test('commands array includes hello, goodbye, greet, chorus', () => {
  const names = commands.map((c) => c.name);
  expect(names.length).toBe(4);
  expect(names).toContain('hello');
  expect(names).toContain('goodbye');
  expect(names).toContain('greet');
  expect(names).toContain('chorus');
});
