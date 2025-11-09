'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Container from '@/components/Container'
import Logo from '@/components/Logo'
import toast, { Toaster } from 'react-hot-toast'

interface Feature {
  id?: string
  icon: string
  title: string
  description: string
  items: string[]
  image: string
  sort_order: number
  is_active: boolean
}

export default function AdminFeaturesPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [features, setFeatures] = useState<Feature[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Feature>({
    icon: '',
    title: '',
    description: '',
    items: [''],
    image: '',
    sort_order: 0,
    is_active: true,
  })

  useEffect(() => {
    fetchFeatures()
  }, [])

  const fetchFeatures = async () => {
    try {
      const response = await fetch('/api/admin/features')
      const data = await response.json()
      setFeatures(data || [])
    } catch (error) {
      console.error('Error fetching features:', error)
      toast.error('Failed to load features')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (feature: Feature) => {
    setEditingId(feature.id || null)
    setFormData(feature)
  }

  const handleNew = () => {
    setEditingId('new')
    setFormData({
      icon: '',
      title: '',
      description: '',
      items: [''],
      image: '',
      sort_order: features.length,
      is_active: true,
    })
  }

  const handleCancel = () => {
    setEditingId(null)
    setFormData({
      icon: '',
      title: '',
      description: '',
      items: [''],
      image: '',
      sort_order: 0,
      is_active: true,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/admin/features', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          id: editingId === 'new' ? undefined : editingId,
        }),
      })

      if (response.ok) {
        toast.success('Feature saved successfully!')
        handleCancel()
        fetchFeatures()
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to save feature')
      }
    } catch (error) {
      toast.error('Failed to save feature')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this feature?')) return

    try {
      const response = await fetch('/api/admin/features', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })

      if (response.ok) {
        toast.success('Feature deleted successfully!')
        fetchFeatures()
      } else {
        toast.error('Failed to delete feature')
      }
    } catch (error) {
      toast.error('Failed to delete feature')
    }
  }

  const handleItemChange = (index: number, value: string) => {
    const newItems = [...formData.items]
    newItems[index] = value
    setFormData({ ...formData, items: newItems })
  }

  const addItem = () => {
    setFormData({ ...formData, items: [...formData.items, ''] })
  }

  const removeItem = (index: number) => {
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index),
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
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-brand-navy mb-2">
                  Manage Features
                </h1>
                <p className="text-brand-gray">Add, edit, or remove feature cards</p>
              </div>
              <button
                onClick={handleNew}
                className="bg-brand-orange text-white rounded-lg px-6 py-3 font-semibold hover:brightness-95 transition-all"
              >
                + Add New Feature
              </button>
            </div>

            {/* Edit Form */}
            {editingId && (
              <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-8 mb-8">
                <h2 className="text-2xl font-bold text-brand-navy mb-6">
                  {editingId === 'new' ? 'New Feature' : 'Edit Feature'}
                </h2>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-brand-navy mb-2">
                        Icon (emoji)
                      </label>
                      <input
                        type="text"
                        value={formData.icon}
                        onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none"
                        placeholder="📱"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-brand-navy mb-2">
                        Sort Order
                      </label>
                      <input
                        type="number"
                        value={formData.sort_order}
                        onChange={(e) =>
                          setFormData({ ...formData, sort_order: parseInt(e.target.value) })
                        }
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-brand-navy mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none"
                      placeholder="Feature title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-brand-navy mb-2">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none"
                      placeholder="Feature description (optional)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-brand-navy mb-2">
                      Items (bullet points)
                    </label>
                    {formData.items.map((item, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => handleItemChange(index, e.target.value)}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none"
                          placeholder={`Item ${index + 1}`}
                        />
                        {formData.items.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeItem(index)}
                            className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addItem}
                      className="mt-2 text-brand-orange hover:text-brand-navy font-medium"
                    >
                      + Add Item
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-brand-navy mb-2">
                      Image Path (optional)
                    </label>
                    <input
                      type="text"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none"
                      placeholder="image.png"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.is_active}
                      onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
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
                    className="flex-1 bg-brand-orange text-white rounded-lg px-6 py-3 font-semibold hover:brightness-95"
                  >
                    Save Feature
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-6 py-3 border-2 border-brand-light text-brand-navy rounded-lg font-semibold hover:bg-brand-paper"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* Features List */}
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature) => (
                <div
                  key={feature.id}
                  className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">{feature.icon}</div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(feature)}
                        className="text-brand-orange hover:text-brand-navy font-medium text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(feature.id!)}
                        className="text-red-500 hover:text-red-700 font-medium text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-brand-navy mb-2">{feature.title}</h3>
                  {feature.description && (
                    <p className="text-brand-gray text-sm mb-3">{feature.description}</p>
                  )}
                  <ul className="space-y-1">
                    {feature.items.map((item, idx) => (
                      <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-brand-orange">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex items-center gap-3 text-xs text-brand-gray">
                    <span>Order: {feature.sort_order}</span>
                    {!feature.is_active && (
                      <span className="bg-red-100 text-red-600 px-2 py-1 rounded">Inactive</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {features.length === 0 && !editingId && (
              <div className="text-center py-12 text-brand-gray">
                No features yet. Click &quot;Add New Feature&quot; to get started.
              </div>
            )}
          </div>
        </Container>
      </main>
    </div>
  )
}
