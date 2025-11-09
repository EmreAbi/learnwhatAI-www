// TypeScript types for Supabase tables

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      'www-hero': {
        Row: {
          id: string
          title: string
          subtitle: string
          cta_primary_text: string
          cta_primary_link: string
          cta_secondary_text: string
          cta_secondary_link: string
          hero_image: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['www-hero']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['www-hero']['Insert']>
      }
      'www-features': {
        Row: {
          id: string
          icon: string
          title: string
          description: string
          items: Json
          image: string | null
          sort_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['www-features']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['www-features']['Insert']>
      }
      'www-how-it-works': {
        Row: {
          id: string
          step_number: number
          title: string
          description: string
          icon: string
          sort_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['www-how-it-works']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['www-how-it-works']['Insert']>
      }
      'www-science': {
        Row: {
          id: string
          title: string
          description: string
          sort_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['www-science']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['www-science']['Insert']>
      }
      'www-personas': {
        Row: {
          id: string
          text: string
          sort_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['www-personas']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['www-personas']['Insert']>
      }
      'www-faq': {
        Row: {
          id: string
          question: string
          answer: string
          sort_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['www-faq']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['www-faq']['Insert']>
      }
      // Add other tables as needed
    }
  }
}
