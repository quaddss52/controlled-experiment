/**
 * Task 2: Array Sum
 */
export function arraySum(numbers: number[]): number {
  if (!Array.isArray(numbers) || numbers.length === 0) return 0;

  return numbers.reduce((sum, val) => {
    return typeof val === "number" && !isNaN(val) ? sum + val : sum;
  }, 0);
}