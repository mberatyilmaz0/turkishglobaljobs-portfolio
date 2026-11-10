import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { rateLimit, getClientIp } from "@/lib/rateLimit";

const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/** Kullanıcı girdisini HTML'e güvenle yerleştirmek için kaçış (mail içine link/HTML enjeksiyonunu engeller) */
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Alan başına maksimum uzunluklar
const FIELD_LIMITS: Record<string, number> = {
  ad: 100,
  soyad: 100,
  eposta: 254,
  telefon: 40,
  amac: 200,
  egitimDurumu: 200,
  almancaSeviyesi: 50,
  not: 3000,
};

const EMAIL_REGEX = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]+$/;

// ---- CV eki ----
const MAX_CV_SIZE = 5 * 1024 * 1024; // 5MB

const CV_TYPES: Record<string, { mime: string; check: (b: Buffer) => boolean }> = {
  pdf: {
    mime: "application/pdf",
    check: (b) => b.subarray(0, 5).toString("ascii") === "%PDF-",
  },
  docx: {
    mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    // DOCX bir ZIP dosyasıdır: "PK\x03\x04"
    check: (b) => b[0] === 0x50 && b[1] === 0x4b && b[2] === 0x03 && b[3] === 0x04,
  },
  doc: {
    mime: "application/msword",
    // Eski Word (OLE2): D0 CF 11 E0
    check: (b) => b[0] === 0xd0 && b[1] === 0xcf && b[2] === 0x11 && b[3] === 0xe0,
  },
};

async function validateCv(
  file: File
): Promise<{ filename: string; content: Buffer; contentType: string } | { error: string }> {
  if (file.size > MAX_CV_SIZE) return { error: "CV dosyası 5MB'ı aşamaz." };

  const ext = (file.name.split(".").pop() || "").toLowerCase();
  const type = CV_TYPES[ext];
  if (!type) return { error: "CV için sadece PDF, DOC veya DOCX dosyaları kabul edilir." };

  const content = Buffer.from(await file.arrayBuffer());
  // Uzantı ile içerik uyuşuyor mu? (exe'yi .pdf diye göndermeyi engeller)
  if (!type.check(content)) return { error: "CV dosyası geçersiz veya bozuk." };

  // Dosya adını güvenli hale getir (yalnızca harf, rakam, - _ .)
  const base = file.name
    .replace(/\.[^.]+$/, "")
    .normalize("NFKD")
    .replace(/[^\w.-]+/g, "_")
    .slice(0, 60) || "cv";

  return { filename: `${base}.${ext}`, content, contentType: type.mime };
}

function buildHtml(data: Record<string, string>, formTitle: string, hasCv: boolean): string {
  const rows = [
    ["Ad",               data.ad],
    ["Soyad",            data.soyad],
    ["E-posta",          data.eposta],
    ["Telefon",          data.telefon],
    ["Amaç",             data.amac],
    ["Eğitim Durumu",    data.egitimDurumu],
    ["Almanca Seviyesi", data.almancaSeviyesi],
    ["Not",              data.not],
    ["CV",               hasCv ? "Ekte gönderildi" : ""],
  ]
    .filter(([, v]) => v)
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:10px 16px;background:#f8fafc;font-weight:600;color:#475569;width:180px;border-bottom:1px solid #e2e8f0;font-size:14px;">
          ${label}
        </td>
        <td style="padding:10px 16px;color:#0f172a;border-bottom:1px solid #e2e8f0;font-size:14px;">
          ${escapeHtml(value).replace(/\r?\n/g, "<br />")}
        </td>
      </tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="tr">
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#1e3a8a,#2563eb);padding:32px 40px;">
            <h1 style="margin:0;color:#fff;font-size:22px;font-weight:800;letter-spacing:-0.3px;">
              Turkish Global Jobs
            </h1>
            <p style="margin:6px 0 0;color:#bfdbfe;font-size:14px;">
              Yeni ${formTitle}
            </p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:32px 40px 24px;">
            <p style="margin:0 0 24px;color:#64748b;font-size:14px;line-height:1.6;">
              Aşağıdaki form başarıyla iletildi. Lütfen aday bilgilerini inceleyin.
            </p>
            <table width="100%" cellpadding="0" cellspacing="0"
                   style="border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;">
              ${rows}
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px 40px 32px;border-top:1px solid #f1f5f9;">
            <p style="margin:0;color:#94a3b8;font-size:12px;text-align:center;">
              Bu e-posta Turkish Global Jobs web sitesinin otomatik bildirim sistemi tarafından gönderilmiştir.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  try {
    // IP başına hız sınırı: 10 dakikada en fazla 5 form
    const ip = getClientIp(req.headers);
    if (!rateLimit(`send-mail:${ip}`, 5, 10 * 60 * 1000)) {
      return NextResponse.json(
        { success: false, error: "Çok fazla deneme yaptınız. Lütfen biraz sonra tekrar deneyin." },
        { status: 429 }
      );
    }

    // Formlar multipart/form-data gönderir (CV eki için). JSON da desteklenir.
    const isMultipart = (req.headers.get("content-type") || "").includes("multipart/form-data");
    let body: Record<string, unknown> | null = null;
    let cvFile: File | null = null;

    if (isMultipart) {
      const fd = await req.formData().catch(() => null);
      if (fd) {
        body = {};
        for (const key of [...Object.keys(FIELD_LIMITS), "kaynak"]) {
          const v = fd.get(key);
          if (typeof v === "string") body[key] = v;
        }
        const f = fd.get("cv");
        if (f instanceof File && f.size > 0) cvFile = f;
      }
    } else {
      body = await req.json().catch(() => null);
    }

    if (!body || typeof body !== "object") {
      return NextResponse.json({ success: false, error: "Geçersiz istek." }, { status: 400 });
    }

    // ---- CV eki doğrulama (isteğe bağlı) ----
    let attachment: { filename: string; content: Buffer; contentType: string } | undefined;
    if (cvFile) {
      const result = await validateCv(cvFile);
      if ("error" in result) {
        return NextResponse.json({ success: false, error: result.error }, { status: 400 });
      }
      attachment = result;
    }

    const kaynak = body.kaynak === "iletisim" ? "iletisim" : "basvuru";

    // Yalnızca bilinen alanları al, string'e çevir, kırp ve uzunluk kontrolü yap
    const clean: Record<string, string> = {};
    for (const [field, max] of Object.entries(FIELD_LIMITS)) {
      const raw = body[field];
      const value = typeof raw === "string" ? raw.trim() : "";
      if (value.length > max) {
        return NextResponse.json(
          { success: false, error: "Girilen bilgiler çok uzun." },
          { status: 400 }
        );
      }
      clean[field] = value;
    }

    const { ad, soyad, eposta, telefon, amac, egitimDurumu, almancaSeviyesi, not } = clean;

    if (!ad || !eposta) {
      return NextResponse.json(
        { success: false, error: "Ad ve e-posta alanları zorunludur." },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(eposta)) {
      return NextResponse.json(
        { success: false, error: "Geçerli bir e-posta adresi girin." },
        { status: 400 }
      );
    }

    // Konu satırında satır sonu olmasın
    const subjectName = `${ad} ${soyad}`.replace(/[\r\n]+/g, " ");
    const formTitle = kaynak === "iletisim" ? "İletişim Formu" : "Ön Başvuru";

    await transporter.sendMail({
      from: `"Turkish Global Jobs" <${process.env.SMTP_USER}>`,
      to: process.env.NOTIFICATION_EMAIL,
      subject: `Yeni ${formTitle}: ${subjectName}${attachment ? " (CV ekli)" : ""}`,
      html: buildHtml(
        { ad, soyad, eposta, telefon, amac, egitimDurumu, almancaSeviyesi, not },
        formTitle,
        !!attachment
      ),
      replyTo: eposta,
      attachments: attachment ? [attachment] : undefined,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[send-mail] SMTP error:", error);
    return NextResponse.json(
      { success: false, error: "Mail gönderilemedi. Lütfen tekrar deneyin." },
      { status: 500 }
    );
  }
}
