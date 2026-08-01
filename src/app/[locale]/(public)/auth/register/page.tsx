'use client';

import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/routing';
import { useState } from 'react';
import { registerUser } from '@/actions/auth';

export default function RegisterPage() {
  const t = useTranslations('auth');
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (password !== confirmPassword) {
      setError(t('passwordMismatch'));
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError(t('passwordTooShort'));
      setLoading(false);
      return;
    }

    const result = await registerUser(formData);

    if (result.error) {
      setError(t(result.error as 'emailExists'));
      setLoading(false);
    } else {
      router.push('/auth/login');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card fade-in">
        <h1>{t('registerTitle')}</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">{t('firstName')}</label>
              <input type="text" name="firstName" className="form-input" required />
            </div>
            <div className="form-group">
              <label className="form-label">{t('lastName')}</label>
              <input type="text" name="lastName" className="form-input" required />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">{t('email')}</label>
            <input type="email" name="email" className="form-input" required />
          </div>
          <div className="form-group">
            <label className="form-label">{t('password')}</label>
            <input type="password" name="password" className="form-input" required minLength={6} />
          </div>
          <div className="form-group">
            <label className="form-label">{t('confirmPassword')}</label>
            <input type="password" name="confirmPassword" className="form-input" required />
          </div>
          {error && <p className="form-error">{error}</p>}
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? '...' : t('registerButton')}
          </button>
        </form>
        <div className="auth-links">
          {t('hasAccount')}{' '}
          <Link href="/auth/login">{t('loginHere')}</Link>
        </div>
      </div>
    </div>
  );
}
