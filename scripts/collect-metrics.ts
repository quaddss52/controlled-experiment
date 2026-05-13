#!/usr/bin/env ts-node

/**
 * Metrics Collection Script
 *
 * This script aggregates evaluation results from Jest, ESLint, and npm audit
 * into a structured JSON/CSV format for analysis.
 *
 * Usage: ts-node scripts/collect-metrics.ts [participant-id]
 */

import * as fs from 'fs';
import * as path from 'path';

interface MetricsData {
  participantId: string;
  taskNumber: number;
  timestamp: string;
  functional: {
    testPassRate: number;
    totalTests: number;
    passedTests: number;
    failedTests: number;
    defectDensity: number; // defects per KLOC
    coverage: {
      lines: number;
      statements: number;
      functions: number;
      branches: number;
    };
  };
  complexity: {
    averageCyclomaticComplexity: number;
    maxCyclomaticComplexity: number;
    maintainabilityIndex: number | null; // From SonarQube if available
    averageLinesPerFunction: number;
    totalFunctions: number;
  };
  security: {
    totalVulnerabilities: number;
    highSeverity: number;
    mediumSeverity: number;
    lowSeverity: number;
    dependencyRisks: number;
  };
}

/**
 * Parse Jest coverage data from coverage-summary.json
 */
function parseJestCoverage(resultsDir: string): Partial<MetricsData['functional']> {
  const coveragePath = path.join(resultsDir, 'coverage', 'coverage-summary.json');

  if (!fs.existsSync(coveragePath)) {
    console.warn(`Warning: Coverage file not found at ${coveragePath}`);
    return {
      coverage: { lines: 0, statements: 0, functions: 0, branches: 0 },
    };
  }

  const coverageData = JSON.parse(fs.readFileSync(coveragePath, 'utf-8'));
  const total = coverageData.total;

  return {
    coverage: {
      lines: total.lines.pct,
      statements: total.statements.pct,
      functions: total.functions.pct,
      branches: total.branches.pct,
    },
  };
}

/**
 * Parse Jest test results from JSON output
 */
function parseJestResults(resultsDir: string): Partial<MetricsData['functional']> {
  const testResultsPath = path.join(resultsDir, 'coverage', 'test-results.json');

  if (!fs.existsSync(testResultsPath)) {
    console.warn(`Warning: Test results file not found at ${testResultsPath}`);
    return {
      testPassRate: 0,
      totalTests: 0,
      passedTests: 0,
      failedTests: 0,
      defectDensity: 0,
    };
  }

  try {
    const testData = JSON.parse(fs.readFileSync(testResultsPath, 'utf-8'));

    const totalTests = testData.numTotalTests || 0;
    const passedTests = testData.numPassedTests || 0;
    const failedTests = testData.numFailedTests || 0;

    const testPassRate = totalTests > 0
      ? parseFloat(((passedTests / totalTests) * 100).toFixed(2))
      : 0;

    return {
      testPassRate,
      totalTests,
      passedTests,
      failedTests,
      defectDensity: 0, // Will be calculated later with KLOC
    };
  } catch (error) {
    console.warn(`Warning: Could not parse test results: ${error}`);
    return {
      testPassRate: 0,
      totalTests: 0,
      passedTests: 0,
      failedTests: 0,
      defectDensity: 0,
    };
  }
}

/**
 * Parse ESLint report for complexity metrics
 */
function parseESLintReport(resultsDir: string): MetricsData['complexity'] {
  const eslintPath = path.join(resultsDir, 'eslint-report.json');

  if (!fs.existsSync(eslintPath)) {
    console.warn(`Warning: ESLint report not found at ${eslintPath}`);
    return {
      averageCyclomaticComplexity: 0,
      maxCyclomaticComplexity: 0,
      maintainabilityIndex: null,
      averageLinesPerFunction: 0,
      totalFunctions: 0,
    };
  }

  const eslintData = JSON.parse(fs.readFileSync(eslintPath, 'utf-8'));

  let totalComplexity = 0;
  let maxComplexity = 0;
  let functionCount = 0;
  let totalLines = 0;

  eslintData.forEach((file: any) => {
    file.messages.forEach((message: any) => {
      if (message.ruleId === 'complexity') {
        // Extract complexity from message
        const match = message.message.match(/complexity of (\d+)/);
        if (match) {
          const complexity = parseInt(match[1], 10);
          totalComplexity += complexity;
          maxComplexity = Math.max(maxComplexity, complexity);
          functionCount++;
        }
      }
    });

    // Count lines (approximation based on source)
    if (file.source) {
      totalLines += file.source.split('\n').length;
    }
  });

  const avgComplexity = functionCount > 0 ? totalComplexity / functionCount : 0;
  const avgLinesPerFunction = functionCount > 0 ? totalLines / functionCount : 0;

  return {
    averageCyclomaticComplexity: parseFloat(avgComplexity.toFixed(2)),
    maxCyclomaticComplexity: maxComplexity,
    maintainabilityIndex: null, // Requires SonarQube
    averageLinesPerFunction: parseFloat(avgLinesPerFunction.toFixed(2)),
    totalFunctions: functionCount,
  };
}

/**
 * Parse npm audit results for security vulnerabilities
 */
function parseNpmAudit(resultsDir: string): MetricsData['security'] {
  const auditPath = path.join(resultsDir, 'npm-audit.json');

  if (!fs.existsSync(auditPath)) {
    console.warn(`Warning: npm audit report not found at ${auditPath}`);
    return {
      totalVulnerabilities: 0,
      highSeverity: 0,
      mediumSeverity: 0,
      lowSeverity: 0,
      dependencyRisks: 0,
    };
  }

  const auditData = JSON.parse(fs.readFileSync(auditPath, 'utf-8'));

  // npm audit v7+ format
  const metadata = auditData.metadata || {};
  const vulnerabilities = metadata.vulnerabilities || {};
  const dependencies = metadata.dependencies || {};

  return {
    totalVulnerabilities: vulnerabilities.total || 0,
    highSeverity: vulnerabilities.high || 0,
    mediumSeverity: vulnerabilities.moderate || 0,
    lowSeverity: vulnerabilities.low || 0,
    dependencyRisks: dependencies.total || 0,
  };
}

/**
 * Count lines of code (KLOC)
 */
function countLinesOfCode(sourceDir: string): number {
  let totalLines = 0;

  const files = fs.readdirSync(sourceDir);
  files.forEach((file) => {
    if (file.endsWith('.ts')) {
      const filePath = path.join(sourceDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      totalLines += content.split('\n').length;
    }
  });

  return totalLines / 1000; // Convert to KLOC
}

/**
 * Main collection function
 */
function collectMetrics(participantId: string, taskNumber: number = 1): MetricsData {
  const resultsDir = path.join(process.cwd(), 'results', participantId);

  if (!fs.existsSync(resultsDir)) {
    throw new Error(`Results directory not found for participant ${participantId}`);
  }

  const jestCoverage = parseJestCoverage(resultsDir);
  const jestResults = parseJestResults(resultsDir);
  const eslintResults = parseESLintReport(resultsDir);
  const npmAuditResults = parseNpmAudit(resultsDir);

  const kloc = countLinesOfCode(path.join(process.cwd(), 'src', 'tasks'));
  const defectDensity = jestResults.failedTests
    ? (jestResults.failedTests / kloc)
    : 0;

  const metrics: MetricsData = {
    participantId,
    taskNumber,
    timestamp: new Date().toISOString(),
    functional: {
      testPassRate: jestResults.testPassRate || 0,
      totalTests: jestResults.totalTests || 0,
      passedTests: jestResults.passedTests || 0,
      failedTests: jestResults.failedTests || 0,
      defectDensity,
      coverage: jestCoverage.coverage || {
        lines: 0,
        statements: 0,
        functions: 0,
        branches: 0,
      },
    },
    complexity: eslintResults,
    security: npmAuditResults,
  };

  return metrics;
}

/**
 * Save metrics to JSON file
 */
function saveMetrics(metrics: MetricsData): void {
  const outputDir = path.join(process.cwd(), 'results', metrics.participantId);
  const outputPath = path.join(outputDir, 'metrics.json');

  fs.writeFileSync(outputPath, JSON.stringify(metrics, null, 2));
  console.log(`✓ Metrics saved to: ${outputPath}`);
}

/**
 * Convert metrics to CSV row
 */
function metricsToCSV(metrics: MetricsData): string {
  return [
    metrics.participantId,
    metrics.taskNumber,
    metrics.timestamp,
    metrics.functional.testPassRate,
    metrics.functional.totalTests,
    metrics.functional.passedTests,
    metrics.functional.failedTests,
    metrics.functional.defectDensity,
    metrics.functional.coverage.lines,
    metrics.functional.coverage.statements,
    metrics.functional.coverage.functions,
    metrics.functional.coverage.branches,
    metrics.complexity.averageCyclomaticComplexity,
    metrics.complexity.maxCyclomaticComplexity,
    metrics.complexity.maintainabilityIndex || 'N/A',
    metrics.complexity.averageLinesPerFunction,
    metrics.complexity.totalFunctions,
    metrics.security.totalVulnerabilities,
    metrics.security.highSeverity,
    metrics.security.mediumSeverity,
    metrics.security.lowSeverity,
    metrics.security.dependencyRisks,
  ].join(',');
}

/**
 * Main execution
 */
if (require.main === module) {
  const args = process.argv.slice(2);
  const participantId = args[0] || 'UNKNOWN';
  const taskNumber = parseInt(args[1] || '1', 10);

  console.log('========================================');
  console.log('Collecting Metrics');
  console.log('========================================');
  console.log(`Participant ID: ${participantId}`);
  console.log(`Task Number: ${taskNumber}`);
  console.log('========================================\n');

  try {
    const metrics = collectMetrics(participantId, taskNumber);
    saveMetrics(metrics);

    console.log('\nMetrics Summary:');
    console.log('----------------------------------------');
    console.log(`Test Pass Rate: ${metrics.functional.testPassRate}%`);
    console.log(`Coverage (Lines): ${metrics.functional.coverage.lines}%`);
    console.log(`Avg Cyclomatic Complexity: ${metrics.complexity.averageCyclomaticComplexity}`);
    console.log(`Total Vulnerabilities: ${metrics.security.totalVulnerabilities}`);
    console.log('----------------------------------------\n');

    // Append to master CSV
    const csvPath = path.join(process.cwd(), 'results', 'all-metrics.csv');
    const csvHeader =
      'ParticipantID,TaskNumber,Timestamp,TestPassRate,TotalTests,PassedTests,FailedTests,DefectDensity,CoverageLines,CoverageStatements,CoverageFunctions,CoverageBranches,AvgCyclomaticComplexity,MaxCyclomaticComplexity,MaintainabilityIndex,AvgLinesPerFunction,TotalFunctions,TotalVulnerabilities,HighSeverity,MediumSeverity,LowSeverity,DependencyRisks\n';

    if (!fs.existsSync(csvPath)) {
      fs.writeFileSync(csvPath, csvHeader);
    }

    fs.appendFileSync(csvPath, metricsToCSV(metrics) + '\n');
    console.log(`✓ Metrics appended to: ${csvPath}`);
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
}

export { collectMetrics, MetricsData };
