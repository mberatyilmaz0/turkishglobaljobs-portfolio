'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useSession } from 'next-auth/react';
import { useState, useEffect, useCallback } from 'react';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import type { Job } from '@prisma/client';

// İş ilanına göre doğru fotoğrafı döndüren yardımcı fonksiyon
const getJobImage = (title: string, imageUrl?: string | null) => {
  // Veritabanından yüklenmiş resim varsa onu kullan
  if (imageUrl) return imageUrl;

  const t = title.toLowerCase();
  if (t.includes('yazılım') || t.includes('software')) return '/img/yazilimci.jpg';
  if (t.includes('grafik') || t.includes('design')) return '/img/grafik-tasarim-uzmani.jpg';
  if (t.includes('müşteri') || t.includes('kunden')) return '/img/musteriiliskileri.jpg';
  if (t.includes('pazarlama') || t.includes('marketing')) return '/img/dijitalpazarlama.jpeg';
  if (t.includes('resepsiyon') || t.includes('rezeptionist')) return '/img/otelresepsiyon.jpg';
  if (t.includes('muhasebe') || t.includes('buchhaltung')) return '/img/muhasebeuzmanı.png';
  return '/img/yazilimci.jpg'; // Varsayılan görsel
};

export default function HomeClient({ jobs }: { jobs: Job[] }) {
  const t = useTranslations('home');
  const tj = useTranslations('jobs');
  const tc = useTranslations('common');
  const locale = useLocale();
  const { data: session } = useSession();

  // Slider State
  const [currentIndex, setCurrentIndex] = useState(0);

  const selectedJob = jobs[currentIndex];

  const nextSlide = useCallback(() => {
    if (jobs.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % jobs.length);
    }
  }, [jobs.length]);

  const prevSlide = useCallback(() => {
    if (jobs.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + jobs.length) % jobs.length);
    }
  }, [jobs.length]);

  // Otomatik kaydırma
  useEffect(() => {
    if (jobs.length <= 1) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide, jobs.length]);

  if (!jobs || jobs.length === 0) {
    return (
      <section className="hero-slider-empty">
        <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
          <h2>{t('noJobs')}</h2>
        </div>
      </section>
    );
  }

  const title = locale === 'de' ? selectedJob.titleDe : selectedJob.title;
  const description = locale === 'de' ? selectedJob.descriptionDe : selectedJob.description;
  const shortDesc = locale === 'de' ? selectedJob.shortDescDe : selectedJob.shortDesc;
  const bgImage = getJobImage(selectedJob.title, (selectedJob as any).imageUrl);

  return (
    <>
      {/* 🚀 DEV HERO JOB SLIDER */}
      <section id="jobs-slider" className="hero-slider">
        {/* Arka Plan Görseli — next/image ile optimize */}
        <Image
          src={bgImage}
          alt={title}
          fill
          priority
          sizes="100vw"
          quality={75}
          className="hero-slider-bg-image"
          style={{ objectFit: 'cover' }}
        />
        <div className="hero-slider-overlay" />

        {/* Ana İçerik */}
        <div className="container hero-slider-content">
          <button className="hero-nav-btn nav-prev" onClick={prevSlide}>❮</button>
          
          <div className="hero-job-card fade-in" key={selectedJob.id}>
            <div className="hero-job-header">
              <span className="job-card-sector">{selectedJob.sector}</span>
              <h1>{title}</h1>
              <p className="hero-job-short">{shortDesc}</p>
            </div>
            
            <div className="hero-job-meta">
              <span>📍 {selectedJob.location}</span>
              <span>💼 {selectedJob.type}</span>
            </div>
            
            <Link href={`/jobs/${selectedJob.id}`} className="btn btn-primary btn-lg hero-apply-btn">
              {tj('applyNow')} →
            </Link>
          </div>
          
          <button className="hero-nav-btn nav-next" onClick={nextSlide}>❯</button>
        </div>

        {/* Nokta Göstergeleri (Dots) */}
        <div className="hero-slider-dots">
          {jobs.map((_, idx) => (
            <button 
              key={idx} 
              className={`slider-dot ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
            />
          ))}
        </div>
        
        {/* Tüm İlanları Gör Butonu */}
        <div className="hero-slider-all-jobs" style={{ position: 'absolute', bottom: '90px', left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 3 }}>
          <Link href="/jobs" className="btn btn-primary btn-lg" style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.3)', padding: '14px 40px' }}>
            {t('allJobs')} ({jobs.length}+)
          </Link>
        </div>
      </section>

      {/* 🤝 NEDEN BİZ? */}
      <section className="why-us" style={{ paddingTop: 100 }}>
        <div className="container">
          <h2>{t('whyUs')}</h2>
          <p>{t('whyUsDesc')}</p>
          <div className="benefits-grid">
            <div className="benefit-card fade-in fade-in-delay-1">
              <div className="benefit-icon">🚀</div>
              <h3>{t('benefit1Title')}</h3>
              <p>{t('benefit1Desc')}</p>
            </div>
            <div className="benefit-card fade-in fade-in-delay-2">
              <div className="benefit-icon">⚡</div>
              <h3>{t('benefit2Title')}</h3>
              <p>{t('benefit2Desc')}</p>
            </div>
            <div className="benefit-card fade-in fade-in-delay-3">
              <div className="benefit-icon">👥</div>
              <h3>{t('benefit3Title')}</h3>
              <p>{t('benefit3Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 📞 CTA */}
      <section className="cta-section">
        <div className="container">
          <h2>{session ? t('ctaTitleLoggedIn') : t('ctaTitle')}</h2>
          <p>{session ? t('ctaDescLoggedIn') : t('ctaDesc')}</p>
          <Link href={session ? "/dashboard" : "/auth/register"} className="btn btn-primary btn-lg">
            {session ? t('ctaButtonLoggedIn') : t('ctaButton')}
          </Link>
        </div>
      </section>
    </>
  );
}
