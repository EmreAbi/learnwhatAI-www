'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Container from '@/components/Container'
import Logo from '@/components/Logo'
import toast, { Toaster } from 'react-hot-toast'

interface FAQItem {
  id?: string
  question: string
  answer: string
  sort_order: number
  is_active: boolean
}

export default function AdminFAQPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [faqs, setFaqs] = useState<FAQItem[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<FAQItem>({
    question: '',
    answer: '',
    sort_order: 0,
    is_active: true,
  })

  useEffect(() => {
    fetchFAQs()
  }, [])

  const fetchFAQs = async () => {
    try {
      const response = await fetch('/api/admin/faq')
      const data = await response.json()
      setFaqs(data || [])
    } catch (error) {
      toast.error('Failed to load FAQs')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (faq: FAQItem) => {
    setEditingId(faq.id || null)
    setFormData(faq)
  }

  const handleNew = () => {
    setEditingId('new')
    setFormData({
      question: '',
      answer: '',
      sort_order: faqs.length,
      is_active: true,
    })
  }

  const handleCancel = () => {
    setEditingId(null)
    setFormData({ question: '', answer: '', sort_order: 0, is_active: true })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/admin/faq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          id: editingId === 'new' ? undefined : editingId,
        }),
      })

      if (response.ok) {
        toast.success('FAQ saved successfully!')
        handleCancel()
        fetchFAQs()
      } else {
        toast.error('Failed to save FAQ')
      }
    } catch (error) {
      toast.error('Failed to save FAQ')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return

    try {
      const response = await fetch('/api/admin/faq', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })

      if (response.ok) {
        toast.success('FAQ deleted successfully!')
        fetchFAQs()
      } else {
        toast.error('Failed to delete FAQ')
      }
    } catch (error) {
      toast.error('Failed to delete FAQ')
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
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-brand-navy mb-2">
                  Manage FAQ
                </h1>
                <p className="text-brand-gray">Add, edit, or remove frequently asked questions</p>
              </div>
              <button
                onClick={handleNew}
                className="bg-brand-orange text-white rounded-lg px-6 py-3 font-semibold hover:brightness-95 transition-all"
              >
                + Add New FAQ
              </button>
            </div>

            {editingId && (
              <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-8 mb-8">
                <h2 className="text-2xl font-bold text-brand-navy mb-6">
                  {editingId === 'new' ? 'New FAQ' : 'Edit FAQ'}
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-brand-navy mb-2">
                      Question
                    </label>
                    <input
                      type="text"
                      value={formData.question}
                      onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none"
                      placeholder="What is LearnWhat.ai?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-brand-navy mb-2">
                      Answer
                    </label>
                    <textarea
                      value={formData.answer}
                      onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none"
                      placeholder="LearnWhat.ai is an AI-powered study companion..."
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
                    Save FAQ
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

            <div className="space-y-4">
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-brand-navy flex-1">{faq.question}</h3>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleEdit(faq)}
                        className="text-brand-orange hover:text-brand-navy font-medium text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(faq.id!)}
                        className="text-red-500 hover:text-red-700 font-medium text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <p className="text-brand-gray text-sm mb-3">{faq.answer}</p>
                  <div className="flex items-center gap-3 text-xs text-brand-gray">
                    <span>Order: {faq.sort_order}</span>
                    {!faq.is_active && (
                      <span className="bg-red-100 text-red-600 px-2 py-1 rounded">Inactive</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {faqs.length === 0 && !editingId && (
              <div className="text-center py-12 text-brand-gray">
                No FAQs yet. Click &quot;Add New FAQ&quot; to get started.
              </div>
            )}
          </div>
        </Container>
      </main>
    </div>
  )
}
