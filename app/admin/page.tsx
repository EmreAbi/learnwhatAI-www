'use client'

import { useRouter } from 'next/navigation'
import Logo from '@/components/Logo'
import Container from '@/components/Container'
import toast, { Toaster } from 'react-hot-toast'

const sections = [
  { id: 'achievements', title: 'Achievement Icons', icon: '🏆', path: '/admin/achievements' },
  { id: 'hero', title: 'Hero Section', icon: '🎯', path: '/admin/hero' },
  { id: 'problem', title: 'Problem Section', icon: '❗', path: '/admin/problem' },
  { id: 'meet', title: 'Meet Section', icon: '👋', path: '/admin/meet' },
  { id: 'features', title: 'Features', icon: '⭐', path: '/admin/features' },
  { id: 'how-it-works', title: 'How It Works', icon: '⚡', path: '/admin/how-it-works' },
  { id: 'science', title: 'Science Points', icon: '🧪', path: '/admin/science' },
  { id: 'personas', title: 'Personas', icon: '👥', path: '/admin/personas' },
  { id: 'cta', title: 'CTA Section', icon: '🚀', path: '/admin/cta' },
  { id: 'tech-stack', title: 'Tech Stack', icon: '💻', path: '/admin/tech-stack' },
  { id: 'faq', title: 'FAQ', icon: '❓', path: '/admin/faq' },
  { id: 'footer', title: 'Footer', icon: '📍', path: '/admin/footer' },
  { id: 'settings', title: 'Site Settings', icon: '⚙️', path: '/admin/settings' },
]

export default function AdminDashboard() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' })
      toast.success('Logged out successfully')
      router.push('/admin/login')
      router.refresh()
    } catch (error) {
      toast.error('Logout failed')
    }
  }

  return (
    <div className="min-h-screen bg-brand-paper">
      <Toaster position="top-center" />

      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <Container>
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-4">
              <Logo width={140} height={46} />
              <span className="text-brand-gray">|</span>
              <span className="text-brand-navy font-semibold">
                Admin Panel
              </span>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-light hover:text-brand-navy transition-colors text-sm font-medium"
              >
                View Website →
              </a>
              <button
                onClick={handleLogout}
                className="bg-brand-navy text-white px-4 py-2 rounded-lg hover:brightness-90 transition-all text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Main Content */}
      <main className="py-12">
        <Container>
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-brand-navy mb-2">
              Content Management
            </h1>
            <p className="text-brand-gray">
              Manage all sections of your landing page
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((section) => (
              <a
                key={section.id}
                href={section.path}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all transform hover:scale-105 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{section.icon}</div>
                  <svg
                    className="w-6 h-6 text-brand-light group-hover:text-brand-orange transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-brand-navy mb-2">
                  {section.title}
                </h3>
                <p className="text-brand-gray text-sm">
                  Click to edit this section
                </p>
              </a>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mt-12 bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-brand-navy mb-4">
              Quick Actions
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <a
                href="/admin/images"
                className="border-2 border-brand-light rounded-lg p-4 hover:bg-brand-paper transition-colors"
              >
                <div className="text-2xl mb-2">🖼️</div>
                <div className="font-semibold text-brand-navy">
                  Image Manager
                </div>
                <div className="text-sm text-brand-gray">
                  Upload and manage images
                </div>
              </a>
              <a
                href="/"
                target="_blank"
                className="border-2 border-brand-light rounded-lg p-4 hover:bg-brand-paper transition-colors"
              >
                <div className="text-2xl mb-2">👁️</div>
                <div className="font-semibold text-brand-navy">
                  Preview Site
                </div>
                <div className="text-sm text-brand-gray">
                  View live website
                </div>
              </a>
              <button
                onClick={() => window.location.reload()}
                className="border-2 border-brand-light rounded-lg p-4 hover:bg-brand-paper transition-colors text-left"
              >
                <div className="text-2xl mb-2">🔄</div>
                <div className="font-semibold text-brand-navy">
                  Refresh Data
                </div>
                <div className="text-sm text-brand-gray">
                  Reload all content
                </div>
              </button>
            </div>
          </div>
        </Container>
      </main>
    </div>
  )
}
