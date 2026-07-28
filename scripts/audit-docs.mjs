#!/usr/bin/env node

// Read-only audit for repository documentation and official HTML templates.

import assert from 'node:assert/strict';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const errors = [];
const TEMPLATE_DIR = path.join(ROOT, 'docs/templates');
const REQUIRED_DOCS = [
  'AGENTS.md',
  'CLAUDE.md',
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
  'CONTRIBUTING.md',
  '_includes/index-source.html'
]);
const FILE_REFERENCE_RE = /\.(?:css|html?|ico|js|json|md|mjs|png|py|txt|webp|xml)$/i;
const DIRECT_LOADER_RE = /(?:^|\/)js\/(?:site-navigation-canonical-v2|site-navigation-canonical-v3|site-navigation-p0-v1|site-header-standard|site-chrome|search-index|search|search-base)\.js(?:[?#]|$)/i;
const NAV_SHELL = '<nav class="navbar site-header-standard scrolled" id="navbar" data-site-header-standard="true"></nav>';
const SEMANTIC_MARKDOWN_EXCLUSIONS = new Set(['docs/AI_DEVELOPMENT_GUIDE.md']);
const LEGACY_RUNTIME_FILE = String.raw`(?:js\/)?(?:site-navigation-canonical-v2|site-navigation-canonical-v3|site-navigation-p0-v1|site-header-standard|site-chrome|search-index|search|search-base)\.js`;
const LEGACY_NAV_SHIM_FILE = String.raw`(?:js\/)?(?:site-navigation-canonical-v2|site-navigation-p0-v1|site-header-standard)\.js`;
const SEMANTIC_ALLOW_CONTEXT_RE = /(?:anti[- ]?pattern|deprecated|lỗi thời|legacy|không còn đúng|không dùng|không được dùng|bị cấm|cấm dùng|tránh dùng|compatibility shim|chỉ là (?:compatibility )?shim|chỉ forward)/iu;
const SEMANTIC_MARKDOWN_RULES = [
  {
    message: 'còn hướng dẫn dùng pose count cũ 90 thay cho dữ liệu hiện hành.',
    pattern: /\b90\s+tư thế(?:\s+yoga)?(?=$|[\s.,;:!?…)\]}`])/iu,
    focus: /\b90\s+tư thế/iu
  },
  {
    message: 'còn hướng dẫn direct-load navigation/search/site chrome thay vì main.js.',
    pattern: new RegExp(
      String.raw`(?:^|[\n.!?:;]\s+|[-*]\s+)(?:hãy\s+|nên\s+|cần\s+|phải\s+)?(?:(?:html|page|trang)\s+)?(?:tải|load|nhúng|import)\s+(?:(?:trực tiếp|direct)\s+)?[^\n.]{0,100}${LEGACY_RUNTIME_FILE}`,
      'iu'
    ),
    focus: new RegExp(LEGACY_RUNTIME_FILE, 'iu')
  },
  {
    message: 'còn mô tả navigation shim như component/source chính.',
    pattern: new RegExp(
      String.raw`(?:(?:^|[\n.!?:;]\s+|[-*]\s+)(?:hãy\s+|nên\s+|cần\s+|phải\s+)?(?:dùng|sử dụng|chọn|coi)\s+[^\n.]{0,80}${LEGACY_NAV_SHIM_FILE}[^\n.]{0,100}(?:làm|như|là)[^\n.]{0,60}(?:component|owner|source|nguồn)[^\n.]*)|(?:${LEGACY_NAV_SHIM_FILE}\s*(?:=|là)\s*[^\n.]{0,80}(?:navigation source|source of truth|owner|component chính|nguồn chính))`,
      'iu'
    ),
    focus: new RegExp(LEGACY_NAV_SHIM_FILE, 'iu')
  },
  {
    message: 'còn hướng dẫn chép menu/navigation markup vào HTML.',
    pattern: /(?:^|[\n.!?:;]\s+|[-*]\s+)(?:hãy\s+|nên\s+|cần\s+|phải\s+)?(?:chép|copy|hard-code|viết|nhúng|đặt|thêm|dùng)\s+(?:toàn bộ\s+)?(?:cấu trúc\s+)?(?:menu|navigation markup)[^\n.]{0,100}(?:vào|trong)\s+(?:html|navbar|page|trang)\b/iu,
    focus: /(?:menu|navigation markup)/iu
  }
];

function relative(file) {
  return path.relative(ROOT, file).split(path.sep).join('/');
}

function report(file, message) {
  errors.push(`${relative(file)}: ${message}`);
}

function markdownBlocks(source) {
  const lines = source.split(/\r?\n/);
  const blocks = [];
  let start = -1;
  let content = [];

  function flush() {
    if (!content.length) return;
    blocks.push({ line: start + 1, text: content.join('\n') });
    start = -1;
    content = [];
  }

  lines.forEach((line, index) => {
    if (!line.trim()) {
      flush();
      return;
    }
    if (start === -1) start = index;
    content.push(line);
  });
  flush();
  return blocks;
}

function semanticMarkdownIssues(fileRelative, source) {
  if (SEMANTIC_MARKDOWN_EXCLUSIONS.has(fileRelative)) return [];

  const blocks = markdownBlocks(source);
  const issues = [];
  blocks.forEach((block, index) => {
    const previous = index > 0 ? blocks[index - 1].text : '';
    for (const rule of SEMANTIC_MARKDOWN_RULES) {
      const flags = rule.pattern.flags.includes('g')
        ? rule.pattern.flags
        : `${rule.pattern.flags}g`;
      const matches = block.text.matchAll(new RegExp(rule.pattern.source, flags));
      for (const match of matches) {
        const matchIndex = match.index || 0;
        const focusOffset = match[0].search(rule.focus);
        const focusIndex = matchIndex + Math.max(0, focusOffset);
        const lineStart = block.text.lastIndexOf('\n', focusIndex - 1) + 1;
        const nextLineBreak = block.text.indexOf('\n', focusIndex);
        const lineEnd = nextLineBreak === -1 ? block.text.length : nextLineBreak;
        const localContext = block.text.slice(lineStart, lineEnd);
        const previousIsExplicitLabel = /:\s*$/.test(previous.trim())
          && SEMANTIC_ALLOW_CONTEXT_RE.test(previous);
        if (SEMANTIC_ALLOW_CONTEXT_RE.test(localContext) || previousIsExplicitLabel) continue;

        const lineOffset = block.text.slice(0, focusIndex).split('\n').length - 1;
        issues.push({ line: block.line + lineOffset, message: rule.message });
      }
    }
  });
  return issues;
}

function runSemanticSelfTest(announce = true) {
  const legacyPoseCount = `9${'0'} Tư thế Yoga`;
  const badCases = [
    legacyPoseCount,
    'Tải trực tiếp `js/site-navigation-canonical-v3.js`.',
    'Dùng `js/site-header-standard.js` làm component chính.',
    'Chép menu vào HTML.'
  ];
  badCases.forEach((source) => {
    assert.equal(semanticMarkdownIssues('docs/example.md', source).length, 1, source);
  });

  const allowedCases = [
    `Không dùng cụm \`${legacyPoseCount}\`; count phải lấy từ dữ liệu thật.`,
    `Cụm \`${legacyPoseCount.replace(' Yoga', '')}\` là lỗi thời.`,
    'Không tải trực tiếp `js/site-navigation-canonical-v3.js` trong HTML.',
    'Các hướng dẫn cũ sau đây không còn đúng:\n\n```text\nsite-header-standard.js = navigation source riêng\n```'
  ];
  allowedCases.forEach((source) => {
    assert.equal(semanticMarkdownIssues('docs/example.md', source).length, 0, source);
  });
  assert.equal(
    semanticMarkdownIssues(
      'docs/example.md',
      'Không dùng pose count cũ.\nTải trực tiếp `js/site-navigation-canonical-v3.js`.'
    ).length,
    1,
    'ngoại lệ ở dòng trước không được che hướng dẫn sai ở dòng sau'
  );
  assert.equal(
    semanticMarkdownIssues(
      'docs/example.md',
      `Không dùng cụm \`${legacyPoseCount}\`.\n${legacyPoseCount}`
    ).length,
    1,
    'lần xuất hiện hợp lệ không được che lỗi cùng loại ở dòng sau'
  );
  assert.equal(
    semanticMarkdownIssues('docs/AI_DEVELOPMENT_GUIDE.md', badCases.join('\n\n')).length,
    0,
    'deprecated Markdown phải nằm trong allowlist'
  );
  if (announce) console.log('Semantic Markdown lint self-test: đạt.');
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
  semanticMarkdownIssues(relative(file), source).forEach((issue) => {
    report(file, `${issue.message} (dòng ${issue.line})`);
  });
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

  if (path.basename(file) === 'article-template.html') {
    const toc = html.match(/<nav\b[^>]*\bclass=["'][^"']*\barticle-toc\b[^"']*["'][^>]*>[\s\S]*?<\/nav>/i);
    const meta = html.match(/<div\b[^>]*\bclass=["'][^"']*\barticle-meta\b[^"']*["'][^>]*>[\s\S]*?<\/div>/i);
    const metaItems = meta
      ? (meta[0].match(/\bclass=["'][^"']*\bmeta-item\b[^"']*["']/gi) || [])
      : [];
    if (!toc || !/<h4\b[^>]*>[\s\S]*?<\/h4>/i.test(toc[0])) {
      report(file, 'article TOC phải dùng H4 để khớp shared CSS hiện hành.');
    }
    if (metaItems.length !== 3) {
      report(file, `article meta phải có 3 phần tử meta-item; tìm thấy ${metaItems.length}.`);
    }
  }
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
  const selfTestOnly = process.argv.includes('--self-test');
  runSemanticSelfTest(selfTestOnly);
  if (selfTestOnly) return;

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
