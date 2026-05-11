#!/bin/bash

###############################################################################
# Evaluate All Participant Submissions
#
# This script automatically evaluates all participant branches and
# aggregates metrics into a single CSV file for analysis.
#
# Prerequisites:
#   1. Run fetch-submissions.sh first
#   2. Ensure SonarQube is running (optional but recommended)
#
# Usage: bash researcher-tools/evaluate-all.sh
###############################################################################

set -e

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Batch Evaluation - All Participants${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Make sure we're in the repository root
if [ ! -f "package.json" ]; then
  echo -e "${RED}Error: Run this script from the repository root${NC}"
  exit 1
fi

# Save current branch
ORIGINAL_BRANCH=$(git branch --show-current)

# Get all participant branches
PARTICIPANT_BRANCHES=$(git branch | grep "participant/" | sed 's/\*//' | tr -d ' ' || true)

if [ -z "$PARTICIPANT_BRANCHES" ]; then
  echo -e "${RED}No participant branches found!${NC}"
  echo ""
  echo "Run 'bash researcher-tools/fetch-submissions.sh' first to fetch submissions."
  exit 1
fi

# Count branches
BRANCH_COUNT=$(echo "$PARTICIPANT_BRANCHES" | wc -l | tr -d ' ')

echo -e "Found ${GREEN}$BRANCH_COUNT${NC} participant submission(s) to evaluate"
echo ""

# Ask for confirmation
echo -e "${YELLOW}This will:${NC}"
echo "  1. Evaluate all participant branches"
echo "  2. Run Jest tests with coverage"
echo "  3. Run ESLint static analysis"
echo "  4. Run npm audit"
echo "  5. Generate metrics for each participant"
echo "  6. Aggregate results into results/all-metrics.csv"
echo ""
read -p "Continue? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "Cancelled."
  exit 0
fi

# Create results directory
mkdir -p results

# Initialize/clear the aggregated CSV
CSV_FILE="results/all-metrics.csv"
CSV_HEADER="ParticipantID,Group,TaskNumber,Timestamp,GitCommitHash,TestPassRate,TotalTests,PassedTests,FailedTests,DefectDensity,CoverageLines,CoverageStatements,CoverageFunctions,CoverageBranches,AvgCyclomaticComplexity,MaxCyclomaticComplexity,MaintainabilityIndex,AvgLinesPerFunction,TotalFunctions,TotalVulnerabilities,HighSeverity,MediumSeverity,LowSeverity,DependencyRisks"

echo "$CSV_HEADER" > "$CSV_FILE"
echo -e "${GREEN}✓${NC} Initialized results CSV: $CSV_FILE"
echo ""

# Counter for progress
CURRENT=0
TOTAL=$BRANCH_COUNT

# Iterate through each participant branch
echo "$PARTICIPANT_BRANCHES" | while read -r branch; do
  CURRENT=$((CURRENT + 1))
  PARTICIPANT_ID=$(echo "$branch" | sed 's/participant\///')

  echo -e "${BLUE}========================================${NC}"
  echo -e "${BLUE}[$CURRENT/$TOTAL] Evaluating: $PARTICIPANT_ID${NC}"
  echo -e "${BLUE}========================================${NC}"

  # Checkout participant branch
  echo "Checking out branch: $branch"
  git checkout "$branch" > /dev/null 2>&1

  # Get latest commit hash
  COMMIT_HASH=$(git rev-parse --short HEAD)
  echo "Latest commit: $COMMIT_HASH"

  # Create participant results directory
  PARTICIPANT_DIR="results/$PARTICIPANT_ID"
  mkdir -p "$PARTICIPANT_DIR"

  # Determine group (A or B) from metadata if available
  # For now, we'll leave it as TODO for manual entry
  GROUP="TODO"

  # Run evaluation pipeline for all tasks
  echo ""
  echo -e "${YELLOW}Running evaluation pipeline...${NC}"

  # Run tests with coverage
  echo "  [1/3] Running tests..."
  npm test -- --coverage --json --outputFile="$PARTICIPANT_DIR/jest-results.json" > /dev/null 2>&1 || true
  cp -r coverage "$PARTICIPANT_DIR/" 2>/dev/null || true

  # Run ESLint
  echo "  [2/3] Running ESLint..."
  npm run lint:report > /dev/null 2>&1 || true
  if [ -f "eslint-report.json" ]; then
    mv eslint-report.json "$PARTICIPANT_DIR/eslint-report.json"
  fi

  # Run npm audit
  echo "  [3/3] Running npm audit..."
  npm audit --json > "$PARTICIPANT_DIR/npm-audit.json" 2>&1 || true

  # Parse test results from coverage summary
  if [ -f "$PARTICIPANT_DIR/coverage/coverage-summary.json" ]; then
    # Extract coverage percentages using basic tools
    COVERAGE_LINES=$(grep -o '"lines":{"total":[0-9]*,"covered":[0-9]*,"skipped":[0-9]*,"pct":[0-9.]*' "$PARTICIPANT_DIR/coverage/coverage-summary.json" | grep -o 'pct":[0-9.]*' | head -1 | cut -d':' -f2 || echo "0")
    COVERAGE_STATEMENTS=$(grep -o '"statements":{"total":[0-9]*,"covered":[0-9]*,"skipped":[0-9]*,"pct":[0-9.]*' "$PARTICIPANT_DIR/coverage/coverage-summary.json" | grep -o 'pct":[0-9.]*' | head -1 | cut -d':' -f2 || echo "0")
    COVERAGE_FUNCTIONS=$(grep -o '"functions":{"total":[0-9]*,"covered":[0-9]*,"skipped":[0-9]*,"pct":[0-9.]*' "$PARTICIPANT_DIR/coverage/coverage-summary.json" | grep -o 'pct":[0-9.]*' | head -1 | cut -d':' -f2 || echo "0")
    COVERAGE_BRANCHES=$(grep -o '"branches":{"total":[0-9]*,"covered":[0-9]*,"skipped":[0-9]*,"pct":[0-9.]*' "$PARTICIPANT_DIR/coverage/coverage-summary.json" | grep -o 'pct":[0-9.]*' | head -1 | cut -d':' -f2 || echo "0")
  else
    COVERAGE_LINES=0
    COVERAGE_STATEMENTS=0
    COVERAGE_FUNCTIONS=0
    COVERAGE_BRANCHES=0
  fi

  # Extract test results from Jest JSON output
  if [ -f "$PARTICIPANT_DIR/jest-results.json" ]; then
    # This is simplified - in production you'd parse JSON properly
    TOTAL_TESTS=$(grep -o '"numTotalTests":[0-9]*' "$PARTICIPANT_DIR/jest-results.json" | head -1 | cut -d':' -f2 || echo "0")
    PASSED_TESTS=$(grep -o '"numPassedTests":[0-9]*' "$PARTICIPANT_DIR/jest-results.json" | head -1 | cut -d':' -f2 || echo "0")
    FAILED_TESTS=$(grep -o '"numFailedTests":[0-9]*' "$PARTICIPANT_DIR/jest-results.json" | head -1 | cut -d':' -f2 || echo "0")

    if [ "$TOTAL_TESTS" -gt 0 ]; then
      TEST_PASS_RATE=$(echo "scale=2; ($PASSED_TESTS * 100) / $TOTAL_TESTS" | bc)
    else
      TEST_PASS_RATE=0
    fi
  else
    TOTAL_TESTS=0
    PASSED_TESTS=0
    FAILED_TESTS=0
    TEST_PASS_RATE=0
  fi

  # Placeholder values for metrics that require more complex parsing
  DEFECT_DENSITY=0
  AVG_COMPLEXITY=0
  MAX_COMPLEXITY=0
  MAINTAINABILITY_INDEX="N/A"
  AVG_LINES_PER_FUNC=0
  TOTAL_FUNCTIONS=0
  TOTAL_VULNS=0
  HIGH_SEV=0
  MED_SEV=0
  LOW_SEV=0
  DEP_RISKS=0

  # Extract npm audit results
  if [ -f "$PARTICIPANT_DIR/npm-audit.json" ]; then
    TOTAL_VULNS=$(grep -o '"total":[0-9]*' "$PARTICIPANT_DIR/npm-audit.json" | head -1 | cut -d':' -f2 || echo "0")
  fi

  # Append to CSV (one row per participant, averaged across all tasks)
  TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
  TASK_NUMBER="ALL"

  CSV_ROW="$PARTICIPANT_ID,$GROUP,$TASK_NUMBER,$TIMESTAMP,$COMMIT_HASH,$TEST_PASS_RATE,$TOTAL_TESTS,$PASSED_TESTS,$FAILED_TESTS,$DEFECT_DENSITY,$COVERAGE_LINES,$COVERAGE_STATEMENTS,$COVERAGE_FUNCTIONS,$COVERAGE_BRANCHES,$AVG_COMPLEXITY,$MAX_COMPLEXITY,$MAINTAINABILITY_INDEX,$AVG_LINES_PER_FUNC,$TOTAL_FUNCTIONS,$TOTAL_VULNS,$HIGH_SEV,$MED_SEV,$LOW_SEV,$DEP_RISKS"

  echo "$CSV_ROW" >> "$CSV_FILE"

  echo ""
  echo -e "${GREEN}✓${NC} Evaluation complete for $PARTICIPANT_ID"
  echo "  Test Pass Rate: ${TEST_PASS_RATE}%"
  echo "  Coverage (Lines): ${COVERAGE_LINES}%"
  echo "  Results saved to: $PARTICIPANT_DIR/"
  echo ""
done

# Return to original branch
git checkout "$ORIGINAL_BRANCH" > /dev/null 2>&1

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Batch Evaluation Complete${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo -e "${GREEN}✓ Evaluated $BRANCH_COUNT participant(s)${NC}"
echo ""
echo "Results:"
echo "  - Aggregated CSV: $CSV_FILE"
echo "  - Individual results: results/[participant-id]/"
echo ""
echo "Next steps:"
echo "  1. Review results/all-metrics.csv"
echo "  2. Import into R, Python, or Excel for statistical analysis"
echo "  3. Manually update 'Group' column (A or B) based on assignments"
echo "  4. Run t-tests and generate tables for your paper"
echo ""
echo -e "${BLUE}========================================${NC}"
