'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Logo from '@/components/Logo'
import Container from '@/components/Container'
import toast, { Toaster } from 'react-hot-toast'

interface Achievement {
  id: string
  key: string
  category: 'creation' | 'study' | 'engagement' | 'mastery'
  tier: 'bronze' | 'silver' | 'gold' | 'platinum'
  required_value: number
  icon: string
  icon_url: string | null
  sort_order: number
  is_active: boolean
}

const tierColors = {
  bronze: 'bg-amber-600',
  silver: 'bg-gray-400',
  gold: 'bg-yellow-400',
  platinum: 'bg-purple-400',
}

const tierBgColors = {
  bronze: 'bg-amber-50',
  silver: 'bg-gray-50',
  gold: 'bg-yellow-50',
  platinum: 'bg-purple-50',
}

const categoryIcons = {
  creation: '🎨',
  study: '📚',
  engagement: '🎯',
  mastery: '🏆',
}

export default function AchievementsAdmin() {
  const router = useRouter()
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [loading, setLoading] = useState(true)
  const [uploadingId, setUploadingId] = useState<string | null>(null)
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({})

  useEffect(() => {
    fetchAchievements()
  }, [])

  const fetchAchievements = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/achievements')
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch achievements')
      }

      setAchievements(data.achievements || [])
    } catch (error: any) {
      toast.error(error.message || 'Failed to load achievements')
    } finally {
      setLoading(false)
    }
  }

  const handleFileSelect = async (achievement: Achievement, file: File) => {
    if (!file) return

    // Validate file type
    const validTypes = [
      'image/png',
      'image/jpeg',
      'image/webp',
      'image/svg+xml',
    ]
    if (!validTypes.includes(file.type)) {
      toast.error('Invalid file type. Please upload PNG, JPG, WebP, or SVG.')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File too large. Maximum size is 5MB.')
      return
    }

    try {
      setUploadingId(achievement.id)

      const formData = new FormData()
      formData.append('file', file)
      formData.append('achievementId', achievement.id)
      formData.append('achievementKey', achievement.key)
      formData.append('tier', achievement.tier)

      const response = await fetch('/api/admin/achievements', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed')
      }

      // Refresh achievements list to get updated data from database
      await fetchAchievements()

      toast.success(`Icon uploaded for "${achievement.key}"`)
    } catch (error: any) {
      toast.error(error.message || 'Failed to upload icon')
    } finally {
      setUploadingId(null)
    }
  }

  const handleRemoveIcon = async (achievement: Achievement) => {
    if (!achievement.icon_url) return

    if (!confirm('Are you sure you want to remove this custom icon?')) return

    try {
      setUploadingId(achievement.id)

      const response = await fetch(
        `/api/admin/achievements?achievementId=${achievement.id}&iconUrl=${encodeURIComponent(achievement.icon_url)}`,
        { method: 'DELETE' }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Delete failed')
      }

      // Refresh achievements list to get updated data from database
      await fetchAchievements()

      toast.success(`Icon removed for "${achievement.key}"`)
    } catch (error: any) {
      toast.error(error.message || 'Failed to remove icon')
    } finally {
      setUploadingId(null)
    }
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
              <span className="text-brand-navy font-semibold">
                Achievement Icons
              </span>
            </div>
            <a
              href="/admin"
              className="text-brand-light hover:text-brand-navy transition-colors text-sm font-medium"
            >
              ← Back to Dashboard
            </a>
          </div>
        </Container>
      </header>

      {/* Main Content */}
      <main className="py-12">
        <Container>
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-brand-navy mb-2">
              Achievement Icons
            </h1>
            <p className="text-brand-gray">
              Upload custom icons for achievements. Icons are stored in the
              achievement-icons bucket.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-sm text-brand-gray">Total Achievements</p>
              <p className="text-2xl font-semibold text-brand-navy">
                {achievements.length}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-sm text-brand-gray">With Custom Icons</p>
              <p className="text-2xl font-semibold text-brand-navy">
                {achievements.filter((a) => a.icon_url).length}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-sm text-brand-gray">Using SF Symbols</p>
              <p className="text-2xl font-semibold text-brand-navy">
                {achievements.filter((a) => !a.icon_url).length}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-sm text-brand-gray">Active</p>
              <p className="text-2xl font-semibold text-brand-navy">
                {achievements.filter((a) => a.is_active).length}
              </p>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-navy"></div>
              <span className="ml-3 text-brand-gray">
                Loading achievements...
              </span>
            </div>
          )}

          {/* Achievement List */}
          {!loading && (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Achievement
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category / Tier
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        SF Symbol
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Custom Icon
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {achievements.map((achievement) => (
                      <tr
                        key={achievement.id}
                        className={tierBgColors[achievement.tier]}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {achievement.key}
                            </div>
                            <div className="text-xs text-gray-500">
                              Required: {achievement.required_value}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <span>
                              {categoryIcons[achievement.category]}
                            </span>
                            <span className="text-sm text-gray-900 capitalize">
                              {achievement.category}
                            </span>
                          </div>
                          <div className="mt-1">
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium text-white ${tierColors[achievement.tier]}`}
                            >
                              {achievement.tier}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                            {achievement.icon}
                          </code>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {achievement.icon_url ? (
                            <div className="flex items-center space-x-2">
                              <img
                                src={achievement.icon_url}
                                alt={achievement.key}
                                className="h-12 w-12 object-contain rounded border"
                              />
                              <span className="text-xs text-green-600 font-medium">
                                Uploaded
                              </span>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-400">
                              No custom icon
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <input
                              type="file"
                              ref={(el) => {
                                fileInputRefs.current[achievement.id] = el
                              }}
                              className="hidden"
                              accept="image/png,image/jpeg,image/webp,image/svg+xml"
                              onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) {
                                  handleFileSelect(achievement, file)
                                }
                                e.target.value = ''
                              }}
                            />
                            <button
                              onClick={() =>
                                fileInputRefs.current[achievement.id]?.click()
                              }
                              disabled={uploadingId === achievement.id}
                              className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                                uploadingId === achievement.id
                                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                  : 'bg-brand-navy text-white hover:brightness-90'
                              }`}
                            >
                              {uploadingId === achievement.id
                                ? 'Uploading...'
                                : achievement.icon_url
                                  ? 'Replace'
                                  : 'Upload'}
                            </button>
                            {achievement.icon_url && (
                              <button
                                onClick={() => handleRemoveIcon(achievement)}
                                disabled={uploadingId === achievement.id}
                                className="px-3 py-1.5 text-sm font-medium rounded-md bg-red-600 text-white hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                              >
                                Remove
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {!loading && achievements.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg border">
              <p className="text-gray-500">
                No achievements found in the database.
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Make sure your Supabase connection is configured correctly.
              </p>
            </div>
          )}
        </Container>
      </main>
    </div>
  )
}
