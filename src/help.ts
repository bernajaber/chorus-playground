export interface CommandInfo {
  name: string;
  description: string;
}

export const commands: CommandInfo[] = [
  { name: 'hello', description: 'Print a hello world greeting' },
  { name: 'goodbye', description: 'Print a goodbye world message' },
  { name: 'greet', description: 'Greet a specified person by name' },
  { name: 'chorus', description: 'Show help and list all available commands' },
];

export function help(): string {
  const lines = ['Available commands:', ''];
  for (const cmd of commands) {
    lines.push(`  ${cmd.name.padEnd(10)} ${cmd.description}`);
  }
  return lines.join('\n');
}

if (require.main === module) {
  console.log(help());
}
