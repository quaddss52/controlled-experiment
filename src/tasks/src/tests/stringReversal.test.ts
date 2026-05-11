import { stringReversal } from '../tasks/stringReversal';

/**
 * Test Suite for Task 3: String Reversal
 *
 * DO NOT MODIFY THIS FILE
 * These tests are used to evaluate all participant submissions
 */
describe('stringReversal', () => {
  describe('Basic functionality', () => {
    it('should reverse simple strings', () => {
      expect(stringReversal('hello')).toBe('olleh');
      expect(stringReversal('world')).toBe('dlrow');
      expect(stringReversal('typescript')).toBe('tpircsepyt');
    });

    it('should handle single character strings', () => {
      expect(stringReversal('a')).toBe('a');
      expect(stringReversal('z')).toBe('z');
      expect(stringReversal('1')).toBe('1');
    });

    it('should handle two character strings', () => {
      expect(stringReversal('ab')).toBe('ba');
      expect(stringReversal('12')).toBe('21');
    });
  });

  describe('Edge cases', () => {
    it('should return empty string for empty input', () => {
      expect(stringReversal('')).toBe('');
    });

    it('should handle strings with spaces', () => {
      expect(stringReversal('hello world')).toBe('dlrow olleh');
      expect(stringReversal('a b c')).toBe('c b a');
      expect(stringReversal('   ')).toBe('   ');
    });

    it('should handle strings with special characters', () => {
      expect(stringReversal('hello!')).toBe('!olleh');
      expect(stringReversal('test@123')).toBe('321@tset');
      expect(stringReversal('a-b-c')).toBe('c-b-a');
      expect(stringReversal('!@#$%')).toBe('%$#@!');
    });

    it('should handle numeric strings', () => {
      expect(stringReversal('12345')).toBe('54321');
      expect(stringReversal('0')).toBe('0');
      expect(stringReversal('999')).toBe('999');
    });

    it('should handle strings with mixed case', () => {
      expect(stringReversal('Hello')).toBe('olleH');
      expect(stringReversal('TeSt')).toBe('tSeT');
      expect(stringReversal('UPPERCASE')).toBe('ESACREPPU');
    });

    it('should handle palindromes', () => {
      expect(stringReversal('racecar')).toBe('racecar');
      expect(stringReversal('level')).toBe('level');
      expect(stringReversal('noon')).toBe('noon');
    });
  });

  describe('Unicode and special characters', () => {
    it('should handle strings with accented characters', () => {
      expect(stringReversal('café')).toBe('éfac');
      expect(stringReversal('naïve')).toBe('evïan');
    });

    it('should handle strings with emojis', () => {
      expect(stringReversal('hello👋')).toBe('👋olleh');
      expect(stringReversal('🎉🎊🎈')).toBe('🎈🎊🎉');
    });

    it('should handle strings with newlines and tabs', () => {
      expect(stringReversal('hello\nworld')).toBe('dlrow\nolleh');
      expect(stringReversal('a\tb\tc')).toBe('c\tb\ta');
    });
  });

  describe('Type handling', () => {
    it('should return empty string for non-string input (if type coercion occurs)', () => {
      // TypeScript should prevent this, but testing runtime behavior
      // These tests verify defensive programming
      expect(stringReversal(null as unknown as string)).toBe('');
      expect(stringReversal(undefined as unknown as string)).toBe('');
      expect(stringReversal(123 as unknown as string)).toBe('');
      expect(stringReversal({} as unknown as string)).toBe('');
      expect(stringReversal([] as unknown as string)).toBe('');
    });
  });

  describe('Comprehensive coverage', () => {
    it('should handle long strings', () => {
      const longString = 'a'.repeat(1000);
      const reversed = stringReversal(longString);
      expect(reversed).toBe(longString); // Palindrome
      expect(reversed.length).toBe(1000);
    });

    it('should handle strings with repeated characters', () => {
      expect(stringReversal('aaa')).toBe('aaa');
      expect(stringReversal('ababa')).toBe('ababa');
      expect(stringReversal('aabbcc')).toBe('ccbbaa');
    });

    it('should handle strings with leading/trailing spaces', () => {
      expect(stringReversal(' hello')).toBe('olleh ');
      expect(stringReversal('hello ')).toBe(' olleh');
      expect(stringReversal(' hello ')).toBe(' olleh ');
    });

    it('should handle complex mixed content', () => {
      expect(stringReversal('Test 123 !@#')).toBe('#@! 321 tseT');
      expect(stringReversal('a1b2c3')).toBe('3c2b1a');
    });

    it('should handle strings with consecutive spaces', () => {
      expect(stringReversal('a  b  c')).toBe('c  b  a');
      expect(stringReversal('hello    world')).toBe('dlrow    olleh');
    });
  });

  describe('Performance and edge cases', () => {
    it('should handle very short strings efficiently', () => {
      expect(stringReversal('ab')).toBe('ba');
      expect(stringReversal('a')).toBe('a');
    });

    it('should maintain exact character positions', () => {
      const original = 'The quick brown fox jumps over the lazy dog';
      const reversed = 'god yzal eht revo spmuj xof nworb kciuq ehT';
      expect(stringReversal(original)).toBe(reversed);
    });
  });
});
