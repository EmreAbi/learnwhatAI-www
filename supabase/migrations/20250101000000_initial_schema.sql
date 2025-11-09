-- LearnWhat.ai Website Content Management Tables
-- All tables use www- prefix to separate from app tables

-- ============================================
-- 1. SITE SETTINGS
-- ============================================
CREATE TABLE IF NOT EXISTS "www-settings" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT UNIQUE NOT NULL,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 2. HERO SECTION
-- ============================================
CREATE TABLE IF NOT EXISTS "www-hero" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    subtitle TEXT NOT NULL,
    cta_primary_text TEXT NOT NULL,
    cta_primary_link TEXT NOT NULL,
    cta_secondary_text TEXT NOT NULL,
    cta_secondary_link TEXT NOT NULL,
    hero_image TEXT, -- Storage path
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 3. PROBLEM SECTION
-- ============================================
CREATE TABLE IF NOT EXISTS "www-problem" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    highlight_text TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 4. MEET SECTION
-- ============================================
CREATE TABLE IF NOT EXISTS "www-meet" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    subtitle TEXT NOT NULL,
    card_title TEXT NOT NULL,
    card_content TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 5. FEATURES
-- ============================================
CREATE TABLE IF NOT EXISTS "www-features" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    icon TEXT NOT NULL, -- emoji or icon name
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    items JSONB NOT NULL, -- array of strings
    image TEXT, -- Storage path
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 6. HOW IT WORKS STEPS
-- ============================================
CREATE TABLE IF NOT EXISTS "www-how-it-works" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    step_number INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT NOT NULL, -- emoji
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 7. SCIENCE POINTS
-- ============================================
CREATE TABLE IF NOT EXISTS "www-science" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 8. PERSONAS
-- ============================================
CREATE TABLE IF NOT EXISTS "www-personas" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    text TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 9. CTA SECTION
-- ============================================
CREATE TABLE IF NOT EXISTS "www-cta" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    steps JSONB NOT NULL, -- array of strings
    button_text TEXT NOT NULL,
    button_link TEXT NOT NULL,
    subtitle TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 10. TECH STACK
-- ============================================
CREATE TABLE IF NOT EXISTS "www-tech-stack" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 11. FAQ
-- ============================================
CREATE TABLE IF NOT EXISTS "www-faq" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 12. FOOTER
-- ============================================
CREATE TABLE IF NOT EXISTS "www-footer" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tagline TEXT NOT NULL,
    subtitle TEXT NOT NULL,
    quick_links JSONB NOT NULL, -- array of {label, href}
    copyright TEXT NOT NULL,
    newsletter_title TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_www_features_sort ON "www-features" (sort_order);
CREATE INDEX IF NOT EXISTS idx_www_how_it_works_sort ON "www-how-it-works" (sort_order);
CREATE INDEX IF NOT EXISTS idx_www_science_sort ON "www-science" (sort_order);
CREATE INDEX IF NOT EXISTS idx_www_personas_sort ON "www-personas" (sort_order);
CREATE INDEX IF NOT EXISTS idx_www_tech_stack_sort ON "www-tech-stack" (sort_order);
CREATE INDEX IF NOT EXISTS idx_www_faq_sort ON "www-faq" (sort_order);

-- ============================================
-- RLS POLICIES (Row Level Security)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE "www-settings" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "www-hero" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "www-problem" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "www-meet" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "www-features" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "www-how-it-works" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "www-science" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "www-personas" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "www-cta" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "www-tech-stack" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "www-faq" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "www-footer" ENABLE ROW LEVEL SECURITY;

-- Public READ access for all tables (for landing page)
CREATE POLICY "Allow public read access" ON "www-settings" FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON "www-hero" FOR SELECT USING (is_active = true);
CREATE POLICY "Allow public read access" ON "www-problem" FOR SELECT USING (is_active = true);
CREATE POLICY "Allow public read access" ON "www-meet" FOR SELECT USING (is_active = true);
CREATE POLICY "Allow public read access" ON "www-features" FOR SELECT USING (is_active = true);
CREATE POLICY "Allow public read access" ON "www-how-it-works" FOR SELECT USING (is_active = true);
CREATE POLICY "Allow public read access" ON "www-science" FOR SELECT USING (is_active = true);
CREATE POLICY "Allow public read access" ON "www-personas" FOR SELECT USING (is_active = true);
CREATE POLICY "Allow public read access" ON "www-cta" FOR SELECT USING (is_active = true);
CREATE POLICY "Allow public read access" ON "www-tech-stack" FOR SELECT USING (is_active = true);
CREATE POLICY "Allow public read access" ON "www-faq" FOR SELECT USING (is_active = true);
CREATE POLICY "Allow public read access" ON "www-footer" FOR SELECT USING (is_active = true);

-- Admin FULL access (authenticated users)
-- Note: You should implement proper admin role checking in production
CREATE POLICY "Allow authenticated full access" ON "www-settings" FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access" ON "www-hero" FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access" ON "www-problem" FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access" ON "www-meet" FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access" ON "www-features" FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access" ON "www-how-it-works" FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access" ON "www-science" FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access" ON "www-personas" FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access" ON "www-cta" FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access" ON "www-tech-stack" FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access" ON "www-faq" FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access" ON "www-footer" FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- STORAGE BUCKET FOR IMAGES
-- ============================================

-- Create storage bucket (run this in Supabase dashboard or via API)
-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('www-images', 'www-images', true);

-- Storage policies will be added in next migration
