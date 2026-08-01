import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function Footer() {
  const t = useTranslations('footer');
  const common = useTranslations('common');
  const year = new Date().getFullYear();

  return (
    <footer className="footer-premium">
      <div className="container footer-container">
        
        {/* Brand Column */}
        <div className="footer-col footer-brand">
          <Link href="/" className="footer-logo">
            TurkishGlobal
          </Link>
          <p className="footer-desc">
            {t('aboutUs')}
          </p>
          <div className="footer-socials">
            <a href="#" className="social-link" aria-label="Facebook">Fb</a>
            <a href="#" className="social-link" aria-label="Instagram">Ig</a>
          </div>
        </div>
        
        {/* Navigation Column */}
        <div className="footer-col">
          <h3>TurkishGlobal</h3>
          <ul className="footer-links">
            <li><Link href="/">{common('home')}</Link></li>
            <li><Link href="/#jobs-slider">{common('jobs')}</Link></li>
            <li><Link href="/auth/login">{common('login')}</Link></li>
            <li><Link href="/auth/register">{common('register')}</Link></li>
          </ul>
        </div>

        {/* Legal Column */}
        <div className="footer-col">
          <h3>{t('legal')}</h3>
          <ul className="footer-links">
            <li><Link href="#">{t('privacy')}</Link></li>
            <li><Link href="#">{t('terms')}</Link></li>
            <li><Link href="/contact">{t('contact')}</Link></li>
          </ul>
        </div>
        
      </div>
      
      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="container bottom-inner">
          <p>© {year} TurkishGlobal. {t('rights')}</p>
        </div>
      </div>
    </footer>
  );
}

