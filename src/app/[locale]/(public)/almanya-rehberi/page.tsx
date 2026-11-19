import { setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import Link from 'next/link';
import { FileText, GraduationCap, Wrench, CreditCard, Briefcase, Languages, BookOpen, ExternalLink } from 'lucide-react';
import JobLandingLinks from '@/components/jobs/JobLandingLinks';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import { alternatesFor, localizedPath } from '@/lib/site';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isDE = locale === 'de';
  const title = isDE ? 'Arbeiten und Leben in Deutschland: Ratgeber' : 'Almanya’da Çalışmak ve Yaşamak: Kapsamlı Rehber';
  const description = isDE
    ? 'Praktische Informationen zu Jobsuche, Anerkennung, Sprachkenntnissen, Chancenkarte, Studium und offiziellen Beratungsstellen in Deutschland.'
    : 'Almanya’da iş bulmak, mesleki denklik, Almanca, Fırsat Kartı, eğitim ve resmî danışma kaynakları hakkında kapsamlı rehber.';
  return {
    title,
    description,
    alternates: alternatesFor(locale, '/almanya-rehberi'),
    openGraph: { title, description, type: 'website', images: [{ url: '/img/turkishglobal.webp', alt: title }] },
  };
}

const ARTICLES = [
  { Icon: FileText, href: '/opportunity-card', color: '#2563eb', bg: '#eff6ff' },
  { Icon: GraduationCap, href: '/education', color: '#7c3aed', bg: '#f5f3ff' },
  { Icon: Wrench, href: '/education', color: '#ea580c', bg: '#fff7ed' },
  { Icon: CreditCard, href: '/opportunity-card', color: '#0891b2', bg: '#ecfeff' },
  { Icon: Briefcase, href: '/jobs', color: '#16a34a', bg: '#f0fdf4' },
  { Icon: Languages, href: '/education', color: '#d97706', bg: '#fffbeb' },
] as const;

const COPY = {
  tr: {
    badge: 'Türkiye’den Almanya’ya Bilgi Merkezi',
    title: 'Almanya’da Çalışmak ve Yaşamak',
    subtitle: 'İş arama, mesleki denklik, dil seviyesi ve eğitim süreçlerini anlaşılır adımlarla inceleyin.',
    topicsLabel: 'Temel Konular',
    topicsTitle: 'Almanya Yolculuğunuz İçin Rehberler',
    topicsText: 'İş, eğitim ve oturum seçeneklerini karşılaştırarak size uygun başlangıç noktasını belirleyin.',
    articles: [
      { title: 'Almanya Fırsat Kartı Şartları', desc: 'Chancenkarte başvuru koşulları, puan sistemi ve temel başvuru adımlarını inceleyin.', tag: 'Vize ve İzin' },
      { title: 'Diploma ve Mesleki Denklik', desc: 'Eğitim ve meslek geçmişinizin Almanya’daki tanınma süreci hakkında bilgi alın.', tag: 'Denklik' },
      { title: 'Ausbildung Başvurusu', desc: 'Mesleki eğitim seçeneklerini ve başvuru sırasında izlenecek adımları öğrenin.', tag: 'Mesleki Eğitim' },
      { title: 'Mavi Kart ve Çalışma Yolları', desc: 'Nitelikli çalışanlar için çalışma ve oturum seçeneklerini karşılaştırın.', tag: 'Çalışma İzni' },
      { title: 'Almanya’daki İş Fırsatları', desc: 'Aktif ilanları sektör, şehir ve çalışma modeli açısından karşılaştırın.', tag: 'İş Piyasası' },
      { title: 'Almanca ve Eğitim Seçenekleri', desc: 'İş ve eğitim hedeflerinizde dil seviyesinin rolünü ve eğitim yollarını inceleyin.', tag: 'Dil ve Eğitim' },
    ],
    stepsLabel: 'Başvuru Hazırlığı',
    stepsTitle: 'Türkiye’den Almanya’ya İş Ararken 5 Adım',
    stepsText: 'Her başvurunun koşulları farklıdır. Aşağıdaki adımlar hazırlık sürecinizi daha sistematik hâle getirir.',
    steps: [
      { title: 'Hedefinizi netleştirin', text: 'Çalışmak istediğiniz meslek, sektör ve şehirleri belirleyin; aktif ilanların beklentilerini profilinizle karşılaştırın.' },
      { title: 'CV ve belgelerinizi hazırlayın', text: 'Güncel bir CV hazırlayın; diploma, sertifika ve iş deneyimi belgelerinizi düzenli biçimde bir araya getirin.' },
      { title: 'Denklik koşullarını kontrol edin', text: 'Mesleğinizin denklik veya meslek izni gerektirip gerektirmediğini resmî Anerkennung kaynaklarından kontrol edin.' },
      { title: 'Dil seviyenizi değerlendirin', text: 'İlanda belirtilen Almanca veya İngilizce beklentisini inceleyin ve gerekiyorsa dil gelişiminizi başvuru planınıza dahil edin.' },
      { title: 'Hedefli başvuru yapın', text: 'Yalnızca profilinize uyan ilanlara başvurun ve çalışma ile oturum koşullarını güncel resmî bilgilerle doğrulayın.' },
    ],
    officialLabel: 'Güvenilir Bilgi',
    officialTitle: 'Resmî ve Bağımsız Kaynaklar',
    officialText: 'Vize, çalışma izni ve denklik kuralları değişebilir. Nihai karar öncesinde güncel bilgiyi aşağıdaki resmî kaynaklardan doğrulayın.',
    officialLinks: [
      { name: 'Make it in Germany', desc: 'Almanya Federal Hükümeti’nin nitelikli çalışanlar için resmî portalı.', href: 'https://www.make-it-in-germany.com/tr/' },
      { name: 'Anerkennung in Deutschland', desc: 'Diploma ve mesleki denklik için resmî bilgi ve danışma portalı.', href: 'https://www.anerkennung-in-deutschland.de/html/tr/index.php' },
      { name: 'Bundesagentur für Arbeit', desc: 'Almanya Federal İş Ajansı’nın iş piyasası ve meslek bilgileri.', href: 'https://www.arbeitsagentur.de/' },
    ],
    go: 'Rehberi İncele',
  },
  de: {
    badge: 'Informationen für den Weg von der Türkei nach Deutschland',
    title: 'Arbeiten und Leben in Deutschland',
    subtitle: 'Jobsuche, berufliche Anerkennung, Sprachkenntnisse und Bildungswege Schritt für Schritt verstehen.',
    topicsLabel: 'Grundlegende Themen',
    topicsTitle: 'Ratgeber für Ihren Weg nach Deutschland',
    topicsText: 'Vergleichen Sie Arbeits-, Bildungs- und Aufenthaltsoptionen und finden Sie Ihren passenden Ausgangspunkt.',
    articles: [
      { title: 'Voraussetzungen der Chancenkarte', desc: 'Voraussetzungen, Punktesystem und wichtige Schritte für die Chancenkarte.', tag: 'Visum und Aufenthalt' },
      { title: 'Anerkennung von Abschlüssen', desc: 'Informationen zur Anerkennung Ihrer Ausbildung und Berufserfahrung in Deutschland.', tag: 'Anerkennung' },
      { title: 'Bewerbung für eine Ausbildung', desc: 'Berufliche Bildungswege und die wichtigsten Bewerbungsschritte entdecken.', tag: 'Berufsausbildung' },
      { title: 'Blaue Karte und Arbeitswege', desc: 'Arbeits- und Aufenthaltsoptionen für qualifizierte Fachkräfte vergleichen.', tag: 'Arbeitserlaubnis' },
      { title: 'Stellenangebote in Deutschland', desc: 'Aktuelle Stellen nach Branche, Stadt und Arbeitsmodell vergleichen.', tag: 'Arbeitsmarkt' },
      { title: 'Deutschkenntnisse und Bildung', desc: 'Die Rolle von Sprachkenntnissen und passende Bildungswege kennenlernen.', tag: 'Sprache und Bildung' },
    ],
    stepsLabel: 'Vorbereitung der Bewerbung',
    stepsTitle: 'In 5 Schritten von der Türkei nach Deutschland',
    stepsText: 'Jede Bewerbung hat eigene Voraussetzungen. Diese Schritte helfen bei einer strukturierten Vorbereitung.',
    steps: [
      { title: 'Ziel festlegen', text: 'Bestimmen Sie Beruf, Branche und Region und vergleichen Sie die Anforderungen aktueller Stellen mit Ihrem Profil.' },
      { title: 'Lebenslauf und Dokumente vorbereiten', text: 'Erstellen Sie einen aktuellen Lebenslauf und ordnen Sie Abschlüsse, Zertifikate und Arbeitszeugnisse.' },
      { title: 'Anerkennung prüfen', text: 'Prüfen Sie über die offiziellen Anerkennungsportale, ob Ihr Beruf eine Anerkennung oder Berufserlaubnis erfordert.' },
      { title: 'Sprachniveau bewerten', text: 'Prüfen Sie die geforderten Deutsch- oder Englischkenntnisse und planen Sie bei Bedarf Ihre sprachliche Weiterentwicklung.' },
      { title: 'Gezielt bewerben', text: 'Bewerben Sie sich auf passende Stellen und bestätigen Sie Arbeits- und Aufenthaltsbedingungen über aktuelle offizielle Informationen.' },
    ],
    officialLabel: 'Verlässliche Informationen',
    officialTitle: 'Offizielle und unabhängige Quellen',
    officialText: 'Regeln für Visa, Arbeitserlaubnis und Anerkennung können sich ändern. Prüfen Sie aktuelle Informationen vor einer Entscheidung über diese offiziellen Quellen.',
    officialLinks: [
      { name: 'Make it in Germany', desc: 'Das Portal der Bundesregierung für qualifizierte Fachkräfte.', href: 'https://www.make-it-in-germany.com/de/' },
      { name: 'Anerkennung in Deutschland', desc: 'Das offizielle Portal zur Anerkennung ausländischer Berufsqualifikationen.', href: 'https://www.anerkennung-in-deutschland.de/html/de/index.php' },
      { name: 'Bundesagentur für Arbeit', desc: 'Informationen der Bundesagentur für Arbeit zu Arbeitsmarkt und Berufen.', href: 'https://www.arbeitsagentur.de/' },
    ],
    go: 'Ratgeber öffnen',
  },
} as const;

const S = {
  hero: { background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%)', padding: '72px 24px', textAlign: 'center' as const },
  container: { maxWidth: 1100, margin: '0 auto' },
  section: { padding: '72px 24px' },
  label: { color: '#2563eb', fontSize: 12, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.12em' },
  h2: { color: '#0f172a', fontSize: 'clamp(1.6rem, 3vw, 2.25rem)', lineHeight: 1.25, margin: '10px 0 14px' },
  text: { color: '#64748b', lineHeight: 1.75 },
};

export default async function AlmanyaRehberiPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = locale === 'de' ? 'de' : 'tr';
  const copy = COPY[loc];

  return (
    <main style={{ paddingTop: 72, background: '#f8fafc' }}>
      <section style={S.hero}>
        <div style={{ ...S.container, maxWidth: 850 }}>
          <p style={{ color: '#93c5fd', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{copy.badge}</p>
          <h1 style={{ color: '#fff', fontSize: 'clamp(2rem, 5vw, 3.4rem)', lineHeight: 1.15, margin: '16px 0 20px' }}>{copy.title}</h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.1rem', lineHeight: 1.75, margin: 0 }}>{copy.subtitle}</p>
        </div>
      </section>

      <section style={{ ...S.section, background: '#f8fafc' }}>
        <div style={S.container}>
          <Breadcrumbs items={[
            { name: loc === 'de' ? 'Startseite' : 'Ana Sayfa', href: localizedPath(loc, '/') },
            { name: copy.title, href: localizedPath(loc, '/almanya-rehberi') },
          ]} />
          <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 40px' }}>
            <span style={S.label}>{copy.topicsLabel}</span>
            <h2 style={S.h2}>{copy.topicsTitle}</h2>
            <p style={S.text}>{copy.topicsText}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {ARTICLES.map(({ Icon, href, color, bg }, index) => {
              const article = copy.articles[index];
              return (
                <Link key={article.title} href={localizedPath(loc, href)} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 18, padding: 26, textDecoration: 'none' }}>
                  <div style={{ width: 50, height: 50, borderRadius: 14, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                    <Icon size={24} color={color} />
                  </div>
                  <span style={{ color, fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>{article.tag}</span>
                  <h3 style={{ color: '#0f172a', margin: '8px 0 10px' }}>{article.title}</h3>
                  <p style={{ ...S.text, fontSize: 14 }}>{article.desc}</p>
                  <span style={{ color, fontWeight: 600, fontSize: 13 }}>{copy.go} →</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section style={{ ...S.section, background: '#fff' }}>
        <div style={{ ...S.container, maxWidth: 900 }}>
          <span style={S.label}>{copy.stepsLabel}</span>
          <h2 style={S.h2}>{copy.stepsTitle}</h2>
          <p style={{ ...S.text, maxWidth: 760 }}>{copy.stepsText}</p>
          <ol style={{ listStyle: 'none', padding: 0, margin: '36px 0 0', display: 'grid', gap: 16 }}>
            {copy.steps.map((step, index) => (
              <li key={step.title} style={{ display: 'flex', gap: 18, padding: 22, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 16 }}>
                <span aria-hidden="true" style={{ width: 36, height: 36, flexShrink: 0, borderRadius: '50%', background: '#2563eb', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>{index + 1}</span>
                <div>
                  <h3 style={{ color: '#0f172a', margin: '0 0 6px', fontSize: '1rem' }}>{step.title}</h3>
                  <p style={{ ...S.text, margin: 0 }}>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section style={{ ...S.section, background: '#f8fafc' }}>
        <div style={S.container}>
          <div style={{ textAlign: 'center', maxWidth: 780, margin: '0 auto 36px' }}>
            <BookOpen size={30} color="#2563eb" />
            <span style={{ ...S.label, display: 'block', marginTop: 12 }}>{copy.officialLabel}</span>
            <h2 style={S.h2}>{copy.officialTitle}</h2>
            <p style={S.text}>{copy.officialText}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18 }}>
            {copy.officialLinks.map((link) => (
              <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, padding: 24, textDecoration: 'none' }}>
                <h3 style={{ color: '#0f172a', display: 'flex', alignItems: 'center', gap: 8, margin: '0 0 10px' }}>{link.name}<ExternalLink size={16} color="#2563eb" /></h3>
                <p style={{ ...S.text, margin: 0 }}>{link.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <JobLandingLinks locale={loc} />
    </main>
  );
}
