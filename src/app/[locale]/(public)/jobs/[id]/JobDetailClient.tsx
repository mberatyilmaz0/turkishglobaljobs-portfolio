'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import AppIcon from '@/components/ui/AppIcon';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import { formatSalary } from '@/lib/jobFormatting';
import { localizedPath } from '@/lib/site';
import type { Job } from '@prisma/client';

export default function JobDetailClient({
  job,
  locale,
}: {
  job: Job;
  locale: string;
  applied: boolean;
}) {
  const t = useTranslations('jobs');
  const tc = useTranslations('common');
  const title = locale === 'de' ? job.titleDe : job.title;
  const description = locale === 'de' ? job.descriptionDe : job.description;
  const salary = formatSalary(job.salaryMin, job.salaryMax);
  const langLevel = job.langLevel ?? null;

  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="job-detail fade-in">
          <Breadcrumbs items={[
            { name: tc('home'), href: localizedPath(locale, '/') },
            { name: tc('jobs'), href: localizedPath(locale, '/jobs') },
            { name: title, href: `${localizedPath(locale, '/jobs')}/${job.id}` },
          ]} />

          <div className="job-detail-header">
            <span className="job-card-sector">{job.sector}</span>
            <h1>{title}</h1>
            <div className="job-detail-meta">
              <span className="job-meta-tag"><AppIcon name="location" size={15} /> {job.location}</span>
              <span className="job-meta-tag"><AppIcon name="briefcase" size={15} /> {job.type}</span>
              <span className="job-meta-tag">
                <AppIcon name="calendar" size={15} /> {new Date(job.createdAt).toLocaleDateString(locale)}
              </span>
              {salary && (
                <span className="job-meta-tag" style={{ color: 'var(--primary, #2563eb)', fontWeight: 600 }}>
                  <AppIcon name="money" size={15} /> {salary}
                </span>
              )}
              {langLevel && (
                <span className="job-meta-tag" style={{ color: 'var(--accent, #16a34a)', fontWeight: 600 }}>
                  <AppIcon name="language" size={15} /> {langLevel}
                </span>
              )}
            </div>
          </div>

          <div className="profile-section">
            <h2>{t('description')}</h2>
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
              {t('applyNow')} →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
