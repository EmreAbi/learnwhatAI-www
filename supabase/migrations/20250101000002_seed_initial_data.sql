-- Seed Initial Data from Current Landing Page Content

-- ============================================
-- 1. HERO SECTION
-- ============================================
INSERT INTO "www-hero" (title, subtitle, cta_primary_text, cta_primary_link, cta_secondary_text, cta_secondary_link, hero_image)
VALUES (
    'Transform Your Notes into Flashcards in Seconds',
    'Study smarter, not harder. Let AI turn your notes into personalized flashcards instantly.',
    'Create Free Account',
    '#get-started',
    'See How It Works',
    '#how-it-works',
    '/hero_16x9_transparent.png'
);

-- ============================================
-- 2. PROBLEM SECTION
-- ============================================
INSERT INTO "www-problem" (title, description, highlight_text)
VALUES (
    'The Problem',
    'We''ve all been there: staring at pages of notes, manually creating flashcards one by one. It''s time-consuming, tedious, and by the time you''re done, you''re too exhausted to actually study.',
    'What if there was a better way?'
);

-- ============================================
-- 3. MEET SECTION
-- ============================================
INSERT INTO "www-meet" (title, subtitle, card_title, card_content)
VALUES (
    'Meet LearnWhat.ai',
    'LearnWhat.ai is your AI-powered study companion that transforms any notes - typed or handwritten, textbook pages or lecture slides - into interactive flashcards in seconds. Just snap a photo or paste your notes, and let our AI do the heavy lifting.',
    'Why LearnWhat.ai?',
    'Because your time is precious. Spend it learning, not creating flashcards.'
);

-- ============================================
-- 4. FEATURES
-- ============================================
INSERT INTO "www-features" (icon, title, description, items, image, sort_order) VALUES
('📸', 'Upload & Generate Instantly', 'No more manual typing. No more copy-paste. Just instant, ready-to-study flashcards.',
 '["Snap a photo of your textbook, notes, or whiteboard", "Paste typed notes directly", "AI analyzes and extracts key concepts automatically", "Get 15-25 quality flashcards in seconds"]'::jsonb,
 '/feature_A_upload_generate.png', 1),

('🧠', 'Smart AI Answer Validation', 'Traditional flashcards only match exact answers. Our AI understands meaning.',
 '["AI understands your answers semantically, not just word-for-word", "Minor typos? Paraphrasing? No problem - you''ll still get credit", "Get instant feedback with explanations", "Learn from your mistakes with intelligent hints"]'::jsonb,
 '/feature_B_validation.png', 2),

('🎯', 'Adaptive Learning System', 'The harder the question, the more practice you get - automatically.',
 '["Questions you miss come back until you master them", "Track your progress across all study sessions", "See your accuracy improve over time", "Intelligent retry system (up to 3 attempts per card)"]'::jsonb,
 '/feature_C_adaptive.png', 3),

('🚀', 'Zero Setup, Instant Study', 'No complicated setup. No manual organization. Just upload and go.',
 '["AI automatically detects your subject and topic", "Auto-organized into courses and topics", "Choose your study mode: immediate feedback or end reveal", "Start studying within seconds of uploading"]'::jsonb,
 '/feature_D_zero_setup.png', 4),

('📊', 'Progress That Motivates', 'Numbers don''t lie - watch yourself get better every day.',
 '["Detailed session history with accuracy metrics", "See which topics you''ve mastered", "Track improvement over time", "Celebrate your wins with clear progress visualization"]'::jsonb,
 '/feature_E_progress.png', 5);

-- ============================================
-- 5. HOW IT WORKS
-- ============================================
INSERT INTO "www-how-it-works" (step_number, title, description, icon, sort_order) VALUES
(1, 'Upload Your Notes', 'Take a photo of your textbook, lecture slides, or handwritten notes. Or just paste text directly. LearnWhat.ai accepts it all.', '📤', 1),
(2, 'AI Creates Flashcards', 'Our GPT-4 powered AI analyzes your content, extracts key concepts, and generates high-quality Q&A flashcards. It even categorizes them by subject and topic automatically.', '🤖', 2),
(3, 'Study & Master', 'Jump right into your flashcards with game-like study modes. Get instant AI feedback, retry questions you miss, and track your progress in real-time.', '✅', 3);

-- ============================================
-- 6. SCIENCE POINTS
-- ============================================
INSERT INTO "www-science" (title, description, sort_order) VALUES
('Active Recall', 'Instead of passively re-reading notes, flashcards force you to actively retrieve information from memory - proven to boost retention by up to 50%.', 1),
('Spaced Repetition', 'Our intelligent retry system ensures you see challenging questions more often, optimizing your study time using proven memory science.', 2),
('Immediate Feedback', 'Know instantly whether you got it right or wrong, with AI explanations that help you understand why. Learning from mistakes has never been faster.', 3),
('Gamification', 'Study modes designed like games keep you engaged and motivated. Learning shouldn''t feel like a chore.', 4);

-- ============================================
-- 7. PERSONAS
-- ============================================
INSERT INTO "www-personas" (text, sort_order) VALUES
('Middle & High School Students: Master biology, history, geography, and more', 1),
('College Students: Tackle complex subjects with confidence', 2),
('Lifelong Learners: Learn anything, anytime', 3),
('Language Learners: Build vocabulary effortlessly', 4);

-- ============================================
-- 8. CTA SECTION
-- ============================================
INSERT INTO "www-cta" (title, steps, button_text, button_link, subtitle) VALUES (
    'Ready to transform how you study?',
    '["Create your free account", "Upload your first set of notes", "Watch AI create your flashcards", "Start studying smarter - right now"]'::jsonb,
    'Get Started Today',
    'https://app.learnwhat.ai',
    'Stop wasting time on manual flashcard creation.'
);

-- ============================================
-- 9. TECH STACK
-- ============================================
INSERT INTO "www-tech-stack" (title, description, sort_order) VALUES
('GPT-4 Vision AI', 'for intelligent content analysis', 1),
('Semantic Understanding', 'for smart answer validation', 2),
('Progressive Web App', 'for mobile-first experience', 3),
('Secure & Private', 'with enterprise-grade data protection', 4);

-- ============================================
-- 10. FAQ
-- ============================================
INSERT INTO "www-faq" (question, answer, sort_order) VALUES
('Is it really that fast?', 'Yes. Upload to flashcards in under 30 seconds.', 1),
('What if the AI gets something wrong?', 'You can provide feedback on any card, and we''re constantly improving.', 2),
('Can I use it on my phone?', 'Absolutely. LearnWhat.ai works perfectly on mobile, tablet, and desktop.', 3),
('How accurate is the answer validation?', 'Our AI uses GPT-4 for semantic understanding, so it recognizes correct answers even if they''re phrased differently.', 4);

-- ============================================
-- 11. FOOTER
-- ============================================
INSERT INTO "www-footer" (tagline, subtitle, quick_links, copyright, newsletter_title) VALUES (
    'Because your brain deserves better tools.',
    'Study smarter. Learn faster. Achieve more.',
    '[{"label": "Features", "href": "#features"}, {"label": "How It Works", "href": "#how-it-works"}, {"label": "FAQ", "href": "#faq"}]'::jsonb,
    '© 2025 LearnWhat.ai. All rights reserved.',
    'Stay Updated'
);

-- ============================================
-- 12. SITE SETTINGS
-- ============================================
INSERT INTO "www-settings" (key, value) VALUES
('site_title', '"LearnWhat.ai - Transform Your Notes into Flashcards"'::jsonb),
('site_description', '"Study smarter with AI-powered flashcards. Upload notes, get instant flashcards with smart validation and adaptive learning."'::jsonb),
('meta_keywords', '["flashcards", "AI flashcards", "study app", "learning app", "GPT-4", "spaced repetition", "active recall"]'::jsonb),
('og_image', '"/og_1200x630.jpg"'::jsonb),
('twitter_handle', '"@learnwhatai"'::jsonb);
