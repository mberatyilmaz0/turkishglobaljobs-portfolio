
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import type { Metadata } from 'next';
import { getContent } from '@/actions/content';
import {
  OPPORTUNITY_SCORING_DEFAULT,
  OPPORTUNITY_REQUIREMENTS_DEFAULT,
  type Bilingual,
  type OpportunityScoringContent,
  type OpportunityRequirementsContent,
} from '@/lib/contentDefaults';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.your-domain.com';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isDE = locale === 'de';
  return {
    title: isDE ? 'Chancenkarte Deutschland – Beratung | Turkish Global' : 'Fırsat Kartı (Chancenkarte) Danışmanlığı | Turkish Global',
    description: isDE
      ? 'Alles zur deutschen Chancenkarte: Punktesystem, Voraussetzungen und wie Turkish Global Sie bei der Antragstellung begleitet.'
      : 'Almanya Fırsat Kartı nedir, kimler başvurabilir, puanlama nasıl çalışır? Turkish Global uzmanlarıyla hızlı ve doğru başvuru yapın.',
    alternates: {
      canonical: isDE ? `${BASE_URL}/de/chancenkarte` : `${BASE_URL}/tr/firsat-karti`,
      languages: { tr: `${BASE_URL}/tr/firsat-karti`, de: `${BASE_URL}/de/chancenkarte` },
    },
  };
}

export default async function FirsatKartiPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isDE = locale === 'de';

  const [scoringData, requirementsData] = await Promise.all([
    getContent<Bilingual<OpportunityScoringContent>>('opportunity.scoring'),
    getContent<Bilingual<OpportunityRequirementsContent>>('opportunity.requirements'),
  ]);

  const scoring = (isDE ? scoringData.de : scoringData.tr) ?? (isDE ? OPPORTUNITY_SCORING_DEFAULT.de : OPPORTUNITY_SCORING_DEFAULT.tr);
  const requirements = (isDE ? requirementsData.de : requirementsData.tr) ?? (isDE ? OPPORTUNITY_REQUIREMENTS_DEFAULT.de : OPPORTUNITY_REQUIREMENTS_DEFAULT.tr);

  const heroTitle = isDE ? 'Die Chancenkarte für Deutschland' : 'Fırsat Kartı (Chancenkarte)';
  const heroSubtitle = isDE
    ? 'Seit 2024: Das neue Visum zum Jobsuchen in Deutschland. Bis zu 1 Jahr legal suchen, ohne vorher ein Jobangebot zu haben.'
    : '2024\'ten itibaren geçerli: Almanya\'da iş aramak için 1 yıla kadar kalma hakkı veren yeni vize türü. Önceden iş teklifi şartı yok.';
  const ctaText = isDE ? 'Kostenlose Erstberatung starten' : 'Ücretsiz Ön Değerlendirme Başlat';

  return (
    <main style={{ background: '#f8fafc', minHeight: '100vh', paddingTop: '72px' }}>

      {/* ── Hero ── */}
      <section style={{
        background: 'linear-gradient(135deg, #0a1228 0%, #0f2060 55%, #0a1228 100%)',
        padding: '80px 24px 72px', textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <div aria-hidden style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(37,99,235,0.2) 0%, transparent 55%), radial-gradient(circle at 70% 50%, rgba(96,165,250,0.12) 0%, transparent 55%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto' }}>
          <span style={{ display: 'inline-block', padding: '6px 18px', borderRadius: '100px', background: 'rgba(37,99,235,0.2)', border: '1px solid rgba(96,165,250,0.35)', fontSize: '0.75rem', fontWeight: 700, color: '#93c5fd', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '24px' }}>
            🇩🇪 {isDE ? 'Neu ab 2024' : '2024\'ten İtibaren'}
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 800, color: '#fff', lineHeight: 1.12, letterSpacing: '-0.03em', marginBottom: '20px' }}>
            {heroTitle}
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.75, maxWidth: '640px', margin: '0 auto 40px' }}>
            {heroSubtitle}
          </p>
          <Link href="/pre-application" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '16px 40px', borderRadius: '12px', background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: '1rem', boxShadow: '0 8px 32px rgba(37,99,235,0.55)' }}>
            {ctaText} →
          </Link>
        </div>
      </section>

      {/* ── What is Chancenkarte ── */}
      <section style={{ background: '#fff', padding: '80px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: '0.78rem', fontWeight: 700, color: '#2563eb', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>
              {isDE ? 'Was ist die Chancenkarte?' : 'Fırsat Kartı Nedir?'}
            </p>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 800, color: '#0f172a', lineHeight: 1.2, letterSpacing: '-0.02em', marginBottom: '20px' }}>
              {isDE ? 'Jobsuche ohne Jobangebot' : 'İş Teklifi Olmadan Almanya\'da İş Arama'}
            </h2>
            <p style={{ color: '#475569', lineHeight: 1.8, fontSize: '1rem', marginBottom: '16px' }}>
              {isDE
                ? 'Die Chancenkarte (§ 20a AufenthG) ermöglicht qualifizierten Fachkräften aus Drittstaaten, bis zu einem Jahr in Deutschland nach Arbeit zu suchen – ganz ohne vorheriges Jobangebot. Das System basiert auf Punkten für Qualifikation, Erfahrung, Sprache und Alter.'
                : 'Fırsat Kartı (Chancenkarte), üçüncü ülke vatandaşlarının önceden iş teklifi almaksızın Almanya\'da 1 yıla kadar iş arayabilmesini sağlayan yeni bir oturma vizesidir. Sistem; eğitim, deneyim, dil becerisi ve yaşa göre puan esasına dayanmaktadır.'}
            </p>
            <p style={{ color: '#475569', lineHeight: 1.8, fontSize: '1rem' }}>
              {isDE
                ? 'Wer mindestens 6 Punkte erreicht und die Grundvoraussetzungen erfüllt, kann die Chancenkarte beantragen.'
                : 'En az 6 puan toplayan ve temel şartları karşılayan herkes başvurabilir.'}
            </p>
          </div>

          {/* Key facts */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {[
              { value: '1 Yıl', label: isDE ? 'Aufenthaltsdauer' : 'Kalma Süresi', color: '#2563eb' },
              { value: '6+', label: isDE ? 'Mindestpunkte' : 'Min. Puan', color: '#7c3aed' },
              { value: '0', label: isDE ? 'Jobangebot nötig' : 'İş Teklifi Şartı', color: '#059669' },
              { value: '2024', label: isDE ? 'In Kraft seit' : 'Yürürlük Yılı', color: '#d97706' },
            ].map(({ value, label, color }, i) => (
              <div key={i} style={{ background: '#f8fafc', borderRadius: '16px', padding: '24px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '2rem', fontWeight: 800, color, lineHeight: 1, marginBottom: '6px' }}>{value}</div>
                <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Scoring System ── */}
      <section style={{ background: '#f8fafc', padding: '80px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <p style={{ fontSize: '0.78rem', fontWeight: 700, color: '#2563eb', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>
              {scoring.label}
            </p>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 800, color: '#0f172a', lineHeight: 1.2, letterSpacing: '-0.02em', marginBottom: '16px' }}>
              {scoring.title}
            </h2>
            <p style={{ color: '#64748b', lineHeight: 1.7, maxWidth: '520px', margin: '0 auto' }}>
              {scoring.subtitle}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {scoring.cards.map(({ icon, title, points }, i) => (
              <div key={i} className="score-card" style={{ background: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '16px', transition: 'box-shadow 0.2s' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'linear-gradient(135deg, #eff6ff, #dbeafe)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>{icon}</div>
                <div>
                  <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.975rem', marginBottom: '4px' }}>{title}</div>
                  <div style={{ fontSize: '0.8rem', color: '#2563eb', fontWeight: 600 }}>{points}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Requirements ── */}
      <section style={{ background: '#fff', padding: '80px 24px' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ fontSize: '0.78rem', fontWeight: 700, color: '#2563eb', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>
              {requirements.label}
            </p>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2rem)', fontWeight: 800, color: '#0f172a', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
              {requirements.title}
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {requirements.items.map(({ icon, text }, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '18px 24px', background: '#f8fafc', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#fff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0 }}>{icon}</div>
                <p style={{ color: '#374151', fontWeight: 500, fontSize: '0.95rem', margin: 0, lineHeight: 1.5 }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Process ── */}
      <section style={{ background: 'linear-gradient(135deg, #f0f9ff, #f8fafc)', padding: '80px 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <p style={{ fontSize: '0.78rem', fontWeight: 700, color: '#2563eb', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>
              {isDE ? 'So helfen wir' : 'Biz Nasıl Yardım Ediyoruz?'}
            </p>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2rem)', fontWeight: 800, color: '#0f172a', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
              {isDE ? 'Ihr Weg mit Turkish Global' : 'Turkish Global ile Süreciniz'}
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            {[
              { icon: '📋', tr: 'Ücretsiz ön değerlendirme formumuzu doldurun', de: 'Kostenloses Erstbewertungsformular ausfüllen' },
              { icon: '🔍', tr: 'Uzmanımız puanlarınızı hesaplar ve uygunluk analizi yapar', de: 'Unser Experte berechnet Ihre Punkte und prüft die Eignung' },
              { icon: '📑', tr: 'Gerekli belgeler hazırlanır ve vize başvurusu yapılır', de: 'Unterlagen werden vorbereitet und Visum beantragt' },
              { icon: 'DE', tr: 'Almanya\'ya yerleşin ve iş arayın', de: 'In Deutschland einleben und Arbeit suchen' },
            ].map(({ icon, tr, de }, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: '20px', padding: '32px 24px', textAlign: 'center', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(15,23,42,0.06)', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 800, color: '#fff' }}>{i + 1}</div>
                <div style={{ fontSize: '2rem', marginBottom: '12px', marginTop: '8px' }}>{icon}</div>
                <p style={{ color: '#374151', fontSize: '0.9rem', fontWeight: 500, lineHeight: 1.6, margin: 0 }}>{isDE ? de : tr}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: 'linear-gradient(135deg, #0a1228 0%, #0f2060 50%, #0a1228 100%)', padding: '80px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 25% 50%, rgba(37,99,235,0.2) 0%, transparent 55%), radial-gradient(circle at 75% 50%, rgba(96,165,250,0.1) 0%, transparent 55%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '640px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)', fontWeight: 800, color: '#fff', lineHeight: 1.2, marginBottom: '16px', letterSpacing: '-0.02em' }}>
            {isDE ? 'Bereit für die Chancenkarte?' : 'Fırsat Kartı\'na Hazır mısınız?'}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: '36px', fontSize: '1.05rem' }}>
            {isDE
              ? 'Lassen Sie uns Ihre Chancen kostenlos berechnen. Unser Experte meldet sich innerhalb von 24 Stunden.'
              : 'Puanlarınızı ücretsiz hesaplayalım. Uzmanımız 24 saat içinde sizinle iletişime geçecek.'}
          </p>
          <Link href="/pre-application" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '18px 48px', borderRadius: '14px', background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: '1.05rem', boxShadow: '0 8px 32px rgba(37,99,235,0.55)' }}>
            {ctaText} →
          </Link>
        </div>
      </section>

      <style>{`
        .score-card:hover {
          box-shadow: 0 8px 32px rgba(37,99,235,0.1);
        }
        @media (max-width: 768px) {
          section > div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}
