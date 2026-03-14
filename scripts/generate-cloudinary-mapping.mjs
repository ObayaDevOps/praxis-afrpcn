#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';

const TEXT_FILE_EXTENSIONS = new Set([
  '.js',
  '.jsx',
  '.ts',
  '.tsx',
  '.mjs',
  '.cjs',
  '.json',
  '.md',
  '.css',
  '.scss',
  '.html',
  '.yml',
  '.yaml',
  '.txt',
  '.env',
  '.mjsx',
]);

const SKIP_DIRS = new Set(['.git', '.next', 'node_modules']);
const CLOUDINARY_URL_RE = /https?:\/\/res\.cloudinary\.com\/[^\s"'`)\]}]+/g;

function parseArgs(argv) {
  const defaults = {
    repoRoot: process.cwd(),
    bulkDir: '/media/obi/Seagate/Cloudinary_Bulk_Download_March_4_2026',
    mappingCsvOut: 'docs/cloudinary-repo-image-mapping.csv',
    mappingJsonOut: 'docs/cloudinary-repo-image-mapping.json',
    bulkInventoryCsvOut: 'docs/cloudinary-bulk-inventory.csv',
  };

  const out = {...defaults};
  for (const arg of argv) {
    if (arg.startsWith('--repo-root=')) out.repoRoot = arg.split('=').slice(1).join('=');
    if (arg.startsWith('--bulk-dir=')) out.bulkDir = arg.split('=').slice(1).join('=');
    if (arg.startsWith('--mapping-csv-out=')) out.mappingCsvOut = arg.split('=').slice(1).join('=');
    if (arg.startsWith('--mapping-json-out=')) out.mappingJsonOut = arg.split('=').slice(1).join('=');
    if (arg.startsWith('--bulk-inventory-csv-out=')) out.bulkInventoryCsvOut = arg.split('=').slice(1).join('=');
  }
  return out;
}

function csvEscape(value) {
  const raw = value == null ? '' : String(value);
  if (raw.includes('"') || raw.includes(',') || raw.includes('\n')) {
    return `"${raw.replace(/"/g, '""')}"`;
  }
  return raw;
}

function toCsv(rows) {
  if (rows.length === 0) return '';
  const headers = Object.keys(rows[0]);
  const lines = [headers.join(',')];
  for (const row of rows) {
    lines.push(headers.map((header) => csvEscape(row[header])).join(','));
  }
  return `${lines.join('\n')}\n`;
}

function normalizeFilename(filename) {
  const lower = filename.toLowerCase();
  const ext = path.extname(lower);
  const stem = lower.slice(0, ext ? -ext.length : undefined);
  const withoutCloudinarySuffix = stem.replace(/_[a-z0-9]{6}$/i, '');
  return withoutCloudinarySuffix.replace(/[^a-z0-9]/g, '');
}

function parseCloudinaryUrl(url) {
  try {
    const parsed = new URL(url);
    const decodedPath = decodeURIComponent(parsed.pathname);
    const uploadMatch = decodedPath.match(/\/upload\/(?:[^/]+\/)*(?:v\d+\/)?(.+)$/);
    const publicIdWithExtension = uploadMatch ? uploadMatch[1] : path.basename(decodedPath);
    const filename = path.basename(publicIdWithExtension);
    const extension = path.extname(filename).slice(1).toLowerCase();
    const publicId = filename.replace(/\.[^.]+$/, '');
    return {
      filename,
      extension,
      publicId,
      publicIdWithExtension,
    };
  } catch (_error) {
    return {
      filename: '',
      extension: '',
      publicId: '',
      publicIdWithExtension: '',
    };
  }
}

async function walkFiles(dirPath, files = []) {
  const dirEntries = await fs.readdir(dirPath, {withFileTypes: true});
  for (const entry of dirEntries) {
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      await walkFiles(path.join(dirPath, entry.name), files);
      continue;
    }
    files.push(path.join(dirPath, entry.name));
  }
  return files;
}

function shouldScanAsText(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return TEXT_FILE_EXTENSIONS.has(ext);
}

function findCloudinaryUrlsByLine(content) {
  const matches = [];
  const lines = content.split(/\r?\n/);
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const urls = line.match(CLOUDINARY_URL_RE);
    if (!urls || urls.length === 0) continue;
    for (const url of urls) {
      matches.push({
        line: index + 1,
        url,
      });
    }
  }
  return matches;
}

async function buildBulkIndex(bulkDir) {
  const exact = new Map();
  const normalized = new Map();
  const allPaths = [];

  async function walk(dirPath) {
    const dirEntries = await fs.readdir(dirPath, {withFileTypes: true});
    for (const entry of dirEntries) {
      const fullPath = path.join(dirPath, entry.name);
      if (entry.isDirectory()) {
        await walk(fullPath);
        continue;
      }

      allPaths.push(fullPath);
      const lowerName = entry.name.toLowerCase();
      const norm = normalizeFilename(entry.name);

      if (!exact.has(lowerName)) exact.set(lowerName, []);
      exact.get(lowerName).push(fullPath);

      if (!normalized.has(norm)) normalized.set(norm, []);
      normalized.get(norm).push(fullPath);
    }
  }

  await walk(bulkDir);
  return {exact, normalized, allPaths};
}

function choosePrimaryPath(paths) {
  return [...paths].sort((a, b) => a.localeCompare(b))[0];
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const repoRoot = path.resolve(args.repoRoot);
  const bulkDir = path.resolve(args.bulkDir);
  const mappingCsvOut = path.resolve(repoRoot, args.mappingCsvOut);
  const mappingJsonOut = path.resolve(repoRoot, args.mappingJsonOut);
  const bulkInventoryCsvOut = path.resolve(repoRoot, args.bulkInventoryCsvOut);

  const repoFiles = await walkFiles(repoRoot);
  const textFiles = repoFiles.filter(shouldScanAsText);
  const sourceRows = [];

  for (const filePath of textFiles) {
    const relativePath = path.relative(repoRoot, filePath);
    let content = '';
    try {
      content = await fs.readFile(filePath, 'utf8');
    } catch (_error) {
      continue;
    }

    const fileMatches = findCloudinaryUrlsByLine(content);
    if (fileMatches.length === 0) continue;

    for (const match of fileMatches) {
      sourceRows.push({
        repoFile: relativePath,
        repoLine: match.line,
        cloudinaryUrl: match.url,
      });
    }
  }

  const {exact, normalized, allPaths: bulkPaths} = await buildBulkIndex(bulkDir);
  const mappingRows = [];
  const bulkReferences = new Map();

  for (const row of sourceRows) {
    const parsed = parseCloudinaryUrl(row.cloudinaryUrl);
    const lowerFilename = parsed.filename.toLowerCase();

    let matchStrategy = 'none';
    let matchPaths = [];

    const exactMatches = exact.get(lowerFilename) || [];
    if (exactMatches.length > 0) {
      matchPaths = exactMatches;
      matchStrategy = exactMatches.length === 1 ? 'exact_single' : 'exact_multiple';
    } else {
      const norm = normalizeFilename(parsed.filename);
      const fuzzyMatches = normalized.get(norm) || [];
      if (fuzzyMatches.length > 0) {
        matchPaths = fuzzyMatches;
        matchStrategy = fuzzyMatches.length === 1 ? 'fuzzy_single' : 'fuzzy_multiple';
      }
    }

    const primary = matchPaths.length > 0 ? choosePrimaryPath(matchPaths) : '';
    const primaryRelative = primary ? path.relative(bulkDir, primary) : '';

    for (const matchedPath of matchPaths) {
      if (!bulkReferences.has(matchedPath)) bulkReferences.set(matchedPath, []);
      bulkReferences.get(matchedPath).push(row.cloudinaryUrl);
    }

    mappingRows.push({
      repo_file: row.repoFile,
      repo_line: row.repoLine,
      cloudinary_url: row.cloudinaryUrl,
      cloudinary_filename: parsed.filename,
      cloudinary_public_id: parsed.publicId,
      cloudinary_extension: parsed.extension,
      bulk_match_strategy: matchStrategy,
      bulk_match_count: matchPaths.length,
      bulk_primary_path: primaryRelative,
      bulk_match_paths: matchPaths.map((value) => path.relative(bulkDir, value)).join('|'),
    });
  }

  const bulkInventoryRows = [];
  for (const bulkPath of [...bulkPaths].sort((a, b) => a.localeCompare(b))) {
    const refs = bulkReferences.get(bulkPath) || [];
    const uniqueRefs = [...new Set(refs)].sort((a, b) => a.localeCompare(b));
    bulkInventoryRows.push({
      bulk_filename: path.basename(bulkPath),
      bulk_relative_path: path.relative(bulkDir, bulkPath),
      is_referenced_from_repo: uniqueRefs.length > 0 ? 'yes' : 'no',
      referenced_count: uniqueRefs.length,
      repo_cloudinary_urls: uniqueRefs.join('|'),
    });
  }

  await fs.mkdir(path.dirname(mappingCsvOut), {recursive: true});
  await fs.mkdir(path.dirname(mappingJsonOut), {recursive: true});
  await fs.mkdir(path.dirname(bulkInventoryCsvOut), {recursive: true});

  await fs.writeFile(mappingCsvOut, toCsv(mappingRows), 'utf8');
  await fs.writeFile(
    mappingJsonOut,
    `${JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        repoRoot,
        bulkDir,
        summary: {
          repoFilesScanned: textFiles.length,
          cloudinaryReferencesFound: mappingRows.length,
          uniqueCloudinaryUrls: new Set(mappingRows.map((row) => row.cloudinary_url)).size,
          exactSingleMatches: mappingRows.filter((row) => row.bulk_match_strategy === 'exact_single').length,
          exactMultipleMatches: mappingRows.filter((row) => row.bulk_match_strategy === 'exact_multiple').length,
          fuzzySingleMatches: mappingRows.filter((row) => row.bulk_match_strategy === 'fuzzy_single').length,
          fuzzyMultipleMatches: mappingRows.filter((row) => row.bulk_match_strategy === 'fuzzy_multiple').length,
          unmatched: mappingRows.filter((row) => row.bulk_match_strategy === 'none').length,
          bulkFilesIndexed: bulkPaths.length,
        },
        rows: mappingRows,
      },
      null,
      2,
    )}\n`,
    'utf8',
  );
  await fs.writeFile(bulkInventoryCsvOut, toCsv(bulkInventoryRows), 'utf8');

  const summary = {
    repoFilesScanned: textFiles.length,
    cloudinaryReferencesFound: mappingRows.length,
    uniqueCloudinaryUrls: new Set(mappingRows.map((row) => row.cloudinary_url)).size,
    exactSingleMatches: mappingRows.filter((row) => row.bulk_match_strategy === 'exact_single').length,
    exactMultipleMatches: mappingRows.filter((row) => row.bulk_match_strategy === 'exact_multiple').length,
    fuzzySingleMatches: mappingRows.filter((row) => row.bulk_match_strategy === 'fuzzy_single').length,
    fuzzyMultipleMatches: mappingRows.filter((row) => row.bulk_match_strategy === 'fuzzy_multiple').length,
    unmatched: mappingRows.filter((row) => row.bulk_match_strategy === 'none').length,
    bulkFilesIndexed: bulkPaths.length,
  };

  console.log(JSON.stringify(summary, null, 2));
  console.log(`Wrote mapping CSV: ${mappingCsvOut}`);
  console.log(`Wrote mapping JSON: ${mappingJsonOut}`);
  console.log(`Wrote bulk inventory CSV: ${bulkInventoryCsvOut}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
