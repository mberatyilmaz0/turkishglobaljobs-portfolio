import NextLink from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { JOB_LANDING_PAGES, jobLandingPath } from '@/lib/jobLandingPages';
import type { Locale } from '@/lib/site';

export default function Footer() {
  const t = useTranslations('footer');
  const common = useTranslations('common');
  const locale = useLocale() as Locale;
  const year = new Date().getFullYear();

  return (
    <footer className="footer-premium">
      <div className="container footer-container">
        <div className="footer-col footer-brand">
          <Link href="/" className="footer-logo">TurkishGlobal</Link>
          <p className="footer-desc">{t('aboutUs')}</p>
        </div>

        <div className="footer-col">
          <h3>TurkishGlobal</h3>
          <ul className="footer-links">
            <li><Link href="/">{common('home')}</Link></li>
            <li><Link href="/jobs">{common('jobs')}</Link></li>
            <li><Link href="/almanya-rehberi">{common('germanyGuide')}</Link></li>
            <li><Link href="/hakkimizda">{common('aboutUs')}</Link></li>
            <li><Link href="/pre-application">{common('ctaContact')}</Link></li>
            <li><Link href="/contact">{common('contact')}</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>{locale === 'de' ? 'Beliebte Jobsuchen' : 'Popüler İş Aramaları'}</h3>
          <ul className="footer-links">
            {JOB_LANDING_PAGES.slice(0, 6).map((page) => (
              <li key={page.key}>
                <NextLink href={jobLandingPath(locale, page)}>{page.copy[locale].title}</NextLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h3>{t('legal')}</h3>
          <ul className="footer-links">
            <li><Link href="/contact">{t('contact')}</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container bottom-inner">
          <p>© {year} TurkishGlobal. {t('rights')}</p>
        </div>
      </div>
    </footer>
  );
}
