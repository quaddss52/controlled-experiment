# 🚀 START HERE - Complete Experiment Setup

This is your entry point for running the AI Code Generation Experiment.

---

## 👤 Who Are You?

### 📚 **I'm a Researcher** → Running the experiment

**Read this sequence**:

1. **[WORKFLOW-DIAGRAM.md](WORKFLOW-DIAGRAM.md)** ⭐ START HERE
   - Visual overview of entire process
   - See exactly how submissions work
   - Understand the complete flow

2. **[REPOSITORY-SETUP.md](REPOSITORY-SETUP.md)**
   - Step-by-step GitHub setup
   - How to add participants
   - Email templates

3. **[docs/experiment-guide.md](docs/experiment-guide.md)**
   - Detailed research protocols
   - Session structure
   - Data collection methods

4. **[README.md](README.md#researcher-workflow)**
   - Technical reference
   - Available commands
   - Project structure

### 👨‍💻 **I'm a Participant** → Completing the tasks

**Read this only**:

→ **[PARTICIPANT-INSTRUCTIONS.md](PARTICIPANT-INSTRUCTIONS.md)**

This has everything you need:
- Step-by-step commands
- What to implement
- How to submit
- Troubleshooting

---

## ⚡ Quick Start (Researcher)

### Step 1: Understand the Flow (5 min)
```bash
# Read the visual workflow
open WORKFLOW-DIAGRAM.md
```

### Step 2: Set Up GitHub (30 min)
```bash
# Follow the repository setup guide
open REPOSITORY-SETUP.md

# Create repo, push code, add participants
# See detailed steps in that file
```

### Step 3: Send Invitations (15 min)
```
Use email templates in REPOSITORY-SETUP.md
Send to all 32 participants
```

### Step 4: Wait for Submissions (2-4 weeks)
```bash
# Monitor submissions
git fetch --all
git branch -r | grep participant/

# You'll see branches appear as participants submit:
# origin/participant/P001
# origin/participant/P002
# ...
```

### Step 5: Run Evaluation (2-3 hours automated)
```bash
# Fetch all participant branches
bash researcher-tools/fetch-submissions.sh

# Run automated evaluation on all participants
bash researcher-tools/evaluate-all.sh

# Results generated in results/all-metrics.csv
```

### Step 6: Analyze Results (1 week)
```bash
# Import CSV into your analysis tool
open results/all-metrics.csv

# Run t-tests, generate tables
# See docs/experiment-guide.md for analysis examples
```

---

## 📦 What's In This Repository?

### For Participants
```
src/tasks/          ← 4 functions to implement (FizzBuzz, etc.)
src/tests/          ← Pre-written tests (DO NOT MODIFY)
PARTICIPANT-INSTRUCTIONS.md  ← Complete guide
```

### For Researchers
```
researcher-tools/
├── fetch-submissions.sh  ← Download all participant branches
└── evaluate-all.sh       ← Batch evaluate all participants

docs/
├── experiment-guide.md   ← Detailed research protocols
└── task-specifications.md ← Task requirements

REPOSITORY-SETUP.md       ← GitHub setup guide
WORKFLOW-DIAGRAM.md       ← Visual workflow
```

### Configuration
```
package.json        ← Dependencies and scripts
tsconfig.json       ← TypeScript config
jest.config.js      ← Test configuration
.eslintrc.json      ← Code quality rules
sonar-project.properties  ← Security scanning config
```

---

## 🎯 The Complete Picture

```
1. YOU create GitHub repo
         ↓
2. YOU add 32 participants as collaborators
         ↓
3. PARTICIPANTS clone repo, create branches, implement tasks, push
         ↓
4. YOU run 2 automation scripts (fetch-submissions.sh + evaluate-all.sh)
         ↓
5. YOU get results/all-metrics.csv with all data
         ↓
6. YOU import to R/Python/Excel and run statistical analysis
         ↓
7. YOU publish research paper with findings
```

**Total manual work for you**:
- ✅ 1 hour setup
- ✅ 10 minutes monitoring
- ✅ 5 minutes running evaluation scripts
- ✅ Analysis time (depends on your methods)

**Everything else is automated!**

---

## 🔑 Key Files Reference

| File | Purpose | Who Uses It |
|------|---------|-------------|
| `WORKFLOW-DIAGRAM.md` | Visual overview | Researcher (READ FIRST) |
| `REPOSITORY-SETUP.md` | GitHub setup | Researcher |
| `PARTICIPANT-INSTRUCTIONS.md` | Submission guide | Participants |
| `researcher-tools/fetch-submissions.sh` | Download branches | Researcher |
| `researcher-tools/evaluate-all.sh` | Evaluate all | Researcher |
| `docs/experiment-guide.md` | Research protocols | Researcher |
| `README.md` | Technical reference | Both |

---

## ❓ Common Questions

### How do I give participants access?
→ See [REPOSITORY-SETUP.md](REPOSITORY-SETUP.md) Step 4

### How do participants submit their code?
→ They push to a branch named `participant/P001` (their ID)

### Do I need to manually run tests for each participant?
→ No! `evaluate-all.sh` does this automatically for all 32 participants

### What if a participant can't push?
→ Check they accepted the GitHub collaboration invitation

### Where do I get the final data?
→ `results/all-metrics.csv` after running `evaluate-all.sh`

### Can I test the workflow before inviting real participants?
→ Yes! See "Step 8: Test the Workflow" in REPOSITORY-SETUP.md

---

## 🚨 Before You Invite Participants

**Checklist**:
- [ ] I've read WORKFLOW-DIAGRAM.md and understand the flow
- [ ] GitHub repository is created and code is pushed
- [ ] I've tested the workflow with a test participant/branch
- [ ] I've created the metadata collection form (Google Form)
- [ ] I've prepared the participant assignment spreadsheet (who is Group A vs B)
- [ ] Participant instructions are ready to send
- [ ] I know how to run fetch-submissions.sh and evaluate-all.sh

**If all checked** → You're ready to invite participants! 🎉

---

## 📞 Need Help?

### Documentation Flow:
1. **Quick visual overview** → `WORKFLOW-DIAGRAM.md` ⭐
2. **Setup instructions** → `REPOSITORY-SETUP.md`
3. **Detailed protocols** → `docs/experiment-guide.md`
4. **Technical reference** → `README.md`

### Can't find something?
- Participant workflow → `PARTICIPANT-INSTRUCTIONS.md`
- Task requirements → `docs/task-specifications.md`
- Statistical analysis → `docs/experiment-guide.md` Section 7
- Troubleshooting → `REPOSITORY-SETUP.md` Troubleshooting section

---

## 🎓 What This Experiment Measures

Based on your implementation plan, this setup automatically collects:

### Table 2: Functional Correctness
- Test pass rate (%)
- Defect density (per KLOC)
- Code coverage (lines, statements, functions, branches)

### Table 3: Code Quality
- Average cyclomatic complexity
- Maintainability index
- Average lines per function

### Table 4: Security
- Total vulnerabilities (by severity: high/medium/low)
- Dependency risks (npm audit)

**All metrics are extracted automatically** by the evaluation scripts!

---

## ✨ Final Notes

This experiment template is designed to:
- ✅ Minimize manual work
- ✅ Automate data collection
- ✅ Ensure consistency across all 32 participants
- ✅ Provide clean data for statistical analysis
- ✅ Follow best practices for reproducible research

**Time to first results**:
- Setup: 1 hour
- Participant recruitment: 1-2 weeks
- Data collection: 2-3 weeks
- Evaluation: 2-3 hours (automated)
- Analysis: 1 week
- **Total: ~6 weeks** (as planned in your implementation plan)

---

## 🎯 Next Step

**START HERE**: [WORKFLOW-DIAGRAM.md](WORKFLOW-DIAGRAM.md)

This visual guide will show you exactly how everything works before you dive into the detailed setup.

---

**Good luck with your research!** 🚀

Questions? Check the documentation files above or contact [your contact info].

---

**Version**: 1.0
**Study**: AI Code Generation Controlled Experiment
**Participants**: 32 (16 per group)
**Tasks**: 4 algorithm implementations
**Duration**: 2 hours per participant
