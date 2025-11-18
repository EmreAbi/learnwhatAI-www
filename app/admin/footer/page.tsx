'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Container from '@/components/Container'
import Logo from '@/components/Logo'
import toast, { Toaster } from 'react-hot-toast'

interface QuickLink {
  label: string
  href: string
}

interface FooterData {
  id?: string
  tagline: string
  subtitle: string
  quick_links: QuickLink[]
  newsletter_title: string
  copyright: string
  is_active: boolean
}

export default function AdminFooterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState<FooterData>({
    tagline: '',
    subtitle: '',
    quick_links: [{ label: '', href: '' }],
    newsletter_title: '',
    copyright: '',
    is_active: true,
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetch('/api/admin/footer')
      const data = await response.json()
      if (data) setFormData(data)
    } catch (error) {
      toast.error('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const response = await fetch('/api/admin/footer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast.success('Footer updated!')
        // Refresh data to show updated values
        await fetchData()
      } else {
        toast.error('Failed to update')
      }
    } catch (error) {
      toast.error('Failed to update')
    } finally {
      setSaving(false)
    }
  }

  const handleLinkChange = (index: number, field: 'label' | 'href', value: string) => {
    const newLinks = [...formData.quick_links]
    newLinks[index][field] = value
    setFormData({ ...formData, quick_links: newLinks })
  }

  const addLink = () => {
    setFormData({
      ...formData,
      quick_links: [...formData.quick_links, { label: '', href: '' }],
    })
  }

  const removeLink = (index: number) => {
    setFormData({
      ...formData,
      quick_links: formData.quick_links.filter((_, i) => i !== index),
    })
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
                ← Back
              </button>
            </div>
          </div>
        </Container>
      </header>

      <main className="py-12">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-brand-navy mb-2">Edit Footer</h1>
              <p className="text-brand-gray">Update footer content</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-brand-navy mb-2">
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none"
                    placeholder="AI-powered flashcards from your notes"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-brand-navy mb-2">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none"
                    placeholder="Study smarter, not harder"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-brand-navy mb-2">
                    Quick Links
                  </label>
                  {formData.quick_links.map((link, index) => (
                    <div key={index} className="grid grid-cols-2 gap-2 mb-2">
                      <input
                        type="text"
                        value={link.label}
                        onChange={(e) => handleLinkChange(index, 'label', e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none"
                        placeholder="Label"
                      />
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={link.href}
                          onChange={(e) => handleLinkChange(index, 'href', e.target.value)}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none"
                          placeholder="URL"
                        />
                        {formData.quick_links.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeLink(index)}
                            className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addLink}
                    className="mt-2 text-brand-orange hover:text-brand-navy font-medium"
                  >
                    + Add Link
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-brand-navy mb-2">
                    Newsletter Title
                  </label>
                  <input
                    type="text"
                    value={formData.newsletter_title}
                    onChange={(e) =>
                      setFormData({ ...formData, newsletter_title: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none"
                    placeholder="Stay Updated"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-brand-navy mb-2">
                    Copyright Text
                  </label>
                  <input
                    type="text"
                    value={formData.copyright}
                    onChange={(e) => setFormData({ ...formData, copyright: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none"
                    placeholder="© 2025 LearnWhat.ai. All rights reserved."
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="w-5 h-5 text-brand-orange border-gray-300 rounded"
                  />
                  <label className="ml-3 text-sm font-medium text-brand-navy">Active</label>
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-brand-orange text-white rounded-lg px-6 py-3 font-semibold hover:brightness-95 disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  onClick={() => router.push('/admin')}
                  className="px-6 py-3 border-2 border-brand-light text-brand-navy rounded-lg font-semibold"
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
