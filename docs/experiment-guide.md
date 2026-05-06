# Experiment Guide for Researchers

This guide provides detailed instructions for researchers conducting the AI code generation experiment.

---

## Table of Contents

1. [Pre-Experiment Preparation](#pre-experiment-preparation)
2. [Participant Recruitment](#participant-recruitment)
3. [Session Setup](#session-setup)
4. [Conducting Sessions](#conducting-sessions)
5. [Data Collection](#data-collection)
6. [Evaluation Pipeline](#evaluation-pipeline)
7. [Statistical Analysis](#statistical-analysis)
8. [Troubleshooting](#troubleshooting)

---

## Pre-Experiment Preparation

### Week 1: Setup Phase

#### Repository Setup
1. Clone this repository
2. Install all dependencies: `npm install`
3. Verify all tools work:
   ```bash
   npm run build
   npm test
   npm run lint
   ```
4. Set up SonarQube (see `scripts/setup-sonarqube.sh`)

#### Materials Checklist
- [ ] Participant briefing documents printed/shared
- [ ] Metadata collection forms ready
- [ ] Consent forms prepared (if required by IRB)
- [ ] Git repository access configured for all participants
- [ ] Backup laptops/environments ready

#### Infrastructure
- [ ] SonarQube server running (Docker or local)
- [ ] Results directory created: `mkdir -p results`
- [ ] Data collection spreadsheet prepared
- [ ] Backup storage configured

---

## Participant Recruitment

### Target Demographics

**Total Participants**: 32
- **Group A (AI-assisted)**: 16 participants
- **Group B (Manual)**: 16 participants

### Inclusion Criteria

Participants must have:
- Minimum 1 year TypeScript or JavaScript experience
- Familiarity with VS Code and Git
- No extensive prior AI coding assistant experience (ensures fairness for Group A)

### Recruitment Sources

1. **University Programs**
   - Software engineering courses
   - Computer science departments
   - Coding bootcamps

2. **Professional Networks**
   - LinkedIn developer groups
   - Local tech meetups
   - Company engineering teams

3. **Developer Communities**
   - Discord servers
   - Reddit (r/typescript, r/javascript)
   - Tech Slack channels

### Recruitment Message Template

```
Subject: Participate in AI Code Generation Research Study

We're conducting a research study on AI-assisted software development and
need volunteer developers!

Requirements:
- 1+ years TypeScript/JavaScript experience
- 2 hours of availability
- Comfortable with VS Code and Git

What you'll do:
- Complete 4 simple algorithm tasks
- Either use GitHub Copilot or work manually (randomly assigned)
- Help advance research on AI in software engineering

Compensation: [If applicable]
Location: [Remote/In-person]
Time commitment: 2 hours

Interested? Reply to this message or email: [your email]
```

---

## Random Assignment

Once 32 participants are confirmed:

```python
import random

participants = list(range(1, 33))  # P001 to P032
random.shuffle(participants)

group_a = participants[:16]  # AI-assisted
group_b = participants[16:]  # Manual

print("Group A (AI-assisted):", sorted(group_a))
print("Group B (Manual):", sorted(group_b))
```

Record assignments in a master spreadsheet (keep confidential).

---

## Session Setup

### Pre-Session Checklist (24 hours before)

Email participant:
- [ ] Session time and location/Zoom link
- [ ] Participant briefing document
- [ ] Pre-session requirements:
  - [ ] Install Node.js 18.0+
  - [ ] Install VS Code 1.82+
  - [ ] Install Git 2.40+
  - [ ] Clone repository
  - [ ] Run `npm install`
- [ ] Group A only: Install GitHub Copilot extension
- [ ] Group B only: Confirm no AI tools installed

### Session Day Setup (30 minutes before)

1. **Verify participant environment**:
   ```bash
   node --version   # Should be 18.0+
   npm --version
   git --version
   npx tsc --version
   ```

2. **For Group A**: Verify Copilot is active
   - Open VS Code
   - Check Copilot icon in bottom bar
   - Test with a simple prompt

3. **For Group B**: Verify no AI tools
   - Check VS Code extensions
   - Confirm Copilot, Tabnine, etc. are disabled/uninstalled

4. **Prepare data collection**:
   - Open `metadata-template.json` for this participant
   - Start screen recording (if approved by IRB)
   - Have stopwatch ready for timing

---

## Conducting Sessions

### Session Timeline (2 hours)

#### 0:00 - 0:10: Briefing (10 minutes)
1. Welcome participant
2. Review consent form (if applicable)
3. Explain study purpose and procedures
4. Clarify group assignment (A or B)
5. Answer questions about tasks
6. Review submission process

**Script**:
```
"Thank you for participating! Today you'll complete 4 short algorithm tasks.
You've been randomly assigned to [Group A/Group B], which means you
[will use/will not use] GitHub Copilot.

You'll have about 20 minutes per task. Don't worry if you don't finish
everything - we're measuring realistic coding, not perfection.

[Group A only]: Please record every prompt you use or accept from Copilot.

Any questions before we start?"
```

#### 0:10 - 0:20: Environment Check (10 minutes)
1. Verify all tools installed and working
2. Run initial `npm test` to see baseline (all failing)
3. Open task files to confirm access
4. Practice Git workflow:
   ```bash
   git add src/tasks/fizzBuzz.ts
   git commit -m "Test commit"
   git reset HEAD~1  # Undo practice commit
   ```

#### 0:20 - 0:40: Task 1 - FizzBuzz (20 minutes)
- Start timer
- Participant implements `src/tasks/fizzBuzz.ts`
- Participant tests with `npm test -- fizzBuzz.test.ts`
- Participant commits when satisfied
- Record metadata (timestamp, Git hash, prompts if Group A)

#### 0:40 - 1:00: Task 2 - Array Sum (20 minutes)
- Start timer
- Participant implements `src/tasks/arraySum.ts`
- Participant tests with `npm test -- arraySum.test.ts`
- Participant commits when satisfied
- Record metadata

#### 1:00 - 1:20: Task 3 - String Reversal (20 minutes)
- Start timer
- Participant implements `src/tasks/stringReversal.ts`
- Participant tests with `npm test -- stringReversal.test.ts`
- Participant commits when satisfied
- Record metadata

#### 1:20 - 1:40: Task 4 - Find Largest (20 minutes)
- Start timer
- Participant implements `src/tasks/findLargest.ts`
- Participant tests with `npm test -- findLargest.test.ts`
- Participant commits when satisfied
- Record metadata

#### 1:40 - 1:50: Submission (10 minutes)
1. Verify all commits are made
2. Complete metadata form fully
3. Record participant experience data
4. Copy/push repository to results directory

#### 1:50 - 2:00: Debrief (10 minutes)
1. Post-session survey:
   - Difficulty rating (1-5)
   - Time perception (too short/just right/too long)
   - [Group A] Copilot helpfulness (1-5)
   - General comments

2. Thank participant
3. Explain next steps (results timeline)

---

## Data Collection

### Per-Task Metadata

For EACH task, record in `metadata-template.json`:

```json
{
  "taskNumber": 1,
  "taskName": "FizzBuzz",
  "submissionTimestamp": "2024-01-15T10:35:00Z",
  "gitCommitHash": "abc123def456",
  "timeSpentMinutes": 18,
  "aiToolUsed": "GitHub Copilot", // or "N/A" for Group B
  "promptsUsed": [
    "generate fizzbuzz function",
    "handle negative numbers in fizzbuzz"
  ],
  "refinementIterations": 2,
  "notes": "Struggled with edge case for zero"
}
```

### Post-Session Data

```json
{
  "participantExperience": {
    "yearsOfTypeScriptExperience": 2,
    "yearsOfJavaScriptExperience": 4,
    "previousAIToolExperience": "Limited",
    "primaryIDE": "VS Code"
  },
  "postSessionQuestions": {
    "difficultyRating": 3,
    "copilotHelpfulness": 4,
    "timePerception": "Just right",
    "comments": "Tasks were clear and reasonable"
  }
}
```

---

## Evaluation Pipeline

### Immediate Post-Session Evaluation

After participant completes session, run evaluation pipeline:

```bash
# Navigate to participant's submission
cd results/P001

# Run evaluation
bash ../../scripts/evaluate.sh P001 ALL

# Collect metrics
npm run collect-metrics P001
```

This generates:
- `results/P001/coverage/` - Jest coverage reports
- `results/P001/eslint-report.json` - Static analysis
- `results/P001/npm-audit.json` - Dependency vulnerabilities
- `results/P001/metrics.json` - Aggregated metrics
- `results/all-metrics.csv` - Updated master CSV

### Metrics Verification

Verify the following were captured:

#### Functional Correctness
- [ ] Test pass rate (%)
- [ ] Total tests, passed, failed
- [ ] Defect density (per KLOC)
- [ ] Coverage: lines, statements, functions, branches

#### Code Quality
- [ ] Average cyclomatic complexity
- [ ] Maximum cyclomatic complexity
- [ ] Average lines per function
- [ ] Total functions

#### Security
- [ ] Total vulnerabilities
- [ ] High/medium/low severity counts
- [ ] Dependency risks

### SonarQube Analysis

For each task:
1. Access SonarQube at `http://localhost:9000`
2. Find project: `participant-P001-task-1`
3. Export metrics:
   - Maintainability index
   - Code smells
   - Security hotspots
4. Add to metrics spreadsheet

---

## Statistical Analysis

### After All Sessions Complete

#### 1. Data Preparation

```bash
# Ensure all metrics collected
cat results/all-metrics.csv

# Should have 128 rows (32 participants × 4 tasks)
wc -l results/all-metrics.csv
```

#### 2. Import to Analysis Tool

**Option A: Python (pandas)**
```python
import pandas as pd

df = pd.read_csv('results/all-metrics.csv')
group_a = df[df['Group'] == 'A']
group_b = df[df['Group'] == 'B']
```

**Option B: R**
```r
data <- read.csv('results/all-metrics.csv')
group_a <- subset(data, Group == 'A')
group_b <- subset(data, Group == 'B')
```

**Option C: Excel**
- Open `results/all-metrics.csv`
- Create pivot tables for each metric
- Filter by group (A vs B)

#### 3. Descriptive Statistics

For each metric, calculate:
- Mean
- Standard deviation
- Median
- Min/Max

**Python Example**:
```python
# Test pass rate
print("Group A Test Pass Rate:")
print(f"Mean: {group_a['TestPassRate'].mean():.2f}%")
print(f"SD: {group_a['TestPassRate'].std():.2f}")

print("\nGroup B Test Pass Rate:")
print(f"Mean: {group_b['TestPassRate'].mean():.2f}%")
print(f"SD: {group_b['TestPassRate'].std():.2f}")
```

#### 4. Significance Testing

Run independent t-tests (p < 0.05):

```python
from scipy import stats

t_stat, p_value = stats.ttest_ind(
    group_a['TestPassRate'],
    group_b['TestPassRate']
)

print(f"t-statistic: {t_stat:.4f}")
print(f"p-value: {p_value:.4f}")

if p_value < 0.05:
    print("Difference is statistically significant")
else:
    print("Difference is NOT statistically significant")
```

#### 5. Populate Results Tables

**Table 2: Functional Correctness**
| Metric | Group A (AI) | Group B (Manual) | p-value |
|--------|--------------|------------------|---------|
| Test Pass Rate | [Mean ± SD] | [Mean ± SD] | [p] |
| Defect Density | [Mean ± SD] | [Mean ± SD] | [p] |
| Coverage | [Mean ± SD] | [Mean ± SD] | [p] |

**Table 3: Code Quality**
| Metric | Group A (AI) | Group B (Manual) | p-value |
|--------|--------------|------------------|---------|
| Avg Complexity | [Mean ± SD] | [Mean ± SD] | [p] |
| Maintainability | [Mean ± SD] | [Mean ± SD] | [p] |
| Avg Lines/Func | [Mean ± SD] | [Mean ± SD] | [p] |

**Table 4: Security**
| Metric | Group A (AI) | Group B (Manual) | p-value |
|--------|--------------|------------------|---------|
| Total Vulns | [Mean ± SD] | [Mean ± SD] | [p] |
| High Severity | [Mean ± SD] | [Mean ± SD] | [p] |
| Dependency Risks | [Mean ± SD] | [Mean ± SD] | [p] |

---

## Troubleshooting

### Common Issues

#### Participant's Tests Not Running
**Symptoms**: `npm test` fails with module errors

**Solutions**:
1. Verify `node_modules` installed: `npm install`
2. Check Node.js version: `node --version` (must be 18.0+)
3. Clear npm cache: `npm cache clean --force && npm install`

#### Copilot Not Working (Group A)
**Symptoms**: No suggestions appearing

**Solutions**:
1. Check Copilot status icon in VS Code (bottom right)
2. Sign in to GitHub account
3. Restart VS Code
4. Check Copilot subscription is active

#### SonarQube Not Scanning
**Symptoms**: `sonar-scanner` command not found

**Solutions**:
1. Verify installation: `sonar-scanner --version`
2. Check PATH includes sonar-scanner
3. Ensure SonarQube server is running: `http://localhost:9000`

#### Git Commit Failures
**Symptoms**: `git commit` fails

**Solutions**:
1. Configure Git identity:
   ```bash
   git config user.name "Participant P001"
   git config user.email "p001@experiment.com"
   ```
2. Verify files staged: `git status`

---

## Ethical Considerations

### Informed Consent
- Clearly explain study purpose
- Inform about data collection and usage
- Allow participants to withdraw at any time
- Anonymize all results

### Data Privacy
- Store participant data securely
- Use participant IDs, not real names
- Encrypt sensitive data
- Delete personal information after study concludes

### Debriefing
- Explain study findings after completion
- Provide resources for AI-assisted coding
- Offer to share published results

---

## Contact and Support

**For questions during the experiment**:
- [Researcher name]
- [Email]
- [Phone]

**For technical issues**:
- Check troubleshooting section
- Contact [Tech support contact]

---

**Version**: 1.0
**Last Updated**: [Date]
