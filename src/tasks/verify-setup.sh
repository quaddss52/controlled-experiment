#!/bin/bash

###############################################################################
# Setup Verification Script
#
# Run this script to verify that the experiment environment is correctly set up.
# This should be run by both researchers and participants before starting.
#
# Usage: bash verify-setup.sh
###############################################################################

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}AI Code Experiment - Setup Verification${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

ERRORS=0
WARNINGS=0

# Check Node.js
echo -n "Checking Node.js version... "
if command -v node &> /dev/null; then
  NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
  if [ "$NODE_VERSION" -ge 18 ]; then
    echo -e "${GREEN}✓${NC} $(node --version)"
  else
    echo -e "${RED}✗${NC} Node.js version is too old (need 18.0+, found $(node --version))"
    ERRORS=$((ERRORS + 1))
  fi
else
  echo -e "${RED}✗${NC} Node.js not found"
  ERRORS=$((ERRORS + 1))
fi

# Check npm
echo -n "Checking npm... "
if command -v npm &> /dev/null; then
  echo -e "${GREEN}✓${NC} $(npm --version)"
else
  echo -e "${RED}✗${NC} npm not found"
  ERRORS=$((ERRORS + 1))
fi

# Check Git
echo -n "Checking Git... "
if command -v git &> /dev/null; then
  echo -e "${GREEN}✓${NC} $(git --version | cut -d' ' -f3)"
else
  echo -e "${RED}✗${NC} Git not found"
  ERRORS=$((ERRORS + 1))
fi

# Check TypeScript
echo -n "Checking TypeScript... "
if npx tsc --version &> /dev/null; then
  echo -e "${GREEN}✓${NC} $(npx tsc --version | cut -d' ' -f2)"
else
  echo -e "${YELLOW}⚠${NC} TypeScript not available"
  WARNINGS=$((WARNINGS + 1))
fi

# Check dependencies installed
echo -n "Checking node_modules... "
if [ -d "node_modules" ]; then
  echo -e "${GREEN}✓${NC} Dependencies installed"
else
  echo -e "${RED}✗${NC} Dependencies not installed. Run: npm install"
  ERRORS=$((ERRORS + 1))
fi

# Check source files
echo -n "Checking task source files... "
TASK_COUNT=$(find src/tasks -name "*.ts" 2>/dev/null | wc -l | tr -d ' ')
if [ "$TASK_COUNT" -eq 4 ]; then
  echo -e "${GREEN}✓${NC} All 4 task files present"
else
  echo -e "${RED}✗${NC} Expected 4 task files, found $TASK_COUNT"
  ERRORS=$((ERRORS + 1))
fi

# Check test files
echo -n "Checking test files... "
TEST_COUNT=$(find src/tests -name "*.test.ts" 2>/dev/null | wc -l | tr -d ' ')
if [ "$TEST_COUNT" -eq 4 ]; then
  echo -e "${GREEN}✓${NC} All 4 test files present"
else
  echo -e "${RED}✗${NC} Expected 4 test files, found $TEST_COUNT"
  ERRORS=$((ERRORS + 1))
fi

# Check configuration files
echo -n "Checking configuration files... "
CONFIG_FILES=("tsconfig.json" "jest.config.js" ".eslintrc.json" "package.json")
MISSING_CONFIGS=()
for file in "${CONFIG_FILES[@]}"; do
  if [ ! -f "$file" ]; then
    MISSING_CONFIGS+=("$file")
  fi
done

if [ ${#MISSING_CONFIGS[@]} -eq 0 ]; then
  echo -e "${GREEN}✓${NC} All config files present"
else
  echo -e "${RED}✗${NC} Missing: ${MISSING_CONFIGS[*]}"
  ERRORS=$((ERRORS + 1))
fi

# Try to build
echo -n "Testing build... "
if npm run build &> /dev/null; then
  echo -e "${GREEN}✓${NC} Build successful"
else
  echo -e "${YELLOW}⚠${NC} Build has warnings (acceptable)"
  WARNINGS=$((WARNINGS + 1))
fi

# Try to run tests
echo -n "Testing Jest... "
if npm test &> /dev/null; then
  echo -e "${YELLOW}⚠${NC} All tests passing (tasks might be implemented)"
  WARNINGS=$((WARNINGS + 1))
else
  echo -e "${GREEN}✓${NC} Jest running (tests failing as expected)"
fi

# Check for VS Code (optional)
echo -n "Checking VS Code... "
if command -v code &> /dev/null; then
  echo -e "${GREEN}✓${NC} VS Code CLI available"
else
  echo -e "${YELLOW}⚠${NC} VS Code CLI not found (not critical)"
  WARNINGS=$((WARNINGS + 1))
fi

# Check SonarQube scanner (optional)
echo -n "Checking SonarQube scanner... "
if command -v sonar-scanner &> /dev/null; then
  echo -e "${GREEN}✓${NC} SonarQube scanner found"
else
  echo -e "${YELLOW}⚠${NC} SonarQube scanner not found (optional - see scripts/setup-sonarqube.sh)"
  WARNINGS=$((WARNINGS + 1))
fi

echo ""
echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Summary${NC}"
echo -e "${BLUE}========================================${NC}"

if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
  echo -e "${GREEN}✓ Perfect! Everything is set up correctly.${NC}"
  exit 0
elif [ $ERRORS -eq 0 ]; then
  echo -e "${YELLOW}⚠ Setup complete with $WARNINGS warning(s).${NC}"
  echo -e "You can proceed, but consider addressing the warnings."
  exit 0
else
  echo -e "${RED}✗ Setup incomplete. $ERRORS error(s) found.${NC}"
  echo -e "Please fix the errors above before proceeding."
  exit 1
fi
