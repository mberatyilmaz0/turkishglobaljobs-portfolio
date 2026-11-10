import { getTranslations } from 'next-intl/server';
import { getSettings } from '@/actions/settings';
import AppIcon from '@/components/ui/AppIcon';
import ContactForm from '@/components/forms/ContactForm';
import { alternatesFor } from '@/lib/site';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isDE = locale === 'de';

  return {
    title: isDE ? 'Kontakt' : 'İletişim',
    description: isDE
      ? 'Kontaktieren Sie Turkish Global: Adresse, Telefon und E-Mail. Schreiben Sie uns über das Kontaktformular und hängen Sie Ihren Lebenslauf an.'
      : 'Turkish Global ile iletişime geçin: adres, telefon ve e-posta bilgilerimiz. İletişim formu ile bize yazın, dilerseniz CV\'nizi de ekleyin.',
    alternates: alternatesFor(locale, '/contact'),
  };
}

export default async function ContactPage() {
  const tc = await getTranslations('common');
  const t = await getTranslations('contactPage');
  const settings = await getSettings();
  
  return (
    <main className="contact-page">
      <section className="contact-hero">
        <div className="container contact-hero-content">
          <span className="contact-hero-badge">
            <AppIcon name="mail" size={15} /> Turkish Global
          </span>
          <h1>{tc('contact')}</h1>
          <p className="contact-subtitle">{t('heroSubtitle')}</p>
        </div>
      </section>

      <div className="container contact-content">
        <div className="contact-grid">
          {/* Adres Kartı */}
          <div className="contact-card">
            <div className="contact-icon"><AppIcon name="location" size={26} /></div>
            <h2>{t('addressTitle')}</h2>
            <p style={{ whiteSpace: 'pre-line' }}>{settings.address}</p>
          </div>

          {/* E-posta Kartı */}
          <div className="contact-card">
            <div className="contact-icon"><AppIcon name="mail" size={26} /></div>
            <h2>{t('emailTitle')}</h2>
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
            <div className="contact-icon"><AppIcon name="phone" size={26} /></div>
            <h2>{t('phoneTitle')}</h2>
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
            <div className="contact-note-icon"><AppIcon name="info" size={22} /></div>
            <div className="contact-note-text">
              <h4>{t('noteTitle')}</h4>
              <p>{t.rich('noteText', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
            </div>
          </div>
        </div>

        {/* İletişim formu (CV eklenebilir) */}
        <ContactForm />
      </div>
    </main>
  );
}
