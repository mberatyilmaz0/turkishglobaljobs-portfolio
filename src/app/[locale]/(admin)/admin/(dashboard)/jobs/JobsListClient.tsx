'use client';

import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/routing';
import { deleteJob } from '@/actions/jobs';
import { useState } from 'react';
import ConfirmModal from '@/components/admin/ConfirmModal';

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function JobsListClient({ jobs, locale }: { jobs: any[]; locale: string }) {
  const t = useTranslations('admin');
  const [toast, setToast] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await deleteJob(deleteTarget.id);
    setDeleteTarget(null);
    setToast('İlan silindi');
    setTimeout(() => setToast(''), 3000);
    router.refresh();
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <h1 className="ap-page-title" style={{ marginBottom: 0 }}>İlanlar</h1>
        <Link href="/admin/jobs/new" className="btn btn-primary">+ Yeni İlan Ekle</Link>
      </div>

      <div className="ap-card">
        <table className="ap-table">
          <thead>
            <tr>
              <th>İlan Adı</th>
              <th>Sektör</th>
              <th>Durum</th>
              <th>Başvuru</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job: any) => (
              <tr key={job.id}>
                <td className="ap-table-name">{locale === 'de' ? job.titleDe : job.title}</td>
                <td>{job.sector}</td>
                <td>
                  <span className={`ap-badge ${job.isActive ? 'ap-badge--accepted' : 'ap-badge--rejected'}`}>
                    {job.isActive ? 'Aktif' : 'Pasif'}
                  </span>
                </td>
                <td>{job._count.applications}</td>
                <td style={{ display: 'flex', gap: 8 }}>
                  <Link href={`/admin/jobs/${job.id}/edit`} className="btn btn-secondary btn-sm">{t('editJob')}</Link>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => setDeleteTarget({ id: job.id, name: locale === 'de' ? job.titleDe : job.title })}
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Özel Silme Onay Modalı */}
      <ConfirmModal
        isOpen={!!deleteTarget}
        title="İlanı Sil"
        message={`"${deleteTarget?.name}" ilanını silmek istediğinize emin misiniz? Bu işlem geri alınamaz.`}
        confirmText="Evet, Sil"
        cancelText="Vazgeç"
        variant="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      {toast && <div className="toast toast-success">{toast}</div>}
    </div>
  );
}
