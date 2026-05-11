/**
 * Task 2: Array Sum
 *
 * Requirements:
 * - Takes an array of numbers as input
 * - Returns the sum of all numbers in the array
 *
 * Edge Cases:
 * - Empty array should return 0
 * - Array with non-number values should ignore those values (only sum valid numbers)
 * - Array with a single element should return that element
 * - Handle negative numbers correctly
 * - Handle floating-point numbers correctly
 *
 * @param numbers - The array of numbers to sum
 * @returns The sum of all valid numbers in the array
 */
export function arraySum(numbers: number[]): number {
  // TODO: Implement this function
  let sum = 0;
  if (numbers.length === 0) {
    return sum;
  } else if (numbers.length > 0) {
    for (let i = 0; i < numbers.length; i++) {
      sum += numbers[i];
    }
    return sum; 
  }
  throw new Error("Function not implemented");
}

