#!/usr/bin/env node

// Read-only audit for repository documentation and official HTML templates.

import { promises as fs } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const errors = [];
const TEMPLATE_DIR = path.join(ROOT, 'docs/templates');
const REQUIRED_DOCS = [
  'AGENTS.md',
  'README.md',
  'docs/README.md',
  'docs/architecture.md',
  'docs/creating-pages.md',
  'docs/writing-articles.md',
  'docs/navigation-and-search.md',
  'docs/pose-system.md',
  'docs/seo-and-sitemaps.md',
  'docs/code-quality.md',
  'docs/templates/README.md',
  'docs/templates/root-page-template.html',
  'docs/templates/nested-page-template.html',
  'docs/templates/article-template.html'
];
const ROOT_PREFIXES = [
  'assets/',
  'bai-viet/',
  'css/',
  'docs/',
  'js/',
  'scripts/',
  'trac-nghiem/',
  'tu-the/'
];
const INTENTIONALLY_ABSENT_REFERENCES = new Set([
  '../js/main.js',
  'CLAUDE.md',
  'CONTRIBUTING.md',
  '_includes/index-source.html'
]);
const FILE_REFERENCE_RE = /\.(?:css|html?|ico|js|json|md|mjs|png|py|txt|webp|xml)$/i;
const DIRECT_LOADER_RE = /(?:^|\/)js\/(?:site-navigation-canonical-v2|site-navigation-canonical-v3|site-navigation-p0-v1|site-header-standard|site-chrome|search-index|search|search-base)\.js(?:[?#]|$)/i;
const NAV_SHELL = '<nav class="navbar site-header-standard scrolled" id="navbar" data-site-header-standard="true"></nav>';

function relative(file) {
  return path.relative(ROOT, file).split(path.sep).join('/');
}

function report(file, message) {
  errors.push(`${relative(file)}: ${message}`);
}

async function exists(file) {
  try {
    await fs.access(file);
    return true;
  } catch {
    return false;
  }
}

async function walk(directory, predicate) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.name === '.git' || entry.name === '.m' || entry.name === 'node_modules') continue;
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(absolute, predicate));
    else if (predicate(absolute)) files.push(absolute);
  }
  return files;
}

function stripLinkTarget(target) {
  return target.trim().replace(/^<|>$/g, '').split('#')[0].split('?')[0];
}

function resolveMarkdownTarget(file, target) {
  const clean = stripLinkTarget(target);
  if (!clean || /^(?:[a-z]+:|\/\/)/i.test(clean)) return null;
  return path.resolve(path.dirname(file), decodeURIComponent(clean));
}

async function auditMarkdownLinks(file, source) {
  const links = source.matchAll(/!?\[[^\]]*]\(([^)\s]+)(?:\s+["'][^"']*["'])?\)/g);
  for (const match of links) {
    const target = resolveMarkdownTarget(file, match[1]);
    if (target && !await exists(target)) report(file, `markdown link không tồn tại: ${match[1]}`);
  }
}

function isExampleReference(value) {
  return /__|[<>*]|\b(?:ten-(?:trang|bai|file|anh)|thu-muc|duong-dan)\b/i.test(value);
}

function referenceCandidates(file, value, repositoryFiles) {
  const clean = stripLinkTarget(value);
  if (
    !clean
    || clean.includes(' ')
    || /^(?:[a-z]+:|#)/i.test(clean)
    || /^\.[a-z0-9]+$/i.test(clean)
    || isExampleReference(clean)
    || INTENTIONALLY_ABSENT_REFERENCES.has(clean)
    || (!FILE_REFERENCE_RE.test(clean) && !clean.endsWith('/'))
  ) return [];

  if (clean.startsWith('../') || clean.startsWith('./')) {
    return [path.resolve(path.dirname(file), clean)];
  }
  if (ROOT_PREFIXES.some((prefix) => clean.startsWith(prefix))) {
    return [path.join(ROOT, clean)];
  }
  const candidates = [
    path.join(ROOT, clean),
    path.join(path.dirname(file), clean)
  ];
  if (!clean.includes('/')) {
    candidates.push(...repositoryFiles.filter((candidate) => path.basename(candidate) === clean));
  }
  return Array.from(new Set(candidates));
}

async function auditCodeReferences(file, source, repositoryFiles) {
  for (const match of source.matchAll(/`([^`\n]+)`/g)) {
    const candidates = referenceCandidates(file, match[1], repositoryFiles);
    if (candidates.length && !(await Promise.all(candidates.map(exists))).some(Boolean)) {
      report(file, `file reference không tồn tại: ${match[1]}`);
    }
  }
}

async function auditMarkdown(file, repositoryFiles) {
  const source = await fs.readFile(file, 'utf8');
  await auditMarkdownLinks(file, source);
  await auditCodeReferences(file, source, repositoryFiles);
}

function scriptSources(html) {
  return Array.from(html.matchAll(/<script\b([^>]*)>[\s\S]*?<\/script>/gi), (match) => {
    const source = match[1].match(/\bsrc\s*=\s*["']([^"']+)["']/i);
    return source ? source[1] : '';
  }).filter(Boolean);
}

async function auditTemplate(file, expectedMain) {
  const html = await fs.readFile(file, 'utf8');
  const navMatches = html.match(/<nav\b[^>]*\bid=["']navbar["'][^>]*>[\s\S]*?<\/nav>/gi) || [];
  const mainSources = scriptSources(html).filter((source) => /(?:^|\/)js\/main\.js(?:[?#]|$)/i.test(source));
  const directLoaders = scriptSources(html).filter((source) => DIRECT_LOADER_RE.test(source));
  const placeholders = new Set(html.match(/__[A-Z0-9_]+__/g) || []);

  if (navMatches.length !== 1 || navMatches[0].trim() !== NAV_SHELL) {
    report(file, 'phải có đúng một navbar shell canonical tối thiểu.');
  }
  if (mainSources.length !== 1 || !mainSources[0].startsWith(expectedMain)) {
    report(file, `main.js phải dùng đúng prefix ${expectedMain}.`);
  }
  if (directLoaders.length) report(file, `có direct loader bị cấm: ${directLoaders.join(', ')}`);
  if (/\bmobileToggle\b|\bnavLinks\b[\s\S]{0,300}\bclassList\b/i.test(html)) {
    report(file, 'có inline navigation handler hoặc reference bị cấm.');
  }
  if (!/<link\s+rel=["']canonical["']/i.test(html)) report(file, 'thiếu canonical placeholder.');
  if (!/property=["']og:title["']/i.test(html)) report(file, 'thiếu Open Graph placeholder.');
  if (!/name=["']twitter:card["']/i.test(html)) report(file, 'thiếu Twitter card placeholder.');
  if (!/type=["']application\/ld\+json["']/i.test(html)) report(file, 'thiếu JSON-LD mẫu.');
  if (placeholders.size < 8) report(file, 'placeholder chưa đủ rõ để tránh giữ dữ liệu mẫu.');
}

async function auditSitemaps() {
  const sitemapFiles = ['sitemap.xml', 'sitemap-trac-nghiem.xml'];
  for (const sitemap of sitemapFiles) {
    const file = path.join(ROOT, sitemap);
    const source = await fs.readFile(file, 'utf8');
    if (/docs\/templates|(?:root|nested)-page-template|article-template/i.test(source)) {
      report(file, 'template tài liệu không được xuất hiện trong sitemap.');
    }
  }
}

async function auditPublicHtmlPlaceholders(repositoryFiles) {
  const publicHtmlFiles = repositoryFiles.filter((file) => (
    file.endsWith('.html') && !relative(file).startsWith('docs/templates/')
  ));

  await Promise.all(publicHtmlFiles.map(async (file) => {
    const html = await fs.readFile(file, 'utf8');
    const placeholders = Array.from(new Set(html.match(/__[A-Z0-9_]+__/g) || []));
    if (placeholders.length) {
      report(file, `còn placeholder từ template: ${placeholders.join(', ')}`);
    }
  }));

  return publicHtmlFiles.length;
}

async function main() {
  for (const required of REQUIRED_DOCS) {
    const file = path.join(ROOT, required);
    if (!await exists(file)) errors.push(`${required}: tài liệu bắt buộc không tồn tại.`);
  }

  const repositoryFiles = await walk(ROOT, () => true);
  const markdownFiles = repositoryFiles.filter((file) => file.endsWith('.md'));
  await Promise.all(markdownFiles.map((file) => auditMarkdown(file, repositoryFiles)));
  await auditTemplate(path.join(TEMPLATE_DIR, 'root-page-template.html'), 'js/main.js');
  await auditTemplate(path.join(TEMPLATE_DIR, 'nested-page-template.html'), '../js/main.js');
  await auditTemplate(path.join(TEMPLATE_DIR, 'article-template.html'), '../js/main.js');
  await auditSitemaps();
  const publicHtmlCount = await auditPublicHtmlPlaceholders(repositoryFiles);

  console.log(`Đã kiểm tra ${markdownFiles.length} file Markdown, 3 template và ${publicHtmlCount} public HTML.`);
  console.log(`Lỗi tài liệu: ${errors.length}`);
  if (errors.length) {
    console.error('\nLỖI');
    errors.forEach((error) => console.error(`- ${error}`));
    process.exitCode = 1;
  } else {
    console.log('\nTài liệu và template đạt contract hiện hành.');
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
