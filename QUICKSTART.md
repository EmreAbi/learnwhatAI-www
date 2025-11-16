# 🚀 LearnWhat.ai - Quick Deployment Fix

## ❌ Problem: "nodejs_compat" Error

If you see either of these errors:
- "Node.JS Compatibility Error: no nodejs_compat compatibility flag set"
- "Error: No such compatibility flag: nodejs_compat"

## ✅ Solution: Deploy with Wrangler CLI

### Step-by-Step Fix

#### 1. Install Wrangler

```bash
npm install -g wrangler
```

#### 2. Login to Cloudflare

```bash
wrangler login
```

This will open your browser. Login and authorize Wrangler.

#### 3. Clean Dashboard Settings

Go to Cloudflare Dashboard:
1. **Workers & Pages** → **learnwhatai-www**
2. **Settings**
3. Look for any place where you added "nodejs_compat" and **DELETE IT**
   - Check: Functions section
   - Check: Environment Variables section
4. **Save** (if needed)

#### 4. Deploy via CLI

```bash
# In your project directory
cd learnwhatAI-www

# Build the project
npm install
npx @cloudflare/next-on-pages@1

# Deploy
npx wrangler pages deploy .vercel/output/static \
  --project-name=learnwhatai-www \
  --branch=main
```

#### 5. Done! ✅

Your site should now be live at: https://learnwhatai-www.pages.dev

---

## Alternative: Use the Deploy Script

We've included a deployment script for convenience:

```bash
chmod +x deploy-cloudflare.sh
./deploy-cloudflare.sh
```

---

## Why This Works

Cloudflare Pages' dashboard UI sometimes has bugs with compatibility flags. The Wrangler CLI bypasses these issues and deploys directly.

The @cloudflare/next-on-pages tool automatically handles the nodejs_compat requirement when you deploy via CLI.

---

## Still Having Issues?

### Check Wrangler Version

```bash
wrangler --version
```

Should be 3.x or higher.

### View Deployment Logs

```bash
wrangler pages deployment list --project-name=learnwhatai-www
```

### Force Re-deploy

```bash
npx wrangler pages deploy .vercel/output/static \
  --project-name=learnwhatai-www \
  --branch=main \
  --commit-dirty=true
```

---

## Future Deployments

After the initial CLI deployment:
- Git-based deployments should work
- The CLI deployment sets up the project correctly
- Subsequent pushes to GitHub will auto-deploy

---

## Need Help?

See [CLOUDFLARE_SETUP.md](./CLOUDFLARE_SETUP.md) for more detailed instructions.
