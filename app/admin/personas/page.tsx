'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Container from '@/components/Container'
import Logo from '@/components/Logo'
import ImageUpload from '@/components/admin/ImageUpload'
import toast, { Toaster } from 'react-hot-toast'

interface Persona {
  id?: string
  text: string
  image?: string | null
  sort_order: number
  is_active: boolean
}

export default function AdminPersonasPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [personas, setPersonas] = useState<Persona[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Persona>({
    text: '',
    image: null,
    sort_order: 0,
    is_active: true,
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetch('/api/admin/personas')
      const data = await response.json()
      setPersonas(data || [])
    } catch (error) {
      toast.error('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (persona: Persona) => {
    setEditingId(persona.id || null)
    setFormData(persona)
  }

  const handleNew = () => {
    setEditingId('new')
    setFormData({
      text: '',
      image: null,
      sort_order: personas.length,
      is_active: true,
    })
  }

  const handleCancel = () => setEditingId(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/admin/personas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          id: editingId === 'new' ? undefined : editingId,
        }),
      })

      if (response.ok) {
        toast.success('Persona saved!')
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
    if (!confirm('Delete this persona?')) return

    try {
      const response = await fetch('/api/admin/personas', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })

      if (response.ok) {
        toast.success('Deleted!')
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
                <h1 className="text-3xl font-bold text-brand-navy mb-2">Manage Personas</h1>
                <p className="text-brand-gray">Edit user persona descriptions</p>
              </div>
              <button
                onClick={handleNew}
                className="bg-brand-orange text-white rounded-lg px-6 py-3 font-semibold hover:brightness-95"
              >
                + Add Persona
              </button>
            </div>

            {editingId && (
              <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-8 mb-8">
                <h2 className="text-2xl font-bold text-brand-navy mb-6">
                  {editingId === 'new' ? 'New Persona' : 'Edit Persona'}
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-brand-navy mb-2">
                      Persona Text
                    </label>
                    <textarea
                      value={formData.text}
                      onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                      required
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none"
                      placeholder="High school students preparing for exams..."
                    />
                  </div>

                  <ImageUpload
                    label="Image (optional)"
                    value={formData.image || null}
                    onChange={(path) => setFormData((prev) => ({ ...prev, image: path }))}
                    helpText="Upload an image for this persona (recommended: 400x400px, max 5MB)"
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
                    onClick={handleCancel}
                    className="px-6 py-3 border-2 border-brand-light text-brand-navy rounded-lg font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-4">
              {personas.map((persona) => (
                <div
                  key={persona.id}
                  className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <p className="text-brand-navy flex-1">{persona.text}</p>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleEdit(persona)}
                        className="text-brand-orange hover:text-brand-navy font-medium text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(persona.id!)}
                        className="text-red-500 hover:text-red-700 font-medium text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="text-xs text-brand-gray mt-2">Order: {persona.sort_order}</div>
                </div>
              ))}
            </div>

            {personas.length === 0 && !editingId && (
              <div className="text-center py-12 text-brand-gray">
                No personas yet. Click &quot;Add Persona&quot; to get started.
              </div>
            )}
          </div>
        </Container>
      </main>
    </div>
  )
}
