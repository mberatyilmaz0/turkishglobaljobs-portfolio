import { getTranslations } from 'next-intl/server';
import { getSettings } from '@/actions/settings';

export default async function ContactPage() {
  const tc = await getTranslations('common');
  const t = await getTranslations('contactPage');
  const settings = await getSettings();
  
  return (
    <div className="contact-page">
      <div className="contact-hero">
        <div className="container">
          <h1>{tc('contact')}</h1>
          <p className="contact-subtitle">{t('heroSubtitle')}</p>
        </div>
      </div>

      <div className="container contact-content">
        <div className="contact-grid">
          {/* Adres Kartı */}
          <div className="contact-card">
            <div className="contact-icon">📍</div>
            <h3>{t('addressTitle')}</h3>
            <p style={{ whiteSpace: 'pre-line' }}>{settings.address}</p>
          </div>

          {/* E-posta Kartı */}
          <div className="contact-card">
            <div className="contact-icon">✉️</div>
            <h3>{t('emailTitle')}</h3>
            <p>
              {settings.email.split('\n').map((email, i) => (
                <span key={i}>
                  <a href={`mailto:${email.trim()}`}>{email.trim()}</a><br />
                </span>
              ))}
            </p>
          </div>

          {/* Telefon Kartı */}
          <div className="contact-card">
            <div className="contact-icon">📞</div>
            <h3>{t('phoneTitle')}</h3>
            <p>
              {settings.phone.split('\n').map((phone, i) => (
                <span key={i}>
                  <a href={`tel:${phone.trim().replace(/\s/g, '')}`}>{phone.trim()}</a><br />
                </span>
              ))}
            </p>
          </div>
        </div>

        <div className="contact-note">
          <div className="contact-note-inner">
            <div className="contact-note-icon">ℹ️</div>
            <div className="contact-note-text">
              <h4>{t('noteTitle')}</h4>
              <p>{t.rich('noteText', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
