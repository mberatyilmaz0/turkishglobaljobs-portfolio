'use client';

import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import AppIcon from '@/components/ui/AppIcon';

export const CV_MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_EXT = ['pdf', 'doc', 'docx'];

/** Dosya geçerliyse null, değilse çeviri anahtarı döner */
export function validateCvFile(file: File): 'cvInvalidType' | 'cvTooLarge' | null {
  const ext = (file.name.split('.').pop() || '').toLowerCase();
  if (!ALLOWED_EXT.includes(ext)) return 'cvInvalidType';
  if (file.size > CV_MAX_SIZE) return 'cvTooLarge';
  return null;
}

function formatSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function CvUpload({
  file,
  onChange,
}: {
  file: File | null;
  onChange: (file: File | null) => void;
}) {
  const t = useTranslations('application');
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const pick = (f: File | undefined | null) => {
    if (!f) return;
    const err = validateCvFile(f);
    if (err) {
      setError(t(err));
      onChange(null);
      if (inputRef.current) inputRef.current.value = '';
      return;
    }
    setError(null);
    onChange(f);
  };

  const clear = () => {
    onChange(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#374151' }}>
        {t('cvLabel')} <span style={{ color: '#94a3b8', fontWeight: 400 }}>({t('optional')})</span>
      </label>

      {file ? (
        <div className="cv-file-chip">
          <span className="cv-file-icon"><AppIcon name="cv" size={20} /></span>
          <span style={{ flex: 1, minWidth: 0 }}>
            <span style={{ display: 'block', fontWeight: 600, color: '#0f172a', fontSize: '0.9rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {file.name}
            </span>
            <span style={{ fontSize: '0.78rem', color: '#64748b' }}>{formatSize(file.size)}</span>
          </span>
          <button type="button" onClick={clear} className="cv-remove-btn">
            {t('cvRemove')}
          </button>
        </div>
      ) : (
        <label
          className={`cv-dropzone${dragOver ? ' is-dragover' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); pick(e.dataTransfer.files?.[0]); }}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={(e) => pick(e.target.files?.[0])}
            style={{ display: 'none' }}
          />
          <AppIcon name="cv" size={26} color="#2563eb" />
          <span style={{ fontWeight: 600, color: '#1e3a8a', fontSize: '0.9rem' }}>{t('cvChoose')}</span>
          <span style={{ fontSize: '0.78rem', color: '#64748b' }}>{t('cvHint')}</span>
        </label>
      )}

      {error && <span style={{ fontSize: '0.78rem', color: '#ef4444', marginTop: 2 }}>{error}</span>}

      <style>{`
        .cv-dropzone {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 6px; padding: 22px 16px; border-radius: 14px; cursor: pointer; text-align: center;
          border: 2px dashed #bfdbfe; background: #f8fbff;
          transition: border-color .2s, background .2s, transform .2s;
        }
        .cv-dropzone:hover, .cv-dropzone.is-dragover {
          border-color: #2563eb; background: #eff6ff; transform: translateY(-1px);
        }
        .cv-file-chip {
          display: flex; align-items: center; gap: 12px; padding: 12px 14px;
          border-radius: 14px; border: 1px solid #bfdbfe; background: #eff6ff;
          animation: cvChipIn .25s ease-out;
        }
        .cv-file-icon {
          display: inline-flex; align-items: center; justify-content: center;
          width: 38px; height: 38px; border-radius: 10px; background: #2563eb; color: #fff; flex-shrink: 0;
        }
        .cv-remove-btn {
          border: none; background: #fff; color: #b91c1c; font-weight: 600; font-size: 0.8rem;
          padding: 6px 12px; border-radius: 8px; cursor: pointer; border: 1px solid #fecaca;
        }
        .cv-remove-btn:hover { background: #fef2f2; }
        @keyframes cvChipIn { from { opacity: 0; transform: scale(.97); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
}
