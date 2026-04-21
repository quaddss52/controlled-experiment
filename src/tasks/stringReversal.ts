/**
 * stringReversal - Variation 5
 * Auto-generated for experiment
 */

export function reverseString(str: string): string {
  if (str === '') return '';
  return reverseString(str.substr(1)) + str.charAt(0);
}
