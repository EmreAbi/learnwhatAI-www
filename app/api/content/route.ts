import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/api'

export const runtime = 'edge'

export async function GET() {
  try {
    const supabase = createAdminClient()

    // Fetch all content in parallel
    const [
      heroResult,
      problemResult,
      meetResult,
      featuresResult,
      howItWorksResult,
      scienceResult,
      personasResult,
      ctaResult,
      techStackResult,
      faqResult,
      footerResult,
    ] = await Promise.all([
      supabase.from('www-hero').select('*').eq('is_active', true).single(),
      supabase.from('www-problem').select('*').eq('is_active', true).single(),
      supabase.from('www-meet').select('*').eq('is_active', true).single(),
      supabase.from('www-features').select('*').eq('is_active', true).order('sort_order', { ascending: true }),
      supabase.from('www-how-it-works').select('*').eq('is_active', true).order('step_number', { ascending: true }),
      supabase.from('www-science').select('*').eq('is_active', true).order('sort_order', { ascending: true }),
      supabase.from('www-personas').select('*').eq('is_active', true).order('sort_order', { ascending: true }),
      supabase.from('www-cta').select('*').eq('is_active', true).single(),
      supabase.from('www-tech-stack').select('*').eq('is_active', true).order('sort_order', { ascending: true }),
      supabase.from('www-faq').select('*').eq('is_active', true).order('sort_order', { ascending: true }),
      supabase.from('www-footer').select('*').eq('is_active', true).single(),
    ])

    const content = {
      hero: heroResult.error && heroResult.error.code !== 'PGRST116' ? null : heroResult.data,
      problem: problemResult.error && problemResult.error.code !== 'PGRST116' ? null : problemResult.data,
      meet: meetResult.error && meetResult.error.code !== 'PGRST116' ? null : meetResult.data,
      features: featuresResult.error ? [] : featuresResult.data || [],
      howItWorks: howItWorksResult.error ? [] : howItWorksResult.data || [],
      science: scienceResult.error ? [] : scienceResult.data || [],
      personas: personasResult.error ? [] : personasResult.data || [],
      cta: ctaResult.error && ctaResult.error.code !== 'PGRST116' ? null : ctaResult.data,
      techStack: techStackResult.error ? [] : techStackResult.data || [],
      faq: faqResult.error ? [] : faqResult.data || [],
      footer: footerResult.error && footerResult.error.code !== 'PGRST116' ? null : footerResult.data,
    }

    return NextResponse.json(content)
  } catch (error) {
    console.error('Error fetching content:', error)
    return NextResponse.json(
      { error: 'Failed to fetch content' },
      { status: 500 }
    )
  }
}
