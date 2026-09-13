# Turkish Global Jobs — İş Başvuru Platformu

Uluslararası iş ilanlarını listeleyen, Türkçe ve Almanca çoklu dil desteğine sahip modern bir iş başvuru platformu.

Next.js 16 App Router, TypeScript, Prisma ORM, PostgreSQL, NextAuth v5 ve next-intl altyapısı üzerine inşa edilmiştir. Her ilan sayfasında Schema.org `JobPosting` yapılandırılmış verisi üretilerek Google arama sonuçlarında zengin sonuç (rich result) desteği sağlanır.

## Kullanılan Teknolojiler

| Katman | Teknoloji |
|---|---|
| Framework | Next.js 16 (App Router, React 19) |
| Dil | TypeScript |
| Veritabanı | PostgreSQL |
| ORM | Prisma 7 |
| Kimlik Doğrulama | NextAuth.js v5 (Auth.js) |
| Çoklu Dil (i18n) | next-intl v4 |
| Validasyon | Zod |
| Stil | Tailwind CSS |

## Mimari Kararlar

### Server Actions

API route'ları yerine tüm form gönderimleri ve veritabanı işlemleri Server Actions üzerinden gerçekleştirilir. Bu yaklaşım, istemci-sunucu sınırında tip güvenliğini korurken kod tekrarını azaltır.

### JWT Auth ve Middleware Guard

Admin paneli güvenliği iki katmanlıdır. NextAuth oturum kontrolünün yanı sıra, `proxy.ts` middleware katmanında JWT token çözülerek rol bazlı doğrulama yapılır. Bu sayede istek sayfaya ulaşmadan önce yetkilendirme tamamlanır (Defense in Depth).

### Çoklu Dil Desteği (TR/DE)

next-intl kullanılarak route bazlı dil desteği sağlanır (`/tr/jobs`, `/de/jobs`). Çeviriler hem Server Component hem de Client Component içinde kullanılabilir. Dil dosyaları `messages/` klasöründe JSON formatında tutulur.

### Prisma Şema Tasarımı

İş ilanlarının çok dilli alanları denormalize şekilde aynı tabloda tutulur (`title` / `titleDe`, `description` / `descriptionDe`). Bu tasarım, JOIN maliyetini ortadan kaldırarak okuma performansını artırır.

## Öne Çıkan Teknik Detaylar

### Schema.org JobPosting JSON-LD

Her iş ilanı sayfasında dinamik olarak `JobPosting` yapılandırılmış verisi üretilir. Çalışma tipleri (Full-time, Part-time, Remote) ve konum bilgileri Schema.org standartlarına otomatik olarak eşlenir. Remote ilanlar için `TELECOMMUTE` yapılandırması eklenir.

### Admin Proxy Middleware

`/admin/*` route'larına yönelik istekler, NextAuth oturum kontrolünden bağımsız olarak `proxy.ts` middleware'inde yakalanır. Cookie'deki JWT token çözülür, `role` alanı doğrulanır ve yetkisiz istekler sayfa işlenmeden reddedilir.

### next-intl Yapısı

- Route segmentleri `[locale]` parametresi ile dil bazlı ayrılır.
- `getRequestConfig` fonksiyonu ile Server Component'lerde çeviri sağlanır.
- `useTranslations` hook'u ile Client Component'lerde çeviri kullanılır.
- Canonical URL ve hreflang etiketleri otomatik üretilir.

### SEO Optimizasyonu

- Dinamik `sitemap.xml` ve `robots.txt` üretimi.
- Her sayfa için dil bazlı `canonical` ve `alternates` URL tanımları.
- Çok dilli meta title ve description yönetimi.

## Proje Yapısı

```
src/
├── actions/          # Server Actions (CRUD işlemleri)
├── app/
│   └── [locale]/     # Çoklu dil route'ları (tr/de)
│       ├── (admin)/  # Admin paneli sayfaları
│       └── (public)/ # Herkese açık sayfalar
├── components/       # React bileşenleri
├── i18n/             # next-intl yapılandırması
├── lib/              # Auth, Prisma ve yardımcı konfigürasyonlar
├── messages/         # TR/DE çeviri dosyaları (JSON)
└── proxy.ts          # Admin route middleware koruması
prisma/
├── schema.prisma     # Veritabanı şeması
└── seed.ts           # Örnek veri
```

## Kurulum

1. Repoyu klonlayın:

```bash
git clone https://github.com/mberatyilmaz0/turkishglobaljobs-portfolio.git
cd turkishglobaljobs-portfolio
```

2. Bağımlılıkları yükleyin:

```bash
npm install
```

3. Çevre değişkenlerini ayarlayın:

```bash
cp .env.example .env
```

`.env` dosyasında aşağıdaki değişkenleri doldurun:

- `DATABASE_URL` — PostgreSQL bağlantı adresi
- `NEXTAUTH_SECRET` — Rastgele bir secret key
- `NEXTAUTH_URL` — Uygulamanın çalıştığı URL

4. Veritabanını hazırlayın:

```bash
npx prisma db push
npx prisma db seed
```

5. Geliştirme sunucusunu başlatın:

```bash
npm run dev
```

Uygulama `http://localhost:3000` adresinde çalışacaktır.

## Lisans

Bu proje portfolyo amaçlı paylaşılmıştır.
