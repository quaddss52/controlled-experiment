/**
 * findLargest - Variation 2
 * Auto-generated for experiment
 */

export function findLargest(numbers: number[]): number {
  let largest = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] > largest) {
      largest = numbers[i];
    }
  }
  return largest;
}
