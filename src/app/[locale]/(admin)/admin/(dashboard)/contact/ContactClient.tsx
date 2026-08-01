'use client';

import { useState } from 'react';
import { updateSettings } from '@/actions/settings';
import { useRouter } from 'next/navigation';

export default function ContactClient({
  settings
}: {
  settings: { address: string; email: string; phone: string }
}) {
  const [toast, setToast] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    
    await updateSettings({
      address: fd.get('address') as string,
      email: fd.get('email') as string,
      phone: fd.get('phone') as string,
    });
    
    setToast('İletişim ayarları başarıyla güncellendi!');
    setTimeout(() => setToast(''), 3000);
    router.refresh();
  };

  return (
    <div>
      <div className="ap-page-header">
        <h1 className="ap-page-title">İletişim Bilgileri</h1>
      </div>

      <div className="ap-card" style={{ maxWidth: 800 }}>
        <div className="ap-card-body">
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="form-group">
              <label className="form-label">Adres</label>
              <textarea 
                name="address" 
                className="form-textarea" 
                rows={3} 
                defaultValue={settings.address}
                required 
              />
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: 4 }}>
                Satır başı yapmak için Enter'a basabilirsiniz.
              </p>
            </div>

            <div className="form-group">
              <label className="form-label">E-posta</label>
              <textarea 
                name="email" 
                className="form-textarea" 
                rows={2} 
                defaultValue={settings.email}
                required 
              />
            </div>

            <div className="form-group">
              <label className="form-label">Telefon Numarası</label>
              <textarea 
                name="phone" 
                className="form-textarea" 
                rows={2} 
                defaultValue={settings.phone}
                required 
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
              Ayarları Kaydet
            </button>
          </form>
        </div>
      </div>

      {toast && (
        <div className="toast toast-success">
          {toast}
        </div>
      )}
    </div>
  );
}
