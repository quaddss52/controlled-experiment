/**
 * Task 3: String Reversal
 *
 * Requirements:
 * - Takes a string as input
 * - Returns the string reversed (characters in reverse order)
 *
 * Edge Cases:
 * - Empty string should return an empty string
 * - Non-string input should return an empty string
 * - Single character string should return the same character
 * - Handle special characters, numbers, and spaces correctly
 * - Preserve Unicode characters (emojis, accented characters, etc.)
 *
 * @param str - The string to reverse
 * @returns The reversed string, or empty string for invalid input
 */
export function stringReversal(str: string): string {
  // TODO: Implement this function

  if (typeof str !== "string") {
    return "";
  } else if (str.length === 0) {
    return "";
  } else {
    let reversed = "";
    for (let i = str.length - 1; i >= 0; i--) {
      reversed += str[i];
    } return reversed;
  }
  throw new Error('Function not implemented');
}
