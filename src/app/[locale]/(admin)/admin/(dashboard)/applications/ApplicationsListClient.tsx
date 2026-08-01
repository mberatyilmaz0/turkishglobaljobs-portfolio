'use client';

import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/routing';
import { useState } from 'react';
import { deleteApplication } from '@/actions/applications';

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function ApplicationsListClient({
  applications,
  locale,
}: {
  applications: any[];
  locale: string;
}) {
  const t = useTranslations('admin');
  const ts = useTranslations('status');
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const filteredApplications = applications.filter((app: any) => {
    const fullName = `${app.user.firstName} ${app.user.lastName}`.toLowerCase();
    const jobTitle = locale === 'de' ? app.job.titleDe.toLowerCase() : app.job.title.toLowerCase();
    const search = searchTerm.toLowerCase();
    
    return fullName.includes(search) || jobTitle.includes(search);
  });

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    const res = await deleteApplication(id);
    if (res.error) {
      alert('Silinirken bir hata oluştu: ' + res.error);
    } else {
      setConfirmDeleteId(null);
      router.refresh();
    }
    setDeletingId(null);
  };

  return (
    <div>
      <div className="ap-page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 className="ap-page-title" style={{ margin: 0 }}>Başvurular ({filteredApplications.length})</h1>
        
        <div style={{ width: '300px' }}>
          <input
            type="text"
            className="form-input"
            placeholder="İsim veya ilan ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '10px 15px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', transition: 'border-color 0.2s' }}
          />
        </div>
      </div>

      <div className="ap-card">
        {filteredApplications.length === 0 ? (
          <p className="ap-empty">Arama kriterlerine uygun başvuru bulunamadı.</p>
        ) : (
          <table className="ap-table">
            <thead>
              <tr>
                <th>Ad Soyad</th>
                <th>İlan</th>
                <th>Tarih</th>
                <th>Durum</th>
                <th>İşlem</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map((app: any) => (
                <tr key={app.id}>
                  <td className="ap-table-name">{app.user.firstName} {app.user.lastName}</td>
                  <td>{locale === 'de' ? app.job.titleDe : app.job.title}</td>
                  <td className="ap-table-date">{new Date(app.createdAt).toLocaleDateString('tr-TR')}</td>
                  <td>
                    <span className={`ap-badge ap-badge--${app.status.toLowerCase()}`}>
                      {ts(app.status)}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <Link href={`/admin/applications/${app.id}`} className="btn btn-secondary btn-sm">
                        Detay
                      </Link>
                      <button 
                        onClick={() => setConfirmDeleteId(app.id)} 
                        disabled={deletingId === app.id}
                        className="btn btn-sm" 
                        style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '4px 12px', borderRadius: '6px', cursor: deletingId === app.id ? 'not-allowed' : 'pointer', fontSize: '0.875rem' }}
                      >
                        {deletingId === app.id ? 'Siliniyor...' : 'Sil'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {confirmDeleteId && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{
            backgroundColor: 'white', padding: '24px', borderRadius: '12px',
            maxWidth: '400px', width: '90%', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '1.25rem', color: '#0f172a' }}>Başvuruyu Sil</h3>
            <p style={{ margin: '0 0 24px 0', color: '#475569', lineHeight: '1.5' }}>
              Bu başvuruyu kalıcı olarak silmek istediğinize emin misiniz? Bu işlem geri alınamaz.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button 
                onClick={() => setConfirmDeleteId(null)}
                disabled={deletingId !== null}
                style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: 'white', cursor: deletingId ? 'not-allowed' : 'pointer' }}
              >
                İptal
              </button>
              <button 
                onClick={() => handleDelete(confirmDeleteId)}
                disabled={deletingId !== null}
                style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', backgroundColor: '#ef4444', color: 'white', cursor: deletingId ? 'not-allowed' : 'pointer', fontWeight: '500' }}
              >
                {deletingId === confirmDeleteId ? 'Siliniyor...' : 'Evet, Sil'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
