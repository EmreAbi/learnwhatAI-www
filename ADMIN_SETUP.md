# 🔐 Admin Panel Setup Guide

## Hazırlanan Admin Panel Sistemi

LearnWhat.ai landing page için **izole bir admin panel** hazırlandı. Tüm içerikler Supabase'de saklanıyor ve admin panelden düzenlenebiliyor.

---

## 📋 Özellikler

✅ **www- Prefix ile Tablo Yapısı**: Tüm tablolar `www-` prefixi ile başlar (uygulama tablolarından ayrı)
✅ **Supabase Storage Entegrasyonu**: Görseller Supabase Storage'da saklanıyor
✅ **İzole Admin Panel**: `/admin` rotasında tamamen ayrı yönetim paneli
✅ **Password-Based Auth**: Basit ama güvenli admin girişi
✅ **Tüm Bölümler Düzenlenebilir**: Hero, Features, FAQ, Footer vb.
✅ **Real-time Updates**: Değişiklikler anında yansıyor

---

## 🚀 Kurulum Adımları

### 1. Environment Variables

`.env.local` dosyası zaten oluşturuldu:

```env
NEXT_PUBLIC_SUPABASE_URL=https://yjydiedaekzarfugqneq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR...
ADMIN_PASSWORD=LearnWhat2025!
```

**ÖNEMLİ:** Production'da `ADMIN_PASSWORD`'ü değiştirin!

### 2. Supabase Migration'ları Çalıştırma

**Yöntem A: Supabase Dashboard (Önerilen)**

1. https://supabase.com/dashboard → Projenizi seçin
2. **SQL Editor** sekmesine gidin
3. **New Query** tıklayın
4. Aşağıdaki dosyaları sırayla çalıştırın:

```bash
# 1. Schema oluştur
supabase/migrations/20250101000000_initial_schema.sql

# 2. Storage bucket kur
supabase/migrations/20250101000001_storage_setup.sql

# 3. Initial data seed et
supabase/migrations/20250101000002_seed_initial_data.sql
```

Her dosyanın içeriğini kopyalayıp SQL Editor'de **Run** edin.

**Yöntem B: Supabase CLI**

```bash
# Supabase CLI kur
npm install -g supabase

# Login
supabase login

# Link project
supabase link --project-ref yjydiedaekzarfugqneq

# Migrations çalıştır
supabase db push
```

### 3. Dependencies Kur

```bash
npm install
```

### 4. Development Sunucusu

```bash
npm run dev
```

---

## 🎯 Admin Panel Kullanımı

### Giriş

1. Tarayıcıda: http://localhost:3000/admin/login
2. Password: `LearnWhat2025!` (veya .env.local'deki değer)
3. **Login** butonu

### Dashboard

Admin dashboard'da şu bölümler mevcut:

- 🎯 **Hero Section**: Ana başlık ve CTA butonları
- ❗ **Problem Section**: Problem açıklaması
- 👋 **Meet Section**: Tanıtım metni
- ⭐ **Features**: Özellik kartları (5 adet)
- ⚡ **How It Works**: Adım adım süreç (3 adım)
- 🧪 **Science Points**: Bilimsel noktalar (4 adet)
- 👥 **Personas**: Hedef kitle (4 adet)
- 🚀 **CTA Section**: Ana harekete geçirici mesaj
- 💻 **Tech Stack**: Teknoloji stack (4 adet)
- ❓ **FAQ**: Sıkça sorulan sorular
- 📍 **Footer**: Alt bilgi
- ⚙️ **Site Settings**: Genel ayarlar

### İçerik Düzenleme

1. Dashboard'dan bir bölüme tıklayın
2. Formdaki alanları düzenleyin
3. **Save Changes** butonuna tıklayın
4. Ana sayfayı refresh edin → Değişiklikler anında yansır!

### Görsel Yükleme

1. **Image Manager** bölümüne gidin
2. Drag & drop veya dosya seç
3. Upload → Supabase Storage'a yüklenir
4. URL'yi kopyalayıp içeriklerde kullanın

---

## 📁 Dosya Yapısı

```
learnwhatAI-www/
├── supabase/
│   └── migrations/          # Veritabanı migration scriptleri
│       ├── 20250101000000_initial_schema.sql
│       ├── 20250101000001_storage_setup.sql
│       └── 20250101000002_seed_initial_data.sql
├── app/
│   ├── admin/              # Admin panel sayfaları
│   │   ├── page.tsx        # Dashboard
│   │   ├── login/page.tsx  # Login sayfası
│   │   ├── hero/           # Hero düzenleme
│   │   ├── features/       # Features düzenleme
│   │   └── ...
│   └── api/
│       └── admin/
│           └── auth/       # Authentication API
├── lib/
│   └── supabase/           # Supabase client utilities
│       ├── client.ts       # Browser client
│       ├── server.ts       # Server client
│       └── types.ts        # TypeScript types
├── middleware.ts           # Admin auth middleware
└── .env.local              # Environment variables
```

---

## 🔒 Güvenlik

### Production'da Yapılması Gerekenler

1. **Admin Password Değiştir**:
   ```env
   ADMIN_PASSWORD=çok-güçlü-bir-şifre-12345
   ```

2. **Supabase RLS Policies Kontrol Et**:
   - Public: READ-only
   - Authenticated: FULL access

3. **HTTPS Kullan**: Production'da her zaman HTTPS

4. **Rate Limiting Ekle** (opsiyonel):
   - Login endpoint'ine rate limit
   - Supabase'de built-in rate limiting var

---

## 🎨 Özelleştirme

### Admin Panel Tema

`app/admin` klasöründeki component'leri düzenleyin.

### Yeni Bölüm Ekle

1. Migration dosyası oluştur
2. Supabase'de tabloyu oluştur
3. `app/admin/yeni-bolum/page.tsx` ekle
4. Dashboard'a link ekle

---

## 🐛 Sorun Giderme

### Migration hataları

```bash
# Supabase CLI ile kontrol
supabase db diff

# Hataları görmek için
supabase db reset
```

### Admin panele giriş yapamıyorum

- `.env.local` dosyasını kontrol edin
- Browser cookies'i temizleyin
- Dev server'ı restart edin

### Değişiklikler yansımıyor

- Sayfayı hard refresh edin (Ctrl+Shift+R)
- Browser cache'i temizleyin
- Supabase policies'i kontrol edin

---

## 📚 Sonraki Adımlar

- [ ] Landing page'i Supabase'den veri çekecek şekilde güncelle
- [ ] Image upload sistemi ekle
- [ ] Her bölüm için edit sayfaları oluştur
- [ ] Real-time preview ekle
- [ ] Sürüm kontrolü ekle (draft/published)

---

## 💡 Notlar

- Tüm içerikler Supabase'de saklanıyor
- Admin panel tamamen izole (`/admin` rotası)
- Görseller Supabase Storage'da (public bucket)
- RLS policies ile güvenlik sağlanıyor
- TypeScript tip desteği mevcut

**Hazırlayan**: Claude AI
**Tarih**: 2025-01-08
