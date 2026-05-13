# SonarCloud Quick Start Guide

You've already:
✅ Connected your repo to SonarCloud
✅ Generated your token (added to sonar-project.properties)
✅ Installed sonar-scanner

## Next Steps (2 minutes)

### Step 1: Get Your Organization Name

1. Go to SonarCloud: https://sonarcloud.io
2. Log in
3. Look at the URL or top-left corner - you'll see your organization name
4. It looks like: `sonarcloud.io/organizations/YOUR-ORG-NAME`

### Step 2: Update Configuration

Edit `sonar-project.properties` file (line 54):

**Replace**:
```properties
sonar.organization=YOUR_ORGANIZATION_NAME_HERE
```

**With** (example):
```properties
sonar.organization=quadriakinpelu
```

### Step 3: Test SonarCloud Connection

Run this command to test:

```bash
cd "/Users/quadriakinpelu/Desktop/Test Experiment"
sonar-scanner
```

**If successful**, you'll see:
```
INFO: ANALYSIS SUCCESSFUL
INFO: Task total time: X.XXXs
INFO: View your analysis at: https://sonarcloud.io/dashboard?id=ai-code-experiment
```

**If it fails**, check:
- Organization name is correct (line 54)
- Token is correct (line 60)
- You're connected to the internet

### Step 4: Run Full Evaluation with SonarCloud

```bash
# Checkout a test branch
git checkout ibrahim/ai

# Run complete evaluation (includes SonarCloud scan)
bash scripts/evaluate.sh ibrahim/ai 1

# View results
# Results will appear at: https://sonarcloud.io/project/overview?id=ai-code-experiment
```

---

## Quick Reference

### Your Configuration File Location
```
/Users/quadriakinpelu/Desktop/Test Experiment/sonar-project.properties
```

### What to Fill In (line 54):
```properties
sonar.organization=YOUR_ACTUAL_ORG_NAME
```

### Where to Find Organization Name:
- **Method 1**: Go to https://sonarcloud.io and look at the URL
- **Method 2**: SonarCloud → Projects → Click on a project → Look at breadcrumb
- **Method 3**: SonarCloud → My Account → Organizations

### Example Organization Names:
- `john-smith` (if your username is john-smith)
- `my-company` (if you created an org called "my-company")
- `github-username` (often matches your GitHub username)

---

## Viewing Your Results

After running evaluation, view results at:

**Main Dashboard**:
```
https://sonarcloud.io/project/overview?id=ai-code-experiment
```

**Per-Participant Projects**:
Each evaluation creates a separate project:
```
https://sonarcloud.io/project/overview?id=participant-ibrahim-ai-task-1
https://sonarcloud.io/project/overview?id=participant-ngozi-manual-task-1
```

---

## Troubleshooting

### Error: "Organization key is invalid"
- Check that `sonar.organization` matches exactly (case-sensitive!)
- Go to https://sonarcloud.io/account/organizations to verify

### Error: "Unauthorized"
- Your token might be wrong
- Generate a new token: https://sonarcloud.io/account/security
- Update line 60 in sonar-project.properties

### Error: "Project key already exists"
- This is OK! It means the project exists
- The analysis will update the existing project

### Nothing shows up in SonarCloud
- Wait 1-2 minutes for processing
- Check https://sonarcloud.io/projects for all projects
- Look for projects starting with "participant-"

---

## Complete Example

Here's what your configuration should look like (example):

```properties
# Your organization (CHANGE THIS)
sonar.organization=quadriakinpelu

# SonarCloud URL (don't change)
sonar.host.url=https://sonarcloud.io

# Your token (already set)
sonar.login=573bfce1c3e11ff3fe1234b12bcaaa08b9092448
```

Then run:
```bash
# Test connection
sonar-scanner

# Run evaluation
git checkout ibrahim/ai
bash scripts/evaluate.sh ibrahim/ai 1
```

View at: https://sonarcloud.io

---

## What You'll Get

SonarCloud will analyze:
- 🔒 Security vulnerabilities
- 🐛 Code smells
- 📊 Code coverage
- 🧮 Complexity metrics
- 📈 Maintainability rating

All automatically included in your evaluation pipeline!

---

**That's it!** Just update the organization name and you're ready to go! 🚀
