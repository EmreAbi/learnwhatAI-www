'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import Container from '@/components/Container'
import CTAButton from '@/components/CTAButton'

interface HeroSectionProps {
  title: string
  subtitle: string
  ctaPrimaryText: string
  ctaPrimaryLink: string
  ctaSecondaryText: string
  ctaSecondaryLink: string
  heroImage: string
}

export function HeroSection({
  title,
  subtitle,
  ctaPrimaryText,
  ctaPrimaryLink,
  ctaSecondaryText,
  ctaSecondaryLink,
  heroImage,
}: HeroSectionProps) {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
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
              {title}
            </h1>
            <p className="text-xl md:text-2xl text-brand-gray mb-8 leading-relaxed">
              {subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <CTAButton href={ctaPrimaryLink} variant="primary">
                {ctaPrimaryText}
              </CTAButton>
              <CTAButton
                variant="secondary"
                onClick={() => scrollToSection(ctaSecondaryLink)}
              >
                {ctaSecondaryText}
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
                src={heroImage || '/hero_16x9_transparent.png'}
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
  )
}
