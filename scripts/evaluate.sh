#!/bin/bash

###############################################################################
# Evaluation Pipeline Script
#
# This script runs the complete evaluation pipeline for a participant submission:
# 1. Functional Testing (Jest with coverage)
# 2. Static Analysis (ESLint with complexity metrics)
# 3. Security and Maintainability (SonarQube scanner)
# 4. Dependency Vulnerability Scanning (npm audit)
#
# Usage: bash scripts/evaluate.sh [participant-id] [task-number]
# Example: bash scripts/evaluate.sh P001 1
###############################################################################

set -e  # Exit on error

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Parse arguments
PARTICIPANT_ID=${1:-"UNKNOWN"}
TASK_NUMBER=${2:-"ALL"}

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Evaluation Pipeline${NC}"
echo -e "${BLUE}========================================${NC}"
echo -e "Participant ID: ${GREEN}${PARTICIPANT_ID}${NC}"
echo -e "Task Number: ${GREEN}${TASK_NUMBER}${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Create results directory
RESULTS_DIR="results/${PARTICIPANT_ID}"
mkdir -p "${RESULTS_DIR}"

###############################################################################
# STEP 1: Functional Testing with Jest
###############################################################################
echo -e "${YELLOW}[STEP 1/4]${NC} Running Functional Tests (Jest)..."
echo "Command: npm run test:coverage"
echo ""

if npm run test:coverage; then
  echo -e "${GREEN}✓ Tests completed successfully${NC}"
else
  echo -e "${RED}✗ Tests failed${NC}"
fi

# Copy coverage reports
cp -r coverage "${RESULTS_DIR}/"
echo -e "Coverage report saved to: ${RESULTS_DIR}/coverage/"
echo ""

###############################################################################
# STEP 2: Static Analysis with ESLint
###############################################################################
echo -e "${YELLOW}[STEP 2/4]${NC} Running Static Analysis (ESLint)..."
echo "Command: npm run lint:report"
echo ""

# Run ESLint and generate JSON report
if npm run lint:report; then
  echo -e "${GREEN}✓ Linting completed successfully${NC}"
else
  echo -e "${YELLOW}⚠ Linting completed with warnings/errors${NC}"
fi

# Move ESLint report to results directory
if [ -f "eslint-report.json" ]; then
  mv eslint-report.json "${RESULTS_DIR}/eslint-report.json"
  echo -e "ESLint report saved to: ${RESULTS_DIR}/eslint-report.json"
else
  echo -e "${RED}Warning: ESLint report not generated${NC}"
fi
echo ""

###############################################################################
# STEP 3: Security and Maintainability Analysis with SonarQube
###############################################################################
echo -e "${YELLOW}[STEP 3/4]${NC} Running Security & Maintainability Analysis (SonarQube)..."
echo ""

# Check if SonarQube scanner is available
if command -v sonar-scanner &> /dev/null; then
  echo "Running SonarQube scanner..."

  # Run SonarQube scanner
  sonar-scanner \
    -Dsonar.projectKey="participant-${PARTICIPANT_ID}-task-${TASK_NUMBER}" \
    -Dsonar.sources=src/tasks \
    -Dsonar.tests=src/tests \
    -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info \
    -Dsonar.exclusions="**/*.test.ts,**/*.spec.ts" \
    -Dsonar.coverage.exclusions="**/*.test.ts,**/*.spec.ts"

  echo -e "${GREEN}✓ SonarQube analysis completed${NC}"
  echo -e "View results at: http://localhost:9000/dashboard?id=participant-${PARTICIPANT_ID}-task-${TASK_NUMBER}"
else
  echo -e "${YELLOW}⚠ SonarQube scanner not found. Skipping SonarQube analysis.${NC}"
  echo -e "${YELLOW}  Install SonarQube scanner: https://docs.sonarqube.org/latest/analysis/scan/sonarscanner/${NC}"
fi
echo ""

###############################################################################
# STEP 4: Dependency Vulnerability Scanning with npm audit
###############################################################################
echo -e "${YELLOW}[STEP 4/4]${NC} Running Dependency Vulnerability Scan (npm audit)..."
echo "Command: npm audit --json"
echo ""

# Run npm audit and save JSON output
npm audit --json > "${RESULTS_DIR}/npm-audit.json" || true

# Display summary
if [ -f "${RESULTS_DIR}/npm-audit.json" ]; then
  echo -e "${GREEN}✓ npm audit completed${NC}"
  echo -e "Audit report saved to: ${RESULTS_DIR}/npm-audit.json"

  # Extract vulnerability counts
  VULNERABILITIES=$(cat "${RESULTS_DIR}/npm-audit.json" | grep -o '"total":[0-9]*' | head -1 | cut -d':' -f2 || echo "0")
  echo -e "Total vulnerabilities found: ${VULNERABILITIES}"
else
  echo -e "${RED}Warning: npm audit report not generated${NC}"
fi
echo ""

###############################################################################
# Summary
###############################################################################
echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Evaluation Pipeline Complete${NC}"
echo -e "${BLUE}========================================${NC}"
echo -e "Results saved to: ${GREEN}${RESULTS_DIR}/${NC}"
echo ""
echo -e "Generated files:"
echo -e "  - ${RESULTS_DIR}/coverage/           (Jest coverage reports)"
echo -e "  - ${RESULTS_DIR}/eslint-report.json  (ESLint analysis)"
echo -e "  - ${RESULTS_DIR}/npm-audit.json      (Dependency vulnerabilities)"
echo ""
echo -e "${GREEN}Next step:${NC} Run 'npm run collect-metrics' to aggregate results"
echo -e "${BLUE}========================================${NC}"
