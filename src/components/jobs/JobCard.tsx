'use client';

import { Job } from '@prisma/client';
import { useTranslations } from 'next-intl';

export default function JobCard({
  job,
  locale,
  onSelect,
}: {
  job: Job;
  locale: string;
  onSelect?: (job: Job) => void;
}) {
  const t = useTranslations('common');
  const title = locale === 'de' ? job.titleDe : job.title;
  const shortDesc = locale === 'de' ? job.shortDescDe : job.shortDesc;

  return (
    <div className="job-card" onClick={() => onSelect?.(job)}>
      <span className="job-card-sector">{job.sector}</span>
      <h3>{title}</h3>
      <p>{shortDesc}</p>
      <div className="job-card-meta">
        <span>📍 {job.location}</span>
        <span>💼 {job.type}</span>
      </div>
      <button
        className="btn btn-primary btn-sm"
        onClick={(e) => {
          e.stopPropagation();
          onSelect?.(job);
        }}
      >
        {t('apply')} →
      </button>
    </div>
  );
}

