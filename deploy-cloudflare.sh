#!/bin/bash

# LearnWhat.ai - Manual Cloudflare Pages Deployment
# This script deploys with the correct nodejs_compat flag

echo "🚀 Building project..."
npm install
npx @cloudflare/next-on-pages@1

echo ""
echo "📦 Deploying to Cloudflare Pages..."
echo "⚠️  Make sure you have wrangler installed: npm install -g wrangler"
echo "⚠️  Make sure you're logged in: wrangler login"
echo ""

# Deploy with compatibility flag
npx wrangler pages deploy .vercel/output/static \
  --project-name=learnwhatai-www \
  --branch=main \
  --commit-dirty=true

echo ""
echo "✅ Deployment complete!"
echo "🌐 Your site: https://learnwhatai-www.pages.dev"
