# AI Code Generation Experiment

A controlled experiment comparing AI-assisted and manually written TypeScript code, measuring differences in functional correctness, code quality, maintainability, and security.

## Overview

This repository contains the base template for a research study evaluating the net impact of AI-generated code on software engineering. The experiment involves 32 developers completing 4 algorithm implementation tasks, with half using GitHub Copilot and half working manually.

### Research Questions
- How does AI-assisted code compare to manually written code in terms of functional correctness?
- What tradeoffs exist between code quality, maintainability, and security?
- How does AI assistance impact defect density and code complexity?

---

## 🚀 Quick Navigation

**For Participants**: Read [PARTICIPANT-INSTRUCTIONS.md](PARTICIPANT-INSTRUCTIONS.md)

**For Researchers**:
1. [REPOSITORY-SETUP.md](REPOSITORY-SETUP.md) - Set up GitHub repository
2. [docs/experiment-guide.md](docs/experiment-guide.md) - Detailed research protocols
3. [researcher-tools/](#researcher-workflow) - Evaluation automation

---

## Project Structure

```
ai-code-experiment/
├── src/
│   ├── tasks/              # Task implementations (participants complete these)
│   │   ├── fizzBuzz.ts
│   │   ├── arraySum.ts
│   │   ├── stringReversal.ts
│   │   └── findLargest.ts
│   └── tests/              # Pre-written test suites (DO NOT MODIFY)
│       ├── fizzBuzz.test.ts
│       ├── arraySum.test.ts
│       ├── stringReversal.test.ts
│       └── findLargest.test.ts
├── scripts/
│   ├── evaluate.sh         # Evaluation pipeline runner
│   ├── collect-metrics.ts  # Metrics aggregation script
│   └── setup-sonarqube.sh  # SonarQube setup helper
├── docs/
│   └── participant-briefing.md  # Participant instructions
├── metadata-template.json  # Metadata collection template
├── sonar-project.properties # SonarQube configuration
├── jest.config.js          # Jest configuration
├── tsconfig.json           # TypeScript configuration
├── .eslintrc.json          # ESLint configuration
└── package.json            # Project dependencies
```

---

## Quick Start

### Prerequisites

- **Node.js** 18.0 or higher
- **npm** (comes with Node.js)
- **Visual Studio Code** 1.82 or higher
- **Git** 2.40 or higher

### Installation

1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd ai-code-experiment
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Verify setup:
   ```bash
   npm run build
   npm test
   ```

   You should see all tests failing (this is expected - tasks are not implemented yet).

---

## Researcher Workflow

### 1. Initial Setup (One-time)

```bash
# Follow the complete setup guide
# See: REPOSITORY-SETUP.md
```

Key steps:
1. Create GitHub repository
2. Push this code to GitHub
3. Add participants as collaborators
4. Send participant instructions

### 2. Collecting Submissions (During experiment)

Participants will:
- Clone the repository
- Create their own branch (`participant/P001`, `participant/P002`, etc.)
- Complete the 4 tasks
- Push their branch back to GitHub

You monitor:
```bash
# Check for new participant branches
git fetch --all
git branch -r | grep participant/
```

### 3. Batch Evaluation (After all submissions)

```bash
# Step 1: Fetch all participant branches
bash researcher-tools/fetch-submissions.sh

# Step 2: Run automated evaluation on all participants
bash researcher-tools/evaluate-all.sh

# Step 3: Review aggregated results
cat results/all-metrics.csv
# or
open results/all-metrics.csv
```

This generates:
- `results/all-metrics.csv` - Aggregated data for all participants
- `results/[participant-id]/` - Individual evaluation reports

### 4. Statistical Analysis

Import `results/all-metrics.csv` into:
- **R** or **Python** for t-tests and statistical analysis
- **Excel** for pivot tables and visualization
- Your preferred analysis tool

The CSV contains all metrics from your implementation plan:
- Test pass rate, defect density, coverage (Table 2)
- Cyclomatic complexity, maintainability (Table 3)
- Vulnerabilities, security issues (Table 4)

---

## For Participants

### Before You Start

1. Read the [Participant Briefing Document](docs/participant-briefing.md)
2. Verify your environment setup:
   - Node.js: `node --version` (should be 18.0+)
   - TypeScript: `npx tsc --version`
   - Git: `git --version`
   - VS Code is installed and configured

3. **Group A only**: Ensure GitHub Copilot extension is installed and active
4. **Group B only**: Ensure NO AI coding tools are installed/enabled

### Task Implementation

Each task has:
- A source file in `src/tasks/` with requirements and function signature
- A test file in `src/tests/` with comprehensive test cases

#### Example: Task 1 (FizzBuzz)

1. Open `src/tasks/fizzBuzz.ts`
2. Read the requirements in the JSDoc comments
3. Implement the function
4. Test your implementation:
   ```bash
   npm test -- fizzBuzz.test.ts
   ```
5. When all tests pass, commit your code:
   ```bash
   git add src/tasks/fizzBuzz.ts
   git commit -m "Complete Task 1: FizzBuzz"
   ```

### Available Commands

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- fizzBuzz.test.ts

# Lint your code
npm run lint

# Build TypeScript to JavaScript
npm run build
```

---

## For Researchers

### Running the Evaluation Pipeline

After a participant completes their tasks:

```bash
# Run full evaluation for a participant
bash scripts/evaluate.sh [participant-id] [task-number]

# Example:
bash scripts/evaluate.sh P001 1
```

This will:
1. Run Jest tests with coverage
2. Run ESLint static analysis
3. Run SonarQube security scan (if configured)
4. Run npm audit for dependency vulnerabilities

Results are saved to `results/[participant-id]/`

### Collecting Metrics

```bash
# Aggregate metrics from evaluation results
npm run collect-metrics [participant-id] [task-number]

# Example:
npm run collect-metrics P001 1
```

This generates:
- `results/[participant-id]/metrics.json` - Individual metrics
- `results/all-metrics.csv` - Aggregated CSV for analysis

### Metrics Collected

#### Functional Correctness (Table 2)
- Test pass rate (%)
- Defect density (per KLOC)
- Code coverage (lines, statements, functions, branches)

#### Code Quality (Table 3)
- Average cyclomatic complexity
- Maximum cyclomatic complexity
- Maintainability index (SonarQube)
- Average lines per function

#### Security (Table 4)
- Total vulnerabilities
- High/Medium/Low severity counts
- Dependency risks (npm audit)

---

## SonarQube Setup

SonarQube provides security and maintainability analysis. Choose one option:

### Option 1: Docker (Recommended)

```bash
docker run -d --name sonarqube -p 9000:9000 sonarqube:latest
```

Access at: http://localhost:9000 (default: admin/admin)

### Option 2: Setup Script

```bash
bash scripts/setup-sonarqube.sh
```

Follow the instructions in the script.

### Option 3: SonarCloud

Sign up at https://sonarcloud.io and update `sonar-project.properties`

---

## The Four Tasks

### Task 1: FizzBuzz
Classic FizzBuzz implementation with edge cases for negative numbers and decimals.

**Complexity**: Low
**Time allocation**: 20 minutes

### Task 2: Array Sum
Sum all numbers in an array, handling empty arrays and special values (NaN, Infinity).

**Complexity**: Low
**Time allocation**: 20 minutes

### Task 3: String Reversal
Reverse a string, handling empty input, special characters, and Unicode.

**Complexity**: Low
**Time allocation**: 20 minutes

### Task 4: Find Largest
Find the largest number in an array, handling empty arrays and edge cases.

**Complexity**: Low
**Time allocation**: 20 minutes

---

## Experiment Timeline

| Week | Activity                                          |
|------|---------------------------------------------------|
| 1    | Recruit participants, prepare environment         |
| 2    | Pilot study with 2 participants                   |
| 3    | Run sessions with 8 participants (4 per group)    |
| 4    | Run sessions with remaining 24 participants       |
| 5    | Evaluate all 128 submissions (32 × 4 tasks)       |
| 6    | Statistical analysis and write-up                 |

---

## Data Collection

### Participant Metadata

Use `metadata-template.json` to record:
- Participant ID
- Group assignment (A or B)
- Session date and timestamps
- Git commit hashes
- AI prompts used (Group A only)
- Post-session survey responses

### Automated Metrics

Evaluation pipeline automatically collects:
- Jest test results
- Coverage data
- ESLint complexity metrics
- SonarQube vulnerabilities
- npm audit findings

---

## Statistical Analysis

After collecting all data:

1. Import `results/all-metrics.csv` into analysis tool (R, Python, Excel)
2. Calculate means and standard deviations for each group
3. Run independent t-tests (p < 0.05 significance threshold)
4. Analyze correlations and tradeoffs
5. Populate research paper tables

### Expected Outputs

- **Table 2**: Functional correctness comparison
- **Table 3**: Code quality comparison
- **Table 4**: Security comparison
- **Table 5**: Correlation analysis

---

## Troubleshooting

### Tests failing with "Function not implemented"
This is expected - implement the function in `src/tasks/`.

### ESLint errors about complexity
Your function may be too complex. Simplify or refactor.

### SonarQube not found
Run `sonar-scanner --version` to verify installation. See `scripts/setup-sonarqube.sh`.

### Permission denied on scripts
Make scripts executable:
```bash
chmod +x scripts/evaluate.sh
chmod +x scripts/setup-sonarqube.sh
```

---

## Contributing

This is a research project. Contributions are limited to:
- Bug fixes in evaluation scripts
- Documentation improvements
- Additional test cases (with justification)

Do NOT modify:
- Task requirements
- Existing test suites
- Evaluation criteria

---

## License

This project is licensed under the MIT License. See LICENSE file for details.

---

## Citation

If you use this experiment template in your research, please cite:

```
[Your Name], [Year]. "Net Impact of AI-Generated Code on Software Engineering:
Security, Quality, and Maintainability Tradeoffs." [Publication venue].
```

---

## Contact

**Researcher**: [Your name]
**Institution**: [Your institution]
**Email**: [Your email]
**Study Website**: [If applicable]

---

## Acknowledgments

- Participants who volunteer their time
- [Your institution] for supporting this research
- Open-source tools: TypeScript, Jest, ESLint, SonarQube

---

**Version**: 1.0
**Last Updated**: [Date]
