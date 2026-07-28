#!/usr/bin/env node

// One-time source migration for public HTML files.
// Migration revision: 1.1.0
// Replaces legacy navbar copies with a minimal canonical shell and removes
// duplicated navigation/search loaders and inline navigation handlers.
// Safe to run repeatedly.

import { promises as fs } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const NAV_SHELL = '<nav class="navbar site-header-standard scrolled" id="navbar" data-site-header-standard="true"></nav>';
const MAIN_VERSION = '20260728b';
const LEGACY_DIRECT_LOADER_RE = /(?:^|\/)js\/(?:site-navigation-canonical-v2|site-navigation-canonical-v3|site-navigation-p0-v1|site-header-standard|site-chrome|search-index|search|search-base)\.js(?:[?#]|$)/i;
const SCRIPT_BLOCK_RE = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name === '.git' || entry.name === '.m' || entry.name === 'node_modules') continue;
    const absolute = path.join(directory, entry.name);
    const rel = path.relative(ROOT, absolute).split(path.sep).join('/');
    // Documentation templates describe destination pages; they are not public HTML.
    if (entry.isDirectory() && rel === 'docs/templates') continue;
    if (entry.isDirectory()) files.push(...await walk(absolute));
    else if (entry.name.endsWith('.html')) files.push(absolute);
  }

  return files;
}

function relative(file) {
  return path.relative(ROOT, file).split(path.sep).join('/');
}

function isGoogleVerificationArtifact(rel, html) {
  return /^google[a-z0-9]+\.html$/i.test(rel)
    && new RegExp(`^google-site-verification:\\s+${rel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*$`, 'i').test(html);
}

function sitePrefix(file) {
  const directory = path.dirname(relative(file));
  if (directory === '.') return '';
  return '../'.repeat(directory.split('/').length);
}

function scriptSource(attributes) {
  const match = attributes.match(/\bsrc\s*=\s*["']([^"']+)["']/i);
  return match ? match[1] : '';
}

function isJsonLdScript(attributes) {
  return /\btype\s*=\s*["']application\/ld\+json["']/i.test(attributes);
}

function removeLegacyDirectLoaders(html) {
  html = html.replace(
    /^[ \t]*<script\b([^>]*)>\s*<\/script>[ \t]*(?:\n|$)/gim,
    (script, attributes) => {
      const source = scriptSource(attributes);
      return source && LEGACY_DIRECT_LOADER_RE.test(source) ? '' : script;
    }
  );

  return html.replace(SCRIPT_BLOCK_RE, (script, attributes) => {
    const source = scriptSource(attributes);
    return source && LEGACY_DIRECT_LOADER_RE.test(source) ? '' : script;
  });
}

function elementAliases(source, elementId) {
  const aliases = new Set([elementId]);
  const pattern = new RegExp(
    `(?:const|let|var)\\s+([A-Za-z_$][\\w$]*)\\s*=\\s*document\\.getElementById\\s*\\(\\s*["']${elementId}["']\\s*\\)`,
    'g'
  );

  for (const match of source.matchAll(pattern)) aliases.add(match[1]);
  return aliases;
}

function referencesAnyIdentifier(source, identifiers) {
  return Array.from(identifiers).some((identifier) => (
    new RegExp(`\\b${identifier}\\b`).test(source)
  ));
}

function removeLegacyInlineNavigation(html) {
  return html.replace(SCRIPT_BLOCK_RE, (script, attributes, source) => {
    if (scriptSource(attributes) || isJsonLdScript(attributes)) return script;

    let updated = source;
    const mobileToggleAliases = elementAliases(source, 'mobileToggle');
    const navLinksAliases = elementAliases(source, 'navLinks');

    // Remove legacy mobile menu listeners while preserving unrelated page logic.
    updated = updated.replace(
      /^[ \t]*(?:if\s*\([^;\n]*\)\s*)?[A-Za-z_$][\w$]*\.addEventListener\s*\(\s*["']click["']\s*,[\s\S]*?\}\s*\)\s*;?[ \t]*$/gm,
      (statement) => (
        /\bclassList\s*\.\s*(?:toggle|add|remove)\s*\(\s*["'](?:active|open)["']/i.test(statement)
        && referencesAnyIdentifier(statement, mobileToggleAliases)
        && referencesAnyIdentifier(statement, navLinksAliases)
          ? ''
          : statement
      )
    );

    // Remove legacy navbar scroll-state listeners or direct state mutations.
    updated = updated.replace(
      /^[ \t]*(?:window\.)?addEventListener\s*\(\s*["']scroll["']\s*,[\s\S]*?\}\s*\)\s*;?[ \t]*$/gm,
      (statement) => (
        /(?:getElementById\s*\(\s*["']navbar["']|querySelector\s*\(\s*["']#navbar["']|\bnavbar\b)[\s\S]*?\bclassList\s*\.\s*(?:toggle|add|remove)\s*\([\s\S]*?["']scrolled["']/i.test(statement)
          ? ''
          : statement
      )
    );
    updated = updated.replace(
      /^[ \t]*(?:document\.)?(?:getElementById\s*\(\s*["']navbar["']\s*\)|querySelector\s*\(\s*["']#navbar["']\s*\)|navbar)\.classList\s*\.\s*(?:toggle|add|remove)\s*\([^;\n]*["']scrolled["'][^;\n]*\)\s*;?[ \t]*$/gm,
      ''
    );

    // Remove element aliases only when the removed handlers were their sole use.
    updated = updated.replace(
      /^[ \t]*(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*document\.getElementById\s*\(\s*["'](?:mobileToggle|navLinks)["']\s*\)\s*;?[ \t]*$/gm,
      (declaration, name) => {
        const references = updated.match(new RegExp(`\\b${name}\\b`, 'g')) || [];
        return references.length === 1 ? '' : declaration;
      }
    );
    updated = updated.replace(/\n(?:[ \t]*\n){2,}([ \t]*)$/, '\n$1');

    return `<script${attributes}>${updated}</script>`;
  });
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

function normalizeLineEndings(html) {
  return html.replace(/\r\n?/g, '\n');
}

function normalizeTrailingWhitespace(html) {
  return html.replace(/[ \t]+$/gm, '');
}

async function normalizeFile(file) {
  const rel = relative(file);
  if (rel === 'links.html') return false;

  const original = await fs.readFile(file, 'utf8');
  if (isGoogleVerificationArtifact(rel, original)) return false;

  let html = original;

  html = normalizeLineEndings(html);
  html = normalizeNavbar(html);
  html = removeLegacyDirectLoaders(html);
  html = removeLegacyInlineNavigation(html);
  html = normalizeMainLoader(html, file);
  html = normalizePoseCount(html);
  html = normalizeTrailingWhitespace(html);

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
