'use client'

import { useState, useEffect, useRef } from 'react'
import { supabase, ACHIEVEMENT_ICONS_BUCKET } from '@/lib/supabase'
import { Achievement, AchievementTier, AchievementCategory } from '@/types/achievement'

const tierColors: Record<AchievementTier, string> = {
  bronze: 'bg-amber-600',
  silver: 'bg-gray-400',
  gold: 'bg-yellow-400',
  platinum: 'bg-purple-400',
}

const tierBgColors: Record<AchievementTier, string> = {
  bronze: 'bg-amber-50',
  silver: 'bg-gray-50',
  gold: 'bg-yellow-50',
  platinum: 'bg-purple-50',
}

const categoryIcons: Record<AchievementCategory, string> = {
  creation: '🎨',
  study: '📚',
  engagement: '🎯',
  mastery: '🏆',
}

export default function AchievementIconManager() {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [uploadingId, setUploadingId] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({})
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({})

  useEffect(() => {
    fetchAchievements()
  }, [])

  const fetchAchievements = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error: fetchError } = await supabase
        .from('achievements')
        .select('*')
        .order('sort_order', { ascending: true })

      if (fetchError) throw fetchError

      setAchievements(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch achievements')
    } finally {
      setLoading(false)
    }
  }

  const handleFileSelect = async (achievementId: string, file: File) => {
    if (!file) return

    // Validate file type
    const validTypes = ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml']
    if (!validTypes.includes(file.type)) {
      setError('Invalid file type. Please upload PNG, JPG, WebP, or SVG.')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File too large. Maximum size is 5MB.')
      return
    }

    const achievement = achievements.find((a) => a.id === achievementId)
    if (!achievement) return

    try {
      setUploadingId(achievementId)
      setError(null)
      setUploadProgress((prev) => ({ ...prev, [achievementId]: 0 }))

      // Create file path: tier/key.extension
      const fileExt = file.name.split('.').pop()
      const filePath = `${achievement.tier}/${achievement.key}.${fileExt}`

      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(ACHIEVEMENT_ICONS_BUCKET)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
        })

      if (uploadError) throw uploadError

      setUploadProgress((prev) => ({ ...prev, [achievementId]: 50 }))

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from(ACHIEVEMENT_ICONS_BUCKET).getPublicUrl(filePath)

      setUploadProgress((prev) => ({ ...prev, [achievementId]: 75 }))

      // Update achievement record with new icon_url
      const { error: updateError } = await supabase
        .from('achievements')
        .update({ icon_url: publicUrl, updated_at: new Date().toISOString() })
        .eq('id', achievementId)

      if (updateError) throw updateError

      setUploadProgress((prev) => ({ ...prev, [achievementId]: 100 }))

      // Update local state
      setAchievements((prev) =>
        prev.map((a) => (a.id === achievementId ? { ...a, icon_url: publicUrl } : a))
      )

      setSuccessMessage(`Icon uploaded successfully for "${achievement.key}"`)
      setTimeout(() => setSuccessMessage(null), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload icon')
    } finally {
      setUploadingId(null)
      setTimeout(() => {
        setUploadProgress((prev) => {
          const newProgress = { ...prev }
          delete newProgress[achievementId]
          return newProgress
        })
      }, 1000)
    }
  }

  const handleRemoveIcon = async (achievementId: string) => {
    const achievement = achievements.find((a) => a.id === achievementId)
    if (!achievement || !achievement.icon_url) return

    if (!confirm('Are you sure you want to remove this custom icon?')) return

    try {
      setUploadingId(achievementId)
      setError(null)

      // Extract file path from URL
      const urlParts = achievement.icon_url.split(`${ACHIEVEMENT_ICONS_BUCKET}/`)
      if (urlParts.length > 1) {
        const filePath = urlParts[1]

        // Delete from storage
        const { error: deleteError } = await supabase.storage
          .from(ACHIEVEMENT_ICONS_BUCKET)
          .remove([filePath])

        if (deleteError) {
          console.warn('Failed to delete file from storage:', deleteError)
        }
      }

      // Update achievement record
      const { error: updateError } = await supabase
        .from('achievements')
        .update({ icon_url: null, updated_at: new Date().toISOString() })
        .eq('id', achievementId)

      if (updateError) throw updateError

      // Update local state
      setAchievements((prev) =>
        prev.map((a) => (a.id === achievementId ? { ...a, icon_url: null } : a))
      )

      setSuccessMessage(`Icon removed for "${achievement.key}"`)
      setTimeout(() => setSuccessMessage(null), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove icon')
    } finally {
      setUploadingId(null)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Loading achievements...</span>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Achievement Icons</h2>
        <p className="mt-1 text-sm text-gray-500">
          Upload custom icons for achievements. Icons will be stored in the achievement-icons
          bucket.
        </p>
      </div>

      {/* Messages */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-700">{error}</p>
          <button
            onClick={() => setError(null)}
            className="mt-2 text-sm text-red-600 underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {successMessage && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md">
          <p className="text-green-700">{successMessage}</p>
        </div>
      )}

      {/* Stats */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <p className="text-sm text-gray-500">Total Achievements</p>
          <p className="text-2xl font-semibold">{achievements.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <p className="text-sm text-gray-500">With Custom Icons</p>
          <p className="text-2xl font-semibold">
            {achievements.filter((a) => a.icon_url).length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <p className="text-sm text-gray-500">Using SF Symbols</p>
          <p className="text-2xl font-semibold">
            {achievements.filter((a) => !a.icon_url).length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <p className="text-sm text-gray-500">Active</p>
          <p className="text-2xl font-semibold">
            {achievements.filter((a) => a.is_active).length}
          </p>
        </div>
      </div>

      {/* Achievement List */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
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
                <tr key={achievement.id} className={tierBgColors[achievement.tier]}>
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
                      <span>{categoryIcons[achievement.category]}</span>
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
                      <span className="text-sm text-gray-400">No custom icon</span>
                    )}
                    {uploadProgress[achievement.id] !== undefined && (
                      <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress[achievement.id]}%` }}
                        ></div>
                      </div>
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
                            handleFileSelect(achievement.id, file)
                          }
                          e.target.value = ''
                        }}
                      />
                      <button
                        onClick={() => fileInputRefs.current[achievement.id]?.click()}
                        disabled={uploadingId === achievement.id}
                        className={`
                          px-3 py-1.5 text-sm font-medium rounded-md
                          ${
                            uploadingId === achievement.id
                              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              : 'bg-blue-600 text-white hover:bg-blue-700'
                          }
                        `}
                      >
                        {uploadingId === achievement.id
                          ? 'Uploading...'
                          : achievement.icon_url
                            ? 'Replace'
                            : 'Upload'}
                      </button>
                      {achievement.icon_url && (
                        <button
                          onClick={() => handleRemoveIcon(achievement.id)}
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

      {achievements.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border">
          <p className="text-gray-500">No achievements found in the database.</p>
          <p className="text-sm text-gray-400 mt-2">
            Make sure your Supabase connection is configured correctly.
          </p>
        </div>
      )}
    </div>
  )
}
