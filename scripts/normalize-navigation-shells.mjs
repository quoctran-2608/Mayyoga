#!/usr/bin/env node

// One-time source migration for public HTML files.
// Migration revision: 1.0.1
// Replaces legacy navbar copies with a minimal canonical shell and removes
// duplicated navigation/search loaders. Safe to run repeatedly.

import { promises as fs } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const NAV_SHELL = '<nav class="navbar site-header-standard scrolled" id="navbar" data-site-header-standard="true"></nav>';
const MAIN_VERSION = '20260728b';

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(absolute));
    else if (entry.name.endsWith('.html')) files.push(absolute);
  }

  return files;
}

function relative(file) {
  return path.relative(ROOT, file).split(path.sep).join('/');
}

function sitePrefix(file) {
  const directory = path.dirname(relative(file));
  if (directory === '.') return '';
  return '../'.repeat(directory.split('/').length);
}

function removeScript(html, filenamePattern) {
  const pattern = new RegExp(
    '<script\\b[^>]*src=["\'][^"\']*' + filenamePattern + '[^"\']*["\'][^>]*>\\s*<\\/script>\\s*',
    'gi'
  );
  return html.replace(pattern, '');
}

function normalizeNavbar(html) {
  const navbarPattern = /<nav\b(?=[^>]*\bid=["']navbar["'])[^>]*>[\s\S]*?<\/nav>/gi;
  let found = false;
  return html.replace(navbarPattern, function() {
    if (found) return '';
    found = true;
    return NAV_SHELL;
  });
}

function normalizeMainLoader(html, file) {
  const prefix = sitePrefix(file);
  const mainTag = `<script src="${prefix}js/main.js?v=${MAIN_VERSION}"></script>`;
  const mainPattern = /<script\b[^>]*src=["'][^"']*js\/main\.js(?:\?[^"']*)?["'][^>]*>\s*<\/script>/gi;
  let found = false;

  html = html.replace(mainPattern, function() {
    if (found) return '';
    found = true;
    return mainTag;
  });

  if (!found) html = html.replace(/<\/body>/i, `  ${mainTag}\n</body>`);
  return html;
}

function normalizePoseCount(html) {
  return html
    .replace(/\b90\+\s+Tư thế Yoga\b/gi, '88 Tư thế Yoga')
    .replace(/\b90\s+Tư thế Yoga\b/gi, '88 Tư thế Yoga')
    .replace(/\b90\s+tư thế Yoga\b/g, '88 tư thế Yoga');
}

async function normalizeFile(file) {
  const rel = relative(file);
  if (rel === 'links.html') return false;

  const original = await fs.readFile(file, 'utf8');
  let html = original;

  html = normalizeNavbar(html);
  html = removeScript(html, 'js\\/search-index\\.js');
  html = removeScript(html, 'js\\/search\\.js');
  html = removeScript(html, 'js\\/search-base\\.js');
  html = removeScript(html, 'js\\/site-navigation-p0-v1\\.js');
  html = normalizeMainLoader(html, file);
  html = normalizePoseCount(html);

  if (html === original) return false;
  await fs.writeFile(file, html, 'utf8');
  return true;
}

async function main() {
  const files = await walk(ROOT);
  const changed = [];

  for (const file of files) {
    if (await normalizeFile(file)) changed.push(relative(file));
  }

  console.log(`Đã kiểm tra ${files.length} file HTML; cập nhật ${changed.length} file.`);
  changed.forEach((file) => console.log(`- ${file}`));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
