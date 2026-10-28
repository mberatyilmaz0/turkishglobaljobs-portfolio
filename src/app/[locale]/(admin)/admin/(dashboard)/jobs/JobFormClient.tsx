'use client';

import { Link, useRouter } from '@/i18n/routing';
import { createJob, updateJob } from '@/actions/jobs';
import { useState } from 'react';
import type { Job } from '@prisma/client';

const LANGUAGE_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Gerekmiyor'];

export default function JobFormClient({
  job,
}: {
  locale: string;
  job?: Job | null;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const fd = new FormData(e.currentTarget);

    const salaryMinRaw = fd.get('salaryMin') as string;
    const salaryMaxRaw = fd.get('salaryMax') as string;
    const salaryMin = salaryMinRaw ? parseInt(salaryMinRaw, 10) : undefined;
    const salaryMax = salaryMaxRaw ? parseInt(salaryMaxRaw, 10) : undefined;

    if (salaryMin !== undefined && salaryMax !== undefined && salaryMin > salaryMax) {
      setToast('Min maaş, max maaştan büyük olamaz!');
      setTimeout(() => setToast(''), 4000);
      setLoading(false);
      return;
    }

    const langLevelRaw = fd.get('langLevel') as string;

    const data = {
      title: fd.get('title') as string,
      titleDe: fd.get('titleDe') as string,
      sector: fd.get('sector') as string,
      location: fd.get('location') as string,
      type: fd.get('type') as string,
      experienceLevel: fd.get('experienceLevel') as string,
      description: fd.get('description') as string,
      descriptionDe: fd.get('descriptionDe') as string,
      shortDesc: fd.get('shortDesc') as string,
      shortDescDe: fd.get('shortDescDe') as string,
      isActive: fd.get('isActive') === 'true',
      isFeatured: fd.get('isFeatured') === 'true',
      salaryMin: salaryMin || undefined,
      salaryMax: salaryMax || undefined,
      langLevel: langLevelRaw || undefined,
    };

    if (job) {
      await updateJob(job.id, {
        ...data,
        salaryMin: salaryMin ?? null,
        salaryMax: salaryMax ?? null,
        langLevel: langLevelRaw || null,
      });
    } else {
      await createJob(data);
    }

    setToast('Kaydedildi!');
    setTimeout(() => {
      router.push('/admin/jobs');
      router.refresh();
    }, 1000);
  };

  return (
    <div>
      <Link href="/admin/jobs" style={{ color: '#3b82f6', fontSize: '0.88rem', fontWeight: 600, textDecoration: 'none', display: 'inline-block', marginBottom: 20 }}>
        ← İlanlara Dön
      </Link>

      <h1 className="ap-page-title">{job ? 'İlan Düzenle' : 'Yeni İlan Ekle'}</h1>

      <div className="ap-card">
        <div className="ap-card-body">
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Pozisyon Adı (TR)</label>
                <input name="title" className="form-input" defaultValue={job?.title || ''} required />
              </div>
              <div className="form-group">
                <label className="form-label">Pozisyon Adı (DE)</label>
                <input name="titleDe" className="form-input" defaultValue={job?.titleDe || ''} required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Sektör</label>
                <select name="sector" className="form-select" defaultValue={job?.sector || ''} required>
                  <option value="" disabled>Sektör Seçin</option>
                  <option value="Bilişim ve Teknoloji">Bilişim ve Teknoloji</option>
                  <option value="Finans ve Muhasebe">Finans ve Muhasebe</option>
                  <option value="Sağlık ve Tıp">Sağlık ve Tıp</option>
                  <option value="Turizm ve Otelcilik">Turizm ve Otelcilik</option>
                  <option value="Eğitim ve Akademi">Eğitim ve Akademi</option>
                  <option value="Üretim ve İmalat">Üretim ve İmalat</option>
                  <option value="Lojistik ve Taşımacılık">Lojistik ve Taşımacılık</option>
                  <option value="Perakende">Perakende</option>
                  <option value="İnsan Kaynakları">İnsan Kaynakları</option>
                  <option value="Pazarlama ve Reklam">Pazarlama ve Reklam</option>
                  <option value="Satış ve İş Geliştirme">Satış ve İş Geliştirme</option>
                  <option value="Mühendislik">Mühendislik</option>
                  <option value="Mimarlık ve Tasarım">Mimarlık ve Tasarım</option>
                  <option value="Medya ve İletişim">Medya ve İletişim</option>
                  <option value="Gıda ve Tarım">Gıda ve Tarım</option>
                  <option value="Hukuk ve Danışmanlık">Hukuk ve Danışmanlık</option>
                  <option value="İnşaat ve Yapı">İnşaat ve Yapı</option>
                  <option value="Otomotiv">Otomotiv</option>
                  <option value="Müşteri Hizmetleri">Müşteri Hizmetleri</option>
                  <option value="Güvenlik ve Savunma">Güvenlik ve Savunma</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Şehir (Konum)</label>
                <input name="location" className="form-input" defaultValue={job?.location || ''} placeholder="Örn: İstanbul, Ankara, Uzaktan" required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Çalışma Tipi</label>
                <select name="type" className="form-select" defaultValue={job?.type || 'Full-time'}>
                  <option value="Full-time">Tam Zamanlı</option>
                  <option value="Part-time">Yarı Zamanlı</option>
                  <option value="Remote">Uzaktan (Remote)</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Proje Bazlı">Proje Bazlı</option>
                  <option value="Contract">Sözleşmeli</option>
                  <option value="Intern">Stajyer</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Deneyim Seviyesi</label>
                <select name="experienceLevel" className="form-select" defaultValue={job?.experienceLevel || ''}>
                  <option value="">Belirtilmemiş</option>
                  <option value="Stajyer (Intern)">Stajyer (Intern)</option>
                  <option value="Yeni Başlayan (Junior)">Yeni Başlayan (Junior)</option>
                  <option value="Orta Seviye (Mid-Level)">Orta Seviye (Mid-Level)</option>
                  <option value="Uzman (Senior)">Uzman (Senior)</option>
                  <option value="Yönetici (Manager)">Yönetici (Manager)</option>
                </select>
              </div>
            </div>

            {/* Maaş ve Dil Seviyesi */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Min Maaş (€)</label>
                <input
                  name="salaryMin"
                  type="number"
                  min={0}
                  className="form-input"
                  defaultValue={job?.salaryMin ?? ''}
                  placeholder="Örn: 2200"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Max Maaş (€)</label>
                <input
                  name="salaryMax"
                  type="number"
                  min={0}
                  className="form-input"
                  defaultValue={job?.salaryMax ?? ''}
                  placeholder="Örn: 3500"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Dil Seviyesi</label>
                <select name="langLevel" className="form-select" defaultValue={job?.langLevel || ''}>
                  <option value="">Belirtilmemiş</option>
                  {LANGUAGE_LEVELS.map((lvl) => (
                    <option key={lvl} value={lvl}>{lvl}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Kısa Açıklama (TR)</label>
                <input name="shortDesc" className="form-input" defaultValue={job?.shortDesc || ''} required />
              </div>
              <div className="form-group">
                <label className="form-label">Kısa Açıklama (DE)</label>
                <input name="shortDescDe" className="form-input" defaultValue={job?.shortDescDe || ''} required />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Açıklama (TR)</label>
              <textarea name="description" className="form-textarea" defaultValue={job?.description || ''} required />
            </div>
            <div className="form-group">
              <label className="form-label">Açıklama (DE)</label>
              <textarea name="descriptionDe" className="form-textarea" defaultValue={job?.descriptionDe || ''} required />
            </div>

            <div className="form-row" style={{ display: 'flex', gap: 24, marginTop: 8 }}>
              <label className="form-checkbox" style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                <input type="checkbox" name="isActive" value="true" defaultChecked={job?.isActive !== false} />
                <span style={{ fontWeight: 500, color: '#334155' }}>Aktif İlan (Sitede Görünsün)</span>
              </label>

              <label className="form-checkbox" style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                <input type="checkbox" name="isFeatured" value="true" defaultChecked={job?.isFeatured === true} />
                <span style={{ fontWeight: 600, color: '#0ea5e9' }}>Ana Sayfa Vitrininde Göster (Slider)</span>
              </label>
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading} style={{ alignSelf: 'flex-start' }}>
              {loading ? 'Kaydediliyor...' : 'Kaydet'}
            </button>
          </form>
        </div>
      </div>
      {toast && <div className="toast toast-success">{toast}</div>}
    </div>
  );
}
