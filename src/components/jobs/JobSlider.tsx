'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Job } from '@prisma/client';
import { useState, useEffect, useCallback } from 'react';
import JobCard from './JobCard';

export default function JobSlider({ jobs, onSelectJob }: { jobs: Job[]; onSelectJob?: (job: Job) => void }) {
  const t = useTranslations('home');
  const locale = useLocale();
  const [current, setCurrent] = useState(0);
  const cardsPerSlide = 3;
  const totalSlides = Math.ceil(jobs.length / cardsPerSlide);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prev = () => {
    setCurrent((p) => (p - 1 + totalSlides) % totalSlides);
  };

  useEffect(() => {
    if (totalSlides <= 1) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next, totalSlides]);

  if (jobs.length === 0) {
    return (
      <section className="slider-section">
        <div className="container">
          <h2>{t('featuredJobs')}</h2>
          <div className="empty-state">
            <div className="empty-state-icon">📋</div>
            <p>{t('noJobs')}</p>
          </div>
        </div>
      </section>
    );
  }

  const slides = [];
  for (let i = 0; i < totalSlides; i++) {
    slides.push(jobs.slice(i * cardsPerSlide, (i + 1) * cardsPerSlide));
  }

  return (
    <section className="slider-section">
      <div className="container">
        <h2>{t('featuredJobs')}</h2>
        <div className="slider-container">
          <div
            className="slider-track"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((slideJobs, idx) => (
              <div key={idx} className="slider-slide">
                <div className="slider-cards">
                  {slideJobs.map((job) => (
                    <JobCard key={job.id} job={job} locale={locale} onSelect={onSelectJob} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        {totalSlides > 1 && (
          <div className="slider-controls">
            <button className="slider-btn" onClick={prev}>←</button>
            <div className="slider-dots">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  className={`slider-dot ${idx === current ? 'active' : ''}`}
                  onClick={() => setCurrent(idx)}
                />
              ))}
            </div>
            <button className="slider-btn" onClick={next}>→</button>
          </div>
        )}
      </div>
    </section>
  );
}

