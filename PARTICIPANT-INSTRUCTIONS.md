# Participant Instructions - AI Code Experiment

Welcome! This document provides complete step-by-step instructions for participating in this research study.

---

## ⏱️ Time Commitment
**Total: 2 hours** (self-timed, complete in one sitting)

---

## 📋 Before You Start

### 1. Confirm Your Participant ID
You should have received:
- **Participant ID**: (e.g., P001, P002, etc.)
- **Group Assignment**: Group A (AI-assisted) or Group B (Manual)

### 2. Required Software
Install these before starting:
- **Node.js** 18.0+ → https://nodejs.org
- **Git** 2.40+ → https://git-scm.com
- **VS Code** 1.82+ → https://code.visualstudio.com

### 3. Group-Specific Setup

**If you're in Group A (AI-assisted)**:
- Install GitHub Copilot extension in VS Code
- Ensure it's active (look for Copilot icon in bottom status bar)
- Sign in to your GitHub account

**If you're in Group B (Manual)**:
- Ensure NO AI coding tools are installed (no Copilot, Tabnine, etc.)
- You may only use official documentation (TypeScript docs, MDN, etc.)

---

## 🚀 Step-by-Step Instructions

### Step 1: Clone the Repository (5 minutes)

```bash
# Clone the experiment repository
git clone <REPOSITORY-URL>
cd ai-code-experiment

# Install dependencies
npm install

# Verify setup
bash verify-setup.sh
```

If `verify-setup.sh` shows errors, contact the researcher immediately.

---

### Step 2: Create Your Personal Branch (2 minutes)

**IMPORTANT**: Do NOT work on the `main` branch!

```bash
# Replace P001 with YOUR participant ID
git checkout -b participant/P001

# Verify you're on your branch
git branch
# You should see: * participant/P001
```

---

### Step 3: Configure Git (1 minute)

```bash
# Set your participant ID as the committer
git config user.name "Participant P001"
git config user.email "p001@experiment.study"
```

---

### Step 4: Read the Task Specifications (5 minutes)

Open and read:
- `docs/task-specifications.md` - Detailed requirements for all 4 tasks
- `docs/participant-briefing.md` - Study rules and guidelines

**The 4 Tasks are**:
1. **FizzBuzz** (20 min)
2. **Array Sum** (20 min)
3. **String Reversal** (20 min)
4. **Find Largest** (20 min)

---

### Step 5: Start the 2-Hour Timer ⏰

Once you start Task 1, the clock is running. Budget your time:
- **Tasks 1-4**: 80 minutes total (20 min each)
- **Testing & commits**: Throughout
- **Final submission**: 10 minutes
- **Buffer**: 10 minutes

---

### Step 6: Implement Task 1 - FizzBuzz (20 minutes)

#### Open the task file:
```bash
code src/tasks/fizzBuzz.ts
```

#### Read the requirements in the file comments

#### Implement the function
Replace the `throw new Error('Function not implemented')` with your solution.

#### Test your implementation:
```bash
# Run just the FizzBuzz tests
npm test -- fizzBuzz.test.ts

# Or run all tests
npm test
```

#### Commit when satisfied:
```bash
git add src/tasks/fizzBuzz.ts
git commit -m "Complete Task 1: FizzBuzz"
```

#### Record metadata (Group A only):
If you're in Group A, write down:
- All Copilot prompts you used or accepted
- Number of times you refined/adjusted suggestions
- Save this for the final metadata form

---

### Step 7: Implement Task 2 - Array Sum (20 minutes)

```bash
# Edit the file
code src/tasks/arraySum.ts

# Test
npm test -- arraySum.test.ts

# Commit
git add src/tasks/arraySum.ts
git commit -m "Complete Task 2: Array Sum"
```

---

### Step 8: Implement Task 3 - String Reversal (20 minutes)

```bash
# Edit the file
code src/tasks/stringReversal.ts

# Test
npm test -- stringReversal.test.ts

# Commit
git add src/tasks/stringReversal.ts
git commit -m "Complete Task 3: String Reversal"
```

---

### Step 9: Implement Task 4 - Find Largest (20 minutes)

```bash
# Edit the file
code src/tasks/findLargest.ts

# Test
npm test -- findLargest.test.ts

# Commit
git add src/tasks/findLargest.ts
git commit -m "Complete Task 4: Find Largest"
```

---

### Step 10: Final Testing (5 minutes)

Run all tests to verify everything works:

```bash
# Run all tests with coverage
npm run test:coverage

# The output shows your test pass rate and coverage
```

Don't worry if not all tests pass - just do your best!

---

### Step 11: Push Your Branch to GitHub (3 minutes)

```bash
# Push your branch to the repository
git push origin participant/P001

# If this is your first push, you might need:
git push -u origin participant/P001
```

**IMPORTANT**: Make sure your push succeeds! You should see:
```
To <repository-url>
 * [new branch]      participant/P001 -> participant/P001
```

---

### Step 12: Fill Out the Metadata Form (7 minutes)

You'll receive a link to a Google Form (or similar) to complete.

**You'll be asked about**:
- Your participant ID
- Group assignment
- Time spent on each task
- **Group A only**: All Copilot prompts used
- Experience level
- Post-session feedback

---

## ✅ Submission Checklist

Before you finish, verify:

- [ ] All 4 tasks have been attempted
- [ ] Each task has been committed to Git
- [ ] Your branch has been pushed to GitHub
- [ ] You can see your branch on GitHub (check the repository website)
- [ ] Metadata form has been completed
- [ ] **Group A only**: All prompts have been recorded

---

## 🚫 Common Mistakes to Avoid

1. **DON'T work on the main branch** - Always use `participant/YOUR-ID`
2. **DON'T modify test files** - Only edit files in `src/tasks/`
3. **DON'T copy code from external sources** - No Stack Overflow, no ChatGPT (unless you're Group A with Copilot)
4. **DON'T communicate with other participants** - Work independently
5. **DON'T forget to push** - Your code must be on GitHub for evaluation

---

## 🆘 Troubleshooting

### "npm install" fails
```bash
# Clear cache and retry
npm cache clean --force
npm install
```

### "git push" fails with authentication error
```bash
# You might need to authenticate with GitHub
# Follow the prompts or set up SSH keys
```

### Tests won't run
```bash
# Make sure you're in the project directory
pwd  # Should show: .../ai-code-experiment

# Reinstall dependencies
npm install

# Try again
npm test
```

### Copilot not working (Group A)
1. Check Copilot icon in VS Code bottom bar
2. Click it and ensure you're signed in
3. Restart VS Code if needed
4. Check your GitHub Copilot subscription is active

### Branch already exists
```bash
# If you need to restart, delete your branch and start over
git checkout main
git branch -D participant/P001
git checkout -b participant/P001
```

---

## 📞 Need Help?

If you encounter issues:
- **Technical problems**: [Researcher email/contact]
- **Questions about tasks**: Re-read `docs/task-specifications.md`
- **Submission issues**: Contact researcher immediately

---

## 🎯 What Happens Next?

After you submit:
1. The researcher will evaluate your code using automated tools
2. Metrics will be collected (test pass rate, complexity, coverage, etc.)
3. Your data will be anonymized and aggregated with other participants
4. Results will contribute to research on AI-assisted coding
5. You may receive a summary of findings after the study concludes

---

## 🙏 Thank You!

Your participation helps advance our understanding of AI tools in software development. Your time and effort are greatly appreciated!

---

## Quick Reference Commands

```bash
# Clone repository
git clone <REPOSITORY-URL>
cd ai-code-experiment

# Install dependencies
npm install

# Create your branch
git checkout -b participant/YOUR-ID

# Test a specific task
npm test -- fizzBuzz.test.ts

# Test all tasks
npm test

# Commit a task
git add src/tasks/TASKNAME.ts
git commit -m "Complete Task N: TASKNAME"

# Push your work
git push origin participant/YOUR-ID

# Check your branch
git branch
git log --oneline
```

---

**Version**: 1.0
**Study**: AI Code Generation Experiment
**Contact**: [Researcher contact information]
