'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Section from '@/components/Section'
import Container from '@/components/Container'
import FeatureCard from '@/components/FeatureCard'
import FAQ from '@/components/FAQ'
import CTAButton from '@/components/CTAButton'

export default function Home() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const features = [
    {
      icon: '📸',
      title: 'Upload & Generate Instantly',
      image: '/feature_A_upload_generate.png',
      items: [
        'Snap a photo of your textbook, notes, or whiteboard',
        'Paste typed notes directly',
        'AI analyzes and extracts key concepts automatically',
        'Get 15-25 quality flashcards in seconds',
      ],
      description:
        'No more manual typing. No more copy-paste. Just instant, ready-to-study flashcards.',
    },
    {
      icon: '🧠',
      title: 'Smart AI Answer Validation',
      image: '/feature_B_validation.png',
      items: [
        'AI understands your answers semantically, not just word-for-word',
        "Minor typos? Paraphrasing? No problem - you'll still get credit",
        'Get instant feedback with explanations',
        'Learn from your mistakes with intelligent hints',
      ],
      description:
        'Traditional flashcards only match exact answers. Our AI understands meaning.',
    },
    {
      icon: '🎯',
      title: 'Adaptive Learning System',
      image: '/feature_C_adaptive.png',
      items: [
        'Questions you miss come back until you master them',
        'Track your progress across all study sessions',
        'See your accuracy improve over time',
        'Intelligent retry system (up to 3 attempts per card)',
      ],
      description:
        'The harder the question, the more practice you get - automatically.',
    },
    {
      icon: '🚀',
      title: 'Zero Setup, Instant Study',
      image: '/feature_D_zero_setup.png',
      items: [
        'AI automatically detects your subject and topic',
        'Auto-organized into courses and topics',
        'Choose your study mode: immediate feedback or end reveal',
        'Start studying within seconds of uploading',
      ],
      description:
        'No complicated setup. No manual organization. Just upload and go.',
    },
    {
      icon: '📊',
      title: 'Progress That Motivates',
      image: '/feature_E_progress.png',
      items: [
        'Detailed session history with accuracy metrics',
        "See which topics you've mastered",
        'Track improvement over time',
        'Celebrate your wins with clear progress visualization',
      ],
      description: "Numbers don't lie - watch yourself get better every day.",
    },
  ]

  const howItWorksSteps = [
    {
      number: '1',
      title: 'Upload Your Notes',
      description:
        'Take a photo of your textbook, lecture slides, or handwritten notes. Or just paste text directly. LearnWhat.ai accepts it all.',
      icon: '📤',
    },
    {
      number: '2',
      title: 'AI Creates Flashcards',
      description:
        'Our GPT-4 powered AI analyzes your content, extracts key concepts, and generates high-quality Q&A flashcards. It even categorizes them by subject and topic automatically.',
      icon: '🤖',
    },
    {
      number: '3',
      title: 'Study & Master',
      description:
        'Jump right into your flashcards with game-like study modes. Get instant AI feedback, retry questions you miss, and track your progress in real-time.',
      icon: '✅',
    },
  ]

  const sciencePoints = [
    {
      title: 'Active Recall',
      description:
        'Instead of passively re-reading notes, flashcards force you to actively retrieve information from memory - proven to boost retention by up to 50%.',
    },
    {
      title: 'Spaced Repetition',
      description:
        'Our intelligent retry system ensures you see challenging questions more often, optimizing your study time using proven memory science.',
    },
    {
      title: 'Immediate Feedback',
      description:
        'Know instantly whether you got it right or wrong, with AI explanations that help you understand why. Learning from mistakes has never been faster.',
    },
    {
      title: 'Gamification',
      description:
        "Study modes designed like games keep you engaged and motivated. Learning shouldn't feel like a chore.",
    },
  ]

  const personas = [
    'Middle & High School Students: Master biology, history, geography, and more',
    'College Students: Tackle complex subjects with confidence',
    'Lifelong Learners: Learn anything, anytime',
    'Language Learners: Build vocabulary effortlessly',
  ]

  const faqItems = [
    {
      question: 'Is it really that fast?',
      answer: 'Yes. Upload to flashcards in under 30 seconds.',
    },
    {
      question: 'What if the AI gets something wrong?',
      answer:
        "You can provide feedback on any card, and we're constantly improving.",
    },
    {
      question: 'Can I use it on my phone?',
      answer:
        'Absolutely. LearnWhat.ai works perfectly on mobile, tablet, and desktop.',
    },
    {
      question: 'How accurate is the answer validation?',
      answer:
        "Our AI uses GPT-4 for semantic understanding, so it recognizes correct answers even if they're phrased differently.",
    },
  ]

  return (
    <>
      <Navigation />

      <main id="main-content">
        {/* Hero Section */}
        <section className="pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-to-br from-brand-paper to-white overflow-hidden">
          <Container>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left: Text */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-navy mb-6 leading-tight">
                  Transform Your Notes into Flashcards in Seconds
                </h1>
                <p className="text-xl md:text-2xl text-brand-gray mb-8 leading-relaxed">
                  Study smarter, not harder. Let AI turn your notes into personalized flashcards instantly.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <CTAButton href="#get-started" variant="primary">
                    Create Free Account
                  </CTAButton>
                  <CTAButton
                    variant="secondary"
                    onClick={() => scrollToSection('#how-it-works')}
                  >
                    See How It Works
                  </CTAButton>
                </div>
              </motion.div>

              {/* Right: Image */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/hero_16x9_transparent.png"
                    alt="LearnWhat.ai Dashboard"
                    width={1600}
                    height={900}
                    priority
                    className="w-full h-auto"
                  />
                </div>
              </motion.div>
            </div>
          </Container>
        </section>

        {/* Problem Section */}
        <Section
          id="problem"
          background="white"
          title="The Problem"
          centered
        >
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
              We&apos;ve all been there: staring at pages of notes, manually creating flashcards one by one. It&apos;s time-consuming, tedious, and by the time you&apos;re done, you&apos;re too exhausted to actually study.
            </p>
            <p className="text-2xl md:text-3xl font-bold text-brand-orange">
              What if there was a better way?
            </p>
          </div>
        </Section>

        {/* Meet LearnWhat.ai Section */}
        <Section
          id="meet"
          background="paper"
          title="Meet LearnWhat.ai"
          subtitle="LearnWhat.ai is your AI-powered study companion that transforms any notes - typed or handwritten, textbook pages or lecture slides - into interactive flashcards in seconds. Just snap a photo or paste your notes, and let our AI do the heavy lifting."
          centered
        >
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-brand-navy mb-4 text-center">
              Why LearnWhat.ai?
            </h3>
            <p className="text-xl text-brand-gray text-center">
              <strong>Because your time is precious.</strong> Spend it learning,
              not creating flashcards.
            </p>
          </div>
        </Section>

        {/* Features Section */}
        <Section
          id="features"
          background="white"
          title="Features That Make You Study Smarter"
          centered
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                items={feature.items}
                description={feature.description}
                image={feature.image}
                delay={index * 0.1}
              />
            ))}
          </div>
        </Section>

        {/* How It Works Section */}
        <Section
          id="how-it-works"
          background="navy"
          title="How It Works"
          centered
        >
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {howItWorksSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="bg-brand-orange w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-6 mx-auto shadow-lg">
                  {step.icon}
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="text-5xl font-bold text-brand-light mb-2">
                    {step.number}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                    {step.title}
                  </h3>
                  <p className="text-brand-light leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="text-2xl md:text-3xl font-bold text-white text-center">
            That&apos;s it. Three steps to smarter studying.
          </p>
        </Section>

        {/* Science Section */}
        <Section
          id="science"
          background="paper"
          title="The Science Behind Better Learning"
          centered
        >
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {sciencePoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-6 md:p-8"
              >
                <h3 className="text-xl md:text-2xl font-bold text-brand-navy mb-3">
                  {point.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {point.description}
                </p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Personas Section */}
        <Section
          id="personas"
          background="white"
          title="Built for Students, By Students"
          subtitle="Whether you&apos;re cramming for finals, preparing for a certification exam, or just trying to keep up with daily coursework, LearnWhat.ai adapts to your needs."
          centered
        >
          <div className="max-w-3xl mx-auto bg-brand-paper rounded-2xl shadow-lg p-8 md:p-12">
            <ul className="space-y-4">
              {personas.map((persona, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <span className="text-brand-orange text-2xl">•</span>
                  <span className="text-lg text-gray-700 leading-relaxed">
                    {persona}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </Section>

        {/* Primary CTA Section */}
        <Section
          id="get-started"
          background="navy"
          title="Ready to transform how you study?"
          centered
        >
          <div className="max-w-3xl mx-auto">
            <ol className="space-y-4 mb-10">
              {[
                'Create your free account',
                'Upload your first set of notes',
                'Watch AI create your flashcards',
                'Start studying smarter - right now',
              ].map((step, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-4 text-white text-lg"
                >
                  <span className="bg-brand-orange rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="leading-relaxed pt-1">{step}</span>
                </motion.li>
              ))}
            </ol>
            <div className="text-center">
              <CTAButton
                href="https://app.learnwhat.ai"
                variant="primary"
                className="text-lg md:text-xl"
              >
                Get Started Today
              </CTAButton>
              <p className="text-brand-light mt-4">
                Stop wasting time on manual flashcard creation.
              </p>
            </div>
          </div>
        </Section>

        {/* Tech-Powered Section */}
        <Section
          background="white"
          title="Tech-Powered Learning"
          subtitle="Built with cutting-edge technology:"
          centered
        >
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'GPT-4 Vision AI',
                desc: 'for intelligent content analysis',
              },
              {
                title: 'Semantic Understanding',
                desc: 'for smart answer validation',
              },
              {
                title: 'Progressive Web App',
                desc: 'for mobile-first experience',
              },
              {
                title: 'Secure & Private',
                desc: 'with enterprise-grade data protection',
              },
            ].map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-brand-paper rounded-xl p-6 shadow"
              >
                <h3 className="font-bold text-brand-navy text-lg mb-2">
                  {tech.title}
                </h3>
                <p className="text-brand-gray">{tech.desc}</p>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-brand-gray mt-8 text-lg">
            Your notes, your flashcards, your progress - all safe and accessible anywhere.
          </p>
        </Section>

        {/* FAQ Section */}
        <Section
          id="faq"
          background="paper"
          title="Questions?"
          centered
        >
          <FAQ items={faqItems} />
        </Section>

        {/* Footer */}
        <footer className="bg-brand-navy text-white py-12">
          <Container>
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {/* Logo & Tagline */}
              <div>
                <div className="mb-4">
                  <Image
                    src="/logo.png"
                    alt="LearnWhat.ai"
                    width={160}
                    height={50}
                    className="brightness-0 invert"
                  />
                </div>
                <p className="text-brand-light text-sm">
                  Because your brain deserves better tools.
                </p>
                <p className="text-brand-light mt-2 font-semibold">
                  Study smarter. Learn faster. Achieve more.
                </p>
              </div>

              {/* Links */}
              <div>
                <h3 className="font-bold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-brand-light">
                  <li>
                    <button
                      onClick={() => scrollToSection('#features')}
                      className="hover:text-white transition-colors"
                    >
                      Features
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection('#how-it-works')}
                      className="hover:text-white transition-colors"
                    >
                      How It Works
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection('#faq')}
                      className="hover:text-white transition-colors"
                    >
                      FAQ
                    </button>
                  </li>
                </ul>
              </div>

              {/* Newsletter */}
              <div>
                <h3 className="font-bold mb-4">Stay Updated</h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    const email = (e.target as any).email.value
                    console.log('Newsletter signup:', email)
                    alert('Thanks for subscribing! (Demo only)')
                  }}
                  className="space-y-3"
                >
                  <input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    required
                    className="w-full px-4 py-2 rounded-lg text-brand-navy"
                    aria-label="Email address"
                  />
                  <button
                    type="submit"
                    className="w-full bg-brand-orange text-white px-4 py-2 rounded-lg font-semibold hover:brightness-95 transition-all"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-brand-light text-sm">
              <p>© 2025 LearnWhat.ai. All rights reserved.</p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </div>
            </div>
          </Container>
        </footer>
      </main>
    </>
  )
}
