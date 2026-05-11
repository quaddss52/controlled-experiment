import { fizzBuzz } from '../tasks/fizzBuzz';

/**
 * Test Suite for Task 1: FizzBuzz
 *
 * DO NOT MODIFY THIS FILE
 * These tests are used to evaluate all participant submissions
 */
describe('fizzBuzz', () => {
  describe('Basic functionality', () => {
    it('should return "Fizz" for numbers divisible by 3', () => {
      expect(fizzBuzz(3)).toBe('Fizz');
      expect(fizzBuzz(6)).toBe('Fizz');
      expect(fizzBuzz(9)).toBe('Fizz');
      expect(fizzBuzz(12)).toBe('Fizz');
    });

    it('should return "Buzz" for numbers divisible by 5', () => {
      expect(fizzBuzz(5)).toBe('Buzz');
      expect(fizzBuzz(10)).toBe('Buzz');
      expect(fizzBuzz(20)).toBe('Buzz');
      expect(fizzBuzz(25)).toBe('Buzz');
    });

    it('should return "FizzBuzz" for numbers divisible by both 3 and 5', () => {
      expect(fizzBuzz(15)).toBe('FizzBuzz');
      expect(fizzBuzz(30)).toBe('FizzBuzz');
      expect(fizzBuzz(45)).toBe('FizzBuzz');
      expect(fizzBuzz(60)).toBe('FizzBuzz');
    });

    it('should return the number as a string for numbers not divisible by 3 or 5', () => {
      expect(fizzBuzz(1)).toBe('1');
      expect(fizzBuzz(2)).toBe('2');
      expect(fizzBuzz(4)).toBe('4');
      expect(fizzBuzz(7)).toBe('7');
      expect(fizzBuzz(11)).toBe('11');
    });
  });

  describe('Edge cases', () => {
    it('should return "FizzBuzz" for 0 (divisible by both 3 and 5)', () => {
      expect(fizzBuzz(0)).toBe('FizzBuzz');
    });

    it('should handle negative numbers divisible by 3', () => {
      expect(fizzBuzz(-3)).toBe('Fizz');
      expect(fizzBuzz(-6)).toBe('Fizz');
      expect(fizzBuzz(-9)).toBe('Fizz');
    });

    it('should handle negative numbers divisible by 5', () => {
      expect(fizzBuzz(-5)).toBe('Buzz');
      expect(fizzBuzz(-10)).toBe('Buzz');
      expect(fizzBuzz(-20)).toBe('Buzz');
    });

    it('should handle negative numbers divisible by both 3 and 5', () => {
      expect(fizzBuzz(-15)).toBe('FizzBuzz');
      expect(fizzBuzz(-30)).toBe('FizzBuzz');
      expect(fizzBuzz(-45)).toBe('FizzBuzz');
    });

    it('should handle negative numbers not divisible by 3 or 5', () => {
      expect(fizzBuzz(-1)).toBe('-1');
      expect(fizzBuzz(-2)).toBe('-2');
      expect(fizzBuzz(-7)).toBe('-7');
    });

    it('should handle large numbers', () => {
      expect(fizzBuzz(999)).toBe('Fizz');
      expect(fizzBuzz(1000)).toBe('Buzz');
      expect(fizzBuzz(9999)).toBe('Fizz');
      expect(fizzBuzz(10000)).toBe('Buzz');
    });

    it('should handle decimal numbers by returning them as strings', () => {
      expect(fizzBuzz(3.5)).toBe('3.5');
      expect(fizzBuzz(5.5)).toBe('5.5');
      expect(fizzBuzz(15.5)).toBe('15.5');
    });
  });

  describe('Comprehensive coverage', () => {
    it('should correctly handle a range of consecutive numbers', () => {
      const expected = [
        'FizzBuzz', '1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz',
        'Buzz', '11', 'Fizz', '13', '14', 'FizzBuzz', '16', '17', 'Fizz', '19',
        'Buzz',
      ];
      for (let i = 0; i <= 20; i++) {
        expect(fizzBuzz(i)).toBe(expected[i]);
      }
    });

    it('should handle numbers around multiples of 15', () => {
      expect(fizzBuzz(14)).toBe('14');
      expect(fizzBuzz(15)).toBe('FizzBuzz');
      expect(fizzBuzz(16)).toBe('16');
      expect(fizzBuzz(29)).toBe('29');
      expect(fizzBuzz(30)).toBe('FizzBuzz');
      expect(fizzBuzz(31)).toBe('31');
    });
  });
});
