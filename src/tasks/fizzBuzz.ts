/**
 * Task 1: FizzBuzz
 *
 * Requirements:
 * - Takes a number as input
 * - Returns "Fizz" if the number is divisible by 3
 * - Returns "Buzz" if the number is divisible by 5
 * - Returns "FizzBuzz" if the number is divisible by both 3 and 5
 * - Returns the number as a string if none of the above conditions are met
 *
 * Edge Cases:
 * - Numbers divisible by both 3 and 5 (e.g., 15, 30, 45)
 * - Non-integer inputs should return the number as a string
 * - Zero should return "FizzBuzz" (divisible by both 3 and 5)
 * - Negative numbers follow the same rules
 *
 * @param num - The number to evaluate
 * @returns "Fizz", "Buzz", "FizzBuzz", or the number as a string
 */
export function fizzBuzz(num: number): string {
  if (num % 5 === 0 && num % 3 === 0) {
    return "FizzBuzz";
  } else if (num % 3 === 0) {
    return "Fizz";
  } else if (num % 5 === 0) {
    return "Buzz";
  } else {
    return num.toString();
  }
}
