import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h2 className="text-6xl font-bold mb-4 text-[var(--color-primary)]">404</h2>
      <p className="text-xl text-gray-600 mb-8">Aradığınız sayfa bulunamadı veya taşınmış olabilir.</p>
      <Link
        href="/"
        className="px-6 py-3 text-white rounded-lg hover:opacity-90 transition-colors font-medium"
        style={{ backgroundColor: 'var(--color-primary)' }}
      >
        Ana Sayfaya Dön
      </Link>
    </div>
  );
}
