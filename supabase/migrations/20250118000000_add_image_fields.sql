-- Add image field to multiple tables
-- This migration adds optional image fields to sections that didn't have them

-- ============================================
-- Add image field to www-problem
-- ============================================
ALTER TABLE "www-problem"
ADD COLUMN IF NOT EXISTS image TEXT;

COMMENT ON COLUMN "www-problem".image IS 'Storage path for problem section image';

-- ============================================
-- Add image field to www-meet
-- ============================================
ALTER TABLE "www-meet"
ADD COLUMN IF NOT EXISTS image TEXT;

COMMENT ON COLUMN "www-meet".image IS 'Storage path for meet section image';

-- ============================================
-- Add image field to www-how-it-works
-- ============================================
ALTER TABLE "www-how-it-works"
ADD COLUMN IF NOT EXISTS image TEXT;

COMMENT ON COLUMN "www-how-it-works".image IS 'Storage path for how-it-works step image';

-- ============================================
-- Add image field to www-science
-- ============================================
ALTER TABLE "www-science"
ADD COLUMN IF NOT EXISTS image TEXT;

COMMENT ON COLUMN "www-science".image IS 'Storage path for science point image';

-- ============================================
-- Add image field to www-personas
-- ============================================
ALTER TABLE "www-personas"
ADD COLUMN IF NOT EXISTS image TEXT;

COMMENT ON COLUMN "www-personas".image IS 'Storage path for persona image';

-- ============================================
-- Add image field to www-cta
-- ============================================
ALTER TABLE "www-cta"
ADD COLUMN IF NOT EXISTS image TEXT;

COMMENT ON COLUMN "www-cta".image IS 'Storage path for CTA section image';

-- ============================================
-- Add image field to www-tech-stack
-- ============================================
ALTER TABLE "www-tech-stack"
ADD COLUMN IF NOT EXISTS image TEXT;

COMMENT ON COLUMN "www-tech-stack".image IS 'Storage path for tech stack item image';
