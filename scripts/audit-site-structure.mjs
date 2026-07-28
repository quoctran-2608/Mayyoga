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

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const absolute = path.join(directory, entry.name);
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
    if (/js\/main\.js|site-navigation-canonical|site-chrome\.js/i.test(html)) {
      report(errors, file, 'link-in-bio không được tải full site chrome/navigation.');
    }
    return;
  }

  const hasBootstrap = /js\/main\.js|site-navigation-canonical-v(?:2|3)\.js|js\/site-chrome\.js/i.test(html);
  if (!hasBootstrap) report(errors, file, 'thiếu bootstrap dẫn tới canonical navigation V6.');

  const nav = navbarSource(html);
  if (!nav) {
    report(warnings, file, 'không có navbar shell trong source; canonical sẽ tự tạo khi JavaScript chạy.');
    return;
  }

  if (/dropdown-toggle/i.test(nav) || /\bnav-links\b/i.test(nav)) {
    report(warnings, file, 'còn fallback menu legacy trong source; runtime V6 sẽ thay toàn bộ subtree.');
  }
  if (/class=["'][^"']*dropdown-toggle[^"']*["'][^>]*href=["']#["']|href=["']#["'][^>]*class=["'][^"']*dropdown-toggle/i.test(nav)) {
    report(warnings, file, 'fallback dropdown còn href="#".');
  }
  if (/\sstyle=["']/i.test(nav)) report(warnings, file, 'fallback navbar còn inline style.');
  if (/[🌿🎓🦉🌱🧘🌬🕊🫀🏠]/u.test(nav)) report(warnings, file, 'fallback navbar còn emoji.');
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
