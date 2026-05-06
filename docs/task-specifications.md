# Task Specifications

This document provides detailed specifications for all four tasks in the experiment. Participants should read these carefully before implementing.

---

## Task 1: FizzBuzz

### Description
Implement the classic FizzBuzz function that takes a number and returns a string based on divisibility rules.

### Function Signature
```typescript
function fizzBuzz(num: number): string
```

### Requirements

| Input Condition | Output |
|----------------|--------|
| Divisible by both 3 and 5 | `"FizzBuzz"` |
| Divisible by 3 only | `"Fizz"` |
| Divisible by 5 only | `"Buzz"` |
| Not divisible by 3 or 5 | The number as a string |

### Edge Cases

1. **Zero**: Should return `"FizzBuzz"` (divisible by both 3 and 5)
2. **Negative numbers**: Follow the same divisibility rules
   - Example: `-15` → `"FizzBuzz"`, `-3` → `"Fizz"`, `-7` → `"-7"`
3. **Decimal numbers**: Return the number as a string
   - Example: `3.5` → `"3.5"`

### Examples

```typescript
fizzBuzz(15)  // "FizzBuzz"
fizzBuzz(3)   // "Fizz"
fizzBuzz(5)   // "Buzz"
fizzBuzz(7)   // "7"
fizzBuzz(0)   // "FizzBuzz"
fizzBuzz(-15) // "FizzBuzz"
fizzBuzz(3.5) // "3.5"
```

### Test Coverage
- 90+ test cases covering basic functionality, edge cases, and comprehensive scenarios
- Tests are pre-written and locked (cannot be modified)

---

## Task 2: Array Sum

### Description
Implement a function that calculates the sum of all numbers in an array.

### Function Signature
```typescript
function arraySum(numbers: number[]): number
```

### Requirements

1. Return the sum of all numbers in the array
2. Empty array should return `0`
3. Handle positive, negative, and floating-point numbers
4. Handle special values (`Infinity`, `-Infinity`, `NaN`)

### Edge Cases

1. **Empty array**: Return `0`
2. **Single element**: Return that element
3. **Negative numbers**: Include in sum
   - Example: `[-1, -2, -3]` → `-6`
4. **Floating-point numbers**: Handle correctly
   - Example: `[0.1, 0.2, 0.3]` → `0.6`
5. **Mixed positive and negative**: Sum correctly
   - Example: `[10, -5, 3]` → `8`
6. **Special values**:
   - `Infinity` in array → result is `Infinity`
   - `-Infinity` in array → handle appropriately
   - `NaN` in array → result is `NaN`

### Examples

```typescript
arraySum([1, 2, 3, 4, 5])     // 15
arraySum([])                  // 0
arraySum([5])                 // 5
arraySum([-1, -2, -3])        // -6
arraySum([1.5, 2.5])          // 4
arraySum([10, -5, 3])         // 8
arraySum([1, 2, Infinity])    // Infinity
arraySum([1, 2, NaN])         // NaN
```

### Test Coverage
- 60+ test cases covering basic sums, edge cases, type handling, and special values

---

## Task 3: String Reversal

### Description
Implement a function that reverses a string.

### Function Signature
```typescript
function stringReversal(str: string): string
```

### Requirements

1. Take a string input
2. Return the string with characters in reverse order
3. Empty string should return empty string
4. Non-string input should return empty string

### Edge Cases

1. **Empty string**: Return `""`
2. **Single character**: Return the same character
   - Example: `"a"` → `"a"`
3. **Spaces**: Preserve and reverse
   - Example: `"hello world"` → `"dlrow olleh"`
4. **Special characters**: Preserve and reverse
   - Example: `"hello!"` → `"!olleh"`
5. **Unicode characters**: Handle correctly (emojis, accented characters)
   - Example: `"café"` → `"éfac"`
   - Example: `"hello👋"` → `"👋olleh"`
6. **Non-string input**: Return `""`
   - Example: `null`, `undefined`, `123`, `{}` → `""`

### Examples

```typescript
stringReversal("hello")        // "olleh"
stringReversal("")             // ""
stringReversal("a")            // "a"
stringReversal("hello world")  // "dlrow olleh"
stringReversal("test@123")     // "321@tset"
stringReversal("café")         // "éfac"
stringReversal("🎉🎊🎈")        // "🎈🎊🎉"
stringReversal(null)           // ""
```

### Test Coverage
- 70+ test cases covering basic reversal, edge cases, Unicode, and type handling

---

## Task 4: Find Largest

### Description
Implement a function that finds the largest number in an array.

### Function Signature
```typescript
function findLargest(numbers: number[]): number | null
```

### Requirements

1. Take an array of numbers as input
2. Return the largest number in the array
3. Empty array should return `null`
4. Handle negative numbers, floats, and special values

### Edge Cases

1. **Empty array**: Return `null`
2. **Single element**: Return that element
   - Example: `[5]` → `5`
3. **All negative numbers**: Return the least negative
   - Example: `[-5, -10, -1]` → `-1`
4. **Mixed positive and negative**: Return the largest
   - Example: `[-10, 20, -30, 40]` → `40`
5. **Floating-point numbers**: Handle correctly
   - Example: `[1.5, 2.5, 3.5]` → `3.5`
6. **Duplicate maximum values**: Return the max
   - Example: `[9, 9, 9]` → `9`
7. **Special values**:
   - `Infinity` in array → `Infinity`
   - `-Infinity` in array → handle appropriately
   - `NaN` in array → implementation-defined behavior

### Examples

```typescript
findLargest([1, 2, 3, 4, 5])      // 5
findLargest([])                   // null
findLargest([5])                  // 5
findLargest([-5, -10, -1])        // -1
findLargest([-10, 20, -30, 40])   // 40
findLargest([1.5, 2.5, 3.5])      // 3.5
findLargest([9, 9, 9])            // 9
findLargest([1, 2, Infinity])     // Infinity
findLargest([-Infinity, 5])       // 5
```

### Test Coverage
- 80+ test cases covering basic functionality, edge cases, special values, and boundary conditions

---

## General Guidelines

### Code Quality Expectations

While these tasks are simple, your code should demonstrate:

1. **Correctness**: All tests must pass
2. **Readability**: Clear variable names and structure
3. **Efficiency**: Reasonable algorithmic choices (no need to over-optimize)
4. **Defensive programming**: Handle edge cases gracefully

### Testing Your Implementation

Before submitting each task:

```bash
# Test specific task
npm test -- taskName.test.ts

# Example:
npm test -- fizzBuzz.test.ts

# Run all tests
npm test

# Run with coverage
npm run test:coverage
```

### Time Allocation

- **Each task**: ~20 minutes
- **Total implementation time**: 80 minutes (1 hour 20 minutes)
- **Remaining time**: Buffer and submission

### Submission Checklist

For each task:

- [ ] All tests passing
- [ ] Code follows TypeScript best practices
- [ ] Function handles all edge cases
- [ ] Committed to Git with clear message
- [ ] Metadata recorded (timestamp, prompts if Group A)

---

## Forbidden Modifications

**You MAY NOT**:
- Modify test files (`src/tests/*.test.ts`)
- Change function signatures
- Add external dependencies
- Skip any test cases

**Violations will invalidate your submission.**

---

## Questions During Implementation

If task requirements are unclear:
1. Re-read the specification carefully
2. Check the test cases for clarification
3. Ask the session coordinator if still unclear

**Do not make assumptions** - ask for clarification to avoid wasted time.

---

## Good Luck!

These tasks are designed to be completed comfortably within the time limit. Focus on correctness first, then clean code. Don't overthink - straightforward solutions are perfectly acceptable!

---

**Version**: 1.0
**Experiment**: AI Code Generation Study
