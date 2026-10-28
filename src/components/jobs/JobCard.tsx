'use client';

import type { Job } from '@prisma/client';
import { Link } from '@/i18n/routing';

function formatSalary(min?: number | null, max?: number | null): string | null {
  if (!min && !max) return null;
  const fmt = (v: number) => v.toLocaleString('de-DE');
  if (min && max) return `${fmt(min)} – ${fmt(max)} €`;
  if (min) return `${fmt(min)} € ~`;
  if (max) return `~ ${fmt(max)} €`;
  return null;
}

export default function JobCard({
  job,
  locale,
}: {
  job: Job;
  locale: string;
  onSelect?: (job: Job) => void;
}) {
  const title = locale === 'de' ? job.titleDe : job.title;
  const shortDesc = locale === 'de' ? job.shortDescDe : job.shortDesc;
  const salary = formatSalary(job.salaryMin, job.salaryMax);
  const langLevel = job.langLevel ?? null;

  return (
    <div className="job-card">
      <span className="job-card-sector">{job.sector}</span>
      <h3 style={{ margin: '8px 0 6px' }}>{title}</h3>

      <p
        style={{
          margin: '0 0 12px',
          color: 'var(--text-secondary, #64748b)',
          fontSize: '0.875rem',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {shortDesc}
      </p>

      <div className="job-card-meta" style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
        <span>📍 {job.location}</span>

        {salary && (
          <span
            style={{
              background: 'var(--primary-light, #dbeafe)',
              color: 'var(--primary, #2563eb)',
              borderRadius: 6,
              padding: '2px 8px',
              fontSize: '0.82rem',
              fontWeight: 600,
            }}
          >
            💶 {salary}
          </span>
        )}

        {langLevel && (
          <span
            style={{
              background: 'var(--accent-light, #f0fdf4)',
              color: 'var(--accent, #16a34a)',
              borderRadius: 6,
              padding: '2px 8px',
              fontSize: '0.82rem',
              fontWeight: 600,
            }}
          >
            🗣 {langLevel}
          </span>
        )}
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <Link
          href="/pre-application"
          className="btn btn-primary btn-sm"
          style={{ flex: 1, textAlign: 'center' }}
        >
          Ön Başvuru Yap
        </Link>
        <Link
          href={`/jobs/${job.id}`}
          className="btn btn-secondary btn-sm"
          style={{ flex: 1, textAlign: 'center' }}
        >
          Detayları Gör
        </Link>
      </div>
    </div>
  );
}
