export type AchievementCategory = 'creation' | 'study' | 'engagement' | 'mastery'

export type AchievementTier = 'bronze' | 'silver' | 'gold' | 'platinum'

export interface Achievement {
  id: string
  key: string
  category: AchievementCategory
  tier: AchievementTier
  required_value: number
  icon: string // SF Symbol name
  icon_url: string | null // Custom icon URL from storage
  sort_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}
