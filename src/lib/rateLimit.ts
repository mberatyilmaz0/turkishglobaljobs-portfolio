/**
 * Basit, bellek içi (in-memory) sabit pencereli rate limiter.
 * Tek sunucu / tek PM2 süreci için uygundur. Cluster modunda her süreç
 * kendi sayacını tutar (yine de kötüye kullanımı büyük ölçüde azaltır).
 */
type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();
let lastSweep = Date.now();

function sweep(now: number) {
  // Bellek şişmesini önlemek için süresi dolanları ara ara temizle
  if (now - lastSweep < 60_000) return;
  lastSweep = now;
  for (const [key, b] of buckets) {
    if (b.resetAt <= now) buckets.delete(key);
  }
}

/**
 * @returns true → izin ver, false → limit aşıldı
 */
export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  sweep(now);

  const b = buckets.get(key);
  if (!b || b.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (b.count >= limit) return false;
  b.count++;
  return true;
}

/** Nginx arkasında gerçek istemci IP'sini al */
export function getClientIp(headers: Headers): string {
  const xff = headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  return headers.get('x-real-ip') || 'unknown';
}
