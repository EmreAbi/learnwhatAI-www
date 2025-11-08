# Cloudflare Pages - nodejs_compat Flag Kurulumu

## ⚠️ SORUN
```
Node.JS Compatibility Error
no nodejs_compat compatibility flag set
```

## ✅ ÇÖZÜM: Wrangler CLI (EN KESİN)

### 1. Wrangler CLI'yi Kurun

```bash
npm install -g wrangler
```

### 2. Cloudflare Hesabınıza Login Olun

```bash
wrangler login
```

Bu komut browser'da Cloudflare login sayfasını açacak. Login olun ve authorize edin.

### 3. Compatibility Flag'i Ekleyin

#### Yöntem A: Project Seviyesinde (Önerilen)

```bash
npx wrangler pages project create learnwhatai-www --production-branch=main
```

Sonra:

```bash
npx wrangler pages deployment create .vercel/output/static \
  --project-name=learnwhatai-www \
  --branch=main \
  --compatibility-flag=nodejs_compat
```

#### Yöntem B: Doğrudan Ayarlama

Cloudflare API kullanarak (Pages projesi için):

```bash
curl -X PATCH "https://api.cloudflare.com/client/v4/accounts/YOUR_ACCOUNT_ID/pages/projects/learnwhatai-www" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{
    "deployment_configs": {
      "production": {
        "compatibility_flags": ["nodejs_compat"]
      },
      "preview": {
        "compatibility_flags": ["nodejs_compat"]
      }
    }
  }'
```

Account ID'nizi bulmak için: `wrangler whoami`

API Token oluşturmak için: Cloudflare Dashboard → My Profile → API Tokens

---

## 📋 Dashboard Yöntemi (Eğer Bulursanız)

**Cloudflare Dashboard'da:**

1. **Workers & Pages** → **learnwhatai-www** projenizi seçin
2. **Settings** sekmesi
3. Sayfayı aşağı kaydırın
4. **"Compatibility Flags"** veya **"Functions"** bölümünü arayın
5. `nodejs_compat` flagini ekleyin (Production ve Preview için)
6. Save ve Retry Deployment

**NOT:** Yeni Cloudflare arayüzünde bu bölüm bazı hesaplarda farklı yerlerde olabiliyor.

---

## 🔄 Deployment Sonrası

Flag ekledikten sonra:

1. Cloudflare Dashboard → Deployments
2. En son deployment → **Retry deployment**

Site artık çalışacak: https://learnwhatai-www.pages.dev

---

## ℹ️ Sorun Devam Ederse

Eğer yukarıdaki yöntemler işe yaramazsa:

### Build Output'u Manuel Deploy

```bash
# Build
npm install
npx @cloudflare/next-on-pages@1

# Deploy with flag
npx wrangler pages deploy .vercel/output/static \
  --project-name=learnwhatai-www \
  --branch=main \
  --compatibility-flag=nodejs_compat
```

Bu komut doğrudan deploy eder ve flag'i uygular.

---

## 📞 Yardım

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Compatibility Flags](https://developers.cloudflare.com/workers/configuration/compatibility-dates/)
- [next-on-pages Guide](https://github.com/cloudflare/next-on-pages/blob/main/packages/next-on-pages/docs/supported.md)
