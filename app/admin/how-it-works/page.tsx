'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Container from '@/components/Container'
import Logo from '@/components/Logo'
import toast, { Toaster } from 'react-hot-toast'

interface Step {
  id?: string
  step_number: string
  icon: string
  title: string
  description: string
  sort_order: number
  is_active: boolean
}

export default function AdminHowItWorksPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [steps, setSteps] = useState<Step[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Step>({
    step_number: '1',
    icon: '',
    title: '',
    description: '',
    sort_order: 0,
    is_active: true,
  })

  useEffect(() => {
    fetchSteps()
  }, [])

  const fetchSteps = async () => {
    try {
      const response = await fetch('/api/admin/how-it-works')
      const data = await response.json()
      setSteps(data || [])
    } catch (error) {
      toast.error('Failed to load steps')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (step: Step) => {
    setEditingId(step.id || null)
    setFormData(step)
  }

  const handleNew = () => {
    setEditingId('new')
    setFormData({
      step_number: String(steps.length + 1),
      icon: '',
      title: '',
      description: '',
      sort_order: steps.length,
      is_active: true,
    })
  }

  const handleCancel = () => {
    setEditingId(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/admin/how-it-works', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          id: editingId === 'new' ? undefined : editingId,
        }),
      })

      if (response.ok) {
        toast.success('Step saved successfully!')
        handleCancel()
        fetchSteps()
      } else {
        toast.error('Failed to save step')
      }
    } catch (error) {
      toast.error('Failed to save step')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this step?')) return

    try {
      const response = await fetch('/api/admin/how-it-works', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })

      if (response.ok) {
        toast.success('Step deleted successfully!')
        fetchSteps()
      } else {
        toast.error('Failed to delete step')
      }
    } catch (error) {
      toast.error('Failed to delete step')
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
                ← Back to Dashboard
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
                <h1 className="text-3xl md:text-4xl font-bold text-brand-navy mb-2">
                  Manage How It Works Steps
                </h1>
                <p className="text-brand-gray">Add, edit, or remove steps</p>
              </div>
              <button
                onClick={handleNew}
                className="bg-brand-orange text-white rounded-lg px-6 py-3 font-semibold hover:brightness-95"
              >
                + Add Step
              </button>
            </div>

            {editingId && (
              <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-8 mb-8">
                <h2 className="text-2xl font-bold text-brand-navy mb-6">
                  {editingId === 'new' ? 'New Step' : 'Edit Step'}
                </h2>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-brand-navy mb-2">
                        Step Number
                      </label>
                      <input
                        type="text"
                        value={formData.step_number}
                        onChange={(e) => setFormData({ ...formData, step_number: e.target.value })}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none"
                        placeholder="1"
                      />
                    </div>
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
                      placeholder="Upload Your Notes"
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
                      placeholder="Snap a photo or paste your notes..."
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
                    Save Step
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

            <div className="grid md:grid-cols-2 gap-6">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{step.icon}</div>
                      <div className="text-2xl font-bold text-brand-orange">
                        {step.step_number}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(step)}
                        className="text-brand-orange hover:text-brand-navy font-medium text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(step.id!)}
                        className="text-red-500 hover:text-red-700 font-medium text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-brand-navy mb-2">{step.title}</h3>
                  <p className="text-brand-gray text-sm mb-3">{step.description}</p>
                  <div className="flex items-center gap-3 text-xs text-brand-gray">
                    <span>Order: {step.sort_order}</span>
                    {!step.is_active && (
                      <span className="bg-red-100 text-red-600 px-2 py-1 rounded">Inactive</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {steps.length === 0 && !editingId && (
              <div className="text-center py-12 text-brand-gray">
                No steps yet. Click &quot;Add Step&quot; to get started.
              </div>
            )}
          </div>
        </Container>
      </main>
    </div>
  )
}
