# LearnWhat.ai Landing Page

A modern, SEO-optimized landing page for LearnWhat.ai built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- ⚡ **Fast & Optimized**: Built with Next.js 14 App Router for optimal performance
- 🎨 **Modern Design**: Clean, professional design with brand colors and smooth animations
- 📱 **Fully Responsive**: Mobile-first approach with responsive navigation
- ♿ **Accessible**: WCAG compliant with proper ARIA labels and keyboard navigation
- 🔍 **SEO-Ready**: Comprehensive metadata, Open Graph, and Twitter Card support
- 🎭 **Animated**: Smooth scroll animations using Framer Motion
- 📦 **Production-Ready**: Optimized images, lazy loading, and code splitting

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Image Optimization**: next/image
- **Font**: Inter (Google Fonts)

## Brand Colors

- Navy: `#142C5B`
- Orange: `#F15A24`
- Light Blue: `#66A9D9`
- Paper: `#F7FAFF`
- Gray: `#8CA3B8`

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Cloudflare Pages

This project is optimized for Cloudflare Pages deployment.

#### Cloudflare Pages Settings

When creating your Cloudflare Pages project, use these settings:

```
Framework preset: Next.js
Build command: npx @cloudflare/next-on-pages@1
Build output directory: .vercel/output/static
Node.js version: 20.11.0
```

**Note:** The `.npmrc` file handles peer dependency conflicts automatically.

#### Compatibility Flags

The `wrangler.toml` file automatically configures the required `nodejs_compat` flag.
No manual configuration needed in Cloudflare dashboard!

#### Environment Variables (if needed)

In Cloudflare Pages dashboard → Settings → Environment Variables, add:
- `NODE_VERSION`: `20.11.0`

#### Deploy via Git

1. Push your code to GitHub
2. Connect your repository in Cloudflare Pages
3. Cloudflare will automatically build and deploy

#### Manual Deploy (via Wrangler CLI)

```bash
# Install dependencies
npm install

# Build for Cloudflare Pages
npm run pages:build

# Deploy (requires wrangler CLI installed)
npm run pages:deploy
```

#### Important Notes for Cloudflare

- Images are set to `unoptimized: true` (Cloudflare limitation)
- All pages are static (no server-side rendering)
- Edge functions are not used in this build
- Font loading is done via Google Fonts CDN

## Project Structure

```
learnwhatAI-www/
├── app/
│   ├── layout.tsx       # Root layout with metadata
│   ├── page.tsx         # Main landing page
│   └── globals.css      # Global styles
├── components/
│   ├── Container.tsx    # Container wrapper
│   ├── CTAButton.tsx    # Call-to-action button
│   ├── FAQ.tsx          # FAQ accordion
│   ├── FeatureCard.tsx  # Feature card with icon
│   ├── Logo.tsx         # Logo component
│   ├── Navigation.tsx   # Header navigation
│   └── Section.tsx      # Section wrapper
├── public/              # Static assets (images, icons)
└── tailwind.config.ts   # Tailwind configuration
```

## Page Sections

1. **Hero** - Main headline with CTA buttons
2. **Problem** - Identifies user pain points
3. **Meet LearnWhat.ai** - Product introduction
4. **Features** - 5 key features with images
5. **How It Works** - 3-step process
6. **The Science** - Learning methodology
7. **Personas** - Target audience
8. **CTA** - Primary call-to-action
9. **Tech-Powered** - Technology stack
10. **FAQ** - Common questions
11. **Footer** - Links and newsletter signup

## Performance

- Lighthouse Score: 95+ (target)
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Cumulative Layout Shift: < 0.1

## Accessibility

- Semantic HTML5 elements
- ARIA labels for interactive elements
- Skip-to-content link
- Keyboard navigation support
- Color contrast ratio: AAA standard

## SEO Optimization

- Meta tags (title, description, keywords)
- Open Graph tags for social sharing
- Twitter Card tags
- Structured data ready
- Sitemap.xml and robots.txt ready
- PWA manifest included

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

© 2025 LearnWhat.ai. All rights reserved.

## Support

For issues or questions, please contact: support@learnwhat.ai
