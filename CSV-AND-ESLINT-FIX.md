# CSV [object Object] and ESLint Configuration Fix

## Issues Fixed

### Issue 1: `[object Object]` in CSV Output ✅
**Problem**: The `DependencyRisks` field in `all-metrics.csv` was showing `[object Object]` instead of a number.

**Root Cause**: The code was trying to serialize the entire `metadata.dependencies` object (which contains `{prod, dev, optional, peer, peerOptional, total}`) directly to CSV.

**Fix**: Updated `scripts/collect-metrics.ts` to extract only the `total` field from the dependencies object.

**File**: `scripts/collect-metrics.ts` (lines 194-207)

**Before**:
```typescript
return {
  totalVulnerabilities: metadata.total || 0,
  highSeverity: vulnerabilities.high || 0,
  mediumSeverity: vulnerabilities.moderate || 0,
  lowSeverity: vulnerabilities.low || 0,
  dependencyRisks: metadata.dependencies || 0,  // ❌ This is an object!
};
```

**After**:
```typescript
const dependencies = metadata.dependencies || {};

return {
  totalVulnerabilities: vulnerabilities.total || 0,
  highSeverity: vulnerabilities.high || 0,
  mediumSeverity: vulnerabilities.moderate || 0,
  lowSeverity: vulnerabilities.low || 0,
  dependencyRisks: dependencies.total || 0,  // ✅ Now extracts .total
};
```

### Issue 2: ESLint Report Not Being Generated ✅
**Problem**: ESLint v10 requires the new flat config format (`eslint.config.js`) but the repo only had the legacy `.eslintrc.json` file.

**Error Message**:
```
ESLint couldn't find an eslint.config.(js|mjs|cjs) file.
```

**Fix**: Created `eslint.config.js` with ESLint v9+ flat config format, migrated from `.eslintrc.json`.

**File**: `eslint.config.js` (new file)

**Key Features**:
- Migrated all rules from `.eslintrc.json`
- Complexity rules: `complexity`, `max-lines-per-function`, `max-depth`, `max-params`
- TypeScript rules: explicit return types, no-any, no-unused-vars
- Proper globals for Node.js and Jest
- Ignores dist/, node_modules/, coverage/

## npm Audit JSON Structure (for reference)

```json
{
  "metadata": {
    "vulnerabilities": {
      "info": 0,
      "low": 0,
      "moderate": 0,
      "high": 0,
      "critical": 0,
      "total": 0  // ← Used for totalVulnerabilities
    },
    "dependencies": {
      "prod": 1,
      "dev": 421,
      "optional": 28,
      "peer": 0,
      "peerOptional": 0,
      "total": 421  // ← Used for dependencyRisks
    }
  }
}
```

## Files Modified/Created

1. **Modified**: `scripts/collect-metrics.ts`
   - Fixed `parseNpmAudit()` function to extract `dependencies.total` instead of entire object

2. **Created**: `eslint.config.js`
   - New ESLint v10 flat config format
   - Migrated all rules from `.eslintrc.json`

3. **Kept**: `.eslintrc.json`
   - Preserved for backward compatibility reference
   - Not used by ESLint v10+

## Testing the Fixes

### Test CSV Fix:
```bash
# Checkout any branch
git checkout ngozi/manual

# Run evaluation
bash scripts/evaluate.sh ngozi/manual 1

# Collect metrics
npx ts-node scripts/collect-metrics.ts "ngozi/manual" 1

# Check CSV output - should show number instead of [object Object]
cat results/all-metrics.csv
```

**Expected**: `DependencyRisks` column shows `421` (or similar number) instead of `[object Object]`

### Test ESLint Fix:
```bash
# Run ESLint with report
npm run lint:report

# Check if report was generated
ls -la eslint-report.json

# View complexity metrics (should not be empty)
cat eslint-report.json | grep complexity
```

**Expected**:
- `eslint-report.json` file created
- No "couldn't find eslint.config" error
- Report contains complexity metrics

## Integration with Branches

Since these fixes are on the `main` branch, you can merge them into evaluation branches:

```bash
# Example: Merge fixes into a participant branch before evaluation
git checkout ngozi/manual
git merge main -m "Merge evaluation fixes from main"

# Or apply to all branches
for branch in $(git branch | grep -E '(ai|manual)'); do
  git checkout $branch
  git merge main -m "Merge evaluation fixes from main"
done
```

## Expected Results After Fix

### CSV Output:
```csv
ParticipantID,TaskNumber,...,DependencyRisks
ngozi/manual,1,...,421
```
✅ Shows number instead of `[object Object]`

### ESLint Report:
```json
[
  {
    "filePath": "/path/to/file.ts",
    "messages": [
      {
        "ruleId": "complexity",
        "message": "Function has a complexity of 5.",
        ...
      }
    ]
  }
]
```
✅ Report generated successfully

### Metrics JSON:
```json
{
  "security": {
    "dependencyRisks": 421  // ✅ Number, not object
  },
  "complexity": {
    "averageCyclomaticComplexity": 3.5,  // ✅ Not 0
    "maxCyclomaticComplexity": 8  // ✅ Not 0
  }
}
```

## Validation Checklist

- [x] `dependencyRisks` field extracts `.total` from object
- [x] ESLint flat config created with all rules migrated
- [x] CSV output format fixed
- [x] ESLint report generation works
- [x] Fixes applied to `main` branch for easy merging
- [x] Documentation created

## Troubleshooting

### If CSV still shows [object Object]:
- Make sure you merged the fix from main branch
- Check that `scripts/collect-metrics.ts` has the updated code (line 199: `const dependencies = metadata.dependencies || {};`)
- Re-run evaluation from scratch

### If ESLint still fails:
- Verify `eslint.config.js` exists in root directory
- Check ESLint version: `npx eslint --version` (should be 10.x)
- Try: `npm run lint` to see detailed error

### If complexity metrics still show 0:
- ESLint report must be generated first (fix Issue 2)
- Check that `eslint-report.json` contains messages with `ruleId: "complexity"`
- The complexity rule must trigger (functions must exceed threshold)

## Summary

✅ **Fixed**: CSV now shows numeric `dependencyRisks` value
✅ **Fixed**: ESLint reports are now generated correctly
✅ **Benefit**: All evaluation metrics can now be collected properly

---

**Status**: ✅ Both issues resolved
**Date**: 2026-05-13
**Files Modified**: `scripts/collect-metrics.ts`, `eslint.config.js` (new)
**Ready**: To merge into evaluation branches
