import Link from 'next/link';
import { SITE_URL } from '@/lib/site';
import JsonLd from './JsonLd';

export type BreadcrumbItem = {
  name: string;
  href: string;
};

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: new URL(item.href, SITE_URL).toString(),
    })),
  };

  return (
    <>
      <JsonLd data={structuredData} />
      <nav aria-label="Breadcrumb" style={{ fontSize: '0.875rem', marginBottom: 24 }}>
        <ol style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, listStyle: 'none', margin: 0, padding: 0 }}>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={`${item.href}-${item.name}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                {index > 0 && <span aria-hidden="true" style={{ color: '#94a3b8' }}>/</span>}
                {isLast ? (
                  <span aria-current="page" style={{ color: '#475569' }}>{item.name}</span>
                ) : (
                  <Link href={item.href} style={{ color: '#2563eb', textDecoration: 'none' }}>
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
