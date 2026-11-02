import { getContent } from '@/actions/content';
import SectionForm, { type TabDef } from '@/components/admin/SectionForm';
import { auth } from '@/lib/auth';
import { redirect } from '@/i18n/routing';
import {
  HOME_SERVICES_DEFAULT,
  HOME_PROCESS_DEFAULT,
  HOME_FAQ_DEFAULT,
  type Bilingual,
  type HomeServicesContent,
  type HomeProcessContent,
  type HomeFaqContent,
} from '@/lib/contentDefaults';

const TABS: TabDef[] = [
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
          { key: 'icon',  label: 'İkon adı', type: 'text' },
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

export default async function HomeContentPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const session = await auth();
  if (!session || session.user?.role !== 'ADMIN') redirect({ href: '/admin/login', locale: 'tr' });
  void locale;

  const [services, process_, faq] = await Promise.all([
    getContent<Bilingual<HomeServicesContent>>('home.services'),
    getContent<Bilingual<HomeProcessContent>>('home.process'),
    getContent<Bilingual<HomeFaqContent>>('home.faq'),
  ]);

  return (
    <div>
      <h1 className="ap-page-title">Ana Sayfa İçerikleri</h1>

      <div className="ap-card" style={{ marginBottom: 32 }}>
        <div className="ap-card-body">
          <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 20 }}>Hizmetler Bölümü</h2>
          <SectionForm
            contentKey="home.services"
            tabs={[TABS[0]]}
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
            tabs={[TABS[1]]}
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
            tabs={[TABS[2]]}
            initialData={{ tr: faq.tr, de: faq.de } as Record<string, unknown>}
            defaultData={{ tr: HOME_FAQ_DEFAULT.tr, de: HOME_FAQ_DEFAULT.de } as Record<string, unknown>}
          />
        </div>
      </div>
    </div>
  );
}
