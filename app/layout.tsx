import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'LearnWhat.ai - Transform Your Notes into Flashcards in Seconds',
  description:
    'Study smarter, not harder. Let AI turn your notes into personalized flashcards instantly. Upload photos or text, get AI-generated flashcards in seconds with smart validation and adaptive learning.',
  keywords: [
    'flashcards',
    'AI flashcards',
    'study app',
    'learning app',
    'GPT-4',
    'spaced repetition',
    'active recall',
    'student tools',
    'exam preparation',
  ],
  authors: [{ name: 'LearnWhat.ai' }],
  creator: 'LearnWhat.ai',
  publisher: 'LearnWhat.ai',
  metadataBase: new URL('https://learnwhat.ai'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://learnwhat.ai',
    siteName: 'LearnWhat.ai',
    title: 'LearnWhat.ai - Transform Your Notes into Flashcards in Seconds',
    description:
      'Study smarter with AI-powered flashcards. Upload notes, get instant flashcards with smart validation and adaptive learning.',
    images: [
      {
        url: '/og_1200x630.jpg',
        width: 1200,
        height: 630,
        alt: 'LearnWhat.ai - AI-Powered Flashcard Generator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LearnWhat.ai - Transform Your Notes into Flashcards in Seconds',
    description:
      'Study smarter with AI-powered flashcards. Upload notes, get instant flashcards.',
    images: ['/og_1200x630.jpg'],
    creator: '@learnwhatai',
  },
  icons: {
    icon: [
      { url: '/favicon_32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon_64.png', sizes: '64x64', type: 'image/png' },
    ],
    apple: [{ url: '/favicon_180.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/manifest.webmanifest',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased font-sans">
        {children}
        {/* Analytics placeholder */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Analytics tracking code placeholder
              console.log('Analytics ready for integration');
              // Add your analytics code here (Google Analytics, Plausible, etc.)
            `,
          }}
        />
      </body>
    </html>
  )
}
