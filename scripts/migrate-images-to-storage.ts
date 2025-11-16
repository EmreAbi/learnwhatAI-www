import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'
import { config } from 'dotenv'

// Load environment variables
config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

const PUBLIC_DIR = path.join(process.cwd(), 'public')
const BUCKET_NAME = 'www-images'

// Image file extensions to migrate
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg']

async function uploadImage(filePath: string, filename: string): Promise<boolean> {
  try {
    const fileBuffer = fs.readFileSync(filePath)
    const ext = path.extname(filename).toLowerCase()

    // Determine content type
    const contentTypeMap: Record<string, string> = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif',
      '.webp': 'image/webp',
      '.svg': 'image/svg+xml',
    }

    const contentType = contentTypeMap[ext] || 'application/octet-stream'

    // Check if file already exists
    const { data: existingFiles } = await supabase.storage
      .from(BUCKET_NAME)
      .list('', {
        search: filename,
      })

    if (existingFiles && existingFiles.length > 0) {
      console.log(`  ⏭️  Skipping ${filename} (already exists)`)
      return true
    }

    // Upload to storage
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filename, fileBuffer, {
        contentType,
        cacheControl: '3600',
        upsert: false,
      })

    if (error) {
      console.error(`  ❌ Failed to upload ${filename}:`, error.message)
      return false
    }

    console.log(`  ✅ Uploaded ${filename}`)
    return true
  } catch (error: any) {
    console.error(`  ❌ Error uploading ${filename}:`, error.message)
    return false
  }
}

async function migrateImages() {
  console.log('🚀 Starting image migration to Supabase Storage...\n')

  // Check if public directory exists
  if (!fs.existsSync(PUBLIC_DIR)) {
    console.error(`❌ Public directory not found: ${PUBLIC_DIR}`)
    process.exit(1)
  }

  // Get all files in public directory
  const files = fs.readdirSync(PUBLIC_DIR)

  // Filter image files
  const imageFiles = files.filter((file) => {
    const ext = path.extname(file).toLowerCase()
    return IMAGE_EXTENSIONS.includes(ext)
  })

  if (imageFiles.length === 0) {
    console.log('ℹ️  No image files found in public directory')
    return
  }

  console.log(`📁 Found ${imageFiles.length} image files to migrate\n`)

  let successCount = 0
  let failCount = 0

  // Upload each image
  for (const filename of imageFiles) {
    const filePath = path.join(PUBLIC_DIR, filename)
    const success = await uploadImage(filePath, filename)

    if (success) {
      successCount++
    } else {
      failCount++
    }
  }

  console.log('\n📊 Migration Summary:')
  console.log(`  ✅ Successfully uploaded: ${successCount}`)
  console.log(`  ❌ Failed: ${failCount}`)
  console.log(`  📁 Total processed: ${imageFiles.length}`)

  if (successCount > 0) {
    console.log('\n💡 Next steps:')
    console.log('  1. Update your database records to use the new storage paths')
    console.log('  2. Test that images load correctly on your website')
    console.log('  3. Once verified, you can remove images from /public directory')
  }
}

// Run migration
migrateImages()
  .then(() => {
    console.log('\n✅ Migration completed!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Migration failed:', error)
    process.exit(1)
  })
