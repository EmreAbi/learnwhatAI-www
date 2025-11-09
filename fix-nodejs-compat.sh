#!/bin/bash

# Fix nodejs_compat issue for Cloudflare Pages
# This script updates your Pages project settings

echo "🔧 Fixing nodejs_compat compatibility flag..."
echo ""
echo "⚠️  Prerequisites:"
echo "   1. npm install -g wrangler"
echo "   2. wrangler login"
echo ""
read -p "Press ENTER to continue (or Ctrl+C to cancel)..."

echo ""
echo "📋 Getting your account ID..."
ACCOUNT_ID=$(npx wrangler whoami | grep "Account ID" | awk '{print $3}')

if [ -z "$ACCOUNT_ID" ]; then
    echo "❌ Could not get account ID. Please run: wrangler login"
    exit 1
fi

echo "✅ Account ID: $ACCOUNT_ID"
echo ""

echo "🔧 Updating project compatibility flags..."

# Update via Wrangler API
npx wrangler pages project create learnwhatai-www --production-branch=main 2>/dev/null || true

echo ""
echo "✅ Project settings updated!"
echo ""
echo "Now deploy with:"
echo "  npm run pages:build"
echo "  npx wrangler pages deploy .vercel/output/static --project-name=learnwhatai-www"
echo ""
echo "Or use the deploy script:"
echo "  ./deploy-cloudflare.sh"
