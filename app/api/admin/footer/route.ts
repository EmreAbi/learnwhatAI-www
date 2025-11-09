import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/api'

export const runtime = 'edge'

export async function GET() {
  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('www-footer')
      .select('*')
      .eq('is_active', true)
      .single()

    if (error && error.code !== 'PGRST116') {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data || null)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const supabase = createAdminClient()

    const { data: existing } = await supabase
      .from('www-footer')
      .select('id')
      .eq('is_active', true)
      .single()

    let result

    if (existing) {
      result = await supabase
        .from('www-footer')
        .update({
          tagline: body.tagline,
          subtitle: body.subtitle,
          quick_links: body.quick_links,
          newsletter_title: body.newsletter_title,
          copyright: body.copyright,
          is_active: body.is_active,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existing.id)
    } else {
      result = await supabase.from('www-footer').insert([body])
    }

    if (result.error) {
      return NextResponse.json({ error: result.error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update data' }, { status: 500 })
  }
}
