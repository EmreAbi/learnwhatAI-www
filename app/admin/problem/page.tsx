'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Container from '@/components/Container'
import Logo from '@/components/Logo'
import ImageUpload from '@/components/admin/ImageUpload'
import toast, { Toaster } from 'react-hot-toast'

interface ProblemData {
  id?: string
  title: string
  description: string
  highlight_text: string
  image?: string | null
  is_active: boolean
}

export default function AdminProblemPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState<ProblemData>({
    title: '',
    description: '',
    highlight_text: '',
    image: null,
    is_active: true,
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetch('/api/admin/problem')
      const data = await response.json()
      if (data) setFormData(data)
    } catch (error) {
      console.error('Error fetching data:', error)
      toast.error('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const response = await fetch('/api/admin/problem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast.success('Problem section updated successfully!')
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to update')
      }
    } catch (error) {
      toast.error('Failed to update')
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

      <main className="py-12">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-brand-navy mb-2">
                Edit Problem Section
              </h1>
              <p className="text-brand-gray">
                Update the problem statement section
              </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-brand-navy mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none"
                    placeholder="The Problem"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-brand-navy mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none"
                    placeholder="Describe the problem..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-brand-navy mb-2">
                    Highlight Text
                  </label>
                  <input
                    type="text"
                    name="highlight_text"
                    value={formData.highlight_text}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none"
                    placeholder="What if there was a better way?"
                  />
                </div>

                <ImageUpload
                  label="Image (optional)"
                  value={formData.image || null}
                  onChange={(path) => setFormData((prev) => ({ ...prev, image: path }))}
                  helpText="Upload an image for the problem section (recommended: 1200x800px, max 5MB)"
                />

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={formData.is_active}
                    onChange={handleChange}
                    className="w-5 h-5 text-brand-orange border-gray-300 rounded focus:ring-brand-orange"
                  />
                  <label className="ml-3 text-sm font-medium text-brand-navy">
                    Active (show on website)
                  </label>
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-brand-orange text-white rounded-lg px-6 py-3 font-semibold hover:brightness-95 transition-all disabled:opacity-50"
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
