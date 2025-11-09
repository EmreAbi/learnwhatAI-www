import Image from 'next/image'
import Navigation from '@/components/Navigation'
import Section from '@/components/Section'
import Container from '@/components/Container'
import FeatureCard from '@/components/FeatureCard'
import FAQ from '@/components/FAQ'
import { HeroSection } from '@/components/sections/HeroSection'
import { getStorageUrl } from '@/lib/data/content'

// Configure Edge Runtime for Cloudflare Pages
export const runtime = 'edge'

// Fallback data in case database is not set up yet
const fallbackData = {
  hero: {
    title: 'Transform Your Notes into Flashcards in Seconds',
    subtitle: 'Study smarter, not harder. Let AI turn your notes into personalized flashcards instantly.',
    cta_primary_text: 'Create Free Account',
    cta_primary_link: '#get-started',
    cta_secondary_text: 'See How It Works',
    cta_secondary_link: '#how-it-works',
    hero_image: '/hero_16x9_transparent.png',
  },
  problem: {
    title: 'The Problem',
    description: "We've all been there: staring at pages of notes, manually creating flashcards one by one. It's time-consuming, tedious, and by the time you're done, you're too exhausted to actually study.",
    highlight_text: 'What if there was a better way?',
  },
  meet: {
    title: 'Meet LearnWhat.ai',
    subtitle: 'LearnWhat.ai is your AI-powered study companion that transforms any notes - typed or handwritten, textbook pages or lecture slides - into interactive flashcards in seconds. Just snap a photo or paste your notes, and let our AI do the heavy lifting.',
    card_title: 'Why LearnWhat.ai?',
    card_content: 'Because your time is precious. Spend it learning, not creating flashcards.',
  },
  features: [],
  howItWorks: [],
  science: [],
  personas: [],
  cta: null,
  techStack: [],
  faq: [],
  footer: null,
}

export default async function Home() {
  // Fetch all content from API
  let content: any
  try {
    // Get base URL for API calls
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ||
                    (typeof window !== 'undefined' ? window.location.origin : 'https://learnwhatai-www.pages.dev')

    const response = await fetch(`${baseUrl}/api/content`, {
      cache: 'no-store' // Always fetch fresh data for admin updates
    })

    if (response.ok) {
      content = await response.json()
    } else {
      console.error('Failed to fetch content:', response.status)
      content = fallbackData
    }
  } catch (error) {
    console.error('Error fetching content:', error)
    content = fallbackData
  }

  // Use fallback if database not set up
  if (!content.hero) {
    content = fallbackData
  }

  const {
    hero,
    problem,
    meet,
    features,
    howItWorks,
    science,
    personas,
    cta,
    techStack,
    faq,
    footer,
  } = content

  return (
    <>
      <Navigation />

      <main id="main-content">
        {/* Hero Section */}
        {hero && (
          <HeroSection
            title={hero.title}
            subtitle={hero.subtitle}
            ctaPrimaryText={hero.cta_primary_text}
            ctaPrimaryLink={hero.cta_primary_link}
            ctaSecondaryText={hero.cta_secondary_text}
            ctaSecondaryLink={hero.cta_secondary_link}
            heroImage={getStorageUrl(hero.hero_image)}
          />
        )}

        {/* Problem Section */}
        {problem && (
          <Section id="problem" background="white" title={problem.title} centered>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
                {problem.description}
              </p>
              <p className="text-2xl md:text-3xl font-bold text-brand-orange">
                {problem.highlight_text}
              </p>
            </div>
          </Section>
        )}

        {/* Meet LearnWhat.ai Section */}
        {meet && (
          <Section
            id="meet"
            background="paper"
            title={meet.title}
            subtitle={meet.subtitle}
            centered
          >
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-bold text-brand-navy mb-4 text-center">
                {meet.card_title}
              </h3>
              <p className="text-xl text-brand-gray text-center">
                <strong>{meet.card_content}</strong>
              </p>
            </div>
          </Section>
        )}

        {/* Features Section */}
        {features.length > 0 && (
          <Section
            id="features"
            background="white"
            title="Features That Make You Study Smarter"
            centered
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature: any, index: number) => (
                <FeatureCard
                  key={feature.id}
                  icon={feature.icon}
                  title={feature.title}
                  items={feature.items as string[]}
                  description={feature.description}
                  image={getStorageUrl(feature.image)}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </Section>
        )}

        {/* How It Works Section */}
        {howItWorks.length > 0 && (
          <Section
            id="how-it-works"
            background="navy"
            title="How It Works"
            centered
          >
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {howItWorks.map((step: any, index: number) => (
                <div key={step.id} className="text-center">
                  <div className="bg-brand-orange w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-6 mx-auto shadow-lg">
                    {step.icon}
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                    <div className="text-5xl font-bold text-brand-light mb-2">
                      {step.step_number}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                      {step.title}
                    </h3>
                    <p className="text-brand-light leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-2xl md:text-3xl font-bold text-white text-center">
              That&apos;s it. Three steps to smarter studying.
            </p>
          </Section>
        )}

        {/* Science Section */}
        {science.length > 0 && (
          <Section
            id="science"
            background="paper"
            title="The Science Behind Better Learning"
            centered
          >
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {science.map((point: any) => (
                <div
                  key={point.id}
                  className="bg-white rounded-2xl shadow-lg p-6 md:p-8"
                >
                  <h3 className="text-xl md:text-2xl font-bold text-brand-navy mb-3">
                    {point.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {point.description}
                  </p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Personas Section */}
        {personas.length > 0 && (
          <Section
            id="personas"
            background="white"
            title="Built for Students, By Students"
            subtitle="Whether you're cramming for finals, preparing for a certification exam, or just trying to keep up with daily coursework, LearnWhat.ai adapts to your needs."
            centered
          >
            <div className="max-w-3xl mx-auto bg-brand-paper rounded-2xl shadow-lg p-8 md:p-12">
              <ul className="space-y-4">
                {personas.map((persona: any) => (
                  <li key={persona.id} className="flex items-start gap-3">
                    <span className="text-brand-orange text-2xl">•</span>
                    <span className="text-lg text-gray-700 leading-relaxed">
                      {persona.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Section>
        )}

        {/* Primary CTA Section */}
        {cta && (
          <Section
            id="get-started"
            background="navy"
            title={cta.title}
            centered
          >
            <div className="max-w-3xl mx-auto">
              <ol className="space-y-4 mb-10">
                {(cta.steps as string[]).map((step: string, index: number) => (
                  <li key={index} className="flex items-start gap-4 text-white text-lg">
                    <span className="bg-brand-orange rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="leading-relaxed pt-1">{step}</span>
                  </li>
                ))}
              </ol>
              <div className="text-center">
                <a
                  href={cta.button_link}
                  className="inline-block bg-brand-orange text-white rounded-2xl px-8 py-4 font-semibold text-lg md:text-xl shadow-lg hover:brightness-95 transition-all"
                >
                  {cta.button_text}
                </a>
                <p className="text-brand-light mt-4">{cta.subtitle}</p>
              </div>
            </div>
          </Section>
        )}

        {/* Tech-Powered Section */}
        {techStack.length > 0 && (
          <Section
            background="white"
            title="Tech-Powered Learning"
            subtitle="Built with cutting-edge technology:"
            centered
          >
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
              {techStack.map((tech: any) => (
                <div
                  key={tech.id}
                  className="bg-brand-paper rounded-xl p-6 shadow"
                >
                  <h3 className="font-bold text-brand-navy text-lg mb-2">
                    {tech.title}
                  </h3>
                  <p className="text-brand-gray">{tech.description}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-brand-gray mt-8 text-lg">
              Your notes, your flashcards, your progress - all safe and accessible anywhere.
            </p>
          </Section>
        )}

        {/* FAQ Section */}
        {faq.length > 0 && (
          <Section id="faq" background="paper" title="Questions?" centered>
            <FAQ
              items={faq.map((item: any) => ({
                question: item.question,
                answer: item.answer,
              }))}
            />
          </Section>
        )}

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
                {footer && (
                  <>
                    <p className="text-brand-light text-sm">{footer.tagline}</p>
                    <p className="text-brand-light mt-2 font-semibold">
                      {footer.subtitle}
                    </p>
                  </>
                )}
              </div>

              {/* Links */}
              <div>
                <h3 className="font-bold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-brand-light">
                  {footer &&
                    (footer.quick_links as any[]).map((link: any, index: number) => (
                      <li key={index}>
                        <a
                          href={link.href}
                          className="hover:text-white transition-colors"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                </ul>
              </div>

              {/* Newsletter */}
              <div>
                <h3 className="font-bold mb-4">
                  {footer?.newsletter_title || 'Stay Updated'}
                </h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
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
              <p>{footer?.copyright || '© 2025 LearnWhat.ai. All rights reserved.'}</p>
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
