'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function AdminDashboardClient({
  stats,
  recentApplications,
  recentJobs,
  locale,
}: {
  stats: any;
  recentApplications: any[];
  recentJobs: any[];
  locale: string;
}) {
  const t = useTranslations('admin');
  const ts = useTranslations('status');

  return (
    <div>
      <h1 className="ap-page-title">Kontrol Paneli</h1>

      {/* 4 Stat Cards */}
      <div className="ap-stats">
        <div className="ap-stat-card">
          <div className="ap-stat-icon ap-stat-icon--blue">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
          </div>
          <div className="ap-stat-info">
            <span className="ap-stat-number">{stats?.totalApplications || 0}</span>
            <span className="ap-stat-label">Toplam Başvuru</span>
          </div>
        </div>

        <div className="ap-stat-card">
          <div className="ap-stat-icon ap-stat-icon--green">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </div>
          <div className="ap-stat-info">
            <span className="ap-stat-number">{stats?.acceptedApplications || 0}</span>
            <span className="ap-stat-label">Kabul Edilen</span>
          </div>
        </div>

        <div className="ap-stat-card">
          <div className="ap-stat-icon ap-stat-icon--red">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
          </div>
          <div className="ap-stat-info">
            <span className="ap-stat-number">{stats?.rejectedApplications || 0}</span>
            <span className="ap-stat-label">Reddedilen</span>
          </div>
        </div>

        <div className="ap-stat-card">
          <div className="ap-stat-icon ap-stat-icon--purple">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          </div>
          <div className="ap-stat-info">
            <span className="ap-stat-number">{stats?.dailyVisits || 0}</span>
            <span className="ap-stat-label">Günlük Ziyaretçi</span>
          </div>
        </div>
      </div>

      {/* Two Tables Side by Side */}
      <div className="ap-tables-row">
        {/* Son Başvurular */}
        <div className="ap-card">
          <div className="ap-card-header">
            <h2 className="ap-card-title">Son Başvurular</h2>
            <Link href="/admin/applications" className="ap-card-link">Tümü →</Link>
          </div>
          {recentApplications.length === 0 ? (
            <p className="ap-empty">Henüz başvuru yok</p>
          ) : (
            <table className="ap-table">
              <thead>
                <tr>
                  <th>Aday</th>
                  <th>İlan</th>
                  <th>Tarih</th>
                  <th>Durum</th>
                </tr>
              </thead>
              <tbody>
                {recentApplications.map((app: any) => (
                  <tr key={app.id}>
                    <td className="ap-table-name">{app.user.firstName} {app.user.lastName}</td>
                    <td>{locale === 'de' ? app.job.titleDe : app.job.title}</td>
                    <td className="ap-table-date">{new Date(app.createdAt).toLocaleDateString('tr-TR')}</td>
                    <td>
                      <span className={`ap-badge ap-badge--${app.status.toLowerCase()}`}>
                        {ts(app.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Son İlanlar */}
        <div className="ap-card">
          <div className="ap-card-header">
            <h2 className="ap-card-title">Son İlanlar</h2>
            <Link href="/admin/jobs" className="ap-card-link">Tümü →</Link>
          </div>
          {recentJobs.length === 0 ? (
            <p className="ap-empty">Henüz ilan yok</p>
          ) : (
            <table className="ap-table">
              <thead>
                <tr>
                  <th>İlan Adı</th>
                  <th>Kategori</th>
                  <th>Başvuru</th>
                </tr>
              </thead>
              <tbody>
                {recentJobs.map((job: any) => (
                  <tr key={job.id}>
                    <td className="ap-table-name">{locale === 'de' ? job.titleDe : job.title}</td>
                    <td>{job.sector}</td>
                    <td>{job._count?.applications ?? 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
