import { NextRequest, NextResponse } from 'next/server'

// Configure Edge Runtime for Cloudflare Pages
export const runtime = 'edge'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    // Check against environment variable
    const adminPassword = process.env.ADMIN_PASSWORD || 'LearnWhat2025!'

    if (password === adminPassword) {
      // Create response with session cookie
      const response = NextResponse.json({ success: true })

      response.cookies.set('admin-session', 'authenticated', {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      })

      return response
    } else {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    )
  }
}

export async function DELETE() {
  // Logout - remove session cookie
  const response = NextResponse.json({ success: true })

  response.cookies.set('admin-session', '', {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  })

  return response
}
