# LearnWhatAI Admin Panel

Admin panel for managing LearnWhatAI application, including achievement icon uploads to Supabase Storage.

## Features

- **Achievement Icon Management**: Upload, replace, and remove custom icons for achievements
- **Supabase Storage Integration**: Direct upload to `achievement-icons` bucket
- **Visual Feedback**: Progress indicators, success/error messages
- **Achievement Overview**: View all achievements with their properties (tier, category, required value)

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Supabase

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 3. Supabase Storage Setup

Ensure the `achievement-icons` bucket exists in your Supabase Storage:

1. Go to Supabase Dashboard > Storage
2. Create a new bucket named `achievement-icons`
3. Set it as **PUBLIC** (so icons can be loaded without authentication)
4. Add appropriate storage policies (see SQL migration in docs)

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000/admin](http://localhost:3000/admin) to access the admin panel.

## Usage

### Uploading Achievement Icons

1. Navigate to the **Achievement Icons** tab
2. Click **Upload** button next to an achievement
3. Select an image file (PNG, JPG, WebP, or SVG, max 5MB)
4. The icon will be uploaded to `achievement-icons/{tier}/{key}.{ext}`
5. The `icon_url` field in the database will be automatically updated

### Icon Specifications

- **Format**: PNG (recommended), JPG, WebP, or SVG
- **Size**: 256x256 or 512x512 pixels recommended
- **Max File Size**: 5MB
- **Transparency**: PNG with transparency for best results

## Project Structure

```
src/
├── app/
│   ├── admin/
│   │   └── page.tsx          # Admin panel main page
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page
├── components/
│   ├── AdminTabs.tsx         # Tab navigation component
│   └── AchievementIconManager.tsx  # Achievement icon upload manager
├── lib/
│   └── supabase.ts           # Supabase client configuration
└── types/
    └── achievement.ts        # TypeScript types for achievements
```

## Database Schema

The admin panel works with the following table structure:

```sql
achievements (
  id UUID PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  category achievement_category NOT NULL,
  tier achievement_tier NOT NULL,
  required_value INTEGER NOT NULL,
  icon TEXT NOT NULL,        -- SF Symbol name (fallback)
  icon_url TEXT DEFAULT NULL, -- Custom icon URL (if uploaded)
  sort_order INTEGER NOT NULL,
  is_active BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)
```

## iOS App Integration

The iOS app should check `icon_url` first:
- If `icon_url` is set, load the custom image from the URL
- If `icon_url` is NULL, use the SF Symbol specified in `icon` field

## License

Private - LearnWhatAI
