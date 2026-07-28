#!/usr/bin/env node

// Mây Yoga repository architecture audit.
// Usage: node scripts/audit-site-structure.mjs

import { promises as fs } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const errors = [];
const warnings = [];
const LEGACY_POSE_COUNT_RE = new RegExp('\\b9' + '0\\s+Tư thế Yoga\\b', 'i');
const NAV_SHELL = '<nav class="navbar site-header-standard scrolled" id="navbar" data-site-header-standard="true"></nav>';
const LEGACY_DIRECT_LOADER_RE = /(?:^|\/)js\/(?:site-navigation-canonical-v2|site-navigation-canonical-v3|site-navigation-p0-v1|site-header-standard|site-chrome|search-index|search|search-base)\.js(?:[?#]|$)/i;
const MAIN_LOADER_RE = /(?:^|\/)js\/main\.js(?:[?#]|$)/i;
const SCRIPT_BLOCK_RE = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name === '.git' || entry.name === '.m' || entry.name === 'node_modules') continue;
    const absolute = path.join(directory, entry.name);
    const rel = path.relative(ROOT, absolute).split(path.sep).join('/');
    // Documentation templates are copied elsewhere and are not deployable pages.
    if (entry.isDirectory() && rel === 'docs/templates') continue;
    if (entry.isDirectory()) files.push(...await walk(absolute));
    else files.push(absolute);
  }

  return files;
}

function relative(file) {
  return path.relative(ROOT, file).split(path.sep).join('/');
}

function report(collection, file, message) {
  collection.push(`${relative(file)}: ${message}`);
}

function navbarSource(html) {
  const match = html.match(/<nav\b[^>]*\bid=["']navbar["'][^>]*>[\s\S]*?<\/nav>/i);
  return match ? match[0] : '';
}

function scriptSource(attributes) {
  const match = attributes.match(/\bsrc\s*=\s*["']([^"']+)["']/i);
  return match ? match[1] : '';
}

function scriptBlocks(html) {
  return Array.from(html.matchAll(SCRIPT_BLOCK_RE), (match) => ({
    attributes: match[1],
    source: match[2],
    src: scriptSource(match[1])
  }));
}

function isJsonLdScript(attributes) {
  return /\btype\s*=\s*["']application\/ld\+json["']/i.test(attributes);
}

function auditInlineNavigation(file, scripts) {
  const inlineScripts = scripts.filter((script) => !script.src && !isJsonLdScript(script.attributes));

  for (const script of inlineScripts) {
    if (/\bmobileToggle\b/.test(script.source)) {
      report(errors, file, 'inline JavaScript còn tham chiếu mobileToggle.');
      break;
    }
  }

  for (const script of inlineScripts) {
    if (
      /\bnavLinks\b[\s\S]{0,600}\bclassList\s*\.\s*(?:toggle|add|remove)\s*\(\s*["'](?:active|open)["']/i.test(script.source)
      || /\bclassList\s*\.\s*(?:toggle|add|remove)\s*\(\s*["'](?:active|open)["'][\s\S]{0,600}\bnavLinks\b/i.test(script.source)
    ) {
      report(errors, file, 'inline JavaScript còn tự mở hoặc đóng navLinks.');
      break;
    }
  }

  for (const script of inlineScripts) {
    if (
      /(?:getElementById\s*\(\s*["']navbar["']|querySelector\s*\(\s*["']#navbar["']|\bnavbar\b)[\s\S]{0,600}\bclassList\s*\.\s*(?:toggle|add|remove)\s*\([\s\S]{0,200}["']scrolled["']/i.test(script.source)
    ) {
      report(errors, file, 'inline JavaScript còn tự điều khiển trạng thái scrolled của #navbar.');
      break;
    }
  }
}

function isGoogleVerificationArtifact(rel, html) {
  return /^google[a-z0-9]+\.html$/i.test(rel)
    && new RegExp(`^google-site-verification:\\s+${rel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*$`, 'i').test(html);
}

async function auditHtml(file) {
  const html = await fs.readFile(file, 'utf8');
  const rel = relative(file);

  if (LEGACY_POSE_COUNT_RE.test(html)) {
    report(errors, file, 'còn cụm đếm tư thế cũ; dữ liệu chuẩn hiện là 88.');
  }

  if (isGoogleVerificationArtifact(rel, html)) return;

  if (rel === 'links.html') {
    if (/\bid=["']navbar["']/i.test(html)) report(errors, file, 'link-in-bio không được chứa full navbar.');
    if (/css\/style\.css/i.test(html)) report(errors, file, 'link-in-bio không được tải stylesheet website chung.');
    if (/js\/main\.js|site-navigation-canonical|site-header-standard|site-chrome\.js|js\/search(?:-index|-base)?\.js/i.test(html)) {
      report(errors, file, 'link-in-bio không được tải full site chrome/navigation.');
    }
    return;
  }

  const scripts = scriptBlocks(html);
  const mainLoaders = scripts.filter((script) => MAIN_LOADER_RE.test(script.src));
  const legacyLoaders = scripts.filter((script) => LEGACY_DIRECT_LOADER_RE.test(script.src));

  if (mainLoaders.length !== 1) {
    report(errors, file, `phải tải đúng một main.js; tìm thấy ${mainLoaders.length}.`);
  }
  if (legacyLoaders.length) {
    report(errors, file, `còn ${legacyLoaders.length} direct loader navigation/search cũ.`);
  }

  auditInlineNavigation(file, scripts);

  const navMatches = html.match(/<nav\b[^>]*\bid=["']navbar["'][^>]*>[\s\S]*?<\/nav>/gi) || [];
  if (navMatches.length !== 1) {
    report(errors, file, `phải có đúng một navbar shell; tìm thấy ${navMatches.length}.`);
  } else if (navbarSource(html).trim() !== NAV_SHELL) {
    report(errors, file, 'navbar không phải shell tối thiểu canonical.');
  }
}

async function auditCanonicalNavigation(file) {
  const source = await fs.readFile(file, 'utf8');
  if (!/data-canonical-nav-version[\s\S]*['"]6['"]/.test(source)) {
    report(errors, file, 'canonical component chưa khai báo menu version 6.');
  }
  if (/href=["']#["']/.test(source)) report(errors, file, 'canonical component chứa href="#".');
  if (/[🌿🎓🦉🌱🧘🌬🕊🫀🏠]/u.test(source)) report(errors, file, 'canonical component còn emoji menu.');
  if (/\.innerHTML\s*=\s*canonicalNavMarkup|function\s+canonicalNavMarkup/.test(source)) {
    report(errors, file, 'canonical menu quay lại mô hình HTML string thay vì DOM config.');
  }
  if (!/navbar\.replaceChildren\(container\)/.test(source)) {
    report(errors, file, 'canonical component không thay toàn bộ legacy navbar subtree.');
  }
}

async function auditSearch() {
  const poseDataFile = path.join(ROOT, 'js/poses-data.js');
  const catalogFile = path.join(ROOT, 'js/pose-catalog.js');
  const indexFile = path.join(ROOT, 'js/search-index.js');
  const engineFile = path.join(ROOT, 'js/search.js');

  const [poseData, catalog, index, engine] = await Promise.all([
    fs.readFile(poseDataFile, 'utf8'),
    fs.readFile(catalogFile, 'utf8'),
    fs.readFile(indexFile, 'utf8'),
    fs.readFile(engineFile, 'utf8')
  ]);

  const poseCount = (poseData.match(/\{\s*cat:\s*['"]/g) || []).length;
  if (poseCount !== 88) errors.push(`js/poses-data.js: tìm thấy ${poseCount} tư thế, kỳ vọng 88.`);
  if (!/MAY_YOGA_POSE_CATALOG/.test(catalog) || !/urlFor/.test(catalog)) {
    errors.push('js/pose-catalog.js: thiếu shared pose catalog hoặc URL helper.');
  }
  if (!/catalog\.poses\.map/.test(index)) {
    errors.push('js/search-index.js: pose entries không được tạo từ shared pose catalog.');
  }
  if (/site-navigation|site-chrome|hero-redesign|index-mobile/i.test(engine)) {
    errors.push('js/search.js: search engine đang kiêm trách nhiệm navigation/chrome/Hero.');
  }
}

async function auditPoseCountCopy(files) {
  const sourceFiles = files.filter((file) => /\.(?:js|mjs)$/i.test(file));

  await Promise.all(sourceFiles.map(async (file) => {
    const source = await fs.readFile(file, 'utf8');
    if (LEGACY_POSE_COUNT_RE.test(source)) {
      report(errors, file, 'còn cụm đếm tư thế cũ; dữ liệu chuẩn hiện là 88.');
    }
  }));
}

async function main() {
  const files = await walk(ROOT);
  const htmlFiles = files.filter((file) => file.endsWith('.html'));

  await Promise.all(htmlFiles.map(auditHtml));
  await auditPoseCountCopy(files);
  await auditCanonicalNavigation(path.join(ROOT, 'js/site-navigation-canonical-v3.js'));
  await auditSearch();

  console.log(`Đã kiểm tra ${htmlFiles.length} file HTML.`);
  console.log(`Lỗi: ${errors.length} · Cảnh báo legacy: ${warnings.length}`);

  if (warnings.length) {
    console.log('\nCẢNH BÁO');
    warnings.forEach((warning) => console.log(`- ${warning}`));
  }

  if (errors.length) {
    console.error('\nLỖI');
    errors.forEach((error) => console.error(`- ${error}`));
    process.exitCode = 1;
  } else {
    console.log('\nKiến trúc runtime đạt yêu cầu P2.');
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
