import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

function buildHtml(data: Record<string, string>): string {
  const rows = [
    ["Ad",               data.ad],
    ["Soyad",            data.soyad],
    ["E-posta",          data.eposta],
    ["Telefon",          data.telefon],
    ["Amaç",             data.amac],
    ["Eğitim Durumu",    data.egitimDurumu],
    ["Almanca Seviyesi", data.almancaSeviyesi],
    ["Not",              data.not],
  ]
    .filter(([, v]) => v)
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:10px 16px;background:#f8fafc;font-weight:600;color:#475569;width:180px;border-bottom:1px solid #e2e8f0;font-size:14px;">
          ${label}
        </td>
        <td style="padding:10px 16px;color:#0f172a;border-bottom:1px solid #e2e8f0;font-size:14px;">
          ${value}
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
              Yeni Ön Başvuru / İletişim Formu
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
    const body = await req.json();

    const {
      ad = "",
      soyad = "",
      eposta = "",
      telefon = "",
      amac = "",
      egitimDurumu = "",
      almancaSeviyesi = "",
      not = "",
    } = body as Record<string, string>;

    if (!ad || !eposta) {
      return NextResponse.json(
        { success: false, error: "Ad ve e-posta alanları zorunludur." },
        { status: 400 }
      );
    }

    await transporter.sendMail({
      from: `"Turkish Global Jobs" <${process.env.SMTP_USER}>`,
      to: process.env.NOTIFICATION_EMAIL,
      subject: `Yeni Ön Başvuru: ${ad} ${soyad}`,
      html: buildHtml({ ad, soyad, eposta, telefon, amac, egitimDurumu, almancaSeviyesi, not }),
      replyTo: eposta,
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
