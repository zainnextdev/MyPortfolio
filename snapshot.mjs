// create_snapshot.mjs

import fs from 'fs/promises';
import path from 'path';

// --- CONFIGURATION ---
const ROOT_DIRECTORY = '.';
const OUTPUT_FILE = 'portfolio_snapshot.txt';

// Files and directories to explicitly ignore.
const IGNORE_PATTERNS = [
  'node_modules',
  '.git',
  '.next',
  'out',
  'dist',
  'build',
  '.vscode',
  '.idea',
  'pnpm-lock.yaml',
  'package-lock.json',
  'yarn.lock',
  '.env',
  '.env.local',
  '.env.production',
  '.env.development',
  'public/images', // Example: Ignore image assets
  'public/fonts',  // Example: Ignore font assets
  OUTPUT_FILE
];

// File extensions to include in the content dump.
const INCLUDE_EXTENSIONS = [
  '.js', '.ts', '.jsx', '.tsx', // Scripts
  '.json',                       // Configs
  '.scss', '.css', '.module.scss', // Styles
  '.md', '.mdx',                 // Documentation
  '.mjs', '.cjs',                // JS Modules
  '.svg'                         // Include SVGs as they are often used as components
];

// --- SCRIPT LOGIC ---

// A Set for quick lookup of ignored paths.
const ignoreSet = new Set(IGNORE_PATTERNS);

async function generateSnapshot() {
  console.log('🚀 Starting to generate project snapshot...');
  try {
    // Clear the output file if it exists, or create it.
    await fs.writeFile(OUTPUT_FILE, '');

    // 1. Write a header
    await appendToOutput(`--- Portfolio Snapshot: Zain Khalid ---`);
    await appendToOutput(`--- Generated on: ${new Date().toUTCString()} ---\n`);

    // 2. Add critical configuration files first for context
    await appendToOutput(`\n\n=============== 📌 CRITICAL CONFIG FILES ===============\n`);
    const criticalFiles = ['package.json', 'tsconfig.json', 'next.config.mjs', 'next.config.js', 'postcss.config.js', 'tailwind.config.js'];
    for (const file of criticalFiles) {
      try {
        const content = await fs.readFile(path.join(ROOT_DIRECTORY, file), 'utf-8');
        await appendToOutput(`\n--- FILE: ${file} ---\n`);
        await appendToOutput(content);
        await appendToOutput(`\n--- END OF FILE: ${file} ---\n`);
      } catch (error) {
        // File might not exist (e.g., no tailwind.config.js), which is fine.
        if (error.code !== 'ENOENT') {
            console.warn(`⚠️  Could not read critical file: ${file}`);
        }
      }
    }

    // 3. Generate and append the directory tree
    await appendToOutput(`\n\n=============== 🌳 DIRECTORY STRUCTURE ===============\n`);
    const tree = await generateTree(ROOT_DIRECTORY, '');
    await appendToOutput(tree);

    // 4. Append the content of all other relevant files
    await appendToOutput(`\n\n=============== 📄 SOURCE CODE & FILES ===============\n`);
    await processDirectory(ROOT_DIRECTORY);

    console.log(`✅ Success! Project snapshot saved to ${OUTPUT_FILE}`);

  } catch (error) {
    console.error('❌ An error occurred while generating the snapshot:', error);
  }
}

async function appendToOutput(content) {
  await fs.appendFile(OUTPUT_FILE, content + '\n');
}

async function generateTree(dir, prefix) {
  let treeString = '';
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const filteredEntries = entries.filter(entry => !ignoreSet.has(entry.name));

    for (const [index, entry] of filteredEntries.entries()) {
      const connector = index === filteredEntries.length - 1 ? '└── ' : '├── ';
      treeString += `${prefix}${connector}${entry.name}\n`;
      if (entry.isDirectory()) {
        const newPrefix = prefix + (index === filteredEntries.length - 1 ? '    ' : '│   ');
        treeString += await generateTree(path.join(dir, entry.name), newPrefix);
      }
    }
  } catch (error) {
    // Ignore errors for directories we can't read (e.g., permissions)
  }
  return treeString;
}

async function processDirectory(dir) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (ignoreSet.has(entry.name)) {
        continue;
      }

      if (entry.isDirectory()) {
        await processDirectory(fullPath);
      } else if (entry.isFile() && INCLUDE_EXTENSIONS.includes(path.extname(entry.name))) {
        try {
          const content = await fs.readFile(fullPath, 'utf-8');
          await appendToOutput(`\n--- FILE: ${fullPath.replace(/\\/g, '/')} ---`);
          await appendToOutput(content);
          await appendToOutput(`\n--- END OF FILE: ${fullPath.replace(/\\/g, '/')} ---\n`);
        } catch (readError) {
          console.warn(`⚠️  Could not read file: ${fullPath}`);
        }
      }
    }
  } catch (error) {
    // Ignore errors for directories we can't read
  }
}

// Run the main function
generateSnapshot();