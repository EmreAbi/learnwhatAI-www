# Achievements Migration Guide

## Problem
Ana sayfada achievements bölümü eklendi ancak veritabanında `achievements` tablosu ve veriler yok.

## Çözüm
Yeni migration dosyası oluşturuldu: `20250101000003_achievements_schema.sql`

## Migration'ı Çalıştırma

### Supabase Dashboard Üzerinden
1. Supabase projenize giriş yapın
2. Sol menüden **SQL Editor**'e gidin
3. `supabase/migrations/20250101000003_achievements_schema.sql` dosyasının içeriğini kopyalayın
4. SQL Editor'e yapıştırın ve **Run** butonuna basın

### Supabase CLI ile (Önerilen)
```bash
# Supabase CLI kuruluysa
npx supabase db push

# veya sadece bu migration'ı çalıştırın
npx supabase migration up
```

## Storage Bucket Oluşturma
`20250101000001_storage_setup.sql` dosyası güncellendi ve artık `achievement-icons` bucket'ını da oluşturuyor.

Eğer daha önce storage setup'ı çalıştırdıysanız:
1. Supabase Dashboard > Storage'e gidin
2. SQL Editor'de bu komutu çalıştırın:
```sql
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'achievement-icons',
    'achievement-icons',
    true,
    5242880,
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']
) ON CONFLICT (id) DO NOTHING;
```

## Achievements Verisi
Migration çalıştırıldığında otomatik olarak 16 achievement oluşturulacak:

### Creation (Oluşturma)
- **Bronze**: İlk flashcard seti (1)
- **Silver**: 10 flashcard seti
- **Gold**: 50 flashcard seti  
- **Platinum**: 100 flashcard seti

### Study (Çalışma)
- **Bronze**: İlk çalışma oturumu (1)
- **Silver**: 7 günlük seri
- **Gold**: 30 günlük seri
- **Platinum**: 100 günlük seri

### Engagement (Katılım)
- **Bronze**: İlk doğru cevap (1)
- **Silver**: 100 doğru cevap
- **Gold**: 500 doğru cevap
- **Platinum**: 1000 doğru cevap

### Mastery (Ustalık)
- **Bronze**: %80 doğruluk
- **Silver**: %90 doğruluk
- **Gold**: %95 doğruluk
- **Platinum**: %100 mükemmel

## Test Etme
1. Migration'ı çalıştırın
2. `/admin/achievements` sayfasına gidin
3. 16 achievement göreceksiniz
4. İstediğiniz achievement için custom ikon yükleyin
5. Ana sayfaya (`/`) gidin ve achievements bölümünü görün

## Notlar
- Her achievement varsayılan olarak bir SF Symbol icon'una sahip
- Custom icon yüklediğinizde, o icon SF Symbol'ün yerine kullanılır
- Icon'lar public olarak erişilebilir (achievement-icons bucket public)
- Maximum icon boyutu: 5MB
- Desteklenen formatlar: PNG, JPG, WebP, SVG
