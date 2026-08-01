'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h2 className="text-3xl font-bold mb-4 text-[var(--color-primary)]">Bir şeyler yanlış gitti!</h2>
      <p className="text-gray-600 mb-8 max-w-md">
        Beklenmeyen bir hata oluştu. Lütfen sayfayı yenilemeyi deneyin veya daha sonra tekrar dönün.
      </p>
      <button
        onClick={() => reset()}
        className="px-6 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:opacity-90 transition-colors"
        style={{ backgroundColor: 'var(--color-primary)' }}
      >
        Tekrar Dene
      </button>
    </div>
  );
}
