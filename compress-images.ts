/**
 * Mevcut büyük görselleri sharp ile optimize et
 * Çalıştırmak için: npx tsx compress-images.ts
 */
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const IMG_DIR = path.join(process.cwd(), 'public', 'img');
const MAX_WIDTH = 1920;
const QUALITY = 80;

async function compressImages() {
  const files = fs.readdirSync(IMG_DIR);
  
  for (const file of files) {
    const filePath = path.join(IMG_DIR, file);
    const stat = fs.statSync(filePath);
    const ext = path.extname(file).toLowerCase();
    
    // Sadece görsel dosyalarını işle
    if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) continue;
    
    const sizeMB = (stat.size / (1024 * 1024)).toFixed(2);
    
    // 200KB üzerindeki dosyaları optimize et
    if (stat.size > 200 * 1024) {
      console.log(`\n📷 İşleniyor: ${file} (${sizeMB} MB)`);
      
      try {
        const buffer = fs.readFileSync(filePath);
        
        const optimized = await sharp(buffer)
          .resize({ width: MAX_WIDTH, withoutEnlargement: true })
          .webp({ quality: QUALITY })
          .toBuffer();
        
        const newName = file.replace(ext, '.webp');
        const newPath = path.join(IMG_DIR, newName);
        
        // WebP olarak kaydet
        fs.writeFileSync(newPath, optimized);
        
        const newSizeMB = (optimized.length / (1024 * 1024)).toFixed(2);
        const savings = ((1 - optimized.length / stat.size) * 100).toFixed(1);
        
        console.log(`   ✅ ${newName} (${newSizeMB} MB) — %${savings} küçüldü`);
        
        // Eğer orijinal dosya farklı formattaysa (png/jpg), eski dosyayı sil
        if (newName !== file) {
          fs.unlinkSync(filePath);
          console.log(`   🗑️  Eski dosya silindi: ${file}`);
        }
      } catch (err) {
        console.error(`   ❌ Hata: ${file}`, err);
      }
    } else {
      console.log(`⏩ Atlandı (zaten küçük): ${file} (${sizeMB} MB)`);
    }
  }
  
  console.log('\n✅ Tüm görseller optimize edildi!');
}

compressImages();
