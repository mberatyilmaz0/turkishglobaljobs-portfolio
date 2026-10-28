'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import type { Job } from '@prisma/client';

type JobWithCount = Job & { _count: { applications: number } };

function formatSalary(min?: number | null, max?: number | null): string | null {
  if (!min && !max) return null;
  const fmt = (v: number) => v.toLocaleString('de-DE');
  if (min && max) return `${fmt(min)} – ${fmt(max)} €`;
  if (min) return `${fmt(min)} € ~`;
  if (max) return `~ ${fmt(max)} €`;
  return null;
}

export default function JobDetailClient({
  job,
  locale,
}: {
  job: JobWithCount;
  locale: string;
  applied: boolean;
}) {
  const tc = useTranslations('common');

  const title = locale === 'de' ? job.titleDe : job.title;
  const description = locale === 'de' ? job.descriptionDe : job.description;
  const salary = formatSalary(job.salaryMin, job.salaryMax);
  const langLevel = job.langLevel ?? null;

  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="job-detail fade-in">
          <Link href="/" className="btn btn-secondary btn-sm" style={{ marginBottom: 24 }}>
            ← {tc('back')}
          </Link>

          <div className="job-detail-header">
            <span className="job-card-sector">{job.sector}</span>
            <h1>{title}</h1>
            <div className="job-detail-meta">
              <span className="job-meta-tag">📍 {job.location}</span>
              <span className="job-meta-tag">💼 {job.type}</span>
              <span className="job-meta-tag">
                📅 {new Date(job.createdAt).toLocaleDateString(locale)}
              </span>
              {salary && (
                <span className="job-meta-tag" style={{ color: 'var(--primary, #2563eb)', fontWeight: 600 }}>
                  💶 {salary}
                </span>
              )}
              {langLevel && (
                <span className="job-meta-tag" style={{ color: 'var(--accent, #16a34a)', fontWeight: 600 }}>
                  🗣 {langLevel}
                </span>
              )}
            </div>
          </div>

          <div className="profile-section">
            <h2>İş Tanımı</h2>
            <div
              className="job-detail-desc"
              style={{ whiteSpace: 'pre-line' }}
            >
              {description}
            </div>
          </div>

          <div className="job-apply-box" style={{ textAlign: 'center', marginTop: 32 }}>
            <Link
              href={`/pre-application?job=${job.id}`}
              className="btn btn-primary btn-lg"
              style={{
                display: 'inline-block',
                padding: '16px 40px',
                fontSize: '1.1rem',
                fontWeight: 700,
                borderRadius: 12,
                textDecoration: 'none',
              }}
            >
              Başvurmak için buraya tıklayın →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
