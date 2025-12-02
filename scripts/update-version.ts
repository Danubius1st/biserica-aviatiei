import fs from 'fs';
import path from 'path';

// Read the version from package.json
const packageJsonPath = path.resolve(__dirname, '../package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const version: string = packageJson.version;

// Path to .env.local file
const envPath = path.resolve(__dirname, '../.env.local');

// Read existing .env.local file
let envContent = '';
if (fs.existsSync(envPath)) {
  envContent = fs.readFileSync(envPath, 'utf8');
}

// Update or add NEXT_PUBLIC_APP_VERSION
const versionRegex = /^NEXT_PUBLIC_APP_VERSION=.*/m;
if (versionRegex.test(envContent)) {
  envContent = envContent.replace(versionRegex, `NEXT_PUBLIC_APP_VERSION=${version}`);
} else {
  envContent += `\nNEXT_PUBLIC_APP_VERSION=${version}`;
}

// Write updated content back to .env.local
fs.writeFileSync(envPath, envContent.trim() + '\n');

console.log(`Updated NEXT_PUBLIC_APP_VERSION to ${version} in .env.local`);