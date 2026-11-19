import Link from 'next/link';
import { JOB_LANDING_PAGES, jobLandingPath } from '@/lib/jobLandingPages';
import type { Locale } from '@/lib/site';

export default function JobLandingLinks({ locale, currentKey }: { locale: string; currentKey?: string }) {
  const loc: Locale = locale === 'de' ? 'de' : 'tr';
  const pages = JOB_LANDING_PAGES.filter((page) => page.key !== currentKey);

  return (
    <section style={{ background: '#f8fafc', padding: '64px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <h2 style={{ color: '#0f172a', fontSize: 'clamp(1.5rem, 3vw, 2rem)', margin: '0 0 12px' }}>
          {loc === 'de' ? 'Jobs nach Branche und Stadt entdecken' : 'Sektöre ve Şehre Göre İş İlanları'}
        </h2>
        <p style={{ color: '#64748b', lineHeight: 1.7, maxWidth: 720, margin: '0 0 28px' }}>
          {loc === 'de'
            ? 'Öffnen Sie eine passende Suchseite, um aktuelle Stellen in einer bestimmten Branche oder Stadt zu vergleichen.'
            : 'Belirli bir sektördeki veya şehirdeki aktif ilanları karşılaştırmak için size uygun arama sayfasını açın.'}
        </p>
        <nav aria-label={loc === 'de' ? 'Beliebte Jobsuchen' : 'Popüler iş aramaları'}>
          <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 12, listStyle: 'none', padding: 0, margin: 0 }}>
            {pages.map((page) => (
              <li key={page.key}>
                <Link
                  href={jobLandingPath(loc, page)}
                  style={{ display: 'block', padding: '16px 18px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, color: '#1d4ed8', fontWeight: 600, textDecoration: 'none' }}
                >
                  {page.copy[loc].title} <span aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
