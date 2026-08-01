'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
  };

  return (
    <div className="lang-switcher">
      <button
        className={`lang-btn ${locale === 'tr' ? 'active' : ''}`}
        onClick={() => switchLocale('tr')}
        title="Türkçe"
      >
        <Image src="https://flagcdn.com/w40/tr.png" alt="TR" width={24} height={24} className="flag-icon" />
      </button>
      <button
        className={`lang-btn ${locale === 'de' ? 'active' : ''}`}
        onClick={() => switchLocale('de')}
        title="Deutsch"
      >
        <Image src="https://flagcdn.com/w40/de.png" alt="DE" width={24} height={24} className="flag-icon" />
      </button>
    </div>
  );
}
