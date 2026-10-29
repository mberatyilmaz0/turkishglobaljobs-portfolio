import { getContent } from '@/actions/content';
import SectionForm, { type TabDef } from '@/components/admin/SectionForm';
import { auth } from '@/lib/auth';
import { redirect } from '@/i18n/routing';
import {
  OPPORTUNITY_SCORING_DEFAULT,
  OPPORTUNITY_REQUIREMENTS_DEFAULT,
  type Bilingual,
  type OpportunityScoringContent,
  type OpportunityRequirementsContent,
} from '@/lib/contentDefaults';

const SCORING_TABS: TabDef[] = [
  {
    key: 'scoring',
    label: 'Puanlama',
    fields: [
      { key: 'label',    label: 'Üst Etiket', type: 'text' },
      { key: 'title',    label: 'Başlık',      type: 'text' },
      { key: 'subtitle', label: 'Alt Başlık',  type: 'textarea' },
      {
        key: 'cards',
        label: 'Kartlar (6 kart)',
        type: 'list',
        itemFields: [
          { key: 'icon',   label: 'İkon (emoji)', type: 'text' },
          { key: 'title',  label: 'Başlık',       type: 'text' },
          { key: 'points', label: 'Puan Metni',   type: 'text' },
        ],
      },
    ],
  },
];

const REQ_TABS: TabDef[] = [
  {
    key: 'requirements',
    label: 'Şartlar',
    fields: [
      { key: 'label', label: 'Üst Etiket', type: 'text' },
      { key: 'title', label: 'Başlık',     type: 'text' },
      {
        key: 'items',
        label: 'Maddeler (5 madde)',
        type: 'list',
        itemFields: [
          { key: 'icon', label: 'İkon (emoji)', type: 'text' },
          { key: 'text', label: 'Metin',        type: 'textarea' },
        ],
      },
    ],
  },
];

export default async function FirsatKartiContentPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  void locale;
  const session = await auth();
  if (!session || session.user?.role !== 'ADMIN') redirect({ href: '/admin/login', locale: 'tr' });

  const [scoring, requirements] = await Promise.all([
    getContent<Bilingual<OpportunityScoringContent>>('opportunity.scoring'),
    getContent<Bilingual<OpportunityRequirementsContent>>('opportunity.requirements'),
  ]);

  return (
    <div>
      <h1 className="ap-page-title">Fırsat Kartı Sayfası İçerikleri</h1>

      <div className="ap-card" style={{ marginBottom: 32 }}>
        <div className="ap-card-body">
          <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 20 }}>Puanlama Sistemi Bölümü</h2>
          <SectionForm
            contentKey="opportunity.scoring"
            tabs={SCORING_TABS}
            initialData={{ tr: scoring.tr, de: scoring.de } as Record<string, unknown>}
            defaultData={{ tr: OPPORTUNITY_SCORING_DEFAULT.tr, de: OPPORTUNITY_SCORING_DEFAULT.de } as Record<string, unknown>}
          />
        </div>
      </div>

      <div className="ap-card">
        <div className="ap-card-body">
          <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 20 }}>Başvuru Şartları Bölümü</h2>
          <SectionForm
            contentKey="opportunity.requirements"
            tabs={REQ_TABS}
            initialData={{ tr: requirements.tr, de: requirements.de } as Record<string, unknown>}
            defaultData={{ tr: OPPORTUNITY_REQUIREMENTS_DEFAULT.tr, de: OPPORTUNITY_REQUIREMENTS_DEFAULT.de } as Record<string, unknown>}
          />
        </div>
      </div>
    </div>
  );
}
