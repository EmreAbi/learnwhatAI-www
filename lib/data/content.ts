import { createClient } from '@/lib/supabase/api'

// Fetch hero section
export async function getHero() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('www-hero')
    .select('*')
    .eq('is_active', true)
    .single()

  if (error) {
    console.error('Error fetching hero:', error)
    return null
  }

  return data
}

// Fetch problem section
export async function getProblem() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('www-problem')
    .select('*')
    .eq('is_active', true)
    .single()

  if (error) {
    console.error('Error fetching problem:', error)
    return null
  }

  return data
}

// Fetch meet section
export async function getMeet() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('www-meet')
    .select('*')
    .eq('is_active', true)
    .single()

  if (error) {
    console.error('Error fetching meet:', error)
    return null
  }

  return data
}

// Fetch features
export async function getFeatures() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('www-features')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('Error fetching features:', error)
    return []
  }

  return data || []
}

// Fetch how it works steps
export async function getHowItWorks() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('www-how-it-works')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('Error fetching how it works:', error)
    return []
  }

  return data || []
}

// Fetch science points
export async function getScience() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('www-science')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('Error fetching science:', error)
    return []
  }

  return data || []
}

// Fetch personas
export async function getPersonas() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('www-personas')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('Error fetching personas:', error)
    return []
  }

  return data || []
}

// Fetch CTA section
export async function getCTA() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('www-cta')
    .select('*')
    .eq('is_active', true)
    .single()

  if (error) {
    console.error('Error fetching CTA:', error)
    return null
  }

  return data
}

// Fetch tech stack
export async function getTechStack() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('www-tech-stack')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('Error fetching tech stack:', error)
    return []
  }

  return data || []
}

// Fetch FAQ
export async function getFAQ() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('www-faq')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('Error fetching FAQ:', error)
    return []
  }

  return data || []
}

// Fetch footer
export async function getFooter() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('www-footer')
    .select('*')
    .eq('is_active', true)
    .single()

  if (error) {
    console.error('Error fetching footer:', error)
    return null
  }

  return data
}

// Fetch all content at once
export async function getAllContent() {
  try {
    const [
      hero,
      problem,
      meet,
      features,
      howItWorks,
      science,
      personas,
      cta,
      techStack,
      faq,
      footer,
    ] = await Promise.all([
      getHero(),
      getProblem(),
      getMeet(),
      getFeatures(),
      getHowItWorks(),
      getScience(),
      getPersonas(),
      getCTA(),
      getTechStack(),
      getFAQ(),
      getFooter(),
    ])

    return {
      hero,
      problem,
      meet,
      features,
      howItWorks,
      science,
      personas,
      cta,
      techStack,
      faq,
      footer,
    }
  } catch (error) {
    console.error('Error fetching content from Supabase:', error)
    // Return empty data structure on error - page will use fallback
    return {
      hero: null,
      problem: null,
      meet: null,
      features: [],
      howItWorks: [],
      science: [],
      personas: [],
      cta: null,
      techStack: [],
      faq: [],
      footer: null,
    }
  }
}

// Helper function to get Supabase storage URL
export function getStorageUrl(path: string | null): string {
  if (!path) return ''

  // If path is already a full URL, return it
  if (path.startsWith('http')) return path

  // If path starts with /, it's a public path
  if (path.startsWith('/')) return path

  // Otherwise, construct Supabase storage URL
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  return `${supabaseUrl}/storage/v1/object/public/www-images/${path}`
}
