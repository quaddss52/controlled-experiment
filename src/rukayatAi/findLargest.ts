/**
 * Task 4: Find Largest
 */
export function findLargest(numbers: number[]): number | null {
  if (!Array.isArray(numbers) || numbers.length === 0) return null;

  return numbers.reduce((largest, val) => {
    return val > largest ? val : largest;
  }, numbers[0]);
}