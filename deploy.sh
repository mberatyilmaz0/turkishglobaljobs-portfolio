#!/bin/bash
set -e

# Sunucudaki gerçek değerlerle değiştirin
PROJECT_DIR="/root/your-project"
PM2_APP="your-app"

echo "=== 1/4 Nginx kontrol ediliyor ==="
# Nginx config'i certbot tarafından yönetiliyor — SSL satırlarına dokunmayın.
# İlk kurulum veya config değişikliği gerekiyorsa:
#   certbot --nginx -d turkishglobaljobs.com -d www.turkishglobaljobs.com
#
# CV ekli formlar için 443 (ssl) server bloğunda şu satır olmalı:
#   client_max_body_size 6M;
if ! nginx -T 2>/dev/null | grep -q "client_max_body_size"; then
  echo "UYARI: Nginx'te client_max_body_size tanımlı değil (varsayılan 1MB)."
  echo "       1MB'tan büyük CV'ler gönderilemez. Yukarıdaki satırı ekleyin."
fi
nginx -t && systemctl reload nginx
echo "=== 1/4 Nginx tamam ==="

cd "$PROJECT_DIR"

echo "=== 2/4 Ortam değişkenleri kontrol ediliyor ==="
if grep -q "^NEXT_PUBLIC_SITE_URL=.*localhost" .env 2>/dev/null; then
  echo "UYARI: .env içinde NEXT_PUBLIC_SITE_URL localhost gösteriyor."
  echo "       Kod canlıda otomatik olarak https://www.turkishglobaljobs.com kullanır,"
  echo "       yine de .env'i düzeltmeniz önerilir."
fi

echo "=== 3/4 Build ediliyor (1-2 dk surer) ==="
npm run build

echo "=== 4/4 PM2 yeniden baslatiliyor ==="
pm2 restart "$PM2_APP" --update-env

echo "=== TAMAM! Her sey bitti ==="
