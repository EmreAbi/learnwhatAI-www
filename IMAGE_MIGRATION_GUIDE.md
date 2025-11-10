# Image Migration Guide

Bu rehber, mevcut public klasöründeki görselleri Supabase Storage'a taşımanızı ve admin panelden görsel yükleme özelliğini kullanmanızı sağlar.

## 📋 Özellikler

### ✅ Eklenen Özellikler

1. **Image Upload API** (`/api/admin/upload`)
   - Görselleri Supabase Storage'a yükler
   - Dosya tipi ve boyut kontrolü yapar (max 5MB)
   - Benzersiz dosya isimleri oluşturur
   - Public URL döndürür

2. **ImageUpload Component**
   - Sürükle-bırak veya tıklayarak yükleme
   - Canlı önizleme
   - Görsel silme özelliği
   - Yükleme durumu göstergesi
   - Hata yönetimi

3. **Admin Panel Güncellemeleri**
   - Hero section: Görsel yükleme desteği
   - Features section: Her feature için görsel yükleme

## 🚀 Kullanım

### Admin Panel'den Görsel Yükleme

1. Admin panele giriş yapın: `https://your-site.pages.dev/admin/login`
2. İstediğiniz section'a gidin (örn: Hero, Features)
3. "Upload" butonuna tıklayın veya görseli sürükleyin
4. Görsel otomatik olarak Supabase Storage'a yüklenecek
5. "Save" butonuna tıklayın

### Mevcut Görselleri Migration

Public klasöründeki tüm görselleri Supabase Storage'a taşımak için:

```bash
# 1. Gerekli paketleri yükleyin
npm install

# 2. .env.local dosyanızda şu değişkenlerin olduğundan emin olun:
# NEXT_PUBLIC_SUPABASE_URL=your-project-url
# SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# 3. Migration script'ini çalıştırın
npm run migrate-images
```

Migration script:
- ✅ Public klasöründeki tüm görselleri bulur (.jpg, .png, .gif, .webp, .svg)
- ✅ Her görseli Supabase Storage'a yükler
- ✅ Zaten yüklenmiş görselleri atlar
- ✅ Detaylı log gösterir

### Migration Sonrası

1. **Database Güncellemesi**: Hero ve Features'daki image path'lerini admin panel'den güncelleyin
   - Eski: `/hero_16x9_transparent.png`
   - Yeni: `1234567890-abc.png` (storage'dan dönen filename)

2. **Test**: Website'inizde görsellerin doğru yüklendiğini kontrol edin

3. **Temizlik** (Opsiyonel): Emin olduktan sonra public klasöründeki görselleri silebilirsiniz

## 📁 Dosya Yapısı

```
/app
  /api
    /admin
      /upload
        route.ts          # Image upload API
/components
  /admin
    ImageUpload.tsx       # Reusable upload component
/scripts
  migrate-images-to-storage.ts  # Migration script
/public
  *.png, *.jpg, etc.     # Mevcut görseller (migration'dan sonra kaldırılabilir)
```

## 🔧 Teknik Detaylar

### Supabase Storage Configuration

Migration script'i `www-images` bucket'ını kullanır. Bu bucket zaten migrations'da oluşturulmuş:

```sql
-- supabase/migrations/20250101000001_storage_setup.sql
CREATE BUCKET www-images;
ALTER BUCKET www-images SET PUBLIC true;
```

### Desteklenen Dosya Formatları

- JPEG (.jpg, .jpeg)
- PNG (.png)
- GIF (.gif)
- WebP (.webp)
- SVG (.svg)

### Dosya Boyutu Limiti

- Maximum: 5MB per file
- Daha büyük dosyalar için client-side ve server-side validation var

### URL Formatları

Görseller 3 şekilde kullanılabilir:

1. **Public path**: `/logo.png` (mevcut public klasöründen)
2. **Storage filename**: `1234-abc.png` (Supabase Storage'dan, otomatik URL'e çevrilir)
3. **Full URL**: `https://[project].supabase.co/storage/v1/object/public/www-images/1234-abc.png`

`getStorageUrl()` helper fonksiyonu bu 3 formatı da destekler.

## 🐛 Troubleshooting

### Migration başarısız olursa:

1. `.env.local` dosyasındaki Supabase credentials'ları kontrol edin
2. Supabase Dashboard → Storage → www-images bucket'ının public olduğunu doğrulayın
3. Service role key'in doğru olduğundan emin olun

### Upload çalışmıyorsa:

1. Browser console'da hata mesajlarını kontrol edin
2. Dosya boyutunu kontrol edin (max 5MB)
3. Dosya tipini kontrol edin (sadece image formatları)
4. Network tab'de `/api/admin/upload` endpoint'ine istek gidip gitmediğine bakın

### Görseller gösterilmiyorsa:

1. Supabase Storage'da dosyanın yüklendiğini doğrulayın
2. Bucket'ın public olduğunu kontrol edin
3. Browser DevTools → Network tab'de 403/404 hataları olup olmadığına bakın
4. Database'deki image path'in doğru olduğunu kontrol edin

## 📞 Destek

Sorun yaşarsanız:
1. Migration log'larını kontrol edin
2. Supabase Dashboard → Storage → Logs'a bakın
3. Browser console'daki hata mesajlarını inceleyin
