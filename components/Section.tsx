import { ReactNode } from 'react'
import Container from './Container'

interface SectionProps {
  children: ReactNode
  className?: string
  id?: string
  title?: string
  subtitle?: string
  centered?: boolean
  background?: 'white' | 'paper' | 'navy'
}

export default function Section({
  children,
  className = '',
  id,
  title,
  subtitle,
  centered = false,
  background = 'white',
}: SectionProps) {
  const bgColors = {
    white: 'bg-white',
    paper: 'bg-brand-paper',
    navy: 'bg-brand-navy',
  }

  const textColors = {
    white: 'text-brand-navy',
    paper: 'text-brand-navy',
    navy: 'text-white',
  }

  return (
    <section
      id={id}
      className={`py-16 md:py-24 ${bgColors[background]} ${className}`}
    >
      <Container>
        {(title || subtitle) && (
          <div className={`mb-12 md:mb-16 ${centered ? 'text-center' : ''}`}>
            {title && (
              <h2
                className={`text-3xl md:text-4xl lg:text-5xl font-bold ${textColors[background]} mb-4 leading-tight`}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p
                className={`text-lg md:text-xl ${
                  background === 'navy' ? 'text-brand-light' : 'text-brand-gray'
                } max-w-3xl ${centered ? 'mx-auto' : ''}`}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </Container>
    </section>
  )
}
