import { findLargest } from '../tasks/findLargest';

/**
 * Test Suite for Task 4: Find Largest
 *
 * DO NOT MODIFY THIS FILE
 * These tests are used to evaluate all participant submissions
 */
describe('findLargest', () => {
  describe('Basic functionality', () => {
    it('should return the largest number from positive integers', () => {
      expect(findLargest([1, 2, 3, 4, 5])).toBe(5);
      expect(findLargest([10, 20, 30, 40])).toBe(40);
      expect(findLargest([5, 1, 9, 3, 7])).toBe(9);
    });

    it('should handle arrays with two elements', () => {
      expect(findLargest([1, 2])).toBe(2);
      expect(findLargest([10, 5])).toBe(10);
      expect(findLargest([7, 7])).toBe(7);
    });

    it('should handle single-element arrays', () => {
      expect(findLargest([5])).toBe(5);
      expect(findLargest([42])).toBe(42);
      expect(findLargest([0])).toBe(0);
      expect(findLargest([-5])).toBe(-5);
    });
  });

  describe('Edge cases', () => {
    it('should return null for empty arrays', () => {
      expect(findLargest([])).toBeNull();
    });

    it('should handle all negative numbers', () => {
      expect(findLargest([-1, -2, -3, -4, -5])).toBe(-1);
      expect(findLargest([-10, -20, -30])).toBe(-10);
      expect(findLargest([-5, -1, -9, -3, -7])).toBe(-1);
    });

    it('should handle mixed positive and negative numbers', () => {
      expect(findLargest([1, -1, 2, -2])).toBe(2);
      expect(findLargest([-10, 20, -30, 40])).toBe(40);
      expect(findLargest([-5, -10, 0, -1])).toBe(0);
    });

    it('should handle floating-point numbers', () => {
      expect(findLargest([1.5, 2.5, 3.5])).toBe(3.5);
      expect(findLargest([0.1, 0.2, 0.3])).toBe(0.3);
      expect(findLargest([10.75, 20.25, 15.5])).toBe(20.25);
    });

    it('should handle arrays with duplicate maximum values', () => {
      expect(findLargest([5, 5, 5])).toBe(5);
      expect(findLargest([1, 9, 9, 9, 2])).toBe(9);
      expect(findLargest([10, 10])).toBe(10);
    });

    it('should handle zero values', () => {
      expect(findLargest([0, 0, 0])).toBe(0);
      expect(findLargest([-5, 0, -3])).toBe(0);
      expect(findLargest([0, 1, 2])).toBe(2);
    });
  });

  describe('Special numeric values', () => {
    it('should handle Infinity', () => {
      expect(findLargest([1, 2, Infinity])).toBe(Infinity);
      expect(findLargest([Infinity, Infinity])).toBe(Infinity);
      expect(findLargest([Infinity, 1000000])).toBe(Infinity);
    });

    it('should handle -Infinity', () => {
      expect(findLargest([-Infinity, -1, -2])).toBe(-1);
      expect(findLargest([-Infinity, -Infinity])).toBe(-Infinity);
      expect(findLargest([-Infinity, 0])).toBe(0);
    });

    it('should handle both Infinity and -Infinity', () => {
      expect(findLargest([Infinity, -Infinity])).toBe(Infinity);
      expect(findLargest([-Infinity, Infinity, 0])).toBe(Infinity);
    });

    it('should handle NaN values', () => {
      // NaN comparisons are tricky - this tests how implementation handles NaN
      const result = findLargest([1, 2, NaN, 3]);
      // NaN should either be ignored or handled according to implementation
      expect(result).toBeDefined();
    });

    it('should handle very large numbers', () => {
      expect(findLargest([Number.MAX_SAFE_INTEGER, 1000000])).toBe(
        Number.MAX_SAFE_INTEGER
      );
      expect(findLargest([Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER])).toBe(
        Number.MAX_SAFE_INTEGER
      );
    });

    it('should handle very small numbers', () => {
      expect(findLargest([Number.MIN_VALUE, 0])).toBe(Number.MIN_VALUE);
      expect(findLargest([Number.MIN_VALUE, Number.MIN_VALUE * 2])).toBe(
        Number.MIN_VALUE * 2
      );
    });
  });

  describe('Comprehensive coverage', () => {
    it('should handle large arrays', () => {
      const largeArray = Array.from({ length: 1000 }, (_, i) => i);
      expect(findLargest(largeArray)).toBe(999);
    });

    it('should handle arrays where largest is at different positions', () => {
      expect(findLargest([9, 1, 2, 3])).toBe(9); // First position
      expect(findLargest([1, 9, 2, 3])).toBe(9); // Second position
      expect(findLargest([1, 2, 9, 3])).toBe(9); // Middle position
      expect(findLargest([1, 2, 3, 9])).toBe(9); // Last position
    });

    it('should handle mixed integers and floats', () => {
      expect(findLargest([1, 2.5, 3, 4.5])).toBe(4.5);
      expect(findLargest([10, 20.25, 30, 40.75])).toBe(40.75);
      expect(findLargest([1.1, 1.2, 1, 2])).toBe(2);
    });

    it('should handle negative floats', () => {
      expect(findLargest([-1.5, -2.5, -3.5])).toBe(-1.5);
      expect(findLargest([-0.1, -0.2, -0.3])).toBe(-0.1);
    });

    it('should handle arrays with all identical values', () => {
      expect(findLargest([7, 7, 7, 7, 7])).toBe(7);
      expect(findLargest([-3, -3, -3])).toBe(-3);
    });

    it('should handle unsorted arrays', () => {
      expect(findLargest([5, 2, 8, 1, 9, 3])).toBe(9);
      expect(findLargest([100, 50, 150, 25, 75])).toBe(150);
    });

    it('should handle descending sorted arrays', () => {
      expect(findLargest([9, 8, 7, 6, 5])).toBe(9);
      expect(findLargest([100, 90, 80, 70])).toBe(100);
    });

    it('should handle ascending sorted arrays', () => {
      expect(findLargest([1, 2, 3, 4, 5])).toBe(5);
      expect(findLargest([10, 20, 30, 40])).toBe(40);
    });
  });

  describe('Boundary conditions', () => {
    it('should handle arrays with maximum and minimum safe integers', () => {
      expect(
        findLargest([Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER])
      ).toBe(Number.MAX_SAFE_INTEGER);
    });

    it('should handle arrays with very close floating-point values', () => {
      expect(findLargest([1.0000001, 1.0000002, 1.0000003])).toBe(1.0000003);
    });

    it('should handle arrays with alternating signs', () => {
      expect(findLargest([1, -1, 2, -2, 3, -3])).toBe(3);
      expect(findLargest([-1, 1, -2, 2, -3, 3])).toBe(3);
    });
  });
});
