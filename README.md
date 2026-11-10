# Turkish Global Jobs

Türkçe ve Almanca dil desteğine sahip, Almanya odaklı kariyer ve danışmanlık sitesi. Ziyaretçiler iş ilanlarını inceler; başvuru ve iletişim talepleri **Ön Başvuru** ve **İletişim** formları üzerinden (isteğe bağlı CV ekiyle) e-posta olarak yöneticiye iletilir. Yöneticiler ilanları, site içeriklerini ve iletişim bilgilerini yönetir.

Proje; Next.js 16 App Router, React 19, TypeScript, Prisma 7, PostgreSQL, Auth.js v5 ve next-intl üzerine inşa edilmiştir.

## Özellikler

### Ziyaretçiler

- Türkçe ve Almanca arayüz ile dile özel, SEO uyumlu URL'ler
- Sektör, çalışma tipi, konum, maaş ve dil seviyesine göre filtrelenebilen iş ilanları
- Ön Başvuru formu (amaç, eğitim, Almanca seviyesi, not, isteğe bağlı CV)
- İletişim sayfasında mesaj formu (isteğe bağlı CV)
- CV'ler sunucuya kaydedilmez; bildirim e-postasına ek olarak gönderilir (PDF, DOC, DOCX · en fazla 5MB, içerik doğrulamalı)
- Fırsat Kartı, Almanya'da eğitim, Almanya rehberi, hakkımızda ve iletişim sayfaları

### Yönetim paneli

- Rol tabanlı ve iki katmanlı yönetici erişim kontrolü (proxy + her Server Action'da veritabanından rol doğrulaması)
- İlan oluşturma, düzenleme, silme, aktifleştirme ve öne çıkarma
- Aktif/toplam/öne çıkan ilan ve günlük ziyaret istatistikleri
- Ana sayfa, Fırsat Kartı, eğitim ve hakkımızda bölümleri için iki dilli içerik yönetimi
- Adres, e-posta ve telefon bilgilerini yönetme

### SEO ve ölçüm

- Dile özel canonical ve hreflang (`x-default` dahil) bağlantıları — `src/lib/site.ts`
- Dinamik `sitemap.xml` (tüm sayfalar + aktif ilanlar, TR/DE) ve `robots.txt`
- İlan detaylarında Schema.org `JobPosting` JSON-LD verisi
- Open Graph paylaşım önizlemeleri
- Eski İngilizce URL'lerden yerelleştirilmiş URL'lere kalıcı yönlendirmeler
- Google Analytics 4 + Consent Mode v2 (çerez onayı alınmadan çerez yazılmaz)
- Form gönderimlerinde GA4 `generate_lead` dönüşüm olayı

### Güvenlik

- Form ve giriş uç noktalarında IP / e-posta bazlı hız sınırı (`src/lib/rateLimit.ts`)
- E-posta içeriğinde HTML kaçışı, alan uzunluk sınırları
- CV eklerinde uzantı + dosya imzası (magic bytes) kontrolü

## Teknolojiler

| Katman | Teknoloji |
|---|---|
| Framework | Next.js 16, React 19, App Router |
| Dil | TypeScript 5 |
| Veritabanı | PostgreSQL |
| ORM | Prisma 7, `@prisma/adapter-pg`, `pg` |
| Kimlik doğrulama | Auth.js v5 (`next-auth`), JWT, Credentials Provider (yalnızca yönetici) |
| Çoklu dil | next-intl 4 |
| Form ve doğrulama | React Hook Form, Zod |
| Stil | Özel CSS, CSS değişkenleri ve responsive tasarım |
| E-posta | Nodemailer, Hostinger SMTP |
| Analitik | Google Analytics 4 |

## Sayfalar ve URL'ler

Uygulamanın varsayılan dili Türkçedir; desteklenen diller `tr` ve `de` olarak tanımlıdır.

| Sayfa | Türkçe | Almanca |
|---|---|---|
| Ana sayfa | `/tr` | `/de` |
| İş ilanları | `/tr/almanya-is` | `/de/arbeit-in-deutschland` |
| Fırsat Kartı | `/tr/firsat-karti` | `/de/chancenkarte` |
| Eğitim | `/tr/almanya-egitim` | `/de/bildung-in-deutschland` |
| Ön başvuru | `/tr/on-basvuru` | `/de/vorab-bewerbung` |
| Almanya rehberi | `/tr/almanya-rehberi` | `/de/almanya-rehberi` |
| Hakkımızda | `/tr/hakkimizda` | `/de/hakkimizda` |
| İletişim | `/tr/contact` | `/de/contact` |
| Yönetici girişi | `/tr/admin/login` | `/de/admin/login` |

Yerelleştirilmiş URL eşlemeleri `src/i18n/routing.ts` içinde tanımlanır; SEO adresleri için `src/lib/site.ts` içindeki eşleme bununla aynı tutulmalıdır.

## Kurulum

### Gereksinimler

- Node.js 20.9 veya üzeri
- npm
- PostgreSQL veritabanı

### 1. Bağımlılıkları yükleyin

```bash
npm install
```

### 2. Ortam değişkenlerini tanımlayın

Proje kökünde `.env` dosyası oluşturun:

```dotenv
DATABASE_URL="postgresql://kullanici:sifre@localhost:5432/turkish_global_jobs?schema=public"
AUTH_SECRET="guclu-ve-rastgele-bir-anahtar"
NEXT_PUBLIC_SITE_URL="https://www.turkishglobaljobs.com"

SMTP_USER="smtp-kullanici-adiniz"
SMTP_PASS="smtp-parolaniz"
NOTIFICATION_EMAIL="bildirimlerin-gidecegi-adres"

# İsteğe bağlı — verilmezse koddaki varsayılan GA4 kimliği kullanılır
# NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
```

| Değişken | Açıklama |
|---|---|
| `DATABASE_URL` | PostgreSQL bağlantı adresi |
| `AUTH_SECRET` | Auth.js oturum token'larını imzalamak için gizli anahtar (`openssl rand -base64 32`) |
| `NEXT_PUBLIC_SITE_URL` | Canonical, sitemap ve robots adreslerinin alan adı. Production'da `localhost` verilirse kod otomatik olarak `https://www.turkishglobaljobs.com` kullanır |
| `SMTP_USER` / `SMTP_PASS` | Hostinger SMTP hesabı |
| `NOTIFICATION_EMAIL` | Form bildirimlerinin (ve CV eklerinin) gideceği adres |
| `NEXT_PUBLIC_GA_ID` | GA4 ölçüm kimliği (isteğe bağlı). Analytics yalnızca production build'de etkindir |

`NEXT_PUBLIC_*` değişkenleri build sırasında koda gömülür; değiştirildiğinde yeniden build gerekir.

### 3. Veritabanını hazırlayın

```bash
npx prisma migrate dev
npx prisma db seed   # isteğe bağlı: örnek yönetici ve ilanlar
```

Seed ile gelen örnek yönetici bilgileri (`admin@example.com` / `changeme123`) yalnızca yerel geliştirme içindir.

### 4. Geliştirme sunucusunu başlatın

```bash
npm run dev
```

## Production (VPS) notları

- Uygulama Nginx arkasında PM2 ile çalışır (`deploy.sh`).
- CV eklerinin gönderilebilmesi için Nginx `server` bloğunda istek boyutu sınırı yükseltilmelidir:

  ```nginx
  client_max_body_size 6M;
  ```

- Hız sınırları bellek içinde tutulur; PM2 yeniden başlatıldığında sıfırlanır.
- Veritabanı aynı VPS'te ise düzenli yedek (`pg_dump`) alınmalıdır.

## Komutlar

| Komut | Açıklama |
|---|---|
| `npm run dev` | Geliştirme sunucusunu başlatır |
| `npm run lint` | ESLint kontrolünü çalıştırır |
| `npm run build` | Production derlemesi oluşturur |
| `npm run start` | Production sunucusunu başlatır |
| `npx prisma migrate dev` | Veritabanı migration'larını uygular |
| `npx prisma studio` | Prisma Studio'yu açar |

## Proje yapısı

```text
prisma/
├── migrations/          # Veritabanı migration'ları
├── schema.prisma        # Prisma veri modelleri
└── seed.ts              # Örnek yönetici ve ilan verileri
src/
├── actions/             # İlan, içerik, ayarlar ve istatistik Server Actions
├── app/
│   ├── [locale]/
│   │   ├── (admin)/     # Yönetici girişi ve paneli
│   │   └── (public)/    # Genel sayfalar, ilanlar ve formlar
│   ├── api/             # Auth.js ve e-posta (form + CV eki) route handler'ları
│   ├── uploads/         # public/uploads altındaki görselleri sunan route
│   ├── robots.ts        # robots.txt üretimi
│   └── sitemap.ts       # Sitemap üretimi
├── components/
│   ├── analytics/       # GA4 ve çerez onayı
│   ├── forms/           # İletişim formu ve CV yükleme bileşeni
│   └── ...              # Arayüz, ilan ve yönetim bileşenleri
├── i18n/                # next-intl istek ve route yapılandırması
├── lib/                 # Auth, yetki, Prisma, site URL'leri, analitik, hız sınırı
├── messages/            # Türkçe ve Almanca çeviriler
└── proxy.ts             # Locale yönlendirmeleri ve yönetici erişim kontrolü
```

## Veri modeli

- `User`: Yönetici hesapları (giriş için kullanılır)
- `Job`: İki dilli iş ilanları
- `SiteVisit`: Günlük ziyaret sayaçları
- `SiteSettings`: İletişim bilgileri
- `SiteContent`: Yönetilebilir, iki dilli sayfa içerikleri
- `Experience`, `Education`, `Skill`, `Language`, `Application`: Eski aday profili / başvuru sisteminden kalan tablolar. Kod artık kullanmıyor; veriler korunmak için şemada bırakıldı.

## Lisans

Bu proje portfolyo amaçlı paylaşılmıştır.
