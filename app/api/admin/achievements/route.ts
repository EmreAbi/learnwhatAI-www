import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/api'

export const runtime = 'edge'

const BUCKET_NAME = 'achievement-icons'

// GET - List all achievements
export async function GET() {
  try {
    const supabase = createAdminClient()

    const { data, error } = await supabase
      .from('achievements')
      .select('*')
      .order('sort_order', { ascending: true })

    if (error) {
      console.error('Fetch error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ achievements: data || [] })
  } catch (error: any) {
    console.error('Error fetching achievements:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch achievements' },
      { status: 500 }
    )
  }
}

// POST - Upload icon for achievement
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const achievementId = formData.get('achievementId') as string
    const achievementKey = formData.get('achievementKey') as string
    const tier = formData.get('tier') as string

    if (!file || !achievementId || !achievementKey || !tier) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp',
      'image/svg+xml',
    ]
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only images are allowed.' },
        { status: 400 }
      )
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 5MB.' },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()

    // Generate file path: tier/key.extension
    const extension = file.name.split('.').pop()
    const filePath = `${tier}/${achievementKey}.${extension}`

    // Convert File to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = new Uint8Array(arrayBuffer)

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, buffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: true,
      })

    if (uploadError) {
      console.error('Upload error:', uploadError)
      return NextResponse.json({ error: uploadError.message }, { status: 500 })
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath)

    // Update achievement record with new icon_url
    const { error: updateError } = await supabase
      .from('achievements')
      .update({ icon_url: publicUrl, updated_at: new Date().toISOString() })
      .eq('id', achievementId)

    if (updateError) {
      console.error('Update error:', updateError)
      return NextResponse.json({ error: updateError.message }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      icon_url: publicUrl,
      path: filePath,
    })
  } catch (error: any) {
    console.error('Error in upload route:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to upload icon' },
      { status: 500 }
    )
  }
}

// DELETE - Remove icon from achievement
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const achievementId = searchParams.get('achievementId')
    const iconUrl = searchParams.get('iconUrl')

    if (!achievementId) {
      return NextResponse.json(
        { error: 'Achievement ID is required' },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()

    // Extract file path from URL and delete from storage
    if (iconUrl) {
      const urlParts = iconUrl.split(`${BUCKET_NAME}/`)
      if (urlParts.length > 1) {
        const filePath = urlParts[1]
        const { error: deleteError } = await supabase.storage
          .from(BUCKET_NAME)
          .remove([filePath])

        if (deleteError) {
          console.warn('Failed to delete file from storage:', deleteError)
        }
      }
    }

    // Update achievement record to remove icon_url
    const { error: updateError } = await supabase
      .from('achievements')
      .update({ icon_url: null, updated_at: new Date().toISOString() })
      .eq('id', achievementId)

    if (updateError) {
      console.error('Update error:', updateError)
      return NextResponse.json({ error: updateError.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error in delete route:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to remove icon' },
      { status: 500 }
    )
  }
}
