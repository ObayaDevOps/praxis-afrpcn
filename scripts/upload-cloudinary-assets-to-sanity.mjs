#!/usr/bin/env node

import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import {createClient} from '@sanity/client';

const IMAGE_EXTENSIONS = new Set([
  '.jpg',
  '.jpeg',
  '.png',
  '.gif',
  '.webp',
  '.avif',
  '.bmp',
  '.tif',
  '.tiff',
  '.heic',
  '.heif',
]);

const CONTENT_TYPES = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.bmp': 'image/bmp',
  '.tif': 'image/tiff',
  '.tiff': 'image/tiff',
  '.heic': 'image/heic',
  '.heif': 'image/heif',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
};

function parseArgs(argv) {
  const out = {
    repoRoot: process.cwd(),
    mappingJson: 'docs/cloudinary-repo-image-mapping.json',
    resultsJson: 'docs/cloudinary-to-sanity-upload-results.json',
    resultsCsv: 'docs/cloudinary-to-sanity-upload-results.csv',
    execute: false,
    includeMultipleMatches: false,
    allowSvgAsImage: false,
    limit: Infinity,
  };

  for (const arg of argv) {
    if (arg === '--execute') out.execute = true;
    if (arg === '--include-multiple-matches') out.includeMultipleMatches = true;
    if (arg === '--allow-svg-as-image') out.allowSvgAsImage = true;
    if (arg.startsWith('--repo-root=')) out.repoRoot = arg.split('=').slice(1).join('=');
    if (arg.startsWith('--mapping-json=')) out.mappingJson = arg.split('=').slice(1).join('=');
    if (arg.startsWith('--results-json=')) out.resultsJson = arg.split('=').slice(1).join('=');
    if (arg.startsWith('--results-csv=')) out.resultsCsv = arg.split('=').slice(1).join('=');
    if (arg.startsWith('--limit=')) {
      const parsed = Number(arg.split('=').slice(1).join('='));
      if (Number.isFinite(parsed) && parsed >= 0) out.limit = parsed;
    }
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

async function loadEnvFile(filePath) {
  try {
    const raw = await fsp.readFile(filePath, 'utf8');
    const lines = raw.split(/\r?\n/);
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIndex = trimmed.indexOf('=');
      if (eqIndex === -1) continue;
      const key = trimmed.slice(0, eqIndex).trim();
      let value = trimmed.slice(eqIndex + 1).trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      if (!(key in process.env)) process.env[key] = value;
    }
  } catch (_error) {
    // Ignore if .env.local does not exist.
  }
}

function getSanityConfig() {
  const projectId = process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET;
  const apiVersion = process.env.SANITY_API_VERSION || process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-03-27';
  const token =
    process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN || process.env.SANITY_TOKEN || '';

  if (!projectId || !dataset) {
    throw new Error(
      'Missing Sanity project config. Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET (or SANITY_PROJECT_ID and SANITY_DATASET).',
    );
  }

  if (!token) {
    throw new Error(
      'Missing Sanity write token. Set SANITY_API_WRITE_TOKEN (or SANITY_AUTH_TOKEN / SANITY_TOKEN) before using --execute.',
    );
  }

  return {projectId, dataset, apiVersion, token};
}

function getAssetKind(filePath, allowSvgAsImage) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === '.svg') return allowSvgAsImage ? 'image' : 'file';
  if (IMAGE_EXTENSIONS.has(ext)) return 'image';
  return 'file';
}

function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return CONTENT_TYPES[ext] || 'application/octet-stream';
}

function makeQueue(mappingRows, includeMultipleMatches) {
  const allowedStrategies = new Set(['exact_single', 'fuzzy_single']);
  if (includeMultipleMatches) {
    allowedStrategies.add('exact_multiple');
    allowedStrategies.add('fuzzy_multiple');
  }

  const deduped = new Map();
  for (const row of mappingRows) {
    if (!row.bulk_primary_path) continue;
    if (!allowedStrategies.has(row.bulk_match_strategy)) continue;

    const absoluteBulkPath = path.resolve(row.__bulk_dir, row.bulk_primary_path);
    if (!deduped.has(absoluteBulkPath)) {
      deduped.set(absoluteBulkPath, {
        cloudinaryUrl: row.cloudinary_url,
        cloudinaryPublicId: row.cloudinary_public_id,
        cloudinaryFilename: row.cloudinary_filename,
        bulkPath: absoluteBulkPath,
        bulkRelativePath: row.bulk_primary_path,
        repoReferences: [],
      });
    }
    deduped.get(absoluteBulkPath).repoReferences.push(`${row.repo_file}:${row.repo_line}`);
  }
  return [...deduped.values()].sort((a, b) => a.bulkRelativePath.localeCompare(b.bulkRelativePath));
}

async function readJsonIfExists(filePath, defaultValue) {
  try {
    const raw = await fsp.readFile(filePath, 'utf8');
    return JSON.parse(raw);
  } catch (_error) {
    return defaultValue;
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const repoRoot = path.resolve(args.repoRoot);
  const mappingJsonPath = path.resolve(repoRoot, args.mappingJson);
  const resultsJsonPath = path.resolve(repoRoot, args.resultsJson);
  const resultsCsvPath = path.resolve(repoRoot, args.resultsCsv);

  await loadEnvFile(path.resolve(repoRoot, '.env.local'));

  const mapping = JSON.parse(await fsp.readFile(mappingJsonPath, 'utf8'));
  const bulkDir = path.resolve(mapping.bulkDir);

  const rows = mapping.rows.map((row) => ({...row, __bulk_dir: bulkDir}));
  const queue = makeQueue(rows, args.includeMultipleMatches);
  const limitedQueue = queue.slice(0, args.limit);

  const previous = await readJsonIfExists(resultsJsonPath, {results: []});
  const previouslySuccessful = new Set(
    (previous.results || [])
      .filter((result) => result.status === 'uploaded')
      .map((result) => path.resolve(result.bulk_path || ''))
      .filter(Boolean),
  );

  const pending = limitedQueue.filter((item) => !previouslySuccessful.has(item.bulkPath));

  if (!args.execute) {
    const previewResults = pending.map((item) => ({
      timestamp: new Date().toISOString(),
      status: 'dry_run',
      cloudinary_public_id: item.cloudinaryPublicId,
      cloudinary_filename: item.cloudinaryFilename,
      cloudinary_url: item.cloudinaryUrl,
      bulk_path: item.bulkPath,
      bulk_relative_path: item.bulkRelativePath,
      asset_type: getAssetKind(item.bulkPath, args.allowSvgAsImage),
      content_type: getContentType(item.bulkPath),
      sanity_asset_id: '',
      sanity_url: '',
      error: '',
      repo_references: item.repoReferences.join('|'),
    }));

    const mergedResults = [...(previous.results || []), ...previewResults];
    await fsp.mkdir(path.dirname(resultsJsonPath), {recursive: true});
    await fsp.mkdir(path.dirname(resultsCsvPath), {recursive: true});
    await fsp.writeFile(resultsJsonPath, `${JSON.stringify({results: mergedResults}, null, 2)}\n`, 'utf8');
    await fsp.writeFile(resultsCsvPath, toCsv(mergedResults), 'utf8');

    console.log(
      JSON.stringify(
        {
          mode: 'dry_run',
          queueSize: queue.length,
          alreadyUploaded: queue.length - pending.length,
          dryRunRowsWritten: previewResults.length,
          resultsJsonPath,
          resultsCsvPath,
        },
        null,
        2,
      ),
    );
    return;
  }

  const sanity = getSanityConfig();
  const client = createClient({
    projectId: sanity.projectId,
    dataset: sanity.dataset,
    apiVersion: sanity.apiVersion,
    token: sanity.token,
    useCdn: false,
  });

  const uploadResults = [];
  for (const item of pending) {
    const timestamp = new Date().toISOString();
    const assetType = getAssetKind(item.bulkPath, args.allowSvgAsImage);
    const contentType = getContentType(item.bulkPath);

    try {
      await fsp.access(item.bulkPath);
      const upload = await client.assets.upload(assetType, fs.createReadStream(item.bulkPath), {
        filename: item.cloudinaryFilename,
        contentType,
        source: {
          name: 'cloudinary-migration',
          id: item.cloudinaryPublicId || path.basename(item.bulkPath),
        },
        tag: 'cloudinary-migration',
      });

      uploadResults.push({
        timestamp,
        status: 'uploaded',
        cloudinary_public_id: item.cloudinaryPublicId,
        cloudinary_filename: item.cloudinaryFilename,
        cloudinary_url: item.cloudinaryUrl,
        bulk_path: item.bulkPath,
        bulk_relative_path: item.bulkRelativePath,
        asset_type: assetType,
        content_type: contentType,
        sanity_asset_id: upload?._id || '',
        sanity_url: upload?.url || '',
        error: '',
        repo_references: item.repoReferences.join('|'),
      });
    } catch (error) {
      uploadResults.push({
        timestamp,
        status: 'error',
        cloudinary_public_id: item.cloudinaryPublicId,
        cloudinary_filename: item.cloudinaryFilename,
        cloudinary_url: item.cloudinaryUrl,
        bulk_path: item.bulkPath,
        bulk_relative_path: item.bulkRelativePath,
        asset_type: assetType,
        content_type: contentType,
        sanity_asset_id: '',
        sanity_url: '',
        error: error instanceof Error ? error.message : String(error),
        repo_references: item.repoReferences.join('|'),
      });
    }
  }

  const mergedResults = [...(previous.results || []), ...uploadResults];
  await fsp.mkdir(path.dirname(resultsJsonPath), {recursive: true});
  await fsp.mkdir(path.dirname(resultsCsvPath), {recursive: true});
  await fsp.writeFile(resultsJsonPath, `${JSON.stringify({results: mergedResults}, null, 2)}\n`, 'utf8');
  await fsp.writeFile(resultsCsvPath, toCsv(mergedResults), 'utf8');

  console.log(
    JSON.stringify(
      {
        mode: 'execute',
        queueSize: queue.length,
        alreadyUploaded: queue.length - pending.length,
        attemptedUploads: pending.length,
        uploaded: uploadResults.filter((result) => result.status === 'uploaded').length,
        failed: uploadResults.filter((result) => result.status === 'error').length,
        resultsJsonPath,
        resultsCsvPath,
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
