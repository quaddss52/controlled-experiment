/**
 * Task 4: Find Largest
 *
 * Requirements:
 * - Takes an array of numbers as input
 * - Returns the largest number in the array
 *
 * Edge Cases:
 * - Empty array should return nullgit
 * - Single-item array should return that item
 * - Handle negative numbers correctly (e.g., [-5, -10, -1] returns -1)
 * - Handle floating-point numbers correctly
 * - Handle arrays with duplicate maximum values (return the maximum value)
 * - Handle arrays containing Infinity or -Infinity
 *
 * @param numbers - The array of numbers to search
 * @returns The largest number in the array, or null if the array is empty
 */
export function findLargest(numbers: number[]): number | null {
  // TODO: Implement this function
  return Math.max(...numbers);
  // throw new Error("Function not implemented");
}
