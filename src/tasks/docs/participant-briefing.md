# Participant Briefing Document

## Welcome to the AI Code Generation Study

Thank you for participating in this research experiment. This study compares AI-assisted and manually written TypeScript code to measure differences in quality, security, and maintainability.

---

## Study Overview

- **Duration**: 2 hours
- **Tasks**: 4 simple algorithm implementations
- **Language**: TypeScript (Node.js)
- **Environment**: Visual Studio Code

---

## Your Assignment

You have been randomly assigned to one of two groups:

### Group A: AI-Assisted Development
- **Tool**: GitHub Copilot (enabled in VS Code)
- **Allowed**: Use Copilot suggestions freely
- **Required**: Record every prompt you use or accept

### Group B: Manual Development
- **Tool**: No AI assistance
- **Not Allowed**: GitHub Copilot, ChatGPT, Claude, or any AI coding tools
- **Allowed**: Official documentation (TypeScript, Node.js, MDN)

---

## The Four Tasks

Each task is a straightforward function implementation. You have approximately **20 minutes per task**.

### Task 1: FizzBuzz
Implement a function that returns:
- "Fizz" for numbers divisible by 3
- "Buzz" for numbers divisible by 5
- "FizzBuzz" for numbers divisible by both
- The number as a string otherwise

### Task 2: Array Sum
Implement a function that:
- Takes an array of numbers
- Returns the sum of all numbers
- Returns 0 for empty arrays

### Task 3: String Reversal
Implement a function that:
- Takes a string input
- Returns the string reversed
- Returns empty string for invalid input

### Task 4: Find Largest
Implement a function that:
- Takes an array of numbers
- Returns the largest number
- Returns null for empty arrays

---

## Session Structure

| Time          | Activity                                    |
|---------------|---------------------------------------------|
| 0:00 - 0:10   | Briefing and questions                      |
| 0:10 - 0:20   | Environment verification                    |
| 0:20 - 1:40   | Task implementation (4 tasks × 20 min)      |
| 1:40 - 1:50   | Submission and metadata form                |
| 1:50 - 2:00   | Debrief and exit questions                  |

---

## Rules and Guidelines

### What You MAY Do:
✅ Reference official documentation (MDN, TypeScript docs, Node.js docs)
✅ Use VS Code features (autocomplete, syntax highlighting)
✅ Test your code with the provided Jest tests
✅ Take short breaks between tasks

### What You MAY NOT Do:
❌ Copy code from Stack Overflow or external sources
❌ Use AI tools if in Group B
❌ Communicate with other participants
❌ Modify the pre-written test files
❌ Spend more than the allocated time per task (unless explicitly allowed)

---

## Submission Requirements

After each task, you must:

1. **Commit your code** to Git with a clear message:
   ```bash
   git add src/tasks/[taskName].ts
   git commit -m "Complete Task [N]: [Task Name]"
   ```

2. **Record metadata** including:
   - Participant ID
   - Task number
   - Timestamp
   - Git commit hash
   - For Group A only: Prompts used and refinement iterations

3. **Run tests** to verify your implementation:
   ```bash
   npm test
   ```

---

## Evaluation Criteria

Your code will be evaluated on:

### Functional Correctness
- Test pass rate
- Defect density
- Code coverage

### Code Quality
- Cyclomatic complexity
- Maintainability index
- Lines per function

### Security
- Vulnerabilities (SonarQube)
- Dependency risks (npm audit)

**Note**: These metrics are collected automatically. Focus on writing correct, clean code.

---

## Technical Setup Checklist

Before starting, verify:

- [ ] Node.js 18.0+ installed
- [ ] VS Code 1.82+ installed
- [ ] Git 2.40+ installed
- [ ] Repository cloned and dependencies installed (`npm install`)
- [ ] **Group A only**: GitHub Copilot extension active
- [ ] **Group B only**: No AI extensions installed/enabled

---

## Tips for Success

1. **Read the requirements carefully** - Each task includes edge cases
2. **Test frequently** - Run `npm test` to check your progress
3. **Keep it simple** - These are straightforward algorithms
4. **Don't overthink** - You have enough time for each task
5. **Group A**: Record your prompts as you go (don't try to remember later)

---

## Questions?

If you have any questions during the session:
- Ask the session coordinator before starting
- Technical issues should be reported immediately
- Clarifications about task requirements are allowed

---

## After the Session

You will be asked to complete a short exit survey about:
- Difficulty perception
- Time allocation
- Tool helpfulness (Group A)
- General feedback

Your responses help improve future research!

---

## Confidentiality and Ethics

- Your individual results will remain confidential
- Data will be anonymized for publication
- You may withdraw at any time
- Results will contribute to academic research on AI-assisted coding

---

## Thank You

Your participation helps advance our understanding of AI tools in software development. Good luck!

---

**Study Contact**: [Your contact information]
**IRB Approval**: [If applicable]
**Version**: 1.0
