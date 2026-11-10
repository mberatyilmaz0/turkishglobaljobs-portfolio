import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Readable } from 'stream';
import { PUBLIC_UPLOAD_DIR } from '@/lib/uploadPaths';

const CONTENT_TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  // .svg bilinçli olarak YOK: SVG içinde script çalıştırılabilir (stored XSS)
};

/** baseDir içinde kalan güvenli bir yol döndürür, değilse null */
function safeResolve(baseDir: string, relative: string): string | null {
  const resolved = path.resolve(baseDir, relative);
  if (!resolved.startsWith(baseDir + path.sep)) return null;
  return resolved;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  try {
    const { slug } = await params;

    const filePath = safeResolve(PUBLIC_UPLOAD_DIR, slug.join('/'));
    if (!filePath) return new NextResponse('Not found', { status: 404 });

    const contentType = CONTENT_TYPES[path.extname(filePath).toLowerCase()];
    if (!contentType || !fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
      return new NextResponse('Not found', { status: 404 });
    }

    const stat = fs.statSync(filePath);
    const nodeStream = fs.createReadStream(filePath);
    const webStream = Readable.toWeb(nodeStream) as ReadableStream;

    return new Response(webStream, {
      headers: {
        'Content-Type': contentType,
        'Content-Length': stat.size.toString(),
        'Cache-Control': 'public, max-age=31536000, immutable',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error) {
    console.error('Error serving file:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
