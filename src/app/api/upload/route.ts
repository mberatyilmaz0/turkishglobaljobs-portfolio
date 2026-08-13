import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_WIDTH = 1920;
const WEBP_QUALITY = 80;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Dosya boyutu kontrolü
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'Dosya boyutu 10MB\'ı aşamaz' },
        { status: 400 }
      );
    }

    // MIME type kontrolü
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Sadece JPG, PNG, WebP ve GIF dosyaları kabul edilir' },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // sharp ile optimizasyon: yeniden boyutlandır + WebP'ye çevir + kalite düşür
    const optimizedBuffer = await sharp(buffer)
      .resize({
        width: MAX_WIDTH,
        withoutEnlargement: true, // Küçük görselleri büyütme
      })
      .webp({ quality: WEBP_QUALITY })
      .toBuffer();

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = `${uniqueSuffix}.webp`;
    
    // Proje kök dizinindeki public/uploads klasörü
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    
    // Klasör yoksa oluştur
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    const filepath = path.join(uploadDir, filename);
    
    // Optimize edilmiş dosyayı sunucuya yaz
    fs.writeFileSync(filepath, optimizedBuffer);

    // Dönen URL, sitenin /uploads yolundan erişilebilecek
    return NextResponse.json({ url: `/uploads/${filename}` });
  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
