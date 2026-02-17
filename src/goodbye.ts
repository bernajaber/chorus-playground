export function goodbyeWorld(): string {
  return 'Goodbye, World!';
}

if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.includes('--goodbye')) {
    console.log(goodbyeWorld());
  }
}
