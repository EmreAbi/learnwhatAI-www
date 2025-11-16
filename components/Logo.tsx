import Image from 'next/image'

interface LogoProps {
  className?: string
  width?: number
  height?: number
}

export default function Logo({ className = '', width = 180, height = 60 }: LogoProps) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/logo.png"
        alt="LearnWhat.ai Logo"
        width={width}
        height={height}
        priority
        className="object-contain"
      />
      <span className="sr-only">LearnWhat.ai - Transform Your Notes into Flashcards</span>
    </div>
  )
}
