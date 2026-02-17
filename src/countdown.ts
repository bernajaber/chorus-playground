export function countdown(n: number): number[] {
  const result: number[] = [];
  for (let i = n; i >= 0; i--) {
    result.push(i);
  }
  return result;
}

if (require.main === module) {
  const n = parseInt(process.argv[2] || '10', 10);
  console.log(countdown(n).join(', '));
}
