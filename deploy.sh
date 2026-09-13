#!/bin/bash
set -e

echo "=== 1/3 Nginx kontrol ediliyor ==="
# Nginx config'i artık certbot tarafından yönetiliyor.
# Elle değiştirme — SSL ayarları bozulur!
# İlk kurulum veya config değişikliği gerekiyorsa:
#   certbot --nginx -d your-domain.com -d www.your-domain.com
nginx -t && systemctl reload nginx
echo "=== 1/3 Nginx tamam ==="

echo "=== 2/3 Build ediliyor (1-2 dk surer) ==="
cd /root/your-project
npm run build

echo "=== 3/3 PM2 yeniden baslatiliyor ==="
pm2 restart your-app --update-env

echo "=== TAMAM! Her sey bitti ==="
