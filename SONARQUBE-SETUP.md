# SonarQube Setup Guide for AI Code Experiment

SonarQube provides security and maintainability analysis for your experiment. This guide covers multiple setup options.

## Quick Start (Docker - RECOMMENDED) 🐳

### Prerequisites
- Docker installed: https://docs.docker.com/get-docker/

### Setup Steps

#### 1. Start SonarQube Container
```bash
docker run -d --name sonarqube -p 9000:9000 sonarqube:latest
```

#### 2. Wait for SonarQube to Start (2-3 minutes)
```bash
# Check if ready
docker logs -f sonarqube

# Look for: "SonarQube is operational"
```

#### 3. Access SonarQube
Open browser: http://localhost:9000

**Default credentials**:
- Username: `admin`
- Password: `admin`
- (You'll be prompted to change password on first login)

#### 4. Generate Authentication Token
1. Log in to SonarQube
2. Click your avatar (top right) → My Account
3. Security tab
4. Generate Tokens → Enter name: "ai-code-experiment"
5. Copy the token (you'll only see it once!)

#### 5. Update Configuration
```bash
# Edit sonar-project.properties
# Uncomment and add your token:
nano sonar-project.properties
```

Add this line:
```properties
sonar.login=YOUR_TOKEN_HERE
```

#### 6. Install SonarQube Scanner

**macOS (Homebrew)**:
```bash
brew install sonar-scanner
```

**Linux**:
```bash
wget https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-5.0.1.3006-linux.zip
unzip sonar-scanner-cli-5.0.1.3006-linux.zip
export PATH=$PATH:$(pwd)/sonar-scanner-5.0.1.3006-linux/bin
```

**Windows**:
1. Download from: https://docs.sonarqube.org/latest/analyzing-source-code/scanners/sonarscanner/
2. Extract to `C:\sonar-scanner`
3. Add to PATH: `C:\sonar-scanner\bin`

#### 7. Verify Installation
```bash
sonar-scanner --version
# Should show: SonarScanner 5.0.1.3006
```

#### 8. Test SonarQube with Your Code
```bash
# Checkout a branch
git checkout ibrahim/ai

# Run evaluation (includes SonarQube scan)
bash scripts/evaluate.sh ibrahim/ai 1

# View results at:
# http://localhost:9000/dashboard?id=participant-ibrahim-ai-task-1
```

---

## Option 2: SonarCloud (Cloud-Based - No Installation) ☁️

Best for: No local setup needed, works from anywhere

### Setup Steps

#### 1. Sign Up
Go to: https://sonarcloud.io
- Sign in with GitHub
- Create organization (free for public repos)

#### 2. Create Project
1. Click "+" → Analyze new project
2. Choose repository or manual setup
3. Note your **Project Key** and **Organization**

#### 3. Generate Token
1. My Account → Security
2. Generate Token → Name: "ai-code-experiment"
3. Copy token

#### 4. Update Configuration
Edit `sonar-project.properties`:

```properties
# SonarCloud configuration
sonar.organization=YOUR_ORGANIZATION
sonar.host.url=https://sonarcloud.io
sonar.login=YOUR_SONARCLOUD_TOKEN

# Project settings
sonar.projectKey=YOUR_PROJECT_KEY
sonar.projectName=AI Code Experiment
```

#### 5. Install Scanner (same as Option 1, step 6)

#### 6. Run Analysis
```bash
git checkout ibrahim/ai
bash scripts/evaluate.sh ibrahim/ai 1
```

View results at: https://sonarcloud.io/dashboard?id=YOUR_PROJECT_KEY

---

## Option 3: Manual Installation (For Advanced Users)

### Prerequisites
- Java 11 or Java 17 installed

### Steps

#### 1. Download SonarQube
```bash
wget https://binaries.sonarsource.com/Distribution/sonarqube/sonarqube-10.3.0.82913.zip
unzip sonarqube-10.3.0.82913.zip
cd sonarqube-10.3.0.82913
```

#### 2. Start SonarQube
**macOS/Linux**:
```bash
./bin/macosx-universal-64/sonar.sh start
```

**Windows**:
```bash
bin\windows-x86-64\StartSonar.bat
```

#### 3. Access and Configure
- URL: http://localhost:9000
- Follow steps 3-8 from Docker option above

---

## Troubleshooting

### Docker: Port 9000 Already in Use
```bash
# Use a different port
docker run -d --name sonarqube -p 9001:9000 sonarqube:latest

# Update sonar-project.properties:
sonar.host.url=http://localhost:9001
```

### Docker: Container Won't Start
```bash
# Check logs
docker logs sonarqube

# Common issue: Not enough memory
# Increase Docker memory to at least 2GB
# Docker Desktop → Settings → Resources → Memory
```

### Scanner Not Found
```bash
# Verify installation
which sonar-scanner

# If not found, check PATH
echo $PATH

# Re-add to PATH (example for macOS/Linux)
export PATH=$PATH:/path/to/sonar-scanner/bin
```

### Analysis Fails: "No token provided"
Add token to `sonar-project.properties`:
```properties
sonar.login=YOUR_TOKEN_HERE
```

Or pass via command line:
```bash
sonar-scanner -Dsonar.login=YOUR_TOKEN
```

### Connection Refused
Ensure SonarQube is running:
```bash
# Docker
docker ps | grep sonarqube

# Manual
curl http://localhost:9000/api/system/status
```

---

## Using SonarQube in Your Evaluation Workflow

### Automatic Scanning (Already Configured!)

The `scripts/evaluate.sh` script automatically runs SonarQube when available:

```bash
# Checkout branch
git checkout ngozi/manual

# Run full evaluation (includes SonarQube if installed)
bash scripts/evaluate.sh ngozi/manual 1
```

### Manual Scanning

```bash
# From project root
sonar-scanner \
  -Dsonar.projectKey=participant-ngozi-manual-task-1 \
  -Dsonar.sources=src/tasks \
  -Dsonar.tests=src/tests \
  -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info
```

### Viewing Results

**Local SonarQube**:
- Dashboard: http://localhost:9000/projects
- Specific project: http://localhost:9000/dashboard?id=participant-ngozi-manual-task-1

**SonarCloud**:
- Dashboard: https://sonarcloud.io/projects
- Specific project: https://sonarcloud.io/dashboard?id=YOUR_PROJECT_KEY

### What SonarQube Analyzes

1. **Security Vulnerabilities**
   - SQL injection risks
   - XSS vulnerabilities
   - Hardcoded credentials
   - Weak cryptography

2. **Code Smells**
   - Duplicated code
   - Complex functions
   - Dead code
   - Naming conventions

3. **Maintainability**
   - Technical debt
   - Cognitive complexity
   - Maintainability rating (A-E)

4. **Coverage**
   - Line coverage from Jest
   - Uncovered branches

---

## Collecting SonarQube Metrics

Currently, `collect-metrics.ts` sets `maintainabilityIndex: null` because it requires manual API calls.

### Option 1: Use SonarQube Web API

Add to `scripts/collect-metrics.ts`:

```typescript
async function getSonarQubeMetrics(projectKey: string): Promise<number | null> {
  try {
    const response = await fetch(
      `http://localhost:9000/api/measures/component?component=${projectKey}&metricKeys=sqale_index`
    );
    const data = await response.json();
    return data.component.measures[0]?.value || null;
  } catch (error) {
    return null;
  }
}
```

### Option 2: Export from Web UI

1. Go to project dashboard
2. Click "More" → Export
3. Download CSV/JSON
4. Import into your analysis

---

## Batch Evaluation with SonarQube

To evaluate all 32 participant branches:

```bash
# Create a batch script
for branch in $(git branch | grep -E '(ai|manual)'); do
  echo "Evaluating $branch..."
  git checkout $branch
  bash scripts/evaluate.sh "$branch" 1
  npx ts-node scripts/collect-metrics.ts "$branch" 1
done

# Return to main
git checkout main
```

View all projects in SonarQube dashboard to compare metrics across participants.

---

## Quick Reference Commands

```bash
# Start Docker SonarQube
docker run -d --name sonarqube -p 9000:9000 sonarqube:latest

# Stop SonarQube
docker stop sonarqube

# Restart SonarQube
docker restart sonarqube

# Remove SonarQube (keeps data)
docker stop sonarqube && docker rm sonarqube

# Complete cleanup (removes all data)
docker stop sonarqube && docker rm sonarqube && docker volume prune

# Check SonarQube status
curl http://localhost:9000/api/system/status

# Run scanner manually
sonar-scanner -Dsonar.projectKey=test-project

# View scanner version
sonar-scanner --version
```

---

## Summary

**Recommended Setup**: Docker (Option 1)
- Fastest: 5 minutes to get running
- Easiest: One command to start
- Isolated: No conflicts with system

**For Production/Team**: SonarCloud (Option 2)
- No local installation
- Accessible anywhere
- Free for public repos

**For Advanced Users**: Manual Installation (Option 3)
- Full control
- Custom configuration
- Better for air-gapped environments

---

## Next Steps

1. ✅ Choose setup option (Docker recommended)
2. ✅ Start SonarQube
3. ✅ Generate authentication token
4. ✅ Update `sonar-project.properties`
5. ✅ Install sonar-scanner
6. ✅ Test with: `bash scripts/evaluate.sh ibrahim/ai 1`
7. ✅ View results in web UI

**That's it!** Your evaluation pipeline will now include security and maintainability metrics from SonarQube.

---

**Questions?** Check the troubleshooting section or SonarQube documentation: https://docs.sonarqube.org
