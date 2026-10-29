import { getContent } from '@/actions/content';
import SectionForm, { type TabDef } from '@/components/admin/SectionForm';
import { auth } from '@/lib/auth';
import { redirect } from '@/i18n/routing';
import {
  ABOUT_PRINCIPLES_DEFAULT,
  type Bilingual,
  type AboutPrinciplesContent,
} from '@/lib/contentDefaults';

const TABS: TabDef[] = [
  {
    key: 'principles',
    label: 'İlkeler',
    fields: [
      { key: 'label',    label: 'Üst Etiket',           type: 'text' },
      { key: 'title',    label: 'Başlık',                type: 'text' },
      { key: 'subtitle', label: 'Alt Başlık',            type: 'textarea' },
      { key: 'warning',  label: 'Sarı Uyarı Kutusu',    type: 'textarea' },
      {
        key: 'cards',
        label: '3 Kart',
        type: 'list',
        itemFields: [
          { key: 'icon',  label: 'İkon (emoji)', type: 'text' },
          { key: 'title', label: 'Başlık',       type: 'text' },
          { key: 'desc',  label: 'Açıklama',     type: 'textarea' },
        ],
      },
    ],
  },
];

export default async function HakkimizdaContentPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  void locale;
  const session = await auth();
  if (!session || session.user?.role !== 'ADMIN') redirect({ href: '/admin/login', locale: 'tr' });

  const data = await getContent<Bilingual<AboutPrinciplesContent>>('about.principles');

  return (
    <div>
      <h1 className="ap-page-title">Hakkımızda Sayfası İçerikleri</h1>

      <div className="ap-card">
        <div className="ap-card-body">
          <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 20 }}>İlkeler Bölümü</h2>
          <SectionForm
            contentKey="about.principles"
            tabs={TABS}
            initialData={{ tr: data.tr, de: data.de } as Record<string, unknown>}
            defaultData={{ tr: ABOUT_PRINCIPLES_DEFAULT.tr, de: ABOUT_PRINCIPLES_DEFAULT.de } as Record<string, unknown>}
          />
        </div>
      </div>
    </div>
  );
}
