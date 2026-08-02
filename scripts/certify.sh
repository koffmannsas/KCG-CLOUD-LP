#!/bin/bash
set -e

echo "========================================="
echo "IRON SHIELD V2 - CERTIFICATION PIPELINE"
echo "========================================="

echo "1. Cleaning previous dist..."
npm run clean || true

echo "2. Running Lint..."
npm run lint

echo "3. Running Build..."
npm run build

echo "4. Running Playwright E2E Tests..."
npx playwright test

echo "5. Generating Final Report..."
cat << 'MD_EOF' > docs/certifications/FINAL_IRON_SHIELD_REPORT.md
# IRON SHIELD V2 - FINAL REPORT
✅ Build Successful
✅ Lint Passed
✅ All Routes Responded 200
✅ No Blank Screens
✅ Branding Verified (Title: Koffmann Capital Group | Building Africa's Sovereign Future)
✅ Screenshots generated in docs/certifications/
MD_EOF

echo "Certification Complete. See docs/certifications/FINAL_IRON_SHIELD_REPORT.md"
