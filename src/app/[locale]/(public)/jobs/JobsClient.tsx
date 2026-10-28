'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import type { Job } from '@prisma/client';

/* ─── Salary / Relocation / German level helpers ─────────── */
function getSalaryBadge(sector: string): string {
  const s = sector.toLowerCase();
  if (s.includes('it') || s.includes('yazılım') || s.includes('software')) return '3.500 – 5.500 €';
  if (s.includes('mühendis') || s.includes('ingenieur') || s.includes('engineer')) return '3.200 – 5.000 €';
  if (s.includes('sağlık') || s.includes('gesundheit') || s.includes('health')) return '2.800 – 4.200 €';
  if (s.includes('muhasebe') || s.includes('buchhaltung') || s.includes('finance')) return '2.600 – 3.800 €';
  if (s.includes('lojistik') || s.includes('logistik')) return '2.400 – 3.400 €';
  return '2.200 – 3.500 €';
}

function getGermanReq(type: string): string {
  const t = type.toLowerCase();
  if (t.includes('full') || t.includes('vollzeit') || t.includes('tam')) return 'B1+';
  if (t.includes('intern') || t.includes('staj')) return 'A2+';
  return 'B2+';
}

/* ─── Custom Select ────────────────────────────────────────── */
function CustomSelect({ options, value, onChange, placeholder }: {
  options: string[]; value: string; onChange: (v: string) => void; placeholder: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: '10px 14px', borderRadius: '10px',
          border: `1px solid ${isOpen ? '#2563eb' : '#e2e8f0'}`,
          background: '#fff', cursor: 'pointer', display: 'flex',
          justifyContent: 'space-between', alignItems: 'center',
          fontSize: '0.875rem', color: value ? '#0f172a' : '#94a3b8',
          boxShadow: isOpen ? '0 0 0 3px rgba(37,99,235,0.1)' : 'none',
          transition: 'border-color 0.2s, box-shadow 0.2s',
        }}
      >
        <span>{value || placeholder}</span>
        <span style={{ fontSize: '0.6rem', color: '#94a3b8', transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▼</span>
      </div>
      {isOpen && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, zIndex: 50,
          background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px',
          boxShadow: '0 12px 40px rgba(0,0,0,0.12)', overflow: 'hidden',
        }}>
          {['', ...options].map((opt) => (
            <div
              key={opt || '__all'}
              onClick={() => { onChange(opt); setIsOpen(false); }}
              style={{
                padding: '10px 14px', fontSize: '0.875rem', cursor: 'pointer',
                background: value === opt ? '#eff6ff' : 'transparent',
                color: value === opt ? '#2563eb' : '#374151',
                fontWeight: value === opt ? 600 : 400,
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => { if (value !== opt) (e.currentTarget as HTMLElement).style.background = '#f8fafc'; }}
              onMouseLeave={e => { if (value !== opt) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
            >
              {opt || placeholder}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Immo-style badge ────────────────────────────────────── */
function Badge({ children, color = '#2563eb', bg = '#eff6ff' }: { children: React.ReactNode; color?: string; bg?: string }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '4px',
      padding: '4px 10px', borderRadius: '100px',
      background: bg, color, fontSize: '0.72rem', fontWeight: 700,
      whiteSpace: 'nowrap',
    }}>
      {children}
    </span>
  );
}

/* ─── Main Component ─────────────────────────────────────── */
export default function JobsClient({ initialJobs }: { initialJobs: Job[] }) {
  const t  = useTranslations('jobs');
  const tc = useTranslations('common');
  const tg = useTranslations('germanyJobs');
  const locale = useLocale();

  const [searchTerm,         setSearchTerm]         = useState('');
  const [selectedSector,     setSelectedSector]     = useState('');
  const [selectedType,       setSelectedType]       = useState('');
  const [selectedLocation,   setSelectedLocation]   = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');
  const [currentPage,        setCurrentPage]        = useState(1);
  const jobsPerPage = 9;

  const sectors     = useMemo(() => [...new Set(initialJobs.map(j => j.sector))].filter(Boolean).sort(),  [initialJobs]);
  const types       = useMemo(() => [...new Set(initialJobs.map(j => j.type))].filter(Boolean).sort(),    [initialJobs]);

  const experiences = useMemo(() => [...new Set(initialJobs.map(j => j.experienceLevel))].filter(Boolean).sort() as string[], [initialJobs]);

  const filteredJobs = useMemo(() => {
    return initialJobs.filter(job => {
      const title = locale === 'de' ? job.titleDe : job.title;
      const desc  = locale === 'de' ? job.descriptionDe : job.description;
      const matchSearch  = title.toLowerCase().includes(searchTerm.toLowerCase()) || desc.toLowerCase().includes(searchTerm.toLowerCase()) || job.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchSector  = !selectedSector   || job.sector          === selectedSector;
      const matchType    = !selectedType     || job.type            === selectedType;
      const matchLoc     = !selectedLocation || job.location.toLowerCase().includes(selectedLocation.toLowerCase());
      const matchExp     = !selectedExperience || job.experienceLevel === selectedExperience;
      return matchSearch && matchSector && matchType && matchLoc && matchExp;
    });
  }, [initialJobs, searchTerm, selectedSector, selectedType, selectedLocation, selectedExperience, locale]);

  const totalPages    = Math.ceil(filteredJobs.length / jobsPerPage);
  const currentJobs   = filteredJobs.slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage);

  const reset = () => { setSearchTerm(''); setSelectedLocation(''); setSelectedSector(''); setSelectedExperience(''); setSelectedType(''); setCurrentPage(1); };
  const goPage = (p: number) => { setCurrentPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingTop: '72px' }}>

      {/* ── Hero ── */}
      <section style={{
        background: 'linear-gradient(135deg, #0a1228 0%, #0f2060 50%, #0a1228 100%)',
        padding: '72px 24px 56px',
        textAlign: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div aria-hidden style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 25% 50%, rgba(37,99,235,0.18) 0%, transparent 55%), radial-gradient(circle at 75% 50%, rgba(96,165,250,0.1) 0%, transparent 55%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '720px', margin: '0 auto' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#93c5fd', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>
            {tg('heroLabel')}
          </p>
          <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 800, color: '#fff', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '16px' }}>
            {tg('heroTitle')}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: '32px', fontSize: '1.05rem' }}>
            {tg('heroSubtitle')}
          </p>

          {/* Search bar */}
          <div style={{ display: 'flex', gap: '10px', maxWidth: '560px', margin: '0 auto' }}>
            <input
              type="text"
              placeholder={tg('searchPlaceholder')}
              value={searchTerm}
              onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              style={{
                flex: 1, padding: '14px 20px', borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.15)',
                background: 'rgba(255,255,255,0.1)', color: '#fff',
                fontSize: '0.95rem', outline: 'none',
                backdropFilter: 'blur(8px)',
              }}
            />
            <button
              style={{
                padding: '14px 28px', borderRadius: '12px', border: 'none',
                background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                color: '#fff', fontWeight: 700, fontSize: '0.95rem',
                cursor: 'pointer', whiteSpace: 'nowrap',
                boxShadow: '0 4px 16px rgba(37,99,235,0.5)',
              }}
            >
              {tc('search')}
            </button>
          </div>
        </div>
      </section>

      {/* ── Content Layout ── */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px', display: 'grid', gridTemplateColumns: '260px 1fr', gap: '28px', alignItems: 'start' }}>

        {/* ── Sidebar Filters ── */}
        <aside style={{ position: 'sticky', top: '96px' }}>
          <div style={{ background: '#fff', borderRadius: '20px', padding: '28px 24px', boxShadow: '0 4px 24px rgba(15,23,42,0.08)', border: '1px solid rgba(15,23,42,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>{tg('filters')}</h2>
              <button onClick={reset} style={{ fontSize: '0.75rem', color: '#2563eb', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>{tg('resetFilters')}</button>
            </div>

            {[
              { label: tg('filterCity'), content: <input type="text" placeholder={tg('filterCityPlaceholder')} value={selectedLocation} onChange={e => { setSelectedLocation(e.target.value); setCurrentPage(1); }} style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' }} /> },
              { label: t('sector'), content: <CustomSelect options={sectors} value={selectedSector} onChange={v => { setSelectedSector(v); setCurrentPage(1); }} placeholder={tg('allOptions')} /> },
              { label: t('type'),   content: <CustomSelect options={types}   value={selectedType}   onChange={v => { setSelectedType(v);   setCurrentPage(1); }} placeholder={tg('allOptions')} /> },
              { label: tg('filterExp'), content: <CustomSelect options={experiences} value={selectedExperience} onChange={v => { setSelectedExperience(v); setCurrentPage(1); }} placeholder={tg('allOptions')} /> },
            ].map(({ label, content }, i) => (
              <div key={i} style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</label>
                {content}
              </div>
            ))}
          </div>

          {/* CTA card */}
          <div style={{ marginTop: '20px', background: 'linear-gradient(135deg, #1e3a8a, #1d4ed8)', borderRadius: '20px', padding: '28px 24px', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '12px' }}>🎯</div>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginBottom: '8px', lineHeight: 1.3 }}>{tg('sidebarCtaTitle')}</h3>
            <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', marginBottom: '16px', lineHeight: 1.6 }}>{tg('sidebarCtaDesc')}</p>
            <Link href="/on-basvuru" style={{ display: 'block', padding: '12px', borderRadius: '10px', background: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: '0.85rem', fontWeight: 700, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.25)', transition: 'background 0.2s' }}>
              {tg('sidebarCtaBtn')}
            </Link>
          </div>
        </aside>

        {/* ── Job Grid ── */}
        <main>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', gap: '12px', flexWrap: 'wrap' }}>
            <p style={{ fontSize: '0.9rem', color: '#64748b', margin: 0 }}>
              <strong style={{ color: '#0f172a' }}>{filteredJobs.length}</strong> {tg('resultsFound')}
            </p>
          </div>

          {currentJobs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 24px', background: '#fff', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔍</div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>{tc('noResults')}</h3>
              <p style={{ color: '#64748b', marginBottom: '20px' }}>{tg('tryDifferentFilters')}</p>
              <button onClick={reset} style={{ padding: '10px 24px', borderRadius: '10px', background: '#2563eb', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 600 }}>{tg('resetFilters')}</button>
            </div>
          ) : (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                {currentJobs.map((job, idx) => {
                  const title     = locale === 'de' ? job.titleDe    : job.title;
                  const shortDesc = locale === 'de' ? job.shortDescDe : job.shortDesc;
                  const salary    = getSalaryBadge(job.sector);
                  const germanLvl = getGermanReq(job.type);
                  const relocation = idx % 3 !== 2; // demo: most jobs have relocation support

                  return (
                    <div
                      key={job.id}
                      style={{
                        background: '#ffffff', borderRadius: '20px',
                        border: '1px solid rgba(15,23,42,0.07)',
                        boxShadow: '0 4px 20px rgba(15,23,42,0.07)',
                        overflow: 'hidden', display: 'flex', flexDirection: 'column',
                        transition: 'transform 0.25s, box-shadow 0.25s',
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 48px rgba(37,99,235,0.13)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';    (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(15,23,42,0.07)'; }}
                    >
                      {/* Card top color bar */}
                      <div style={{ height: '4px', background: 'linear-gradient(90deg, #2563eb, #60a5fa)' }} />

                      <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                        {/* Sector + type */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
                          <Badge>{job.sector}</Badge>
                          <Badge color="#7c3aed" bg="#f5f3ff">{job.type}</Badge>
                          {job.isFeatured && <Badge color="#b45309" bg="#fef3c7">⭐ {tg('featured')}</Badge>}
                        </div>

                        {/* Title */}
                        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', marginBottom: '8px', lineHeight: 1.35 }}>
                          {title}
                        </h3>

                        {/* Short desc */}
                        <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.6, marginBottom: '16px', flex: 1,
                          display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {shortDesc}
                        </p>

                        {/* Location */}
                        <div style={{ fontSize: '0.825rem', color: '#64748b', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          📍 {job.location}
                        </div>

                        {/* ── Germany immigration badges ── */}
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px', paddingTop: '14px', borderTop: '1px solid #f1f5f9' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '6px 10px', borderRadius: '8px', background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
                            <span style={{ fontSize: '0.75rem' }}>💰</span>
                            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#15803d' }}>{salary}</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '6px 10px', borderRadius: '8px', background: '#f0f9ff', border: '1px solid #bae6fd' }}>
                            <span style={{ fontSize: '0.75rem' }}>🌐</span>
                            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#0369a1' }}>Almanca {germanLvl}</span>
                          </div>
                          {relocation && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '6px 10px', borderRadius: '8px', background: '#faf5ff', border: '1px solid #e9d5ff' }}>
                              <span style={{ fontSize: '0.75rem' }}>✈️</span>
                              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#7c3aed' }}>{tg('relocationSupport')}</span>
                            </div>
                          )}
                        </div>

                        {/* Action buttons */}
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <Link
                            href="/on-basvuru"
                            style={{
                              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                              padding: '12px', borderRadius: '12px', textDecoration: 'none',
                              background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                              color: '#fff', fontSize: '0.875rem', fontWeight: 700,
                              boxShadow: '0 4px 12px rgba(37,99,235,0.35)',
                            }}
                          >
                            {tg('applyBtn')}
                          </Link>
                          <Link
                            href={`/jobs/${job.id}`}
                            style={{
                              padding: '12px 16px', borderRadius: '12px', textDecoration: 'none',
                              background: '#f8fafc', border: '1px solid #e2e8f0',
                              color: '#374151', fontSize: '0.875rem', fontWeight: 600,
                              display: 'flex', alignItems: 'center',
                            }}
                          >
                            {tc('viewDetails')}
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '40px', flexWrap: 'wrap' }}>
                  <button disabled={currentPage === 1} onClick={() => goPage(currentPage - 1)}
                    style={{ padding: '10px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', background: '#fff', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', opacity: currentPage === 1 ? 0.4 : 1 }}>
                    ❮
                  </button>
                  {Array.from({ length: totalPages }).map((_, i) => {
                    const p = i + 1;
                    if (p === 1 || p === totalPages || (p >= currentPage - 1 && p <= currentPage + 1)) {
                      return (
                        <button key={p} onClick={() => goPage(p)}
                          style={{ padding: '10px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', background: currentPage === p ? '#2563eb' : '#fff', color: currentPage === p ? '#fff' : '#374151', fontWeight: currentPage === p ? 700 : 400, cursor: 'pointer' }}>
                          {p}
                        </button>
                      );
                    } else if (p === currentPage - 2 || p === currentPage + 2) {
                      return <span key={p} style={{ padding: '10px 8px', color: '#94a3b8' }}>…</span>;
                    }
                    return null;
                  })}
                  <button disabled={currentPage === totalPages} onClick={() => goPage(currentPage + 1)}
                    style={{ padding: '10px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', background: '#fff', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', opacity: currentPage === totalPages ? 0.4 : 1 }}>
                    ❯
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      <style>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 260px"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
