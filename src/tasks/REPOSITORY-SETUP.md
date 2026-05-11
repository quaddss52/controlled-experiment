# GitHub Repository Setup Guide

This guide walks you through setting up the GitHub repository for the experiment.

---

## Step 1: Create GitHub Repository

### Option A: GitHub.com UI

1. Go to https://github.com/new
2. **Repository name**: `ai-code-experiment` (or your preferred name)
3. **Description**: "Controlled experiment comparing AI-assisted and manual TypeScript code"
4. **Visibility**:
   - **Private** (recommended) - Only you and added participants can see it
   - **Public** - Anyone can see it (not recommended for research data)
5. **DON'T initialize** with README, .gitignore, or license (we already have these)
6. Click **Create repository**

### Option B: GitHub CLI

```bash
# If you have gh CLI installed
gh repo create ai-code-experiment --private --source=. --remote=origin --push
```

---

## Step 2: Push Your Local Code to GitHub

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial experiment setup"

# Add remote (replace YOUR-USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR-USERNAME/ai-code-experiment.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## Step 3: Configure Branch Protection Rules

Protect the `main` branch so participants can't accidentally push to it.

### Via GitHub UI:

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Click **Branches** in left sidebar
4. Under "Branch protection rules", click **Add rule**
5. **Branch name pattern**: `main`
6. Enable these settings:
   - ☑️ **Require a pull request before merging** (UNCHECK this - we want to allow your pushes)
   - ☑️ **Restrict who can push to matching branches**
     - Add yourself as allowed to push
     - This prevents participants from pushing to main
7. Click **Create** or **Save changes**

**Alternative simpler approach**: Don't add branch protection, just tell participants clearly not to push to `main`. Their personal branches won't affect yours.

---

## Step 4: Add Participant Collaborators

You need to give participants write access so they can push their branches.

### Option A: Add All 32 Participants as Collaborators

1. Go to repository **Settings** → **Collaborators**
2. Click **Add people**
3. Enter each participant's GitHub username
4. They'll receive an invitation email
5. They must accept the invitation before they can push

**Pros**: Simple, participants have direct access
**Cons**: Requires knowing all GitHub usernames upfront

### Option B: Use GitHub Organization (Better for larger studies)

1. Create a GitHub Organization (free for public repos, or paid for private)
2. Add the repository to the organization
3. Create a team (e.g., "Participants")
4. Add all participants to the team
5. Give the team write access to the repository

**Pros**: Easier to manage many participants
**Cons**: Requires setting up organization

### Option C: Collect Submissions via Pull Requests (Alternative)

If you don't want to give direct write access:

1. Participants fork your repository
2. They create branches in their fork
3. They open a pull request to your repository
4. You review and merge (or just fetch their branches)

**Update PARTICIPANT-INSTRUCTIONS.md** if using this method.

---

## Step 5: Create Participant Assignment Spreadsheet

Create a spreadsheet to track participants:

| Participant ID | GitHub Username | Group | Email | Invitation Sent | Submitted | Evaluated |
|----------------|-----------------|-------|-------|-----------------|-----------|-----------|
| P001 | alice_dev | A | alice@... | ✓ | ✓ | ✓ |
| P002 | bob_codes | B | bob@... | ✓ | ✓ | ✓ |
| ... | ... | ... | ... | ... | ... | ... |

This helps you:
- Track who to invite
- Map participant IDs to GitHub usernames
- Track submission and evaluation status
- Record group assignments (A = AI, B = Manual)

---

## Step 6: Prepare Participant Communication

### Email Template 1: Initial Invitation

```
Subject: Invitation to AI Code Generation Research Study

Hi [Name],

Thank you for volunteering to participate in our research study on AI-assisted
software development!

You've been assigned Participant ID: P001
Group: A (AI-assisted with GitHub Copilot) / B (Manual, no AI tools)

Next steps:
1. Accept the GitHub repository invitation (sent separately)
2. Read the instructions: [REPOSITORY_URL]/blob/main/PARTICIPANT-INSTRUCTIONS.md
3. Complete the experiment within [DEADLINE]

Repository: [REPOSITORY_URL]

Estimated time: 2 hours (must be completed in one sitting)

Questions? Reply to this email.

Thank you!
[Your name]
```

### Email Template 2: GitHub Invitation Follow-up

```
Subject: GitHub Repository Access - AI Code Experiment

Hi P001,

I've invited you to collaborate on the experiment repository.

1. Check your email for GitHub invitation
2. Accept the invitation
3. Follow instructions at: [REPOSITORY_URL]/blob/main/PARTICIPANT-INSTRUCTIONS.md

Your branch name will be: participant/P001

Let me know if you have any issues accessing the repository.

[Your name]
```

### Email Template 3: Submission Reminder

```
Subject: Reminder: AI Code Experiment Submission

Hi P001,

This is a reminder to complete your experiment submission by [DEADLINE].

Current status: Not yet submitted

Steps:
1. Complete the 4 tasks
2. Push your branch: git push origin participant/P001
3. Fill out the metadata form: [FORM_URL]

Questions? Let me know!

[Your name]
```

---

## Step 7: Create Metadata Collection Form

Use Google Forms, Microsoft Forms, or Typeform to collect:

### Required Fields:
- Participant ID (text)
- Group (dropdown: Group A - AI-assisted, Group B - Manual)
- Session date (date)
- Session start time (time)
- Session end time (time)

### Per-Task Questions:
For each of the 4 tasks:
- Time spent (minutes)
- **Group A only**: Prompts used (long text)
- **Group A only**: Number of refinements (number)
- Any issues encountered? (long text)

### Experience Questions:
- Years of TypeScript experience (number)
- Years of JavaScript experience (number)
- Previous AI tool experience (dropdown: None/Limited/Moderate/Extensive)
- Primary IDE (text)

### Post-Session Questions:
- Overall difficulty (1-5 scale)
- Time perception (dropdown: Too short/Just right/Too long)
- **Group A only**: Copilot helpfulness (1-5 scale)
- General comments (long text)

**Share the form URL** with participants in your communication.

---

## Step 8: Test the Workflow

Before inviting all participants, test with yourself or a colleague:

1. **Create a test branch**:
   ```bash
   git checkout -b participant/TEST
   ```

2. **Implement one task** (e.g., FizzBuzz)

3. **Commit and push**:
   ```bash
   git add src/tasks/fizzBuzz.ts
   git commit -m "Complete Task 1: FizzBuzz"
   git push origin participant/TEST
   ```

4. **Verify on GitHub**: Check that the branch appears

5. **Test evaluation**:
   ```bash
   bash researcher-tools/fetch-submissions.sh
   bash researcher-tools/evaluate-all.sh
   ```

6. **Check results**: Verify `results/all-metrics.csv` is created

7. **Clean up**:
   ```bash
   git checkout main
   git branch -D participant/TEST
   git push origin --delete participant/TEST
   rm -rf results/TEST
   ```

---

## Step 9: Repository Configuration Checklist

Before sending invitations, verify:

- [ ] Repository created on GitHub
- [ ] Code pushed to `main` branch
- [ ] All documentation files present (README, PARTICIPANT-INSTRUCTIONS, etc.)
- [ ] Branch protection configured (optional)
- [ ] Participant spreadsheet prepared
- [ ] Metadata collection form created
- [ ] Email templates ready
- [ ] Test workflow completed successfully
- [ ] SonarQube running (optional)
- [ ] All scripts are executable and tested

---

## Step 10: Managing Submissions

### As participants submit:

1. **Monitor submissions**:
   ```bash
   # Check for new branches
   git fetch --all
   git branch -r | grep participant/
   ```

2. **Track in spreadsheet**: Mark who has submitted

3. **Send reminders** to participants who haven't submitted

### After all submissions received:

1. **Fetch all branches**:
   ```bash
   bash researcher-tools/fetch-submissions.sh
   ```

2. **Run batch evaluation**:
   ```bash
   bash researcher-tools/evaluate-all.sh
   ```

3. **Review results**:
   ```bash
   # Open the aggregated CSV
   open results/all-metrics.csv
   # or
   cat results/all-metrics.csv
   ```

4. **Update group assignments**: Edit the CSV to add correct Group (A or B) for each participant

---

## Troubleshooting

### Participant can't push to repository

**Error**: `Permission denied`

**Solution**:
- Verify they accepted the collaboration invitation
- Check they're using the correct GitHub account
- Ensure they have write access (check Settings → Collaborators)

### Participant pushed to wrong branch

**Error**: Pushed to `main` instead of `participant/P001`

**Solution**:
```bash
# You can revert their commit to main
git checkout main
git reset --hard origin/main
git push --force

# Ask them to create correct branch and push again
```

### Branch not appearing in evaluation

**Error**: `fetch-submissions.sh` doesn't find the branch

**Solution**:
```bash
# Manually fetch
git fetch --all --prune

# Check if branch exists remotely
git branch -r | grep participant/

# If it exists, evaluation script should pick it up
```

---

## Security Considerations

### Private Repository Best Practices:

1. **Use private repository** for participant data
2. **Don't commit sensitive data** (emails, real names)
3. **Use participant IDs** instead of real names
4. **Remove participant access** after study concludes
5. **Archive repository** for record-keeping

### Public Repository Considerations:

If you want to make the template public (for other researchers):
1. Create a **separate public repo** with the template only
2. Keep your **experiment repo private** with actual submissions
3. **Anonymize all data** before publication

---

## After the Experiment

1. **Back up all data**:
   ```bash
   # Clone the entire repository
   git clone --mirror https://github.com/YOUR-USERNAME/ai-code-experiment.git

   # Archive results
   tar -czf experiment-results-backup.tar.gz results/
   ```

2. **Remove participant access**:
   - Go to Settings → Collaborators
   - Remove all participants

3. **Archive the repository**:
   - Settings → General → Danger Zone
   - Archive this repository

4. **Publish results**: Share findings while maintaining participant anonymity

---

## Quick Reference

```bash
# Clone repository (for participants)
git clone https://github.com/YOUR-USERNAME/ai-code-experiment.git

# Fetch all submissions (for researcher)
bash researcher-tools/fetch-submissions.sh

# Evaluate all submissions (for researcher)
bash researcher-tools/evaluate-all.sh

# Check evaluation results
cat results/all-metrics.csv
```

---

**You're now ready to run your experiment!** 🎉

---

**Next**: Send invitations to your first batch of participants and monitor submissions.

**Version**: 1.0
**Contact**: [Your contact information]
