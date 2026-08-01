'use client';

import { useTranslations } from 'next-intl';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { Link } from '@/i18n/routing';
import { applyToJob } from '@/actions/applications';
import type { Job } from '@prisma/client';

type JobWithCount = Job & { _count: { applications: number } };

export default function JobDetailClient({
  job,
  locale,
  applied: initialApplied,
}: {
  job: JobWithCount;
  locale: string;
  applied: boolean;
}) {
  const t = useTranslations('jobs');
  const tc = useTranslations('common');
  const { data: session } = useSession();
  const [applied, setApplied] = useState(initialApplied);
  const [coverNote, setCoverNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const title = locale === 'de' ? job.titleDe : job.title;
  const description = locale === 'de' ? job.descriptionDe : job.description;

  const handleApply = async () => {
    setLoading(true);
    const result = await applyToJob(job.id, coverNote);
    if (result.success) {
      setApplied(true);
      setMessage(t('applicationSuccess'));
    } else {
      setMessage(result.error || 'Error');
    }
    setLoading(false);
  };

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
            </div>
          </div>

          <div className="profile-section">
            <h2>{t('description')}</h2>
            <div className="job-detail-desc">{description}</div>
          </div>

          <div className="job-apply-box">
            {!session ? (
              <div style={{ textAlign: 'center' }}>
                <p style={{ marginBottom: 16, color: 'var(--text-secondary)' }}>
                  {t('loginToApply')}
                </p>
                <Link href="/auth/login" className="btn btn-primary">
                  {tc('login')}
                </Link>
              </div>
            ) : applied ? (
              <div style={{ textAlign: 'center' }}>
                <p style={{ color: 'var(--success)', fontSize: '1.1rem', fontWeight: 600 }}>
                  ✓ {t('alreadyApplied')}
                </p>
              </div>
            ) : (
              <>
                <div className="form-group" style={{ marginBottom: 20 }}>
                  <label className="form-label">{t('coverNote')}</label>
                  <textarea
                    className="form-textarea"
                    value={coverNote}
                    onChange={(e) => setCoverNote(e.target.value)}
                    placeholder={t('coverNotePlaceholder')}
                  />
                </div>
                <button
                  className="btn btn-primary btn-lg"
                  onClick={handleApply}
                  disabled={loading}
                  style={{ width: '100%' }}
                >
                  {loading ? tc('loading') : t('applyNow')}
                </button>
              </>
            )}
            {message && (
              <p style={{ marginTop: 16, textAlign: 'center', color: 'var(--success)' }}>
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
