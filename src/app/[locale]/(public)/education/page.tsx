import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import type { Metadata } from 'next';
import { getContent } from '@/actions/content';
import {
  EDUCATION_COMPARE_DEFAULT,
  EDUCATION_UNI_DEFAULT,
  EDUCATION_AUS_DEFAULT,
  type Bilingual,
  type EducationCompareContent,
  type EducationUniContent,
  type EducationAusContent,
} from '@/lib/contentDefaults';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.your-domain.com';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isDE = locale === 'de';
  return {
    title: isDE ? 'Studium & Ausbildung in Deutschland | Turkish Global' : 'Almanya\'da Eğitim: Üniversite & Ausbildung | Turkish Global',
    description: isDE
      ? 'Alles über Studium und Ausbildung in Deutschland: Zulassungsvoraussetzungen, Bewerbungsprozess und wie Turkish Global Sie begleitet.'
      : 'Almanya\'da üniversite ve Ausbildung süreçleri, başvuru şartları, denklik ve Turkish Global danışmanlık hizmeti hakkında kapsamlı bilgi.',
    alternates: {
      canonical: isDE ? `${BASE_URL}/de/bildung-in-deutschland` : `${BASE_URL}/tr/almanya-egitim`,
      languages: { tr: `${BASE_URL}/tr/almanya-egitim`, de: `${BASE_URL}/de/bildung-in-deutschland` },
    },
  };
}

export default async function EgitimPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isDE = locale === 'de';

  const [compareData, uniData, ausData] = await Promise.all([
    getContent<Bilingual<EducationCompareContent>>('education.compare'),
    getContent<Bilingual<EducationUniContent>>('education.uni'),
    getContent<Bilingual<EducationAusContent>>('education.aus'),
  ]);

  const compare = isDE ? compareData.de : compareData.tr;
  const uni = isDE ? uniData.de : uniData.tr;
  const aus = isDE ? ausData.de : ausData.tr;

  // Fallback güvencesi
  const safeCompare = compare ?? (isDE ? EDUCATION_COMPARE_DEFAULT.de : EDUCATION_COMPARE_DEFAULT.tr);
  const safeUni = uni ?? (isDE ? EDUCATION_UNI_DEFAULT.de : EDUCATION_UNI_DEFAULT.tr);
  const safeAus = aus ?? (isDE ? EDUCATION_AUS_DEFAULT.de : EDUCATION_AUS_DEFAULT.tr);

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
            🎓 {isDE ? 'Studium & Ausbildung' : 'Almanya\'da Eğitim'}
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 800, color: '#fff', lineHeight: 1.12, letterSpacing: '-0.03em', marginBottom: '20px' }}>
            {isDE ? 'Studium & Ausbildung in Deutschland' : 'Almanya\'da Üniversite ve Ausbildung'}
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.75, maxWidth: '640px', margin: '0 auto 40px' }}>
            {isDE
              ? 'Zwei Wege zu einer erfolgreichen Zukunft in Deutschland. Wir begleiten Sie von der Zulassung bis zum Visum.'
              : 'Almanya\'da geleceğinize iki farklı yoldan ulaşabilirsiniz. Kabul aşamasından vizeye kadar yanınızdayız.'}
          </p>

          {/* Two option pills */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#university" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 32px', borderRadius: '12px', background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: '0.95rem', boxShadow: '0 6px 24px rgba(37,99,235,0.5)' }}>
              🎓 {isDE ? 'Universität' : 'Üniversite'}
            </a>
            <a href="#ausbildung" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 32px', borderRadius: '12px', background: 'rgba(255,255,255,0.1)', color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: '0.95rem', border: '1px solid rgba(255,255,255,0.25)', backdropFilter: 'blur(8px)' }}>
              🔧 Ausbildung
            </a>
          </div>
        </div>
      </section>

      {/* ── Quick Compare ── */}
      <section style={{ background: '#fff', padding: '64px 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <p style={{ fontSize: '0.78rem', fontWeight: 700, color: '#2563eb', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>
              {safeCompare.label}
            </p>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2rem)', fontWeight: 800, color: '#0f172a', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
              {safeCompare.title}
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            {safeCompare.cards.map((card, ci) => {
              const color = ci === 0 ? '#2563eb' : '#7c3aed';
              const bg = ci === 0 ? '#eff6ff' : '#f5f3ff';
              return (
                <div key={ci} style={{ background: '#fff', borderRadius: '20px', border: `2px solid ${bg}`, overflow: 'hidden', boxShadow: '0 4px 20px rgba(15,23,42,0.07)' }}>
                  <div style={{ background: bg, padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontWeight: 800, color, fontSize: '1.1rem' }}>{card.title}</span>
                  </div>
                  <div style={{ padding: '20px 24px' }}>
                    {card.rows.map(({ label, value }, ri) => (
                      <div key={ri} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '10px 0', borderBottom: ri < card.rows.length - 1 ? '1px solid #f1f5f9' : 'none', gap: '12px' }}>
                        <span style={{ fontSize: '0.825rem', color: '#64748b', fontWeight: 600, flexShrink: 0 }}>{label}</span>
                        <span style={{ fontSize: '0.875rem', color: '#0f172a', fontWeight: 600, textAlign: 'right' }}>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── University Section ── */}
      <section id="university" style={{ background: '#f8fafc', padding: '80px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '56px', alignItems: 'start' }}>
            <div>
              <p style={{ fontSize: '0.78rem', fontWeight: 700, color: '#2563eb', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>
                {safeUni.label}
              </p>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.1rem)', fontWeight: 800, color: '#0f172a', lineHeight: 1.2, letterSpacing: '-0.02em', marginBottom: '20px' }}>
                {safeUni.title}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {safeUni.steps.map(({ icon, text }, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', padding: '16px 20px', background: '#fff', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#eff6ff', border: '1px solid #dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>{icon}</div>
                    <div>
                      <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#2563eb', display: 'block', marginBottom: '2px' }}>Adım {i + 1}</span>
                      <p style={{ fontSize: '0.875rem', color: '#374151', margin: 0, fontWeight: 500, lineHeight: 1.5 }}>{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p style={{ fontSize: '0.78rem', fontWeight: 700, color: '#2563eb', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>
                {safeUni.rightLabel}
              </p>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', marginBottom: '20px', lineHeight: 1.3 }}>
                {safeUni.rightTitle}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {safeUni.programs.map(({ name, tag }, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', background: '#fff', borderRadius: '14px', border: '1px solid #e2e8f0', gap: '12px' }}>
                    <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.95rem' }}>{name}</span>
                    <span style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 600, background: '#f0fdf4', padding: '4px 10px', borderRadius: '100px', whiteSpace: 'nowrap' }}>✓ {tag}</span>
                  </div>
                ))}
              </div>

              {/* Tip box */}
              <div style={{ marginTop: '24px', padding: '20px 24px', background: 'linear-gradient(135deg, #eff6ff, #f0f9ff)', borderRadius: '16px', border: '1px solid #bfdbfe' }}>
                <p style={{ fontSize: '0.875rem', color: '#1e40af', lineHeight: 1.7, margin: 0, fontWeight: 500 }}>
                  💡 {safeUni.tipBox}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Ausbildung Section ── */}
      <section id="ausbildung" style={{ background: '#fff', padding: '80px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '56px', alignItems: 'start' }}>
            <div>
              <p style={{ fontSize: '0.78rem', fontWeight: 700, color: '#7c3aed', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>
                {safeAus.label}
              </p>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.1rem)', fontWeight: 800, color: '#0f172a', lineHeight: 1.2, letterSpacing: '-0.02em', marginBottom: '20px' }}>
                {safeAus.title}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {safeAus.steps.map(({ icon, text }, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', padding: '16px 20px', background: '#f8fafc', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#f5f3ff', border: '1px solid #e9d5ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>{icon}</div>
                    <div>
                      <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#7c3aed', display: 'block', marginBottom: '2px' }}>Adım {i + 1}</span>
                      <p style={{ fontSize: '0.875rem', color: '#374151', margin: 0, fontWeight: 500, lineHeight: 1.5 }}>{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p style={{ fontSize: '0.78rem', fontWeight: 700, color: '#7c3aed', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>
                {safeAus.rightLabel}
              </p>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', marginBottom: '20px', lineHeight: 1.3 }}>
                {safeAus.rightTitle}
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {safeAus.fields.map(({ icon, name }, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <span style={{ fontSize: '1.4rem' }}>{icon}</span>
                    <span style={{ fontWeight: 600, color: '#374151', fontSize: '0.875rem' }}>{name}</span>
                  </div>
                ))}
              </div>

              {/* Tip box */}
              <div style={{ marginTop: '24px', padding: '20px 24px', background: 'linear-gradient(135deg, #f5f3ff, #faf5ff)', borderRadius: '16px', border: '1px solid #e9d5ff' }}>
                <p style={{ fontSize: '0.875rem', color: '#5b21b6', lineHeight: 1.7, margin: 0, fontWeight: 500 }}>
                  💡 {safeAus.tipBox}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: 'linear-gradient(135deg, #0a1228 0%, #0f2060 50%, #0a1228 100%)', padding: '80px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 25% 50%, rgba(37,99,235,0.2) 0%, transparent 55%), radial-gradient(circle at 75% 50%, rgba(96,165,250,0.1) 0%, transparent 55%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '640px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)', fontWeight: 800, color: '#fff', lineHeight: 1.2, marginBottom: '16px', letterSpacing: '-0.02em' }}>
            {isDE ? 'Welchen Weg wählen Sie?' : 'Hangi Yolu Seçersiniz?'}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: '36px', fontSize: '1.05rem' }}>
            {isDE
              ? 'Wir helfen Ihnen, den richtigen Bildungsweg zu finden und begleiten Sie durch den gesamten Prozess.'
              : 'Size en uygun eğitim yolunu belirlememize ve tüm süreci birlikte tamamlamamıza izin verin.'}
          </p>
          <Link href="/pre-application" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '18px 48px', borderRadius: '14px', background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: '1.05rem', boxShadow: '0 8px 32px rgba(37,99,235,0.55)' }}>
            {ctaText} →
          </Link>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          section div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}
