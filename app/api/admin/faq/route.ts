import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/api'

export const runtime = 'edge'

export async function GET() {
  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('www-faq')
      .select('*')
      .order('sort_order', { ascending: true })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data || [])
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch FAQs' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const supabase = createAdminClient()

    if (body.id) {
      const { error } = await supabase
        .from('www-faq')
        .update({
          question: body.question,
          answer: body.answer,
          sort_order: body.sort_order,
          is_active: body.is_active,
          updated_at: new Date().toISOString(),
        })
        .eq('id', body.id)

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
      }
    } else {
      const { error } = await supabase.from('www-faq').insert([
        {
          question: body.question,
          answer: body.answer,
          sort_order: body.sort_order,
          is_active: body.is_active,
        },
      ])

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save FAQ' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()
    const supabase = createAdminClient()

    const { error } = await supabase.from('www-faq').delete().eq('id', id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete FAQ' }, { status: 500 })
  }
}
