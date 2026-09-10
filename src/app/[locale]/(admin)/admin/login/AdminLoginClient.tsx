'use client';

import { useTranslations } from 'next-intl';

import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function AdminLoginClient() {
  const t = useTranslations('auth');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);

    try {
      const result = await signIn('credentials', {
        email: formData.get('email'),
        password: formData.get('password'),
        redirect: false,
      });

      console.log('signIn result:', result);

      if (result?.error) {
        setError(t('invalidCredentials'));
        setLoading(false);
      } else if (result?.ok) {
        // Hard navigation — cookie'nin tanınması için tam sayfa yüklemesi gerekli
        // Mevcut locale'i URL'den al
        const locale = window.location.pathname.match(/^\/(tr|de)/)?.[1] || 'tr';
        window.location.href = `/${locale}/admin`;
      } else {
        setError('Giriş başarısız. Lütfen tekrar deneyin.');
        setLoading(false);
      }
    } catch (err) {
      console.error('signIn exception:', err);
      setError('Sunucu hatası. Lütfen tekrar deneyin.');
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f1f5f9', // Hafif gri, admin paneli hissi
      padding: '20px'
    }}>
      <div style={{
        background: '#fff',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h1 style={{ textAlign: 'center', marginBottom: '24px', fontSize: '24px', fontWeight: 'bold', color: '#1e293b' }}>
          Admin Login
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '16px' }}>
            <label className="form-label" style={{ display: 'block', marginBottom: '8px', color: '#475569' }}>{t('email')}</label>
            <input
              type="email"
              name="email"
              className="form-input"
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
              required
            />
          </div>
          <div className="form-group" style={{ marginBottom: '24px' }}>
            <label className="form-label" style={{ display: 'block', marginBottom: '8px', color: '#475569' }}>{t('password')}</label>
            <input
              type="password"
              name="password"
              className="form-input"
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
              required
            />
          </div>
          {error && <p style={{ color: '#ef4444', marginBottom: '16px', fontSize: '14px', textAlign: 'center' }}>{error}</p>}
          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              width: '100%', 
              padding: '12px', 
              background: '#0f172a', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '6px', 
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'background 0.2s'
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = '#1e293b')}
            onMouseOut={(e) => (e.currentTarget.style.background = '#0f172a')}
          >
            {loading ? '...' : 'Login to Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
}
