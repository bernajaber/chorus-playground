export function greet(name: string): string {
  return `Hello, ${name}!`;
}

if (require.main === module) {
  const name = process.argv[2] || 'World';
  console.log(greet(name));
}
