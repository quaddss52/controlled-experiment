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
  if (str === null || str === undefined || typeof str !== "string") {
    return "";
  } else if (str.length === 1) {
    return str;
  } else {
    let reversedString = "";
    for (let i = str.length - 1; i >= 0; i--) {
      reversedString += str[i];
    }
    return reversedString;
  }
}
