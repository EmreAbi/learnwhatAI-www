import { ReactNode } from 'react'

interface CTAButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  className?: string
  ariaLabel?: string
}

export default function CTAButton({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
  ariaLabel,
}: CTAButtonProps) {
  const baseClasses =
    'inline-block rounded-2xl px-6 py-3 md:px-8 md:py-4 font-semibold text-center transition-all shadow-lg hover:shadow-xl transform hover:scale-105'

  const variantClasses = {
    primary: 'bg-brand-orange text-white hover:brightness-95',
    secondary:
      'bg-white text-brand-navy border-2 border-brand-navy hover:bg-brand-navy hover:text-white',
  }

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`

  if (href) {
    return (
      <a href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </a>
    )
  }

  return (
    <button onClick={onClick} className={classes} aria-label={ariaLabel}>
      {children}
    </button>
  )
}
