# Cloudinary to Sanity Image Migration Plan

## Current repo findings
- Cloudinary usage is currently hardcoded in component URLs, not fetched from Sanity documents.
- Scan summary from `2026-03-14`:
  - 9 Cloudinary URL references in repo code
  - 5 unique Cloudinary image URLs
  - 100% matched to local files in `/media/obi/Seagate/Cloudinary_Bulk_Download_March_4_2026`
  - 509 files indexed in the bulk folder
- Direct Cloudinary URL references are in:
  - `src/components/Navbar.js`
  - `src/components/RotatingGallery/rotatingGalleryContainer.js`
  - `src/pages/index.js` (commented section)
  - `next.config.mjs` (`res.cloudinary.com` in image domains)
- `src/util/cloudinaryImageRetreival.js` exists but is not imported anywhere and can be removed after migration.
- `cloudinary-build-url` is present in dependencies but appears unused.

## Artifacts generated for migration
- Mapping spreadsheet (CSV): `docs/cloudinary-repo-image-mapping.csv`
- Mapping JSON for automation: `docs/cloudinary-repo-image-mapping.json`
- Bulk inventory spreadsheet (CSV): `docs/cloudinary-bulk-inventory.csv`
- Upload results (CSV/JSON, produced by uploader):  
  - `docs/cloudinary-to-sanity-upload-results.csv`  
  - `docs/cloudinary-to-sanity-upload-results.json`

## Execution plan
1. Generate and validate mapping
- Run: `npm run map:cloudinary`
- Confirm every repo Cloudinary URL has a `bulk_match_strategy` of `exact_single` or `fuzzy_single`.
- Resolve any `none` or `*_multiple` rows before upload.

2. Upload mapped assets to Sanity
- Set a write token in shell:
  - `export SANITY_API_WRITE_TOKEN=<token-with-assets-write-scope>`
- Dry run (default):
  - `npm run upload:cloudinary-to-sanity`
- Real upload:
  - `npm run upload:cloudinary-to-sanity -- --execute`
- Optional flags:
  - `--limit=25` to batch uploads
  - `--include-multiple-matches` to include ambiguous mappings
  - `--allow-svg-as-image` if you want SVGs uploaded as Sanity image assets instead of file assets

3. Replace Cloudinary URLs in code
- Use `docs/cloudinary-to-sanity-upload-results.csv` to map each old Cloudinary URL to `sanity_url`.
- Replace hardcoded `src=...cloudinary...` values with Sanity URLs.
- Keep `cdn.sanity.io` in `next.config.mjs` and remove `res.cloudinary.com` once complete.

4. Optional model hardening in Sanity content
- Prefer storing references to Sanity assets in schema fields instead of hardcoded URLs.
- For static sponsor logos, create a site settings document with image/file fields and query them in components.

5. Cleanup
- Remove `src/util/cloudinaryImageRetreival.js` if no longer needed.
- Remove `cloudinary-build-url` from `package.json` and lockfile.
- Re-run app and verify all previously Cloudinary-backed images render correctly.

## Rollback strategy
- Keep Cloudinary URLs unchanged until Sanity upload and URL replacement are validated in staging.
- Migrate in small batches (`--limit`) and verify each batch before proceeding.
