'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { updateProfile, addExperience, deleteExperience, addEducation, deleteEducation, addSkill, deleteSkill, addLanguage, deleteLanguage, updateCvUrl } from '@/actions/profile';
import { useRouter } from '@/i18n/routing';

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function DashboardClient({
  profile,
  applications,
  locale,
}: {
  profile: any;
  applications: any[];
  locale: string;
}) {
  const t = useTranslations('profile');
  const ts = useTranslations('status');
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');
  const [toast, setToast] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const [newLang, setNewLang] = useState('');
  const [newLangLevel, setNewLangLevel] = useState('B1');
  const [uploading, setUploading] = useState(false);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await updateProfile(fd);
    showToast(t('profileUpdated'));
    router.refresh();
  };

  const handleAddExperience = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await addExperience(fd);
    showToast(t('profileUpdated'));
    (e.target as HTMLFormElement).reset();
    router.refresh();
  };

  const handleDeleteExp = async (id: string) => {
    await deleteExperience(id);
    router.refresh();
  };

  const handleAddEducation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await addEducation(fd);
    showToast(t('profileUpdated'));
    (e.target as HTMLFormElement).reset();
    router.refresh();
  };

  const handleDeleteEdu = async (id: string) => {
    await deleteEducation(id);
    router.refresh();
  };

  const handleAddSkill = async () => {
    if (!newSkill.trim()) return;
    await addSkill(newSkill.trim());
    setNewSkill('');
    router.refresh();
  };

  const handleDeleteSkill = async (id: string) => {
    await deleteSkill(id);
    router.refresh();
  };

  const handleAddLanguage = async () => {
    if (!newLang.trim()) return;
    await addLanguage(newLang.trim(), newLangLevel);
    setNewLang('');
    router.refresh();
  };

  const handleDeleteLanguage = async (id: string) => {
    await deleteLanguage(id);
    router.refresh();
  };

  const handleCVUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== 'application/pdf') { showToast(t('onlyPDF')); return; }
    if (file.size > 5 * 1024 * 1024) { showToast(t('maxFileSize')); return; }

    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);

    const res = await fetch('/api/upload', { method: 'POST', body: fd });
    const data = await res.json();

    if (data.url) {
      await updateCvUrl(data.url);
      showToast(t('cvUploaded'));
      router.refresh();
    }
    setUploading(false);
  };

  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="dashboard-layout">
          {/* Sidebar */}
          <aside className="dashboard-sidebar">
            <nav className="sidebar-nav">
              <button className={`sidebar-link ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
                👤 {t('personalInfo')}
              </button>
              <button className={`sidebar-link ${activeTab === 'experience' ? 'active' : ''}`} onClick={() => setActiveTab('experience')}>
                💼 {t('experience')}
              </button>
              <button className={`sidebar-link ${activeTab === 'education' ? 'active' : ''}`} onClick={() => setActiveTab('education')}>
                🎓 {t('education')}
              </button>
              <button className={`sidebar-link ${activeTab === 'skills' ? 'active' : ''}`} onClick={() => setActiveTab('skills')}>
                ⚡ {t('skills')}
              </button>
              <button className={`sidebar-link ${activeTab === 'cv' ? 'active' : ''}`} onClick={() => setActiveTab('cv')}>
                📄 {t('cv')}
              </button>
              <button className={`sidebar-link ${activeTab === 'applications' ? 'active' : ''}`} onClick={() => setActiveTab('applications')}>
                📋 {t('myApplications')}
              </button>
            </nav>
          </aside>

          {/* Content */}
          <div className="dashboard-content">
            <h1>{t('title')}</h1>

            {/* Profile Info */}
            {activeTab === 'profile' && (
              <div className="profile-section fade-in">
                <h2>{t('personalInfo')}</h2>
                <form onSubmit={handleProfileUpdate}>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">{t('personalInfo').split(' ')[0]}</label>
                      <input name="firstName" className="form-input" defaultValue={profile?.firstName || ''} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">{t('personalInfo').split(' ')[0]}</label>
                      <input name="lastName" className="form-input" defaultValue={profile?.lastName || ''} required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">{t('phone')}</label>
                    <input name="phone" className="form-input" defaultValue={profile?.phone || ''} />
                  </div>
                  <button type="submit" className="btn btn-primary">{t('profileUpdated').replace('!', '').includes('güncellendi') ? 'Kaydet' : 'Speichern'}</button>
                </form>
              </div>
            )}

            {/* Experience */}
            {activeTab === 'experience' && (
              <div className="profile-section fade-in">
                <h2>{t('experience')}</h2>
                {profile?.experiences?.map((exp: any) => (
                  <div key={exp.id} className="exp-item">
                    <button className="item-delete" onClick={() => handleDeleteExp(exp.id)}>✕</button>
                    <h4>{exp.position} — {exp.company}</h4>
                    <p className="date-range">
                      {new Date(exp.startDate).toLocaleDateString(locale)} – {exp.current ? (locale === 'de' ? 'Laufend' : 'Devam Ediyor') : exp.endDate ? new Date(exp.endDate).toLocaleDateString(locale) : ''}
                    </p>
                    {exp.description && <p>{exp.description}</p>}
                  </div>
                ))}
                <form onSubmit={handleAddExperience} style={{ marginTop: 16 }}>
                  <h3 style={{ fontSize: '1rem', marginBottom: 12 }}>{t('addExperience')}</h3>
                  <div className="form-row">
                    <div className="form-group"><label className="form-label">{t('company')}</label><input name="company" className="form-input" required /></div>
                    <div className="form-group"><label className="form-label">{t('position')}</label><input name="position" className="form-input" required /></div>
                  </div>
                  <div className="form-row">
                    <div className="form-group"><label className="form-label">{t('startDate')}</label><input name="startDate" type="date" className="form-input" required /></div>
                    <div className="form-group"><label className="form-label">{t('endDate')}</label><input name="endDate" type="date" className="form-input" /></div>
                  </div>
                  <div className="form-group"><label className="form-label">{t('description')}</label><textarea name="description" className="form-textarea" /></div>
                  <label className="form-checkbox"><input type="checkbox" name="current" value="true" />{t('current')}</label>
                  <button type="submit" className="btn btn-primary btn-sm" style={{ marginTop: 12 }}>{t('addExperience')}</button>
                </form>
              </div>
            )}

            {/* Education */}
            {activeTab === 'education' && (
              <div className="profile-section fade-in">
                <h2>{t('education')}</h2>
                {profile?.educations?.map((edu: any) => (
                  <div key={edu.id} className="edu-item">
                    <button className="item-delete" onClick={() => handleDeleteEdu(edu.id)}>✕</button>
                    <h4>{edu.degree} — {edu.institution}</h4>
                    {edu.field && <p>{edu.field}</p>}
                    <p className="date-range">
                      {new Date(edu.startDate).toLocaleDateString(locale)} – {edu.current ? (locale === 'de' ? 'Laufend' : 'Devam Ediyor') : edu.endDate ? new Date(edu.endDate).toLocaleDateString(locale) : ''}
                    </p>
                  </div>
                ))}
                <form onSubmit={handleAddEducation} style={{ marginTop: 16 }}>
                  <h3 style={{ fontSize: '1rem', marginBottom: 12 }}>{t('addEducation')}</h3>
                  <div className="form-row">
                    <div className="form-group"><label className="form-label">{t('institution')}</label><input name="institution" className="form-input" required /></div>
                    <div className="form-group"><label className="form-label">{t('degree')}</label><input name="degree" className="form-input" required /></div>
                  </div>
                  <div className="form-group"><label className="form-label">{t('field')}</label><input name="field" className="form-input" /></div>
                  <div className="form-row">
                    <div className="form-group"><label className="form-label">{t('startDate')}</label><input name="startDate" type="date" className="form-input" required /></div>
                    <div className="form-group"><label className="form-label">{t('endDate')}</label><input name="endDate" type="date" className="form-input" /></div>
                  </div>
                  <label className="form-checkbox"><input type="checkbox" name="current" value="true" />{t('current')}</label>
                  <button type="submit" className="btn btn-primary btn-sm" style={{ marginTop: 12 }}>{t('addEducation')}</button>
                </form>
              </div>
            )}

            {/* Skills & Languages */}
            {activeTab === 'skills' && (
              <div className="profile-section fade-in">
                <h2>{t('skills')}</h2>
                <div className="tags-container">
                  {profile?.skills?.map((s: any) => (
                    <span key={s.id} className="tag">{s.name}<button onClick={() => handleDeleteSkill(s.id)}>✕</button></span>
                  ))}
                </div>
                <div className="tag-input-row">
                  <input className="form-input" placeholder={t('skillName')} value={newSkill} onChange={(e) => setNewSkill(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())} />
                  <button className="btn btn-primary btn-sm" onClick={handleAddSkill} type="button">{t('addSkill')}</button>
                </div>

                <h2 style={{ marginTop: 32 }}>{t('languages')}</h2>
                <div className="tags-container">
                  {profile?.languages?.map((l: any) => (
                    <span key={l.id} className="tag">{l.name} ({l.level})<button onClick={() => handleDeleteLanguage(l.id)}>✕</button></span>
                  ))}
                </div>
                <div className="tag-input-row">
                  <input className="form-input" placeholder={t('languageName')} value={newLang} onChange={(e) => setNewLang(e.target.value)} />
                  <select className="form-select" value={newLangLevel} onChange={(e) => setNewLangLevel(e.target.value)} style={{ maxWidth: 100 }}>
                    <option>A1</option><option>A2</option><option>B1</option><option>B2</option><option>C1</option><option>C2</option>
                  </select>
                  <button className="btn btn-primary btn-sm" onClick={handleAddLanguage} type="button">{t('addLanguage')}</button>
                </div>
              </div>
            )}

            {/* CV */}
            {activeTab === 'cv' && (
              <div className="profile-section fade-in">
                <h2>{t('cv')}</h2>
                {profile?.cvUrl ? (
                  <div className="cv-upload-area has-file">
                    <div className="cv-upload-icon">✅</div>
                    <p className="file-name">{t('downloadCV')}</p>
                    <a href={profile.cvUrl} target="_blank" rel="noopener" className="btn btn-secondary btn-sm" style={{ marginTop: 12 }}>{t('downloadCV')}</a>
                    <div style={{ marginTop: 16 }}>
                      <label className="btn btn-primary btn-sm" style={{ cursor: 'pointer' }}>
                        {t('changeCV')}
                        <input type="file" accept=".pdf" onChange={handleCVUpload} style={{ display: 'none' }} />
                      </label>
                    </div>
                  </div>
                ) : (
                  <label className="cv-upload-area" style={{ cursor: 'pointer' }}>
                    <div className="cv-upload-icon">📄</div>
                    <p>{uploading ? '...' : t('uploadCV')}</p>
                    <p style={{ fontSize: '0.8rem', marginTop: 8 }}>{t('maxFileSize')} • {t('onlyPDF')}</p>
                    <input type="file" accept=".pdf" onChange={handleCVUpload} style={{ display: 'none' }} />
                  </label>
                )}
              </div>
            )}

            {/* Applications */}
            {activeTab === 'applications' && (
              <div className="profile-section fade-in">
                <h2>{t('myApplications')}</h2>
                {applications.length === 0 ? (
                  <div className="empty-state"><div className="empty-state-icon">📋</div><p>{t('noApplications')}</p></div>
                ) : (
                  <div className="applications-list">
                    {applications.map((app: any) => (
                      <div key={app.id} className="application-item">
                        <div className="application-info">
                          <h3>{locale === 'de' ? app.job.titleDe : app.job.title}</h3>
                          <p>{new Date(app.createdAt).toLocaleDateString(locale)}</p>
                        </div>
                        <span className={`status-badge status-${app.status}`}>{ts(app.status)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {toast && <div className="toast toast-success">{toast}</div>}
    </div>
  );
}
