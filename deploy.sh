#!/bin/bash
echo "=== 1/4 Nginx ayarlanıyor ==="

cat > /etc/nginx/sites-available/default << 'NGINX'
server {
    listen 80;
    server_name 187.77.92.49;
    client_max_body_size 50M;

    location /uploads/ {
        alias /root/isbasvurusitesi/public/uploads/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
NGINX

nginx -t && systemctl reload nginx
echo "=== 2/4 Nginx tamam ==="

echo "=== 3/4 Build ediliyor (1-2 dk surer) ==="
cd /root/isbasvurusitesi
npm run build

echo "=== 4/4 PM2 yeniden baslatiliyor ==="
pm2 restart isbasvurusu --update-env

echo "=== TAMAM! Her sey bitti ==="
