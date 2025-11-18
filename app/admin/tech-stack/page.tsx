'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Container from '@/components/Container'
import Logo from '@/components/Logo'
import ImageUpload from '@/components/admin/ImageUpload'
import toast, { Toaster } from 'react-hot-toast'

interface TechItem {
  id?: string
  title: string
  description: string
  image?: string | null
  sort_order: number
  is_active: boolean
}

export default function AdminTechStackPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState<TechItem[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<TechItem>({
    title: '',
    description: '',
    image: null,
    sort_order: 0,
    is_active: true,
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetch('/api/admin/tech-stack')
      const data = await response.json()
      setItems(data || [])
    } catch (error) {
      toast.error('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/admin/tech-stack', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          id: editingId === 'new' ? undefined : editingId,
        }),
      })

      if (response.ok) {
        toast.success('Saved!')
        setEditingId(null)
        fetchData()
      } else {
        toast.error('Failed to save')
      }
    } catch (error) {
      toast.error('Failed to save')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this tech item?')) return

    try {
      const response = await fetch('/api/admin/tech-stack', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })

      if (response.ok) {
        toast.success('Deleted!')
        fetchData()
      }
    } catch (error) {
      toast.error('Failed to delete')
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
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-brand-navy mb-2">Manage Tech Stack</h1>
                <p className="text-brand-gray">Edit technology descriptions</p>
              </div>
              <button
                onClick={() => {
                  setEditingId('new')
                  setFormData({
                    title: '',
                    description: '',
                    image: null,
                    sort_order: items.length,
                    is_active: true,
                  })
                }}
                className="bg-brand-orange text-white rounded-lg px-6 py-3 font-semibold hover:brightness-95"
              >
                + Add Tech
              </button>
            </div>

            {editingId && (
              <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-8 mb-8">
                <h2 className="text-2xl font-bold text-brand-navy mb-6">
                  {editingId === 'new' ? 'New Tech' : 'Edit Tech'}
                </h2>

                <div className="space-y-6">
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
                      placeholder="AI-Powered Recognition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-brand-navy mb-2">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none"
                      placeholder="Powered by Claude 3.5..."
                    />
                  </div>

                  <ImageUpload
                    label="Image (optional)"
                    value={formData.image || null}
                    onChange={(path) => setFormData((prev) => ({ ...prev, image: path }))}
                    helpText="Upload an image for this tech item (recommended: 800x600px, max 5MB)"
                  />

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
                    className="flex-1 bg-brand-orange text-white rounded-lg px-6 py-3 font-semibold hover:brightness-95"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingId(null)}
                    className="px-6 py-3 border-2 border-brand-light text-brand-navy rounded-lg font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-brand-navy flex-1">{item.title}</h3>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => {
                          setEditingId(item.id || null)
                          setFormData(item)
                        }}
                        className="text-brand-orange hover:text-brand-navy font-medium text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id!)}
                        className="text-red-500 hover:text-red-700 font-medium text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <p className="text-brand-gray text-sm">{item.description}</p>
                </div>
              ))}
            </div>

            {items.length === 0 && !editingId && (
              <div className="text-center py-12 text-brand-gray">
                No tech items yet. Click &quot;Add Tech&quot; to get started.
              </div>
            )}
          </div>
        </Container>
      </main>
    </div>
  )
}
