import { getContent } from '@/actions/content';
import SectionForm, { type TabDef } from '@/components/admin/SectionForm';
import { auth } from '@/lib/auth';
import { redirect } from '@/i18n/routing';
import {
  EDUCATION_COMPARE_DEFAULT,
  EDUCATION_UNI_DEFAULT,
  EDUCATION_AUS_DEFAULT,
  type Bilingual,
  type EducationCompareContent,
  type EducationUniContent,
  type EducationAusContent,
} from '@/lib/contentDefaults';

const COMPARE_TABS: TabDef[] = [
  {
    key: 'compare',
    label: 'Karşılaştırma',
    fields: [
      { key: 'label', label: 'Üst Etiket', type: 'text' },
      { key: 'title', label: 'Başlık',     type: 'text' },
      {
        key: 'cards',
        label: '2 Kart',
        type: 'list',
        itemFields: [
          { key: 'title', label: 'Kart Başlığı', type: 'text' },
          {
            key: 'rows',
            label: 'Satırlar (4 satır)',
            type: 'list',
            itemFields: [
              { key: 'label', label: 'Etiket', type: 'text' },
              { key: 'value', label: 'Değer',  type: 'text' },
            ],
          },
        ],
      },
    ],
  },
];

const UNI_TABS: TabDef[] = [
  {
    key: 'uni',
    label: 'Üniversite',
    fields: [
      { key: 'label',      label: 'Sol Etiket',    type: 'text' },
      { key: 'title',      label: 'Sol Başlık',    type: 'text' },
      { key: 'rightLabel', label: 'Sağ Etiket',    type: 'text' },
      { key: 'rightTitle', label: 'Sağ Başlık',    type: 'text' },
      { key: 'tipBox',     label: 'Bilgi Kutusu',  type: 'textarea' },
      {
        key: 'steps',
        label: '6 Adım',
        type: 'list',
        itemFields: [
          { key: 'icon', label: 'İkon (emoji)', type: 'text' },
          { key: 'text', label: 'Metin',        type: 'textarea' },
        ],
      },
      {
        key: 'programs',
        label: '4 Program',
        type: 'list',
        itemFields: [
          { key: 'name', label: 'Program Adı', type: 'text' },
          { key: 'tag',  label: 'Yeşil Etiket', type: 'text' },
        ],
      },
    ],
  },
];

const AUS_TABS: TabDef[] = [
  {
    key: 'aus',
    label: 'Ausbildung',
    fields: [
      { key: 'label',      label: 'Sol Etiket',   type: 'text' },
      { key: 'title',      label: 'Sol Başlık',   type: 'text' },
      { key: 'rightLabel', label: 'Sağ Etiket',   type: 'text' },
      { key: 'rightTitle', label: 'Sağ Başlık',   type: 'text' },
      { key: 'tipBox',     label: 'Bilgi Kutusu', type: 'textarea' },
      {
        key: 'steps',
        label: '6 Adım',
        type: 'list',
        itemFields: [
          { key: 'icon', label: 'İkon (emoji)', type: 'text' },
          { key: 'text', label: 'Metin',        type: 'textarea' },
        ],
      },
      {
        key: 'fields',
        label: '6 Meslek',
        type: 'list',
        itemFields: [
          { key: 'icon', label: 'İkon (emoji)', type: 'text' },
          { key: 'name', label: 'Meslek Adı',   type: 'text' },
        ],
      },
    ],
  },
];

export default async function EgitimContentPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  void locale;
  const session = await auth();
  if (!session || session.user?.role !== 'ADMIN') redirect({ href: '/admin/login', locale: 'tr' });

  const [compare, uni, aus] = await Promise.all([
    getContent<Bilingual<EducationCompareContent>>('education.compare'),
    getContent<Bilingual<EducationUniContent>>('education.uni'),
    getContent<Bilingual<EducationAusContent>>('education.aus'),
  ]);

  return (
    <div>
      <h1 className="ap-page-title">Eğitim Sayfası İçerikleri</h1>

      <div className="ap-card" style={{ marginBottom: 32 }}>
        <div className="ap-card-body">
          <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 20 }}>Hızlı Karşılaştırma Bölümü</h2>
          <SectionForm
            contentKey="education.compare"
            tabs={COMPARE_TABS}
            initialData={{ tr: compare.tr, de: compare.de } as Record<string, unknown>}
            defaultData={{ tr: EDUCATION_COMPARE_DEFAULT.tr, de: EDUCATION_COMPARE_DEFAULT.de } as Record<string, unknown>}
          />
        </div>
      </div>

      <div className="ap-card" style={{ marginBottom: 32 }}>
        <div className="ap-card-body">
          <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 20 }}>Üniversite Bölümü</h2>
          <SectionForm
            contentKey="education.uni"
            tabs={UNI_TABS}
            initialData={{ tr: uni.tr, de: uni.de } as Record<string, unknown>}
            defaultData={{ tr: EDUCATION_UNI_DEFAULT.tr, de: EDUCATION_UNI_DEFAULT.de } as Record<string, unknown>}
          />
        </div>
      </div>

      <div className="ap-card">
        <div className="ap-card-body">
          <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 20 }}>Ausbildung Bölümü</h2>
          <SectionForm
            contentKey="education.aus"
            tabs={AUS_TABS}
            initialData={{ tr: aus.tr, de: aus.de } as Record<string, unknown>}
            defaultData={{ tr: EDUCATION_AUS_DEFAULT.tr, de: EDUCATION_AUS_DEFAULT.de } as Record<string, unknown>}
          />
        </div>
      </div>
    </div>
  );
}
