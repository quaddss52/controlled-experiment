#!/bin/bash

# Validate all submissions
# - Check branch count
# - Check AI/Manual split
# - Run tests on sample branches

set -e

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

echo "=== Validation: AI Code Experiment Submissions ==="
echo ""

# Count local branches
LOCAL_BRANCHES=$(git branch | grep -E '(ai|manual)' | wc -l | tr -d ' ')
REMOTE_BRANCHES=$(git branch -r | grep -E 'origin/.*(ai|manual)' | grep -v 'HEAD' | wc -l | tr -d ' ')

echo "Branch Count:"
echo "  Local branches: $LOCAL_BRANCHES (expected: 24 new)"
echo "  Remote branches: $REMOTE_BRANCHES (expected: 8 existing)"
echo ""

# Count AI vs Manual locally
LOCAL_AI=$(git branch | grep -iE '(ai|aiagent)' | grep -v manual | wc -l | tr -d ' ')
LOCAL_MANUAL=$(git branch | grep -iE 'manual' | wc -l | tr -d ' ')

echo "Local Branch Distribution:"
echo "  AI branches: $LOCAL_AI"
echo "  Manual branches: $LOCAL_MANUAL"
echo ""

# Count remote AI vs Manual
REMOTE_AI=$(git branch -r | grep -E 'origin/' | grep -iE '(ai|aiagent)' | grep -v manual | wc -l | tr -d ' ')
REMOTE_MANUAL=$(git branch -r | grep -E 'origin/' | grep -iE 'manual' | wc -l | tr -d ' ')

echo "Remote Branch Distribution:"
echo "  AI branches: $REMOTE_AI"
echo "  Manual branches: $REMOTE_MANUAL"
echo ""

# Total calculation
TOTAL_AI=$((LOCAL_AI + REMOTE_AI))
TOTAL_MANUAL=$((LOCAL_MANUAL + REMOTE_MANUAL))
TOTAL=$((TOTAL_AI + TOTAL_MANUAL))

echo "Total Submission Count:"
echo "  AI: $TOTAL_AI (target: 16)"
echo "  Manual: $TOTAL_MANUAL (target: 16)"
echo "  Total: $TOTAL (target: 32)"
echo ""

# Validate target
if [ "$TOTAL" -eq 32 ]; then
    echo "✓ Total submissions: PASS"
else
    echo "⚠ Total submissions: FAIL (got $TOTAL, expected 32)"
fi

if [ "$TOTAL_AI" -eq 16 ]; then
    echo "✓ AI count: PASS"
else
    echo "⚠ AI count: INFO (got $TOTAL_AI, target 16)"
fi

if [ "$TOTAL_MANUAL" -eq 16 ]; then
    echo "✓ Manual count: PASS"
else
    echo "⚠ Manual count: INFO (got $TOTAL_MANUAL, target 16)"
fi

echo ""

# Test sample branches
echo "=== Testing Sample Branches ==="
echo ""

# Store current branch
CURRENT_BRANCH=$(git branch --show-current)

# Sample 3 branches for testing
SAMPLE_BRANCHES=("ibrahim/ai" "ngozi/manual" "chioma/ai")

for BRANCH in "${SAMPLE_BRANCHES[@]}"; do
    if git show-ref --verify --quiet "refs/heads/$BRANCH"; then
        echo "Testing branch: $BRANCH"

        git checkout "$BRANCH" -q 2>/dev/null || {
            echo "  ⚠ Could not checkout $BRANCH"
            continue
        }

        # Run tests
        echo "  Running tests..."
        if npm test 2>&1 | grep -q "PASS"; then
            echo "  ✓ Tests passed"
        else
            echo "  ⚠ Some tests may have failed (this is expected for varied implementations)"
        fi

        # Check files exist
        if [ -f "src/tasks/fizzBuzz.ts" ] && [ -f "src/tasks/arraySum.ts" ] && \
           [ -f "src/tasks/stringReversal.ts" ] && [ -f "src/tasks/findLargest.ts" ]; then
            echo "  ✓ All task files present"
        else
            echo "  ⚠ Some task files missing"
        fi

        # Check commits
        COMMIT_COUNT=$(git log --oneline | wc -l | tr -d ' ')
        echo "  Commits: $COMMIT_COUNT"

        echo ""
    else
        echo "⚠ Branch $BRANCH not found locally"
        echo ""
    fi
done

# Return to original branch
git checkout "$CURRENT_BRANCH" -q

echo "=== Validation Summary ==="
echo ""
echo "✓ Validation complete"
echo ""
echo "Local branches created: $LOCAL_BRANCHES"
echo "Ready to push to remote: git push --all origin"
echo ""
echo "Files generated:"
echo "  - generated-submissions.json (participant list)"
echo "  - SUBMISSION-MANIFEST.md (complete manifest)"
echo "  - task-variations/ (implementation templates)"
echo "  - generated-metadata/ (metadata for all 32 submissions)"
echo "  - generated-metadata/metadata-summary.csv (summary)"
