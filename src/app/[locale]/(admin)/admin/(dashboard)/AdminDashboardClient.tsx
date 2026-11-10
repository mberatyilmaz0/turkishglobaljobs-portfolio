'use client';
import { Link } from '@/i18n/routing';

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function AdminDashboardClient({
  stats,
  recentJobs,
  locale,
}: {
  stats: any;
  recentJobs: any[];
  locale: string;
}) {
  return (
    <div>
      <h1 className="ap-page-title">Kontrol Paneli</h1>

      {/* Stat Cards */}
      <div className="ap-stats">
        <div className="ap-stat-card">
          <div className="ap-stat-icon ap-stat-icon--blue">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
          </div>
          <div className="ap-stat-info">
            <span className="ap-stat-number">{stats?.activeJobs || 0}</span>
            <span className="ap-stat-label">Aktif İlan</span>
          </div>
        </div>

        <div className="ap-stat-card">
          <div className="ap-stat-icon ap-stat-icon--green">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
          </div>
          <div className="ap-stat-info">
            <span className="ap-stat-number">{stats?.totalJobs || 0}</span>
            <span className="ap-stat-label">Toplam İlan</span>
          </div>
        </div>

        <div className="ap-stat-card">
          <div className="ap-stat-icon ap-stat-icon--red">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          </div>
          <div className="ap-stat-info">
            <span className="ap-stat-number">{stats?.featuredJobs || 0}</span>
            <span className="ap-stat-label">Öne Çıkan İlan</span>
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
                <th>Durum</th>
              </tr>
            </thead>
            <tbody>
              {recentJobs.map((job: any) => (
                <tr key={job.id}>
                  <td className="ap-table-name">{locale === 'de' ? job.titleDe : job.title}</td>
                  <td>{job.sector}</td>
                  <td>{job.isActive ? 'Aktif' : 'Pasif'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
