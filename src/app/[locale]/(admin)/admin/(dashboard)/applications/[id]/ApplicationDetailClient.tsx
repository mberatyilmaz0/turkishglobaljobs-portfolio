'use client';

import { Link, useRouter } from '@/i18n/routing';
import { updateApplicationStatus } from '@/actions/applications';
import { useState } from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function ApplicationDetailClient({
  application,
  locale,
}: {
  application: any;
  locale: string;
}) {
  const router = useRouter();
  const [toast, setToast] = useState('');

  const user = application.user;
  const job = application.job;

  const handleStatus = async (status: 'ACCEPTED' | 'REJECTED') => {
    await updateApplicationStatus(application.id, status);
    setToast(status === 'ACCEPTED' ? 'Başvuru kabul edildi!' : 'Başvuru reddedildi.');
    setTimeout(() => setToast(''), 3000);
    router.refresh();
  };

  return (
    <div>
      <Link href="/admin/applications" style={{ color: '#3b82f6', fontSize: '0.88rem', fontWeight: 600, textDecoration: 'none', display: 'inline-block', marginBottom: 20 }}>
        ← Başvurulara Dön
      </Link>

      <h1 className="ap-page-title">{user.firstName} {user.lastName}</h1>

      {/* Kişi Bilgileri */}
      <div className="ap-card" style={{ marginBottom: 20 }}>
        <div className="ap-card-header">
          <h2 className="ap-card-title">Başvuru Bilgileri</h2>
          <span className={`ap-badge ap-badge--${application.status.toLowerCase()}`}>
            {application.status}
          </span>
        </div>
        <div className="ap-card-body">
          <div className="ap-detail-grid">
            <div className="ap-detail-item">
              <label>Ad Soyad</label>
              <span>{user.firstName} {user.lastName}</span>
            </div>
            <div className="ap-detail-item">
              <label>E-posta</label>
              <span>{user.email}</span>
            </div>
            <div className="ap-detail-item">
              <label>Telefon</label>
              <span>{user.phone || '—'}</span>
            </div>
            <div className="ap-detail-item">
              <label>Başvurduğu İlan</label>
              <span>{locale === 'de' ? job.titleDe : job.title}</span>
            </div>
            <div className="ap-detail-item">
              <label>Tarih</label>
              <span>{new Date(application.createdAt).toLocaleDateString('tr-TR')}</span>
            </div>
            {user.cvUrl && (
              <div className="ap-detail-item">
                <label>CV / Portfolyo</label>
                <span><a href={user.cvUrl} target="_blank" rel="noopener" style={{ color: '#3b82f6', fontWeight: 600 }}>📄 CV İndir</a></span>
              </div>
            )}
          </div>

          {application.coverNote && (
            <div style={{ marginTop: 16, padding: 16, background: '#f8fafc', borderRadius: 10 }}>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.5px', marginBottom: 6 }}>Ön Yazı</label>
              <p style={{ whiteSpace: 'pre-wrap', color: '#475569', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>{application.coverNote}</p>
            </div>
          )}

          {/* Kabul Et / Reddet Butonları */}
          <div className="ap-actions">
            <button className="ap-btn-accept" onClick={() => handleStatus('ACCEPTED')} disabled={application.status === 'ACCEPTED'}>
              ✓ Kabul Et
            </button>
            <button className="ap-btn-reject" onClick={() => handleStatus('REJECTED')} disabled={application.status === 'REJECTED'}>
              ✕ Reddet
            </button>
          </div>
        </div>
      </div>

      {toast && <div className="toast toast-success">{toast}</div>}
    </div>
  );
}
