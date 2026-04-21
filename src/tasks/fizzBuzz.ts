/**
 * fizzBuzz - Variation 3
 * Auto-generated for experiment
 */

export function fizzBuzz(num: number): string {
  let result = '';
  if (num % 3 === 0) result += 'Fizz';
  if (num % 5 === 0) result += 'Buzz';
  return result || String(num);
}
