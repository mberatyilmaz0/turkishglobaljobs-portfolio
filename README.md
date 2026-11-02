# Turkish Global Jobs

Türkçe ve Almanca dil desteğine sahip, Almanya odaklı kariyer ve danışmanlık platformu. Kullanıcılar iş ilanlarını inceleyip başvurabilir, aday profillerini yönetebilir ve ön başvuru gönderebilir. Yöneticiler ise ilanları, başvuruları, site içeriklerini ve iletişim bilgilerini yönetebilir.

Proje; Next.js 16 App Router, React 19, TypeScript, Prisma 7, PostgreSQL, Auth.js v5 ve next-intl üzerine inşa edilmiştir.

## Özellikler

### Ziyaretçi ve adaylar

- Türkçe ve Almanca arayüz ile dile özel, SEO uyumlu URL'ler
- Sektör, çalışma tipi, konum, maaş ve dil seviyesine göre filtrelenebilen iş ilanları
- İlan detayları ve oturum açan kullanıcılar için iş başvurusu
- Kullanıcı kaydı ve e-posta/parola ile giriş
- Kişisel bilgiler, iş deneyimleri, eğitimler, yetenekler, diller ve CV bağlantısı içeren aday profili
- Adayın kendi başvurularını ve durumlarını takip edebildiği panel
- Fırsat Kartı, Almanya'da eğitim, Almanya rehberi, hakkımızda ve iletişim sayfaları
- SMTP üzerinden e-posta bildirimi gönderen ön başvuru formu

### Yönetim paneli

- Rol tabanlı ve iki katmanlı yönetici erişim kontrolü
- İlan oluşturma, düzenleme, silme, aktifleştirme ve öne çıkarma
- Başvuruları aday profiliyle birlikte inceleme, durum güncelleme ve silme
- Başvuru, kullanıcı, aktif ilan ve günlük ziyaret istatistikleri
- Ana sayfa, Fırsat Kartı, eğitim ve hakkımızda bölümleri için iki dilli içerik yönetimi
- Adres, e-posta ve telefon bilgilerini yönetme
- Görselleri Sharp ile yeniden boyutlandırıp WebP formatında kaydetme

### SEO ve performans

- İlan detaylarında Schema.org `JobPosting` JSON-LD verisi
- Dile özel canonical ve hreflang bağlantıları
- Dinamik `sitemap.xml` ve `robots.txt`
- Eski İngilizce URL'lerden yerelleştirilmiş URL'lere 301 yönlendirmeleri
- AVIF/WebP görsel optimizasyonu ve `next/font` ile Inter/Outfit fontları
- Vercel Analytics entegrasyonu

## Teknolojiler

| Katman | Teknoloji |
|---|---|
| Framework | Next.js 16, React 19, App Router |
| Dil | TypeScript 5 |
| Veritabanı | PostgreSQL |
| ORM | Prisma 7, `@prisma/adapter-pg`, `pg` |
| Kimlik doğrulama | Auth.js v5 (`next-auth`), JWT, Credentials Provider |
| Çoklu dil | next-intl 4 |
| Form ve doğrulama | React Hook Form, Zod |
| Stil | Özel CSS, CSS değişkenleri ve responsive tasarım |
| Görsel işleme | Sharp |
| E-posta | Nodemailer, Hostinger SMTP |
| Analitik | Vercel Analytics |

## Sayfalar ve URL'ler

Uygulamanın varsayılan dili Türkçedir; desteklenen diller `tr` ve `de` olarak tanımlıdır.

| Sayfa | Türkçe | Almanca |
|---|---|---|
| Ana sayfa | `/tr` | `/de` |
| İş ilanları | `/tr/almanya-is` | `/de/arbeit-in-deutschland` |
| Fırsat Kartı | `/tr/firsat-karti` | `/de/chancenkarte` |
| Eğitim | `/tr/almanya-egitim` | `/de/bildung-in-deutschland` |
| Ön başvuru | `/tr/on-basvuru` | `/de/vorab-bewerbung` |
| İletişim | `/tr/contact` | `/de/contact` |
| Aday paneli | `/tr/dashboard` | `/de/dashboard` |
| Yönetici girişi | `/tr/admin/login` | `/de/admin/login` |

Route grupları kaynak kodunda `(public)` ve `(admin)` olarak ayrılır. Yerelleştirilmiş URL eşlemeleri `src/i18n/routing.ts` içinde tanımlanır.

## Kurulum

### Gereksinimler

- Node.js 20.9 veya üzeri
- npm
- PostgreSQL veritabanı

### 1. Depoyu klonlayın ve bağımlılıkları yükleyin

```bash
git clone https://github.com/mberatyilmaz0/turkishglobaljobs-portfolio.git
cd turkishglobaljobs-portfolio
npm install
```

### 2. Ortam değişkenlerini tanımlayın

Proje kökünde `.env` dosyası oluşturun:

```dotenv
DATABASE_URL="postgresql://kullanici:sifre@localhost:5432/turkish_global_jobs?schema=public"
AUTH_SECRET="guclu-ve-rastgele-bir-anahtar"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"

SMTP_USER="smtp-kullanici-adiniz"
SMTP_PASS="smtp-parolaniz"
NOTIFICATION_EMAIL="bildirimlerin-gidecegi-adres"
```

| Değişken | Açıklama |
|---|---|
| `DATABASE_URL` | PostgreSQL bağlantı adresi |
| `AUTH_SECRET` | Auth.js oturum token'larını imzalamak ve çözmek için kullanılan gizli anahtar |
| `NEXT_PUBLIC_SITE_URL` | Canonical, sitemap ve robots URL'lerinde kullanılan site adresi; production ortamında gerçek alan adı olmalıdır |
| `SMTP_USER` | Hostinger SMTP kullanıcı adı |
| `SMTP_PASS` | Hostinger SMTP parolası |
| `NOTIFICATION_EMAIL` | Ön başvuru bildirimlerinin gönderileceği e-posta adresi |

SMTP ayarları yalnızca e-posta gönderimi için gereklidir. Gizli anahtar üretmek için örneğin `openssl rand -base64 32` komutu kullanılabilir.

### 3. Veritabanını hazırlayın

Migration'ları uygulayın:

```bash
npx prisma migrate dev
```

İsteğe bağlı olarak iki örnek yönetici hesabı ve altı örnek ilan ekleyin:

```bash
npx prisma db seed
```

Örnek yönetici girişi:

```text
E-posta: admin@example.com
Parola:  changeme123
```

Bu bilgiler yalnızca yerel geliştirme içindir; ortak veya production ortamlarında kullanılmamalıdır. Seed işlemi örnek ilanları her çalıştırmada yeniden ekler.

### 4. Geliştirme sunucusunu başlatın

```bash
npm run dev
```

Uygulama varsayılan olarak `http://localhost:3000` adresinde çalışır ve kök istek varsayılan dile yönlendirilir.

## Komutlar

| Komut | Açıklama |
|---|---|
| `npm run dev` | Geliştirme sunucusunu başlatır |
| `npm run lint` | ESLint kontrolünü çalıştırır |
| `npm run build` | Production derlemesi oluşturur |
| `npm run start` | Production sunucusunu başlatır |
| `npx prisma migrate dev` | Veritabanı migration'larını uygular |
| `npx prisma db seed` | Örnek verileri ekler |
| `npx prisma studio` | Prisma Studio'yu açar |

## Proje yapısı

```text
prisma/
├── migrations/          # Veritabanı migration'ları
├── schema.prisma        # Prisma veri modelleri
└── seed.ts              # Örnek yönetici ve ilan verileri
src/
├── actions/             # Auth, ilan, başvuru, profil, içerik ve istatistik Server Actions
├── app/
│   ├── [locale]/
│   │   ├── (admin)/     # Yönetici girişi ve paneli
│   │   └── (public)/    # Genel sayfalar, ilanlar ve aday paneli
│   ├── api/             # Auth, görsel yükleme ve e-posta route handler'ları
│   ├── uploads/         # Yüklenen dosyalar için route
│   ├── globals.css      # Global tasarım sistemi ve responsive stiller
│   ├── robots.ts        # robots.txt üretimi
│   └── sitemap.ts       # Sitemap üretimi
├── components/          # Arayüz, form, ilan ve yönetim bileşenleri
├── i18n/                # next-intl istek ve route yapılandırması
├── lib/                 # Auth, Prisma, doğrulama ve varsayılan içerikler
├── messages/            # Türkçe ve Almanca çeviriler
├── types/               # Auth.js tip genişletmeleri
└── proxy.ts             # Locale yönlendirmeleri ve yönetici erişim kontrolü
```

## Mimari notlar

- Veri işlemlerinin büyük bölümü Server Actions ile yürütülür. Auth.js, e-posta gönderimi ve görsel yükleme için ayrıca route handler'lar bulunur.
- Yönetici sayfaları `src/proxy.ts` içinde JWT rol kontrolüyle korunur; sayfa ve Server Action seviyesindeki oturum/rol kontrolleri ikinci güvenlik katmanını oluşturur.
- Parolalar `bcryptjs` ile hash'lenir. Bir kullanıcının aynı ilana birden fazla başvurusu veritabanındaki birleşik unique kısıtla engellenir.
- İş ilanlarının Türkçe ve Almanca alanları aynı `Job` kaydında tutulur. Diğer site içerikleri `SiteContent` modelinde JSON olarak saklanır ve veritabanı kullanılamadığında varsayılan içeriklere dönülür.
- Yüklenen görseller `public/uploads` altına yazılır. Bu nedenle deployment ortamında kalıcı ve yazılabilir dosya depolaması gerekir.

## Veri modeli

Prisma şemasındaki başlıca modeller:

- `User`, `Experience`, `Education`, `Skill`, `Language`: Kullanıcı ve aday profili
- `Job`: İki dilli iş ilanları
- `Application`: Kullanıcı ve ilan arasındaki başvurular
- `SiteVisit`: Günlük ziyaret sayaçları
- `SiteSettings`: İletişim bilgileri
- `SiteContent`: Yönetilebilir, iki dilli sayfa içerikleri

## Lisans

Bu proje portfolyo amaçlı paylaşılmıştır.
