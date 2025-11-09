import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/api'

// Configure Edge Runtime for Cloudflare Pages
export const runtime = 'edge'

// GET - Fetch hero data
export async function GET() {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('www-hero')
      .select('*')
      .eq('is_active', true)
      .single()

    if (error && error.code !== 'PGRST116') {
      // PGRST116 is "not found" error
      console.error('Error fetching hero:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data || null)
  } catch (error) {
    console.error('Error in GET /api/admin/hero:', error)
    return NextResponse.json(
      { error: 'Failed to fetch hero data' },
      { status: 500 }
    )
  }
}

// POST - Update hero data
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const supabase = createClient()

    // Check if hero exists
    const { data: existing } = await supabase
      .from('www-hero')
      .select('id')
      .eq('is_active', true)
      .single()

    let result

    if (existing) {
      // Update existing hero
      result = await supabase
        .from('www-hero')
        .update({
          title: body.title,
          subtitle: body.subtitle,
          cta_primary_text: body.cta_primary_text,
          cta_primary_link: body.cta_primary_link,
          cta_secondary_text: body.cta_secondary_text,
          cta_secondary_link: body.cta_secondary_link,
          hero_image: body.hero_image,
          is_active: body.is_active,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existing.id)
    } else {
      // Insert new hero
      result = await supabase.from('www-hero').insert([
        {
          title: body.title,
          subtitle: body.subtitle,
          cta_primary_text: body.cta_primary_text,
          cta_primary_link: body.cta_primary_link,
          cta_secondary_text: body.cta_secondary_text,
          cta_secondary_link: body.cta_secondary_link,
          hero_image: body.hero_image,
          is_active: body.is_active,
        },
      ])
    }

    if (result.error) {
      console.error('Error saving hero:', result.error)
      return NextResponse.json(
        { error: result.error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in POST /api/admin/hero:', error)
    return NextResponse.json(
      { error: 'Failed to update hero data' },
      { status: 500 }
    )
  }
}
