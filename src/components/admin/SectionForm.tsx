'use client';

import { useState } from 'react';
import { saveContent } from '@/actions/content';

/*
  SectionForm: Verilen data objesini TR/DE iki sütun olarak gösterir.
  Her field bir { key, label, type } tanımı — 'text', 'textarea', 'list' veya 'faq'.
  'list' tipinde öğeler sabit sayıda, her öğe kendi kutusunda TR+DE yan yana.
  'faq' tipinde dinamik ekle/sil/taşı.
*/

export type FieldDef =
  | { key: string; label: string; type: 'text' | 'textarea' }
  | { key: string; label: string; type: 'list'; itemFields: FieldDef[] }
  | { key: string; label: string; type: 'faq' };

export type TabDef = {
  key: string;
  label: string;
  fields: FieldDef[];
};

type Props = {
  contentKey: string;
  tabs: TabDef[];
  initialData: Record<string, unknown>;
  defaultData: Record<string, unknown>;
};

// ─── Yardımcı: nested path okur ─────────────────────────────────────────────
function getPath(obj: unknown, path: string): string {
  const parts = path.split('.');
  let cur: unknown = obj;
  for (const p of parts) {
    if (cur == null || typeof cur !== 'object') return '';
    cur = (cur as Record<string, unknown>)[p];
  }
  return String(cur ?? '');
}

// ─── Yardımcı: nested path yazar (immutable) ────────────────────────────────
function setPath(obj: unknown, path: string, value: string): unknown {
  const parts = path.split('.');
  if (parts.length === 1) {
    return { ...(obj as Record<string, unknown>), [parts[0]]: value };
  }
  const [head, ...rest] = parts;
  const parent = obj as Record<string, unknown>;
  const child = parent[head] ?? (isNaN(Number(rest[0])) ? {} : []);
  return { ...parent, [head]: setPath(child, rest.join('.'), value) };
}

// ─── Yardımcı: data içinden dizi al ─────────────────────────────────────────
function getArr(data: Record<string, unknown>, lang: 'tr' | 'de', key: string): Record<string, unknown>[] {
  const langData = data[lang] as Record<string, unknown> | undefined;
  const val = langData?.[key];
  return Array.isArray(val) ? (val as Record<string, unknown>[]) : [];
}

// ─── Ortak input stilleri ────────────────────────────────────────────────────
const INPUT_STYLE: React.CSSProperties = {
  width: '100%',
  padding: '8px 10px',
  border: '1px solid #e2e8f0',
  borderRadius: 8,
  fontSize: '0.875rem',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
  color: '#0f172a',
  background: '#fff',
};
const TEXTAREA_STYLE: React.CSSProperties = {
  ...INPUT_STYLE,
  resize: 'vertical',
  minHeight: 72,
};

// ─── Tek alan renderer (text / textarea) ────────────────────────────────────
function renderSimpleField(
  fullPath: string,
  label: string,
  type: 'text' | 'textarea',
  value: string,
  onChange: (path: string, val: string) => void
) {
  return (
    <div key={fullPath} style={{ marginBottom: 12 }}>
      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#64748b', marginBottom: 4 }}>
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea style={TEXTAREA_STYLE} value={value} onChange={(e) => onChange(fullPath, e.target.value)} />
      ) : (
        <input type="text" style={INPUT_STYLE} value={value} onChange={(e) => onChange(fullPath, e.target.value)} />
      )}
    </div>
  );
}

// ─── LIST tipi: öğe başına TR+DE yan yana kutu ───────────────────────────────
// 'list' alanları normalFields içinde çalışır ama TR/DE 2-sütun grid'in dışına çıkar.
// Bu nedenle SectionForm render kısmında list field'ları ayrı tutup renderListField ile çiziyoruz.
function renderListField(
  fieldKey: string,
  label: string,
  itemFields: FieldDef[],
  data: Record<string, unknown>,
  onChange: (path: string, val: string) => void
) {
  const trArr = getArr(data, 'tr', fieldKey);
  const deArr = getArr(data, 'de', fieldKey);
  const count = Math.max(trArr.length, deArr.length);

  if (count === 0) {
    return (
      <div key={fieldKey} style={{ gridColumn: '1 / -1', marginBottom: 16 }}>
        <div style={{ fontWeight: 600, fontSize: '0.85rem', color: '#64748b', marginBottom: 8 }}>{label}</div>
        <div style={{ color: '#94a3b8', fontSize: '0.82rem', padding: '12px', background: '#f8fafc', borderRadius: 8, border: '1px dashed #e2e8f0' }}>
          Veri bulunamadı. &quot;Varsayılana Dön&quot; ile varsayılan değerleri yükleyin.
        </div>
      </div>
    );
  }

  return (
    <div key={fieldKey} style={{ gridColumn: '1 / -1', marginBottom: 16 }}>
      <div style={{ fontWeight: 600, fontSize: '0.85rem', color: '#475569', marginBottom: 10 }}>{label}</div>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          style={{
            border: '1px solid #e2e8f0',
            borderRadius: 12,
            padding: '14px 16px',
            marginBottom: 10,
            background: '#f8fafc',
          }}
        >
          {/* Öğe başlığı */}
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            #{idx + 1}
          </div>
          {/* TR + DE yan yana */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {/* TR */}
            <div>
              <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#059669', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8, paddingBottom: 4, borderBottom: '2px solid #10b981' }}>
                🇹🇷 Türkçe
              </div>
              {itemFields.map((sub) => {
                if (sub.type === 'list') return null; // iç içe list desteklenmiyor
                const fullPath = `tr.${fieldKey}.${idx}.${sub.key}`;
                const val = getPath(data, fullPath);
                return renderSimpleField(fullPath, sub.label, sub.type as 'text' | 'textarea', val, onChange);
              })}
            </div>
            {/* DE */}
            <div>
              <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#2563eb', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8, paddingBottom: 4, borderBottom: '2px solid #3b82f6' }}>
                🇩🇪 Almanca
              </div>
              {itemFields.map((sub) => {
                if (sub.type === 'list') return null;
                const fullPath = `de.${fieldKey}.${idx}.${sub.key}`;
                const val = getPath(data, fullPath);
                return renderSimpleField(fullPath, sub.label, sub.type as 'text' | 'textarea', val, onChange);
              })}
            </div>
          </div>

          {/* İç içe list (ör. education.compare → cards[i].rows) */}
          {itemFields
            .filter((sub): sub is Extract<FieldDef, { type: 'list' }> => sub.type === 'list')
            .map((sub) => {
              // İç liste: her dil için ayrı render
              const trInner = (() => {
                const v = (data.tr as Record<string, unknown>)?.[fieldKey];
                const row = Array.isArray(v) ? (v as Record<string, unknown>[])[idx] : undefined;
                const inner = row?.[sub.key];
                return Array.isArray(inner) ? (inner as Record<string, unknown>[]) : [];
              })();
              const deInner = (() => {
                const v = (data.de as Record<string, unknown>)?.[fieldKey];
                const row = Array.isArray(v) ? (v as Record<string, unknown>[])[idx] : undefined;
                const inner = row?.[sub.key];
                return Array.isArray(inner) ? (inner as Record<string, unknown>[]) : [];
              })();
              const innerCount = Math.max(trInner.length, deInner.length);
              if (innerCount === 0) return null;
              return (
                <div key={sub.key} style={{ marginTop: 12, borderTop: '1px solid #e2e8f0', paddingTop: 12 }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {sub.label}
                  </div>
                  {Array.from({ length: innerCount }).map((_, innerIdx) => (
                    <div key={innerIdx} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 8, padding: '8px 10px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 8 }}>
                      <div>
                        <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#059669', marginBottom: 6 }}>🇹🇷 {innerIdx + 1}</div>
                        {sub.itemFields.map((sf) => {
                          const fp = `tr.${fieldKey}.${idx}.${sub.key}.${innerIdx}.${sf.key}`;
                          return renderSimpleField(fp, sf.label, sf.type as 'text' | 'textarea', getPath(data, fp), onChange);
                        })}
                      </div>
                      <div>
                        <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#2563eb', marginBottom: 6 }}>🇩🇪 {innerIdx + 1}</div>
                        {sub.itemFields.map((sf) => {
                          const fp = `de.${fieldKey}.${idx}.${sub.key}.${innerIdx}.${sf.key}`;
                          return renderSimpleField(fp, sf.label, sf.type as 'text' | 'textarea', getPath(data, fp), onChange);
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
        </div>
      ))}
    </div>
  );
}

// ─── FAQ tipi: dinamik ekle/sil/taşı ─────────────────────────────────────────
function renderFaqField(
  fieldKey: string,
  data: Record<string, unknown>,
  setData: React.Dispatch<React.SetStateAction<Record<string, unknown>>>
) {
  const trItems = (data?.tr as Record<string, unknown>)?.[fieldKey];
  const deItems = (data?.de as Record<string, unknown>)?.[fieldKey];
  const trArr: { q: string; a: string }[] = Array.isArray(trItems) ? (trItems as { q: string; a: string }[]) : [];
  const deArr: { q: string; a: string }[] = Array.isArray(deItems) ? (deItems as { q: string; a: string }[]) : [];
  const count = Math.max(trArr.length, deArr.length);

  const updateItem = (lang: 'tr' | 'de', idx: number, subKey: 'q' | 'a', val: string) => {
    setData((prev) => {
      const langData = { ...(prev[lang] as Record<string, unknown>) };
      const arr = Array.isArray(langData[fieldKey])
        ? ([...(langData[fieldKey] as { q: string; a: string }[])])
        : [];
      arr[idx] = { ...arr[idx], [subKey]: val };
      return { ...prev, [lang]: { ...langData, [fieldKey]: arr } };
    });
  };

  const addItem = () => {
    setData((prev) => {
      const trData = { ...(prev.tr as Record<string, unknown>) };
      const deData = { ...(prev.de as Record<string, unknown>) };
      const trA = Array.isArray(trData[fieldKey]) ? [...(trData[fieldKey] as { q: string; a: string }[])] : [];
      const deA = Array.isArray(deData[fieldKey]) ? [...(deData[fieldKey] as { q: string; a: string }[])] : [];
      trA.push({ q: '', a: '' });
      deA.push({ q: '', a: '' });
      return { ...prev, tr: { ...trData, [fieldKey]: trA }, de: { ...deData, [fieldKey]: deA } };
    });
  };

  const removeItem = (idx: number) => {
    setData((prev) => {
      const trData = { ...(prev.tr as Record<string, unknown>) };
      const deData = { ...(prev.de as Record<string, unknown>) };
      const trA = (Array.isArray(trData[fieldKey]) ? [...(trData[fieldKey] as { q: string; a: string }[])] : []).filter((_, i) => i !== idx);
      const deA = (Array.isArray(deData[fieldKey]) ? [...(deData[fieldKey] as { q: string; a: string }[])] : []).filter((_, i) => i !== idx);
      return { ...prev, tr: { ...trData, [fieldKey]: trA }, de: { ...deData, [fieldKey]: deA } };
    });
  };

  const moveItem = (idx: number, dir: -1 | 1) => {
    setData((prev) => {
      const swap = (arr: { q: string; a: string }[], a: number, b: number) => {
        const next = [...arr];
        [next[a], next[b]] = [next[b], next[a]];
        return next;
      };
      const trData = { ...(prev.tr as Record<string, unknown>) };
      const deData = { ...(prev.de as Record<string, unknown>) };
      const trA = Array.isArray(trData[fieldKey]) ? [...(trData[fieldKey] as { q: string; a: string }[])] : [];
      const deA = Array.isArray(deData[fieldKey]) ? [...(deData[fieldKey] as { q: string; a: string }[])] : [];
      return {
        ...prev,
        tr: { ...trData, [fieldKey]: swap(trA, idx, idx + dir) },
        de: { ...deData, [fieldKey]: swap(deA, idx, idx + dir) },
      };
    });
  };

  return (
    <div style={{ gridColumn: '1 / -1' }}>
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} style={{ border: '1px solid #e2e8f0', borderRadius: 12, padding: '14px 16px', marginBottom: 12, background: '#f8fafc' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontWeight: 700, fontSize: '0.82rem', color: '#475569' }}>Soru {idx + 1}</span>
            <div style={{ display: 'flex', gap: 4 }}>
              <button type="button" onClick={() => moveItem(idx, -1)} disabled={idx === 0} title="Yukarı Taşı"
                style={{ padding: '2px 8px', borderRadius: 6, border: '1px solid #e2e8f0', background: '#fff', cursor: idx === 0 ? 'not-allowed' : 'pointer', opacity: idx === 0 ? 0.4 : 1 }}>↑</button>
              <button type="button" onClick={() => moveItem(idx, 1)} disabled={idx === count - 1} title="Aşağı Taşı"
                style={{ padding: '2px 8px', borderRadius: 6, border: '1px solid #e2e8f0', background: '#fff', cursor: idx === count - 1 ? 'not-allowed' : 'pointer', opacity: idx === count - 1 ? 0.4 : 1 }}>↓</button>
              <button type="button" onClick={() => removeItem(idx)} disabled={count <= 1} title="Sil"
                style={{ padding: '2px 8px', borderRadius: 6, border: '1px solid #fca5a5', background: '#fff5f5', color: '#dc2626', cursor: count <= 1 ? 'not-allowed' : 'pointer', opacity: count <= 1 ? 0.4 : 1 }}>🗑</button>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#059669', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8, paddingBottom: 4, borderBottom: '2px solid #10b981' }}>🇹🇷 Türkçe</div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#64748b', marginBottom: 4 }}>Soru</label>
              <input type="text" style={INPUT_STYLE} value={trArr[idx]?.q ?? ''} onChange={(e) => updateItem('tr', idx, 'q', e.target.value)} />
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#64748b', marginBottom: 4, marginTop: 8 }}>Cevap</label>
              <textarea style={TEXTAREA_STYLE} value={trArr[idx]?.a ?? ''} onChange={(e) => updateItem('tr', idx, 'a', e.target.value)} />
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#2563eb', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8, paddingBottom: 4, borderBottom: '2px solid #3b82f6' }}>🇩🇪 Almanca</div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#64748b', marginBottom: 4 }}>Soru</label>
              <input type="text" style={INPUT_STYLE} value={deArr[idx]?.q ?? ''} onChange={(e) => updateItem('de', idx, 'q', e.target.value)} />
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#64748b', marginBottom: 4, marginTop: 8 }}>Cevap</label>
              <textarea style={TEXTAREA_STYLE} value={deArr[idx]?.a ?? ''} onChange={(e) => updateItem('de', idx, 'a', e.target.value)} />
            </div>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={addItem}
        style={{ padding: '8px 18px', borderRadius: 8, border: '1px dashed #94a3b8', background: '#f1f5f9', color: '#475569', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', width: '100%', marginTop: 4 }}
      >+ Soru Ekle</button>
    </div>
  );
}

// ─── Ana bileşen ──────────────────────────────────────────────────────────────
export default function SectionForm({ contentKey, tabs, initialData, defaultData }: Props) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.key ?? '');
  const [data, setData] = useState<Record<string, unknown>>(initialData);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  const handleChange = (path: string, val: string) => {
    setData((prev) => setPath(prev, path, val) as Record<string, unknown>);
  };

  const handleSave = async () => {
    setSaving(true);
    setMsg('');
    const res = await saveContent(contentKey, data);
    setSaving(false);
    setMsg(res.ok ? '✅ Kaydedildi!' : `❌ ${res.error}`);
    setTimeout(() => setMsg(''), 4000);
  };

  const handleReset = () => {
    setData(defaultData);
    setMsg('Varsayılan değerler yüklendi. Kaydetmek için "Kaydet" butonuna basın.');
    setTimeout(() => setMsg(''), 4000);
  };

  const activeTabDef = tabs.find((t) => t.key === activeTab);

  // Alan tipine göre ayır
  const textFields    = activeTabDef?.fields.filter((f) => f.type === 'text' || f.type === 'textarea') ?? [];
  const listFields    = activeTabDef?.fields.filter((f) => f.type === 'list') as Extract<FieldDef, { type: 'list' }>[] ?? [];
  const faqFields     = activeTabDef?.fields.filter((f) => f.type === 'faq') ?? [];

  return (
    <div>
      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, borderBottom: '2px solid #e2e8f0', marginBottom: 24, flexWrap: 'wrap' }}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              padding: '8px 16px', border: 'none',
              background: activeTab === tab.key ? '#2563eb' : 'transparent',
              color: activeTab === tab.key ? '#fff' : '#64748b',
              fontWeight: 600, fontSize: '0.85rem',
              borderRadius: '8px 8px 0 0', cursor: 'pointer', transition: 'background 0.15s',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* İçerik */}
      {activeTabDef && (
        <div>
          {/* text/textarea alanları: 2 sütun TR / DE */}
          {textFields.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: listFields.length > 0 || faqFields.length > 0 ? 28 : 0 }}>
              {(['tr', 'de'] as const).map((lang) => (
                <div key={lang}>
                  <div style={{
                    fontSize: '0.7rem', fontWeight: 700,
                    color: lang === 'tr' ? '#059669' : '#2563eb',
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    marginBottom: 12, paddingBottom: 6,
                    borderBottom: `2px solid ${lang === 'tr' ? '#10b981' : '#3b82f6'}`,
                  }}>
                    {lang === 'tr' ? '🇹🇷 Türkçe' : '🇩🇪 Almanca'}
                  </div>
                  {textFields.map((field) => {
                    const fullPath = `${lang}.${field.key}`;
                    return renderSimpleField(fullPath, field.label, field.type as 'text' | 'textarea', getPath(data, fullPath), handleChange);
                  })}
                </div>
              ))}
            </div>
          )}

          {/* list alanları: full-width, öğe başına TR+DE yan yana */}
          {listFields.map((field) =>
            renderListField(field.key, field.label, field.itemFields, data, handleChange)
          )}

          {/* faq alanları: dinamik */}
          {faqFields.map((field) => (
            <div key={field.key}>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#475569', marginBottom: 12 }}>{field.label}</div>
              {renderFaqField(field.key, data, setData)}
            </div>
          ))}
        </div>
      )}

      {/* Kaydet / Varsayılana Dön */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
        <button onClick={handleSave} disabled={saving} className="btn btn-primary" style={{ padding: '10px 28px' }}>
          {saving ? 'Kaydediliyor...' : 'Kaydet'}
        </button>
        <button onClick={handleReset} className="btn btn-secondary" style={{ padding: '10px 20px' }}>
          Varsayılana Dön
        </button>
        {msg && (
          <span style={{ fontSize: '0.875rem', fontWeight: 600, color: msg.startsWith('✅') ? '#059669' : '#dc2626' }}>
            {msg}
          </span>
        )}
      </div>
    </div>
  );
}
