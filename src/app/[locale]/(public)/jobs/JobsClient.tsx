'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import type { Job } from '@prisma/client';


function CustomSelect({ 
  options, 
  value, 
  onChange, 
  placeholder 
}: { 
  options: string[], 
  value: string, 
  onChange: (val: string) => void, 
  placeholder: string 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="custom-select" ref={dropdownRef}>
      <div 
        className={`custom-select-trigger ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{value || placeholder}</span>
        <span className="arrow">▼</span>
      </div>
      
      {isOpen && (
        <div className="custom-select-dropdown fade-in">
          <div 
            className={`custom-select-option ${value === '' ? 'selected' : ''}`}
            onClick={() => { onChange(''); setIsOpen(false); }}
          >
            Tümü
          </div>
          {options.map((opt) => (
            <div 
              key={opt}
              className={`custom-select-option ${value === opt ? 'selected' : ''}`}
              onClick={() => { onChange(opt); setIsOpen(false); }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function JobsClient({ initialJobs }: { initialJobs: Job[] }) {
  const t = useTranslations('jobs');
  const tc = useTranslations('common');
  const locale = useLocale();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 12;

  const sectors = useMemo(() => Array.from(new Set(initialJobs.map(job => job.sector))).filter(Boolean).sort(), [initialJobs]);
  const types = useMemo(() => Array.from(new Set(initialJobs.map(job => job.type))).filter(Boolean).sort(), [initialJobs]);
  const locations = useMemo(() => Array.from(new Set(initialJobs.map(job => job.location))).filter(Boolean).sort(), [initialJobs]);
  const experiences = useMemo(() => Array.from(new Set(initialJobs.map(job => job.experienceLevel))).filter(Boolean).sort() as string[], [initialJobs]);

  const filteredJobs = useMemo(() => {
    return initialJobs.filter(job => {
      const title = locale === 'de' ? job.titleDe : job.title;
      const desc = locale === 'de' ? job.descriptionDe : job.description;
      
      const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            job.location.toLowerCase().includes(searchTerm.toLowerCase());
                            
      const matchesSector = selectedSector === '' || job.sector === selectedSector;
      const matchesType = selectedType === '' || job.type === selectedType;
      const matchesLocation = selectedLocation === '' || job.location.toLowerCase().includes(selectedLocation.toLowerCase());
      const matchesExperience = selectedExperience === '' || job.experienceLevel === selectedExperience;

      return matchesSearch && matchesSector && matchesType && matchesLocation && matchesExperience;
    });
  }, [initialJobs, searchTerm, selectedSector, selectedType, selectedLocation, selectedExperience, locale]);

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const getJobImage = (title: string, imageUrl?: string | null) => {
    if (imageUrl) return imageUrl;
    const t = title.toLowerCase();
    if (t.includes('yazılım') || t.includes('software')) return '/img/yazilimci.jpg';
    if (t.includes('grafik') || t.includes('design')) return '/img/grafik-tasarim-uzmani.webp';
    if (t.includes('müşteri') || t.includes('kunden')) return '/img/musteriiliskileri.webp';
    if (t.includes('pazarlama') || t.includes('marketing')) return '/img/dijitalpazarlama.jpeg';
    if (t.includes('resepsiyon') || t.includes('rezeptionist')) return '/img/otelresepsiyon.jpg';
    if (t.includes('muhasebe') || t.includes('buchhaltung')) return '/img/muhasebeuzmanı.webp';
    return '/img/yazilimci.jpg'; 
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="jobs-page-container">
      <section className="jobs-hero">
        <div className="container">
          <h1>{t('title')}</h1>
          <p>Kariyerinize yön verecek yüzlerce açık pozisyonu keşfedin.</p>
          
          <div className="jobs-search-bar">
            <input 
              type="text" 
              placeholder="Pozisyon, yetenek veya şehir ara..." 
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="search-input"
            />
            <button className="btn btn-primary search-btn">{tc('search')}</button>
          </div>
        </div>
      </section>

      <div className="container jobs-content-layout">
        
        <aside className="jobs-sidebar">
          <div className="filter-card fade-in">
            <h2>Filtreler</h2>
            
            <div className="filter-group">
              <label>Şehir (Konum)</label>
              <input 
                type="text"
                className="form-input"
                style={{ width: '100%', padding: '12px 16px', borderRadius: 'var(--radius)', border: '1px solid #d1d5db', outline: 'none' }}
                placeholder="Şehir yazın..."
                value={selectedLocation}
                onChange={(e) => { setSelectedLocation(e.target.value); setCurrentPage(1); }}
              />
            </div>

            <div className="filter-group">
              <label>{t('sector')}</label>
              <CustomSelect 
                options={sectors}
                value={selectedSector}
                onChange={(val) => { setSelectedSector(val); setCurrentPage(1); }}
                placeholder="Tümü"
              />
            </div>

            <div className="filter-group">
              <label>Deneyim Seviyesi</label>
              <CustomSelect 
                options={experiences}
                value={selectedExperience}
                onChange={(val) => { setSelectedExperience(val); setCurrentPage(1); }}
                placeholder="Tümü"
              />
            </div>

            <div className="filter-group">
              <label>{t('type')}</label>
              <CustomSelect 
                options={types}
                value={selectedType}
                onChange={(val) => { setSelectedType(val); setCurrentPage(1); }}
                placeholder="Tümü"
              />
            </div>
            
            <button 
              className="btn btn-outline filter-reset-btn"
              onClick={() => {
                setSearchTerm('');
                setSelectedLocation('');
                setSelectedSector('');
                setSelectedExperience('');
                setSelectedType('');
                setCurrentPage(1);
              }}
            >
              Filtreleri Temizle
            </button>
          </div>
        </aside>

        {/* 📄 İLANLAR LİSTESİ */}
        <main className="jobs-main-list">
          <div className="jobs-list-header fade-in">
            <p>Toplam <strong>{filteredJobs.length}</strong> ilan bulundu.</p>
          </div>

          {currentJobs.length === 0 ? (
            <div className="no-results fade-in">
              <h3>{tc('noResults')}</h3>
              <p>Farklı anahtar kelimeler veya filtreler deneyin.</p>
            </div>
          ) : (
            <>
              <div className="jobs-grid">
                {currentJobs.map((job, idx) => {
                  const title = locale === 'de' ? job.titleDe : job.title;
                  const shortDesc = locale === 'de' ? job.shortDescDe : job.shortDesc;
                  const bgImage = getJobImage(job.title, (job as any).imageUrl);

                  return (
                    <div className={`job-card fade-in fade-in-delay-${(idx % 3) + 1}`} key={job.id}>
                      <div className="job-card-image">
                        <Image
                          src={bgImage}
                          alt={title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          quality={70}
                          style={{ objectFit: 'cover' }}
                        />
                        <span className="job-badge">{job.type}</span>
                      </div>
                      <div className="job-card-content">
                        <span className="job-sector">{job.sector}</span>
                        <h3>{title}</h3>
                        <p>{shortDesc}</p>
                        <div className="job-meta">
                          <span>📍 {job.location}</span>
                        </div>
                        <Link href={`/jobs/${job.id}`} className="btn btn-primary btn-block">
                          {tc('viewDetails')}
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 📑 SAYFALAMA (PAGINATION) */}
              {totalPages > 1 && (
                <div className="pagination">
                  <button 
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="page-btn"
                  >
                    ❮
                  </button>
                  
                  {Array.from({ length: totalPages }).map((_, idx) => {
                    const page = idx + 1;
                    // Sadece yakın sayfaları göster
                    if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                      return (
                        <button 
                          key={page}
                          className={`page-btn ${currentPage === page ? 'active' : ''}`}
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </button>
                      );
                    } else if (page === currentPage - 2 || page === currentPage + 2) {
                      return <span key={page} className="page-dots">...</span>;
                    }
                    return null;
                  })}

                  <button 
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="page-btn"
                  >
                    ❯
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
