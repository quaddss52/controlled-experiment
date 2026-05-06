# Complete Experiment Workflow - Visual Guide

This document provides a visual, step-by-step guide for running the entire experiment.

---

## 📊 Overview Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     RESEARCHER SETUP (You)                       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
    ┌─────────────────────────────────────────────────────┐
    │ 1. Create GitHub Repo                                │
    │ 2. Push code to GitHub                               │
    │ 3. Add 32 participants as collaborators              │
    │ 4. Send participant instructions                     │
    └─────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│              PARTICIPANT WORK (Async/Independent)                │
└─────────────────────────────────────────────────────────────────┘
                              │
            ┌─────────────────┴─────────────────┐
            │                                   │
            ▼                                   ▼
    ┌──────────────┐                    ┌──────────────┐
    │ Participant  │                    │ Participant  │
    │     P001     │                    │     P032     │
    │  (Group A)   │       ...          │  (Group B)   │
    └──────────────┘                    └──────────────┘
            │                                   │
            ▼                                   ▼
    1. Clone repo                       1. Clone repo
    2. Create branch:                   2. Create branch:
       participant/P001                    participant/P032
    3. Complete 4 tasks                 3. Complete 4 tasks
    4. Push branch to GitHub            4. Push branch to GitHub
    5. Fill metadata form               5. Fill metadata form
            │                                   │
            └─────────────────┬─────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                   GITHUB REPOSITORY STATE                        │
└─────────────────────────────────────────────────────────────────┘
│
│   main
│   ├── participant/P001  ← Group A submission
│   ├── participant/P002  ← Group B submission
│   ├── participant/P003  ← Group A submission
│   ├── ...
│   └── participant/P032  ← Group B submission
│
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│            RESEARCHER EVALUATION (Automated)                     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
    ┌─────────────────────────────────────────────────────┐
    │ Step 1: Fetch all branches                          │
    │   $ bash researcher-tools/fetch-submissions.sh      │
    │                                                      │
    │   Downloads all 32 participant branches to local    │
    └─────────────────────────────────────────────────────┘
                              │
                              ▼
    ┌─────────────────────────────────────────────────────┐
    │ Step 2: Run batch evaluation                        │
    │   $ bash researcher-tools/evaluate-all.sh           │
    │                                                      │
    │   For each participant (P001-P032):                 │
    │     • Checkout their branch                         │
    │     • Run Jest tests + coverage                     │
    │     • Run ESLint analysis                           │
    │     • Run npm audit                                 │
    │     • Extract metrics                               │
    │     • Append to CSV                                 │
    └─────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     RESULTS GENERATED                            │
└─────────────────────────────────────────────────────────────────┘
│
│   results/
│   ├── all-metrics.csv           ← Master dataset (32 rows)
│   ├── P001/
│   │   ├── coverage/
│   │   ├── eslint-report.json
│   │   └── npm-audit.json
│   ├── P002/
│   │   ├── coverage/
│   │   ├── eslint-report.json
│   │   └── npm-audit.json
│   ├── ...
│   └── P032/
│       ├── coverage/
│       ├── eslint-report.json
│       └── npm-audit.json
│
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                  STATISTICAL ANALYSIS (You)                      │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
    ┌─────────────────────────────────────────────────────┐
    │ 1. Open results/all-metrics.csv                     │
    │ 2. Import into R, Python, or Excel                  │
    │ 3. Run t-tests (Group A vs Group B)                 │
    │ 4. Generate tables for paper                        │
    │ 5. Publish results                                  │
    └─────────────────────────────────────────────────────┘
```

---

## 🔄 Detailed Workflow Timeline

### Phase 1: Researcher Setup (Week 1) - You

| Step | Action | Command | Where |
|------|--------|---------|-------|
| 1 | Create GitHub repository | `gh repo create ai-code-experiment --private` | GitHub.com |
| 2 | Push code to GitHub | `git push origin main` | Your terminal |
| 3 | Add participants | GitHub Settings → Collaborators | GitHub.com |
| 4 | Prepare metadata form | Create Google Form | Google Forms |
| 5 | Send invitations | Email participants | Your email |

**Deliverables**: Repository live, participants invited

---

### Phase 2: Participant Submissions (Weeks 2-4) - Participants

Each participant independently does this:

```bash
# 1. Clone repository
git clone https://github.com/YOUR-USERNAME/ai-code-experiment.git
cd ai-code-experiment

# 2. Install dependencies
npm install

# 3. Create personal branch
git checkout -b participant/P001

# 4. Configure Git
git config user.name "Participant P001"
git config user.email "p001@experiment.study"

# 5. Start timer (2 hours)

# 6. Implement Task 1
# Edit: src/tasks/fizzBuzz.ts
npm test -- fizzBuzz.test.ts
git add src/tasks/fizzBuzz.ts
git commit -m "Complete Task 1: FizzBuzz"

# 7. Implement Task 2
# Edit: src/tasks/arraySum.ts
npm test -- arraySum.test.ts
git add src/tasks/arraySum.ts
git commit -m "Complete Task 2: Array Sum"

# 8. Implement Task 3
# Edit: src/tasks/stringReversal.ts
npm test -- stringReversal.test.ts
git add src/tasks/stringReversal.ts
git commit -m "Complete Task 3: String Reversal"

# 9. Implement Task 4
# Edit: src/tasks/findLargest.ts
npm test -- findLargest.test.ts
git add src/tasks/findLargest.ts
git commit -m "Complete Task 4: Find Largest"

# 10. Push to GitHub
git push origin participant/P001

# 11. Fill metadata form
# [Link provided by researcher]
```

**Result**: 32 participant branches on GitHub

---

### Phase 3: Batch Evaluation (Week 5) - You

```bash
# Step 1: Fetch all submissions from GitHub
bash researcher-tools/fetch-submissions.sh

# Output:
# ========================================
# Fetching All Participant Submissions
# ========================================
#
# [1/3] Fetching all branches from remote...
# [2/3] Participant branches found:
#   ✓ Found: P001 (branch: participant/P001)
#   ✓ Found: P002 (branch: participant/P002)
#   ...
#   ✓ Found: P032 (branch: participant/P032)
#
# Total: 32 participant submission(s)
#
# [3/3] Creating local tracking branches...
#   ✓ Created: P001
#   ✓ Created: P002
#   ...
#   ✓ Created: P032

# Step 2: Run automated evaluation
bash researcher-tools/evaluate-all.sh

# Output:
# ========================================
# Batch Evaluation - All Participants
# ========================================
#
# Found 32 participant submission(s) to evaluate
#
# [1/32] Evaluating: P001
# Checking out branch: participant/P001
# Latest commit: abc123
#   [1/3] Running tests...
#   [2/3] Running ESLint...
#   [3/3] Running npm audit...
# ✓ Evaluation complete for P001
#   Test Pass Rate: 95.5%
#   Coverage (Lines): 92.3%
#
# [2/32] Evaluating: P002
# ...
#
# ========================================
# Batch Evaluation Complete
# ========================================
# ✓ Evaluated 32 participant(s)
#
# Results:
#   - Aggregated CSV: results/all-metrics.csv
#   - Individual results: results/[participant-id]/

# Step 3: Review results
cat results/all-metrics.csv
# or
open results/all-metrics.csv
```

**Result**: All metrics collected and aggregated

---

### Phase 4: Statistical Analysis (Week 6) - You

```python
# Example: Python with pandas
import pandas as pd
from scipy import stats

# Load data
df = pd.read_csv('results/all-metrics.csv')

# Separate groups
group_a = df[df['Group'] == 'A']  # AI-assisted
group_b = df[df['Group'] == 'B']  # Manual

# Compare test pass rates
t_stat, p_value = stats.ttest_ind(
    group_a['TestPassRate'],
    group_b['TestPassRate']
)

print(f"Test Pass Rate:")
print(f"  Group A: {group_a['TestPassRate'].mean():.2f}% ± {group_a['TestPassRate'].std():.2f}")
print(f"  Group B: {group_b['TestPassRate'].mean():.2f}% ± {group_b['TestPassRate'].std():.2f}")
print(f"  p-value: {p_value:.4f}")
print(f"  Significant: {'Yes' if p_value < 0.05 else 'No'}")
```

**Result**: Research paper tables populated with data

---

## 📁 File Flow Diagram

```
Researcher Computer (You)
│
├── 1. Local Development
│   └── /Users/you/ai-code-experiment/
│       ├── src/tasks/*.ts  ← Template code
│       ├── src/tests/*.ts  ← Test suites
│       └── scripts/*.sh    ← Evaluation scripts
│
│   $ git push origin main
│
│                         ▼
│
├── 2. GitHub Repository (Central)
│   └── github.com/you/ai-code-experiment
│       ├── Branch: main  ← Template
│       ├── Branch: participant/P001  ← Participant submissions
│       ├── Branch: participant/P002
│       └── ...
│
│   Participants: git clone + git push
│   You: git fetch --all
│
│                         ▼
│
├── 3. Back to Local (With Submissions)
│   └── /Users/you/ai-code-experiment/
│       ├── Branch: participant/P001  ← Fetched
│       ├── Branch: participant/P002  ← Fetched
│       └── ...
│
│   $ bash researcher-tools/evaluate-all.sh
│
│                         ▼
│
└── 4. Results Generated
    └── /Users/you/ai-code-experiment/results/
        ├── all-metrics.csv  ← Import to R/Python/Excel
        ├── P001/
        ├── P002/
        └── ...
```

---

## 🎯 Key Takeaways

### For You (Researcher):

1. **You create the GitHub repo once** and push this code
2. **Participants work independently** - they each create their own branch and push it
3. **You run 2 simple scripts** when all submissions are in:
   - `fetch-submissions.sh` → downloads all branches
   - `evaluate-all.sh` → runs evaluation on all 32 participants
4. **Results are auto-generated** in a CSV ready for statistical analysis

### For Participants:

1. **They clone your repo** (one time)
2. **They create their branch** (e.g., `participant/P001`)
3. **They implement the 4 tasks** (2 hours)
4. **They push their branch** (one command)
5. **Done!** They never see other participants' code

### No Manual Work Needed:

- ✅ No copying code manually
- ✅ No running tests individually for each participant
- ✅ No manual data entry
- ✅ Everything is automated

---

## 🔒 Security & Privacy

```
GitHub Repository (Private)
│
├── main branch
│   └── Template code only (no participant data)
│
├── participant/P001 branch
│   └── Only P001's code (isolated)
│
├── participant/P002 branch
│   └── Only P002's code (isolated)
│
└── ...

- Participants can't see each other's branches
- Only you (owner) can see all branches
- Each participant only has access to their own work
```

---

## 📞 Common Questions

### Q: How do participants submit if they don't have write access?
**A**: You add them as collaborators in GitHub Settings → Collaborators

### Q: Can participants see each other's code?
**A**: No, each branch is separate. They can only see the main template.

### Q: What if a participant makes a mistake?
**A**: They can push again to their branch. You'll evaluate the latest commit.

### Q: How long does evaluation take?
**A**: ~5-10 minutes per participant (automated). For 32 participants, about 2-3 hours total.

### Q: Can I re-run the evaluation?
**A**: Yes! Just run `evaluate-all.sh` again. Results will be regenerated.

---

## ✅ Quick Checklist

### Before Experiment Starts:
- [ ] GitHub repository created and code pushed
- [ ] 32 participants added as collaborators
- [ ] Participant instructions sent (PARTICIPANT-INSTRUCTIONS.md)
- [ ] Metadata form created and link shared
- [ ] Participant assignment spreadsheet prepared (who is Group A vs B)

### During Experiment:
- [ ] Monitor submissions (git fetch --all)
- [ ] Send reminders to participants who haven't submitted
- [ ] Answer participant questions

### After All Submissions:
- [ ] Run `fetch-submissions.sh`
- [ ] Run `evaluate-all.sh`
- [ ] Update CSV with correct Group assignments (A or B)
- [ ] Import to analysis tool
- [ ] Run statistical tests

---

**You're ready to go!** 🚀

Start with: [REPOSITORY-SETUP.md](REPOSITORY-SETUP.md)
