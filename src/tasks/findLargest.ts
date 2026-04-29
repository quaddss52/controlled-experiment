/**
 * findLargest - Variation 6
 * Auto-generated for experiment
 */

export function findLargest(numbers: number[]): number {
  let largest = numbers[0];
  numbers.forEach(num => {
    if (num > largest) {
      largest = num;
    }
  });
  return largest;
}
