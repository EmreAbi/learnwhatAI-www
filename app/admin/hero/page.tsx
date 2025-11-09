'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Container from '@/components/Container'
import Logo from '@/components/Logo'
import toast, { Toaster } from 'react-hot-toast'

interface HeroData {
  id?: string
  title: string
  subtitle: string
  cta_primary_text: string
  cta_primary_link: string
  cta_secondary_text: string
  cta_secondary_link: string
  hero_image: string
  is_active: boolean
}

export default function AdminHeroPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState<HeroData>({
    title: '',
    subtitle: '',
    cta_primary_text: '',
    cta_primary_link: '',
    cta_secondary_text: '',
    cta_secondary_link: '',
    hero_image: '',
    is_active: true,
  })

  useEffect(() => {
    fetchHeroData()
  }, [])

  const fetchHeroData = async () => {
    try {
      const response = await fetch('/api/admin/hero')
      const data = await response.json()

      if (data) {
        setFormData(data)
      }
    } catch (error) {
      console.error('Error fetching hero data:', error)
      toast.error('Failed to load hero data')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const response = await fetch('/api/admin/hero', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast.success('Hero section updated successfully!')
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to update hero section')
      }
    } catch (error) {
      console.error('Error updating hero:', error)
      toast.error('Failed to update hero section')
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-paper flex items-center justify-center">
        <div className="text-brand-navy text-lg">Loading...</div>
      </div>
    )
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
              <button
                onClick={() => router.push('/admin')}
                className="text-brand-light hover:text-brand-navy transition-colors"
              >
                ← Back to Dashboard
              </button>
            </div>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-light hover:text-brand-navy transition-colors text-sm font-medium"
            >
              View Website →
            </a>
          </div>
        </Container>
      </header>

      {/* Main Content */}
      <main className="py-12">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-brand-navy mb-2">
                Edit Hero Section
              </h1>
              <p className="text-brand-gray">
                Update the main hero section of your landing page
              </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-8">
              <div className="space-y-6">
                {/* Title */}
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-semibold text-brand-navy mb-2"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition-all"
                    placeholder="Transform Your Notes into Flashcards in Seconds"
                  />
                </div>

                {/* Subtitle */}
                <div>
                  <label
                    htmlFor="subtitle"
                    className="block text-sm font-semibold text-brand-navy mb-2"
                  >
                    Subtitle
                  </label>
                  <textarea
                    id="subtitle"
                    name="subtitle"
                    value={formData.subtitle}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition-all"
                    placeholder="Study smarter, not harder..."
                  />
                </div>

                {/* Primary CTA */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="cta_primary_text"
                      className="block text-sm font-semibold text-brand-navy mb-2"
                    >
                      Primary Button Text
                    </label>
                    <input
                      type="text"
                      id="cta_primary_text"
                      name="cta_primary_text"
                      value={formData.cta_primary_text}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition-all"
                      placeholder="Create Free Account"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="cta_primary_link"
                      className="block text-sm font-semibold text-brand-navy mb-2"
                    >
                      Primary Button Link
                    </label>
                    <input
                      type="text"
                      id="cta_primary_link"
                      name="cta_primary_link"
                      value={formData.cta_primary_link}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition-all"
                      placeholder="#get-started"
                    />
                  </div>
                </div>

                {/* Secondary CTA */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="cta_secondary_text"
                      className="block text-sm font-semibold text-brand-navy mb-2"
                    >
                      Secondary Button Text
                    </label>
                    <input
                      type="text"
                      id="cta_secondary_text"
                      name="cta_secondary_text"
                      value={formData.cta_secondary_text}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition-all"
                      placeholder="See How It Works"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="cta_secondary_link"
                      className="block text-sm font-semibold text-brand-navy mb-2"
                    >
                      Secondary Button Link
                    </label>
                    <input
                      type="text"
                      id="cta_secondary_link"
                      name="cta_secondary_link"
                      value={formData.cta_secondary_link}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition-all"
                      placeholder="#how-it-works"
                    />
                  </div>
                </div>

                {/* Hero Image */}
                <div>
                  <label
                    htmlFor="hero_image"
                    className="block text-sm font-semibold text-brand-navy mb-2"
                  >
                    Hero Image Path
                  </label>
                  <input
                    type="text"
                    id="hero_image"
                    name="hero_image"
                    value={formData.hero_image}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition-all"
                    placeholder="/hero_16x9_transparent.png or filename.png from storage"
                  />
                  <p className="text-sm text-brand-gray mt-2">
                    Enter a full path (e.g., /hero.png) or just a filename if uploaded to
                    Supabase storage
                  </p>
                </div>

                {/* Active Toggle */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="is_active"
                    name="is_active"
                    checked={formData.is_active}
                    onChange={handleChange}
                    className="w-5 h-5 text-brand-orange border-gray-300 rounded focus:ring-brand-orange"
                  />
                  <label htmlFor="is_active" className="ml-3 text-sm font-medium text-brand-navy">
                    Active (show on website)
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex gap-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-brand-orange text-white rounded-lg px-6 py-3 font-semibold hover:brightness-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  onClick={() => router.push('/admin')}
                  className="px-6 py-3 border-2 border-brand-light text-brand-navy rounded-lg font-semibold hover:bg-brand-paper transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </Container>
      </main>
    </div>
  )
}
