'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Container from '@/components/Container'
import Logo from '@/components/Logo'
import toast, { Toaster } from 'react-hot-toast'

interface SciencePoint {
  id?: string
  title: string
  description: string
  sort_order: number
  is_active: boolean
}

export default function AdminSciencePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [points, setPoints] = useState<SciencePoint[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<SciencePoint>({
    title: '',
    description: '',
    sort_order: 0,
    is_active: true,
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetch('/api/admin/science')
      const data = await response.json()
      setPoints(data || [])
    } catch (error) {
      toast.error('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (point: SciencePoint) => {
    setEditingId(point.id || null)
    setFormData(point)
  }

  const handleNew = () => {
    setEditingId('new')
    setFormData({
      title: '',
      description: '',
      sort_order: points.length,
      is_active: true,
    })
  }

  const handleCancel = () => setEditingId(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/admin/science', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          id: editingId === 'new' ? undefined : editingId,
        }),
      })

      if (response.ok) {
        toast.success('Science point saved!')
        handleCancel()
        fetchData()
      } else {
        toast.error('Failed to save')
      }
    } catch (error) {
      toast.error('Failed to save')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this science point?')) return

    try {
      const response = await fetch('/api/admin/science', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })

      if (response.ok) {
        toast.success('Deleted successfully!')
        fetchData()
      } else {
        toast.error('Failed to delete')
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
                <h1 className="text-3xl font-bold text-brand-navy mb-2">
                  Manage Science Points
                </h1>
                <p className="text-brand-gray">Edit the science-backed learning points</p>
              </div>
              <button
                onClick={handleNew}
                className="bg-brand-orange text-white rounded-lg px-6 py-3 font-semibold hover:brightness-95"
              >
                + Add Point
              </button>
            </div>

            {editingId && (
              <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-8 mb-8">
                <h2 className="text-2xl font-bold text-brand-navy mb-6">
                  {editingId === 'new' ? 'New Science Point' : 'Edit Science Point'}
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
                      placeholder="Active Recall"
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
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none"
                      placeholder="Studies show that..."
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
                    onClick={handleCancel}
                    className="px-6 py-3 border-2 border-brand-light text-brand-navy rounded-lg font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              {points.map((point) => (
                <div
                  key={point.id}
                  className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-brand-navy flex-1">{point.title}</h3>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleEdit(point)}
                        className="text-brand-orange hover:text-brand-navy font-medium text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(point.id!)}
                        className="text-red-500 hover:text-red-700 font-medium text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <p className="text-brand-gray text-sm mb-3">{point.description}</p>
                  <div className="text-xs text-brand-gray">Order: {point.sort_order}</div>
                </div>
              ))}
            </div>

            {points.length === 0 && !editingId && (
              <div className="text-center py-12 text-brand-gray">
                No science points yet. Click &quot;Add Point&quot; to get started.
              </div>
            )}
          </div>
        </Container>
      </main>
    </div>
  )
}
