#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const ignore = require("ignore"); // Import ignore library

/**
 * Recursively builds the directory structure as a JSON object,
 * optionally including metadata for files.
 * @param {string} dirPath - The directory path to scan
 * @param {ignore.Ignore} ig - The ignore instance
 * @param {boolean} simple - Flag to exclude metadata
 * @returns {object} - Directory structure JSON
 */
function buildDirectoryTree(dirPath, ig, simple) {
  const stats = fs.statSync(dirPath);

  // Handle files
  if (stats.isFile()) {
    if (simple) {
      return null; // Simple mode: no metadata
    }

    const fileContent = fs.readFileSync(dirPath, "utf-8");
    return {
      size: stats.size,
      type: path.extname(dirPath).slice(1) || "unknown", // File extension without "."
      lastModified: stats.mtime.toISOString(), // Last modified timestamp
      lines: fileContent.split("\n").length, // Count lines in file
    };
  }

  // Handle directories
  const result = {};
  const items = fs.readdirSync(dirPath);

  items.forEach((item) => {
    const itemPath = path.join(dirPath, item);
    const relativePath = path.relative(process.cwd(), itemPath);

    // Exclude hidden files, directories, or ignored patterns
    if (item.startsWith(".") || ig.ignores(relativePath)) {
      return;
    }

    const itemStats = fs.statSync(itemPath);
    if (itemStats.isDirectory()) {
      result[item] = buildDirectoryTree(itemPath, ig, simple);
    } else {
      result[item] = buildDirectoryTree(itemPath, ig, simple);
    }
  });

  return result;
}

/**
 * Get ignore rules from .gitignore
 * @param {string} rootDir - Root directory to find .gitignore
 * @returns {ignore.Ignore} - Ignore instance
 */
function loadGitignore(rootDir) {
  const ig = ignore();
  const gitignorePath = path.join(rootDir, ".gitignore");
  if (fs.existsSync(gitignorePath)) {
    const gitignoreContent = fs.readFileSync(gitignorePath, "utf8");
    ig.add(gitignoreContent);
  }
  return ig;
}

/**
 * Main function: Generates JSON and writes to a file
 */
function main() {
  const args = process.argv.slice(2);
  const simple = args.includes("-simple") || args.includes("-s"); // Check for -s or -simple

  const directoryPath = path.resolve(args.find((arg) => !arg.startsWith("-")) || process.cwd());
  const projectName = getProjectName(directoryPath);
  const outputFilePath = path.resolve(`${projectName}-structure.json`);

  if (!fs.existsSync(directoryPath)) {
    console.error("Error: Directory does not exist.");
    process.exit(1);
  }

  const ig = loadGitignore(directoryPath);
  console.log("Scanning directory:", directoryPath);
  const directoryTree = buildDirectoryTree(directoryPath, ig, simple);

  fs.writeFileSync(outputFilePath, JSON.stringify(directoryTree, null, 2));
  console.log(`Directory structure saved to: ${outputFilePath}`);
}

/**
 * Get the project name from package.json or fallback to the directory name
 */
function getProjectName(dirPath) {
  const packageJsonPath = path.join(dirPath, "package.json");
  if (fs.existsSync(packageJsonPath)) {
    try {
      const packageData = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
      if (packageData.name) {
        return packageData.name.replace(/[^a-zA-Z0-9-_]/g, "-");
      }
    } catch (err) {
      console.warn("Warning: Unable to parse package.json.");
    }
  }
  return path.basename(dirPath);
}

if (require.main === module) {
  main();
}