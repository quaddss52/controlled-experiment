/**
 * arraySum - Variation 8
 * Auto-generated for experiment
 */

export function arraySum(numbers: number[]): number {
  let sum: number = 0;

  for (let i = 0; i < numbers.length; i++) {
    const currentNumber: number = numbers[i];
    sum = sum + currentNumber;
  }

  return sum;
}
