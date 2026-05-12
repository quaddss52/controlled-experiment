export function fizzBuzz(num: number): string {
  if (!Number.isInteger(num)) return String(num);

  if (num % 15 === 0) return "FizzBuzz";
  if (num % 3 === 0) return "Fizz";
  if (num % 5 === 0) return "Buzz";

  return String(num);
}