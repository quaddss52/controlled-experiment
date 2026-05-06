#!/bin/bash

###############################################################################
# Fetch All Participant Submissions
#
# This script fetches all participant branches from the GitHub repository
# and prepares them for evaluation.
#
# Usage: bash researcher-tools/fetch-submissions.sh
###############################################################################

set -e

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Fetching All Participant Submissions${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Make sure we're in the repository root
if [ ! -f "package.json" ]; then
  echo -e "${RED}Error: Run this script from the repository root${NC}"
  exit 1
fi

# Fetch all remote branches
echo -e "${YELLOW}[1/3]${NC} Fetching all branches from remote..."
git fetch --all --prune

# List all participant branches
echo ""
echo -e "${YELLOW}[2/3]${NC} Participant branches found:"
echo ""

PARTICIPANT_BRANCHES=$(git branch -r | grep "origin/participant/" || true)

if [ -z "$PARTICIPANT_BRANCHES" ]; then
  echo -e "${RED}No participant branches found!${NC}"
  echo ""
  echo "Expected branches like: origin/participant/P001, origin/participant/P002, etc."
  echo ""
  echo "Make sure participants have pushed their branches to the repository."
  exit 1
fi

# Count branches
BRANCH_COUNT=$(echo "$PARTICIPANT_BRANCHES" | wc -l | tr -d ' ')

echo "$PARTICIPANT_BRANCHES" | while read -r branch; do
  # Extract participant ID
  BRANCH_NAME=$(echo "$branch" | sed 's/origin\///')
  PARTICIPANT_ID=$(echo "$BRANCH_NAME" | sed 's/participant\///')

  echo -e "  ${GREEN}✓${NC} Found: $PARTICIPANT_ID (branch: $BRANCH_NAME)"
done

echo ""
echo -e "${GREEN}Total: $BRANCH_COUNT participant submission(s)${NC}"
echo ""

# Create local tracking branches for all participants
echo -e "${YELLOW}[3/3]${NC} Creating local tracking branches..."
echo ""

echo "$PARTICIPANT_BRANCHES" | while read -r branch; do
  BRANCH_NAME=$(echo "$branch" | sed 's/origin\///')
  PARTICIPANT_ID=$(echo "$BRANCH_NAME" | sed 's/participant\///')

  # Check if local branch exists
  if git show-ref --verify --quiet "refs/heads/$BRANCH_NAME"; then
    # Branch exists, update it
    git checkout "$BRANCH_NAME" > /dev/null 2>&1
    git pull origin "$BRANCH_NAME" > /dev/null 2>&1
    echo -e "  ${GREEN}✓${NC} Updated: $PARTICIPANT_ID"
  else
    # Branch doesn't exist, create it
    git checkout -b "$BRANCH_NAME" "$branch" > /dev/null 2>&1
    echo -e "  ${GREEN}✓${NC} Created: $PARTICIPANT_ID"
  fi
done

# Return to main branch
git checkout main > /dev/null 2>&1

echo ""
echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Summary${NC}"
echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}✓ Successfully fetched $BRANCH_COUNT participant submission(s)${NC}"
echo ""
echo "All participant branches are now available locally."
echo ""
echo "Next steps:"
echo "  1. Run: bash researcher-tools/evaluate-all.sh"
echo "  2. Check results in: results/all-metrics.csv"
echo ""
echo -e "${BLUE}========================================${NC}"
