'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Container from '@/components/Container'
import Logo from '@/components/Logo'
import toast, { Toaster } from 'react-hot-toast'

interface SettingsData {
  id?: string
  site_title: string
  site_description: string
  site_url: string
  is_active: boolean
}

export default function AdminSettingsPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState<SettingsData>({
    site_title: '',
    site_description: '',
    site_url: '',
    is_active: true,
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetch('/api/admin/settings')
      const data = await response.json()
      if (data) setFormData(data)
    } catch (error) {
      toast.error('Failed to load settings')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const response = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast.success('Settings updated!')
      } else {
        toast.error('Failed to update settings')
      }
    } catch (error) {
      toast.error('Failed to update settings')
    } finally {
      setSaving(false)
    }
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
              <h1 className="text-3xl font-bold text-brand-navy mb-2">Site Settings</h1>
              <p className="text-brand-gray">Update global site settings and SEO</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-brand-navy mb-2">
                    Site Title
                  </label>
                  <input
                    type="text"
                    value={formData.site_title}
                    onChange={(e) => setFormData({ ...formData, site_title: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none"
                    placeholder="LearnWhat.ai - AI-Powered Flashcards"
                  />
                  <p className="text-sm text-brand-gray mt-1">
                    This appears in browser tabs and search results
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-brand-navy mb-2">
                    Site Description
                  </label>
                  <textarea
                    value={formData.site_description}
                    onChange={(e) =>
                      setFormData({ ...formData, site_description: e.target.value })
                    }
                    required
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none"
                    placeholder="Transform your notes into flashcards instantly with AI..."
                  />
                  <p className="text-sm text-brand-gray mt-1">
                    Used for SEO meta description (150-160 characters recommended)
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-brand-navy mb-2">
                    Site URL
                  </label>
                  <input
                    type="url"
                    value={formData.site_url}
                    onChange={(e) => setFormData({ ...formData, site_url: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none"
                    placeholder="https://learnwhat.ai"
                  />
                  <p className="text-sm text-brand-gray mt-1">
                    Your website&apos;s primary URL (without trailing slash)
                  </p>
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
                  {saving ? 'Saving...' : 'Save Settings'}
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
