import path from 'path';

/** Herkese açık görseller (/uploads/... adresinden sunulur) */
export const PUBLIC_UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');
