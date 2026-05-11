#!/bin/bash

###############################################################################
# SonarQube Setup Helper Script
#
# This script provides instructions and helper commands for setting up
# SonarQube for the experiment.
#
# Usage: bash scripts/setup-sonarqube.sh
###############################################################################

echo "========================================="
echo "SonarQube Setup Guide"
echo "========================================="
echo ""

echo "SonarQube is used for security and maintainability analysis."
echo "Follow these steps to set it up:"
echo ""

echo "Option 1: Docker (Recommended)"
echo "-------------------------------"
echo "1. Install Docker: https://docs.docker.com/get-docker/"
echo "2. Run SonarQube container:"
echo "   docker run -d --name sonarqube -p 9000:9000 sonarqube:latest"
echo "3. Access SonarQube at: http://localhost:9000"
echo "4. Default credentials: admin/admin (change on first login)"
echo ""

echo "Option 2: Manual Installation"
echo "------------------------------"
echo "1. Download SonarQube: https://www.sonarqube.org/downloads/"
echo "2. Extract and run: bin/<OS>/sonar.sh start"
echo "3. Access SonarQube at: http://localhost:9000"
echo ""

echo "Option 3: SonarCloud (Cloud-based)"
echo "-----------------------------------"
echo "1. Sign up at: https://sonarcloud.io"
echo "2. Create a new project"
echo "3. Generate a token"
echo "4. Update sonar-project.properties with your project key and token"
echo ""

echo "Installing SonarQube Scanner"
echo "----------------------------"
echo "The scanner is required to analyze code locally."
echo ""
echo "macOS (Homebrew):"
echo "  brew install sonar-scanner"
echo ""
echo "Linux:"
echo "  wget https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-4.8.0.2856-linux.zip"
echo "  unzip sonar-scanner-cli-4.8.0.2856-linux.zip"
echo "  export PATH=\$PATH:/path/to/sonar-scanner/bin"
echo ""
echo "Windows:"
echo "  Download from: https://docs.sonarqube.org/latest/analysis/scan/sonarscanner/"
echo "  Add to PATH"
echo ""

echo "Verify Installation"
echo "-------------------"
echo "Run: sonar-scanner --version"
echo ""

echo "========================================="
echo "For this experiment:"
echo "========================================="
echo "After SonarQube is running, the evaluation script"
echo "will automatically scan participant submissions."
echo ""
echo "Results will be available at:"
echo "http://localhost:9000/dashboard?id=participant-[ID]-task-[N]"
echo ""
echo "========================================="
