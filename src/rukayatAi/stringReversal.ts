/**
 * Task 3: String Reversal
 */
export function stringReversal(str: string): string {
  if (typeof str !== "string") return "";
  if (str.length === 0) return "";

  // Spread into array to preserve Unicode/emoji characters, then reverse
  return [...str].reverse().join("");
}