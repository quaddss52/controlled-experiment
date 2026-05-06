import { arraySum } from '../tasks/arraySum';

/**
 * Test Suite for Task 2: Array Sum
 *
 * DO NOT MODIFY THIS FILE
 * These tests are used to evaluate all participant submissions
 */
describe('arraySum', () => {
  describe('Basic functionality', () => {
    it('should return the sum of positive numbers', () => {
      expect(arraySum([1, 2, 3, 4, 5])).toBe(15);
      expect(arraySum([10, 20, 30])).toBe(60);
      expect(arraySum([100, 200])).toBe(300);
    });

    it('should handle arrays with a single element', () => {
      expect(arraySum([5])).toBe(5);
      expect(arraySum([42])).toBe(42);
      expect(arraySum([0])).toBe(0);
    });

    it('should handle arrays with two elements', () => {
      expect(arraySum([1, 2])).toBe(3);
      expect(arraySum([10, 20])).toBe(30);
    });
  });

  describe('Edge cases', () => {
    it('should return 0 for an empty array', () => {
      expect(arraySum([])).toBe(0);
    });

    it('should handle negative numbers', () => {
      expect(arraySum([-1, -2, -3])).toBe(-6);
      expect(arraySum([-10, -20, -30])).toBe(-60);
    });

    it('should handle mixed positive and negative numbers', () => {
      expect(arraySum([1, -1, 2, -2])).toBe(0);
      expect(arraySum([10, -5, 3, -2])).toBe(6);
      expect(arraySum([-10, 20, -5, 15])).toBe(20);
    });

    it('should handle floating-point numbers', () => {
      expect(arraySum([1.5, 2.5, 3.5])).toBe(7.5);
      expect(arraySum([0.1, 0.2, 0.3])).toBeCloseTo(0.6, 10);
      expect(arraySum([10.75, 20.25])).toBe(31);
    });

    it('should handle zero values', () => {
      expect(arraySum([0, 0, 0])).toBe(0);
      expect(arraySum([1, 0, 2, 0, 3])).toBe(6);
    });

    it('should handle arrays with very large numbers', () => {
      expect(arraySum([1000000, 2000000, 3000000])).toBe(6000000);
      expect(arraySum([Number.MAX_SAFE_INTEGER, 0])).toBe(Number.MAX_SAFE_INTEGER);
    });

    it('should handle arrays with very small numbers', () => {
      expect(arraySum([0.001, 0.002, 0.003])).toBeCloseTo(0.006, 10);
      expect(arraySum([Number.MIN_VALUE, Number.MIN_VALUE])).toBeCloseTo(
        Number.MIN_VALUE * 2,
        100
      );
    });
  });

  describe('Comprehensive coverage', () => {
    it('should correctly sum a large array', () => {
      const largeArray = Array.from({ length: 100 }, (_, i) => i + 1);
      expect(arraySum(largeArray)).toBe(5050); // Sum of 1 to 100
    });

    it('should handle alternating positive and negative numbers', () => {
      expect(arraySum([1, -1, 1, -1, 1, -1])).toBe(0);
      expect(arraySum([5, -3, 5, -3, 5])).toBe(9);
    });

    it('should handle arrays with duplicate values', () => {
      expect(arraySum([5, 5, 5, 5])).toBe(20);
      expect(arraySum([1, 1, 1, 1, 1, 1, 1, 1, 1, 1])).toBe(10);
    });

    it('should handle mixed integers and floats', () => {
      expect(arraySum([1, 2.5, 3, 4.5])).toBe(11);
      expect(arraySum([10, 20.25, 30, 40.75])).toBe(101);
    });

    it('should handle negative floats', () => {
      expect(arraySum([-1.5, -2.5, -3.5])).toBe(-7.5);
      expect(arraySum([-0.1, -0.2, -0.3])).toBeCloseTo(-0.6, 10);
    });
  });

  describe('Type handling', () => {
    it('should handle arrays containing only zeros', () => {
      expect(arraySum([0])).toBe(0);
      expect(arraySum([0, 0])).toBe(0);
      expect(arraySum([0, 0, 0, 0, 0])).toBe(0);
    });

    it('should handle number arrays with Infinity', () => {
      expect(arraySum([1, 2, Infinity])).toBe(Infinity);
      expect(arraySum([Infinity, Infinity])).toBe(Infinity);
      expect(arraySum([-Infinity, -Infinity])).toBe(-Infinity);
    });

    it('should handle arrays with NaN values by producing NaN result', () => {
      expect(arraySum([1, 2, NaN])).toBeNaN();
      expect(arraySum([NaN])).toBeNaN();
    });
  });
});
