import { getContent } from '@/actions/content';
import SectionForm, { type TabDef } from '@/components/admin/SectionForm';
import { auth } from '@/lib/auth';
import { redirect } from '@/i18n/routing';
import {
  HOME_STATS_DEFAULT,
  HOME_SERVICES_DEFAULT,
  HOME_PROCESS_DEFAULT,
  HOME_FAQ_DEFAULT,
  type Bilingual,
  type HomeStatsContent,
  type HomeServicesContent,
  type HomeProcessContent,
  type HomeFaqContent,
} from '@/lib/contentDefaults';

const TABS: TabDef[] = [
  {
    key: 'stats',
    label: 'İstatistikler',
    fields: [
      {
        key: 'items',
        label: 'İstatistik Kutuları (4 kutu)',
        type: 'list',
        itemFields: [
          { key: 'value', label: 'Değer', type: 'text' },
          { key: 'label', label: 'Etiket', type: 'text' },
        ],
      },
    ],
  },
  {
    key: 'services',
    label: 'Hizmetler',
    fields: [
      { key: 'label',    label: 'Üst Etiket',   type: 'text' },
      { key: 'title',    label: 'Başlık',        type: 'text' },
      { key: 'subtitle', label: 'Alt Başlık',    type: 'textarea' },
      {
        key: 'cards',
        label: 'Kartlar (4 kart)',
        type: 'list',
        itemFields: [
          { key: 'icon',  label: 'İkon (emoji)', type: 'text' },
          { key: 'title', label: 'Kart Başlık',  type: 'text' },
          { key: 'desc',  label: 'Açıklama',     type: 'textarea' },
        ],
      },
    ],
  },
  {
    key: 'process',
    label: 'Süreç Adımları',
    fields: [
      { key: 'label',    label: 'Üst Etiket',  type: 'text' },
      { key: 'title',    label: 'Başlık',       type: 'text' },
      { key: 'subtitle', label: 'Alt Başlık',   type: 'textarea' },
      {
        key: 'steps',
        label: 'Adımlar (4 adım)',
        type: 'list',
        itemFields: [
          { key: 'title', label: 'Adım Başlığı', type: 'text' },
          { key: 'desc',  label: 'Açıklama',     type: 'textarea' },
        ],
      },
    ],
  },
  {
    key: 'faq',
    label: 'SSS',
    fields: [
      { key: 'label',    label: 'Üst Etiket',  type: 'text' },
      { key: 'title',    label: 'Başlık',       type: 'text' },
      { key: 'subtitle', label: 'Alt Başlık',   type: 'textarea' },
      {
        key: 'items',
        label: 'Sorular',
        type: 'faq',
      },
    ],
  },
];

// Birden fazla key'i tek data objesine birleştir
type CombinedHome = {
  stats: Bilingual<HomeStatsContent>;
  services: Bilingual<HomeServicesContent>;
  process: Bilingual<HomeProcessContent>;
  faq: Bilingual<HomeFaqContent>;
};

const DEFAULTS: CombinedHome = {
  stats: HOME_STATS_DEFAULT,
  services: HOME_SERVICES_DEFAULT,
  process: HOME_PROCESS_DEFAULT,
  faq: HOME_FAQ_DEFAULT,
};

// SectionForm'a tr/de olarak flatten et
function flatten(data: CombinedHome) {
  return {
    tr: {
      items: data.stats.tr.items,
      label: data.services.tr.label,
      title: data.services.tr.title,
      subtitle: data.services.tr.subtitle,
      cards: data.services.tr.cards,
      steps: data.process.tr.steps,
      faqLabel: data.faq.tr.label,
      faqTitle: data.faq.tr.title,
      faqSubtitle: data.faq.tr.subtitle,
      faqItems: data.faq.tr.items,
    },
    de: {
      items: data.stats.de.items,
      label: data.services.de.label,
      title: data.services.de.title,
      subtitle: data.services.de.subtitle,
      cards: data.services.de.cards,
      steps: data.process.de.steps,
      faqLabel: data.faq.de.label,
      faqTitle: data.faq.de.title,
      faqSubtitle: data.faq.de.subtitle,
      faqItems: data.faq.de.items,
    },
  };
}

export default async function HomeContentPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const session = await auth();
  if (!session || session.user?.role !== 'ADMIN') redirect({ href: '/admin/login', locale: 'tr' });

  const [stats, services, process_, faq] = await Promise.all([
    getContent<Bilingual<HomeStatsContent>>('home.stats'),
    getContent<Bilingual<HomeServicesContent>>('home.services'),
    getContent<Bilingual<HomeProcessContent>>('home.process'),
    getContent<Bilingual<HomeFaqContent>>('home.faq'),
  ]);

  // Her bölüm ayrı contentKey kullanır; SectionForm'u 4 ayrı key ile vermek yerine
  // sayfada 4 ayrı SectionForm render ediyoruz, daha basit.
  const combined: CombinedHome = { stats, services, process: process_, faq };
  void combined; void locale; // suppress unused

  return (
    <div>
      <h1 className="ap-page-title">Ana Sayfa İçerikleri</h1>

      <div className="ap-card" style={{ marginBottom: 32 }}>
        <div className="ap-card-body">
          <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 20 }}>İstatistik Şeridi</h2>
          <SectionForm
            contentKey="home.stats"
            tabs={[TABS[0]]}
            initialData={{ tr: stats.tr, de: stats.de } as Record<string, unknown>}
            defaultData={{ tr: HOME_STATS_DEFAULT.tr, de: HOME_STATS_DEFAULT.de } as Record<string, unknown>}
          />
        </div>
      </div>

      <div className="ap-card" style={{ marginBottom: 32 }}>
        <div className="ap-card-body">
          <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 20 }}>Hizmetler Bölümü</h2>
          <SectionForm
            contentKey="home.services"
            tabs={[TABS[1]]}
            initialData={{ tr: services.tr, de: services.de } as Record<string, unknown>}
            defaultData={{ tr: HOME_SERVICES_DEFAULT.tr, de: HOME_SERVICES_DEFAULT.de } as Record<string, unknown>}
          />
        </div>
      </div>

      <div className="ap-card" style={{ marginBottom: 32 }}>
        <div className="ap-card-body">
          <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 20 }}>Süreç Adımları (Nasıl Çalışıyoruz)</h2>
          <SectionForm
            contentKey="home.process"
            tabs={[TABS[2]]}
            initialData={{ tr: process_.tr, de: process_.de } as Record<string, unknown>}
            defaultData={{ tr: HOME_PROCESS_DEFAULT.tr, de: HOME_PROCESS_DEFAULT.de } as Record<string, unknown>}
          />
        </div>
      </div>

      <div className="ap-card">
        <div className="ap-card-body">
          <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 20 }}>Sık Sorulan Sorular</h2>
          <SectionForm
            contentKey="home.faq"
            tabs={[TABS[3]]}
            initialData={{ tr: faq.tr, de: faq.de } as Record<string, unknown>}
            defaultData={{ tr: HOME_FAQ_DEFAULT.tr, de: HOME_FAQ_DEFAULT.de } as Record<string, unknown>}
          />
        </div>
      </div>
    </div>
  );
}
