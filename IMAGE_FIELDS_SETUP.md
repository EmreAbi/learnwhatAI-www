# Image Upload Fields Migration Guide

## Problem
Admin panelinde bazı bölümlerde görsel yükleme alanı (Image optional) yoktu.

## Çözüm
Yeni migration dosyası oluşturuldu ve aşağıdaki admin panellere Image (optional) alanları eklendi:

### ✅ Güncellenen Bölümler

1. **Problem Section** (`/admin/problem`)
   - Image (optional) alanı eklendi
   - Database: `www-problem` tablosuna `image TEXT` kolonu eklendi

2. **Meet Section** (`/admin/meet`)
   - Image (optional) alanı eklendi
   - Database: `www-meet` tablosuna `image TEXT` kolonu eklendi

3. **How It Works Steps** (`/admin/how-it-works`)
   - Her step için Image (optional) alanı eklendi
   - Database: `www-how-it-works` tablosuna `image TEXT` kolonu eklendi

4. **Science Points** (`/admin/science`)
   - Her science point için Image (optional) alanı eklendi
   - Database: `www-science` tablosuna `image TEXT` kolonu eklendi

5. **Personas** (`/admin/personas`)
   - Her persona için Image (optional) alanı eklendi
   - Database: `www-personas` tablosuna `image TEXT` kolonu eklendi

6. **CTA Section** (`/admin/cta`)
   - Image (optional) alanı eklendi
   - Database: `www-cta` tablosuna `image TEXT` kolonu eklendi

7. **Tech Stack** (`/admin/tech-stack`)
   - Her tech item için Image (optional) alanı eklendi
   - Database: `www-tech-stack` tablosuna `image TEXT` kolonu eklendi

## Migration'ı Çalıştırma

### Supabase Dashboard Üzerinden
1. Supabase projenize giriş yapın
2. Sol menüden **SQL Editor**'e gidin
3. `supabase/migrations/20250118000000_add_image_fields.sql` dosyasının içeriğini kopyalayın
4. SQL Editor'e yapıştırın ve **Run** butonuna basın

### Supabase CLI ile (Önerilen)
```bash
# Tüm pending migrations'ları çalıştırın
npx supabase db push

# veya sadece bu migration'ı çalıştırın
npx supabase migration up
```

## Değişiklikler Detayı

### Frontend Değişiklikleri
Tüm ilgili admin sayfalarına `ImageUpload` komponenti eklendi:
- `app/admin/problem/page.tsx`
- `app/admin/meet/page.tsx`
- `app/admin/how-it-works/page.tsx`
- `app/admin/science/page.tsx`
- `app/admin/personas/page.tsx`
- `app/admin/cta/page.tsx`
- `app/admin/tech-stack/page.tsx`

### Database Değişiklikleri
7 tabloya `image TEXT` kolonu eklendi:
```sql
ALTER TABLE "www-problem" ADD COLUMN IF NOT EXISTS image TEXT;
ALTER TABLE "www-meet" ADD COLUMN IF NOT EXISTS image TEXT;
ALTER TABLE "www-how-it-works" ADD COLUMN IF NOT EXISTS image TEXT;
ALTER TABLE "www-science" ADD COLUMN IF NOT EXISTS image TEXT;
ALTER TABLE "www-personas" ADD COLUMN IF NOT EXISTS image TEXT;
ALTER TABLE "www-cta" ADD COLUMN IF NOT EXISTS image TEXT;
ALTER TABLE "www-tech-stack" ADD COLUMN IF NOT EXISTS image TEXT;
```

## Kullanım

1. **Admin panele giriş yapın**: `https://your-site.pages.dev/admin/login`

2. **İstediğiniz section'a gidin** (örn: Problem, Meet, How It Works, vb.)

3. **Image (optional) alanını bulun**
   - "Upload" butonuna tıklayın veya görseli sürükleyin
   - Görsel otomatik olarak Supabase Storage'a yüklenecek

4. **Save butonuna tıklayın**

## Görsel Özellikleri

### Desteklenen Formatlar
- JPEG (.jpg, .jpeg)
- PNG (.png)
- GIF (.gif)
- WebP (.webp)
- SVG (.svg)

### Dosya Boyutu
- Maximum: 5MB per file

### Önerilen Boyutlar
- **Problem Section**: 1200x800px
- **Meet Section**: 1200x800px
- **How It Works Steps**: 800x600px
- **Science Points**: 800x600px
- **Personas**: 400x400px (kare)
- **CTA Section**: 1200x800px
- **Tech Stack**: 800x600px

## Storage Bucket

Görseller mevcut `www-images` bucket'ına yüklenir. Bu bucket zaten oluşturulmuş ve public olarak erişilebilir durumda.

Migration çalıştırdıktan sonra herhangi bir storage ayarı yapmanıza gerek yok.

## Test Etme

1. Migration'ı çalıştırın (yukarıdaki adımları takip edin)
2. Admin panele giriş yapın
3. Her bir section'a gidin ve Image (optional) alanını görün:
   - `/admin/problem`
   - `/admin/meet`
   - `/admin/how-it-works`
   - `/admin/science`
   - `/admin/personas`
   - `/admin/cta`
   - `/admin/tech-stack`
4. Birkaç test görseli yükleyin
5. Ana sayfayı (`/`) kontrol edin (frontend'de görselleri kullanmak için ayrı bir geliştirme gerekebilir)

## Notlar

- ✅ Tüm image alanları **optional** (zorunlu değil)
- ✅ Mevcut veriler etkilenmez (yeni kolon eklendiğinde NULL olarak gelir)
- ✅ API route'ları otomatik olarak yeni image alanını destekler
- ✅ ImageUpload komponenti tüm bölümlerde aynı şekilde çalışır
- ⚠️ Frontend'de (landing page) bu görselleri göstermek için ayrı geliştirme gerekebilir

## Frontend Entegrasyonu

Bu görselleri ana sayfada göstermek isterseniz, her section'ın frontend komponentini güncelleyin:

```typescript
// Örnek: ProblemSection.tsx
import { getStorageUrl } from '@/lib/storage'

// API'den gelen data içinde artık image var
const { image } = problemData

// Görseli göster
{image && (
  <img
    src={getStorageUrl(image)}
    alt="Problem section"
    className="..."
  />
)}
```

## Troubleshooting

### Migration başarısız olursa:
1. Supabase Dashboard → SQL Editor'da hata mesajını kontrol edin
2. Migration dosyasının doğru yolda olduğundan emin olun
3. Supabase bağlantısını kontrol edin

### Upload çalışmıyorsa:
1. Browser console'da hata mesajlarını kontrol edin
2. Dosya boyutunu kontrol edin (max 5MB)
3. Dosya tipini kontrol edin (sadece image formatları)
4. Network tab'de `/api/admin/upload` endpoint'ine istek gidip gitmediğine bakın

### Görseller kaydedilmiyorsa:
1. Network tab'de API request'lerini kontrol edin
2. Database'de image kolonunun eklendiğini doğrulayın
3. Supabase Storage'da dosyanın yüklendiğini kontrol edin

## Özet

Bu migration ile 7 farklı admin bölümüne görsel yükleme özelliği eklendi. Tüm görseller Supabase Storage'da saklanır ve admin panelden kolayca yönetilebilir.
