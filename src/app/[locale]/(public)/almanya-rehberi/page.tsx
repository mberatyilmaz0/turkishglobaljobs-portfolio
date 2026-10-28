import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import Link from "next/link";
import {
  FileText,
  GraduationCap,
  Wrench,
  CreditCard,
  Briefcase,
  Languages,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Almanya Rehberi | Turkish Global Jobs",
  description:
    "Almanya'da çalışma, eğitim ve yaşam hakkında güncel ve güvenilir bilgilendirmeler.",
};

// ── Makale kartı verileri ve yönlendirme linkleri ────────────────────────────

const ARTICLES = [
  {
    Icon: FileText,
    title: "Almanya Fırsat Kartı Şartları",
    desc: "Chancenkarte başvuru koşulları, puan sistemi ve başvuru adımları hakkında kapsamlı rehber.",
    tag: "Vize & İzin",
    color: "#2563eb",
    bg: "#eff6ff",
    href: "/firsat-karti",
  },
  {
    Icon: GraduationCap,
    title: "Diploma Denkliği Nasıl Alınır?",
    desc: "Anabin veritabanı, denklik başvurusu ve tanınma süreçleri adım adım anlatılıyor.",
    tag: "Eğitim",
    color: "#7c3aed",
    bg: "#f5f3ff",
    href: "/almanya-egitim",
  },
  {
    Icon: Wrench,
    title: "Ausbildung Başvurusu",
    desc: "Almanya'da mesleki eğitim programına nasıl başvurulur, gereklilikler neler?",
    tag: "Mesleki Eğitim",
    color: "#ea580c",
    bg: "#fff7ed",
    href: "/egitim",
  },
  {
    Icon: CreditCard,
    title: "Mavi Kart Nedir?",
    desc: "EU Blue Card başvuru şartları, kapsadığı meslekler ve maaş eşiği bilgileri.",
    tag: "Vize & İzin",
    color: "#0891b2",
    bg: "#ecfeff",
    href: "/almanya-is",
  },
  {
    Icon: Briefcase,
    title: "Hangi Mesleklerde Açık Var?",
    desc: "Almanya'nın en çok eleman aradığı sektörler ve mesleklerin güncel listesi.",
    tag: "İş Piyasası",
    color: "#16a34a",
    bg: "#f0fdf4",
    href: "/almanya-is",
  },
  {
    Icon: Languages,
    title: "Almanca Dil Seviyeleri",
    desc: "A1'den C2'ye Almanca dil seviyeleri ve iş-eğitim süreçlerinde hangi seviyenin gerektiği.",
    tag: "Dil",
    color: "#d97706",
    bg: "#fffbeb",
    href: "/egitim",
  },
] as const;

// ── Stiller ──────────────────────────────────────────────────────────────────

const S = {
  hero: {
    position: "relative" as const,
    overflow: "hidden",
    background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%)",
    padding: "96px 24px 80px",
    textAlign: "center" as const,
  },
  heroBlobTR: {
    position: "absolute" as const,
    top: "-100px",
    right: "-100px",
    width: "440px",
    height: "440px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)",
    filter: "blur(60px)",
    pointerEvents: "none" as const,
  },
  heroBlobBL: {
    position: "absolute" as const,
    bottom: "-80px",
    left: "-80px",
    width: "360px",
    height: "360px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(99,102,241,0.14) 0%, transparent 70%)",
    filter: "blur(60px)",
    pointerEvents: "none" as const,
  },
  heroBadge: {
    display: "inline-block",
    padding: "6px 16px",
    borderRadius: "9999px",
    border: "1px solid rgba(96,165,250,0.4)",
    background: "rgba(96,165,250,0.1)",
    color: "#93c5fd",
    fontSize: "12px",
    fontWeight: 600,
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
    marginBottom: "16px",
  },
  heroH1: {
    fontSize: "clamp(2rem, 5vw, 3.25rem)",
    fontWeight: 800,
    lineHeight: 1.15,
    color: "#fff",
    margin: "0 auto 20px",
    maxWidth: "800px",
  },
  heroP: {
    fontSize: "1.125rem",
    lineHeight: 1.75,
    color: "#cbd5e1",
    maxWidth: "580px",
    margin: "0 auto",
  },

  // Grid bölümü
  section: {
    background: "#f8fafc",
    padding: "80px 24px",
    minHeight: "60vh",
  },
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
  },
  sectionHeader: {
    marginBottom: "48px",
    textAlign: "center" as const,
  },
  sectionLabel: {
    fontSize: "12px",
    fontWeight: 700,
    textTransform: "uppercase" as const,
    letterSpacing: "0.12em",
    color: "#2563eb",
    display: "block",
    marginBottom: "10px",
  },
  sectionH2: {
    fontSize: "clamp(1.6rem, 2.5vw, 2.1rem)",
    fontWeight: 800,
    color: "#0f172a",
    margin: "0 0 12px",
    lineHeight: 1.2,
  },
  sectionDesc: {
    fontSize: "1rem",
    lineHeight: 1.7,
    color: "#64748b",
    maxWidth: "520px",
    margin: "0 auto",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "24px",
  },

  card: {
    background: "#fff",
    border: "1px solid #e2e8f0",
    borderRadius: "20px",
    padding: "28px",
    display: "flex",
    flexDirection: "column" as const,
    gap: "0",
    boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
    transition: "box-shadow 0.2s, transform 0.2s, border-color 0.2s",
    textDecoration: "none",
  },
  cardIconBox: (bg: string) => ({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "52px",
    height: "52px",
    borderRadius: "14px",
    background: bg,
    marginBottom: "18px",
    flexShrink: 0,
  }),
  cardTag: (color: string) => ({
    display: "inline-block",
    fontSize: "11px",
    fontWeight: 700,
    textTransform: "uppercase" as const,
    letterSpacing: "0.08em",
    color,
    marginBottom: "8px",
  }),
  cardTitle: {
    fontSize: "1rem",
    fontWeight: 700,
    color: "#0f172a",
    margin: "0 0 10px",
    lineHeight: 1.35,
  },
  cardDesc: {
    fontSize: "14px",
    lineHeight: 1.65,
    color: "#64748b",
    margin: "0",
    flexGrow: 1,
  },
  cardDivider: {
    height: "1px",
    background: "#f1f5f9",
    margin: "18px 0",
  },
  cardCta: (color: string) => ({
    fontSize: "13px",
    fontWeight: 600,
    color,
    display: "flex",
    alignItems: "center",
    gap: "4px",
  }),

  // Yakında uyarısı
  comingSoon: {
    textAlign: "center" as const,
    marginTop: "56px",
    padding: "28px 32px",
    background: "#fff",
    border: "1px solid #e2e8f0",
    borderRadius: "16px",
    maxWidth: "560px",
    marginLeft: "auto",
    marginRight: "auto",
    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
  },
  comingSoonEmoji: {
    fontSize: "32px",
    display: "block",
    marginBottom: "12px",
  },
  comingSoonTitle: {
    fontSize: "15px",
    fontWeight: 700,
    color: "#0f172a",
    margin: "0 0 8px",
  },
  comingSoonText: {
    fontSize: "14px",
    color: "#64748b",
    margin: 0,
    lineHeight: 1.65,
  },
};

// ── Bileşenler ───────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section style={S.hero}>
      <div aria-hidden style={S.heroBlobTR} />
      <div aria-hidden style={S.heroBlobBL} />
      <div style={{ position: "relative" }}>
        <span style={S.heroBadge}>Bilgi Merkezi</span>
        <h1 style={S.heroH1}>Almanya Rehberi</h1>
        <p style={S.heroP}>
          Almanya&apos;da çalışma, eğitim ve yaşam hakkında güncel ve güvenilir
          bilgilendirmeler.
        </p>
      </div>
    </section>
  );
}

function ArticlesSection({ locale }: { locale: string }) {
  return (
    <section style={S.section}>
      <div style={S.container}>
        <div style={S.sectionHeader}>
          <span style={S.sectionLabel}>Konular</span>
          <h2 style={S.sectionH2}>Sık Sorulan Konular</h2>
          <p style={S.sectionDesc}>
            Almanya sürecinizde bilmeniz gereken temel başlıkları derledik.
          </p>
        </div>

        <div style={S.grid}>
          {ARTICLES.map(({ Icon, title, desc, tag, color, bg, href }) => (
            <Link
              key={title}
              href={`/${locale}${href}`}
              style={S.card}
              className="group hover:shadow-md hover:border-blue-300"
            >
              <div style={S.cardIconBox(bg)}>
                <Icon size={24} color={color} strokeWidth={1.8} />
              </div>
              <span style={S.cardTag(color)}>{tag}</span>
              <h3 style={S.cardTitle}>{title}</h3>
              <p style={S.cardDesc}>{desc}</p>
              <div style={S.cardDivider} />
              <span style={S.cardCta(color)}>
                Sayfaya Git ›
              </span>
            </Link>
          ))}
        </div>

        <div style={S.comingSoon}>
          <span style={S.comingSoonEmoji}>📚</span>
          <h3 style={S.comingSoonTitle}>Daha fazla içerik geliyor</h3>
          <p style={S.comingSoonText}>
            Bu sayfaya düzenli olarak yeni rehber makaleleri eklenecektir.
            Güncel kalmak için sitemizi takip edin.
          </p>
        </div>
      </div>
    </section>
  );
}

// ── Sayfa ────────────────────────────────────────────────────────────────────

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function AlmanyaRehberiPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div>
      <HeroSection />
      <ArticlesSection locale={locale} />
    </div>
  );
}