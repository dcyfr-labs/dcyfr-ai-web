#!/usr/bin/env node
/**
 * Copy brand assets from @dcyfr/design-system to public/ directory.
 * Run via: npm run copy-brand-assets
 * Invoked automatically before build via prebuild hook.
 */
import { copyFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync } from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const publicDir = join(root, 'public');

// Resolve design-system assets via node_modules symlink
// Check local, then workspace root (npm hoisting), then workspace source directly
const candidatePaths = [
  join(root, 'node_modules', '@dcyfr', 'design-system', 'assets'),
  join(root, '..', 'node_modules', '@dcyfr', 'design-system', 'assets'),
  join(root, '..', 'dcyfr-design-system', 'assets'),
];

const assetsDir = candidatePaths.find(existsSync);

if (!assetsDir) {
  console.warn(`[copy-brand-assets] Design system assets not found, skipping.`);
  process.exit(0);
}

await mkdir(publicDir, { recursive: true });

const files = [
  'favicon.ico',
  'favicon.svg',
  'favicon-16x16.png',
  'favicon-32x32.png',
  'apple-touch-icon.png',
];

for (const file of files) {
  const src = join(assetsDir, file);
  const dest = join(publicDir, file);
  if (!existsSync(src)) continue;
  await copyFile(src, dest);
  console.log(`[copy-brand-assets] Copied ${file} → public/${file}`);
}

console.log('[copy-brand-assets] Done.');
