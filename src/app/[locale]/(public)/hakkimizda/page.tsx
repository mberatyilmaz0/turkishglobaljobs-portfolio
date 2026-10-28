import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hakkimizda | Turkish Global Jobs",
  description:
    "Turkish Global Jobs olarak Almanya kariyer ve egitim sureclerinde seffaf, hukuki temellere dayanan danismanlik hizmeti sunuyoruz.",
};

// ── Sabit veriler ────────────────────────────────────────────────────────────

const PRINCIPLES = [
  {
    emoji: "🛡️",
    title: "Garanti Vermeyiz, Gerçeği Söyleriz",
    body: "Kesin vize garantisi veya okul kabulü garantisi gibi sahte vaatlerde bulunmayız. Sürecimiz tamamen adayın niteliklerine ve resmî Alman kurumlarının (Make it in Germany) standartlarına bağlıdır.",
  },
  {
    emoji: "⚖️",
    title: "Hukuki Temel",
    body: "Tüm danışmanlık süreçlerimiz Alman ve Türk hukukuna uygun şekilde yürütülür. Yanıltıcı reklamlara ve müşterimizin menfaatine zarar verecek yönlendirmelere kesinlikle yer vermeyiz.",
  },
  {
    emoji: "🤝",
    title: "Uzman Partner Ağı",
    body: "Hukuk, tercüme ve yerel kurum başvuruları gibi alanlarda resmî partner kurumlarla çalışırız. Hangi hizmetin kim tarafından sunulduğunu her zaman şeffaf biçimde paylaşırız.",
  },
];

const STEPS = [
  {
    number: "01",
    emoji: "📋",
    title: "Ön Başvuru",
    subtitle: "Bilgi Toplama",
    body: "Adayın mevcut belgelerini, eğitim geçmişini ve hedeflerini sistematik biçimde topluyoruz. Bu aşamada hiçbir taahhütte bulunulmaz.",
  },
  {
    number: "02",
    emoji: "📊",
    title: "Gerçekçi Değerlendirme",
    subtitle: "Uygunluk Analizi",
    body: "Toplanan bilgileri Alman kurumlarının güncel kriterlerine göre analiz ederek adayın gerçek uygunluk durumunu net şekilde raporluyoruz.",
  },
  {
    number: "03",
    emoji: "🗺️",
    title: "Yol Haritası ve Sözleşme",
    subtitle: "Planlama",
    body: "Değerlendirme sonrası adaya özel, adım adım bir yol haritası hazırlanır. Tüm hizmet kapsamı ve ücretler sözleşmeye bağlanır.",
  },
  {
    number: "04",
    emoji: "👁️",
    title: "Şeffaf Süreç Takibi",
    subtitle: "Takip ve Destek",
    body: "Başvuru sürecinin her aşaması adaya düzenli olarak raporlanır. Herhangi bir engel veya olumsuz durum derhal bildirilir, gizlenmez.",
  },
];

const INFO_CARDS = [
  { label: "Türkiye Ofisi", sub: "İstanbul merkezli operasyon ekibi", emoji: "🏢" },
  { label: "Almanya Ağı", sub: "Berlin, Münih, Hamburg temsilcileri", emoji: "🇩🇪" },
  { label: "Resmî Partnerler", sub: "Hukuk, tercüme ve eğitim kurumları", emoji: "📑" },
  { label: "Şeffaf Model", sub: "Kim ne yapar? Her zaman açık", emoji: "🔍" },
];

// ── Stiller ──────────────────────────────────────────────────────────────────

const S = {
  // Hero
  heroSection: {
    position: "relative" as const,
    overflow: "hidden",
    background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%)",
    padding: "112px 24px",
    textAlign: "center" as const,
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
    fontSize: "clamp(2rem, 5vw, 3.5rem)",
    fontWeight: 800,
    lineHeight: 1.15,
    color: "#fff",
    margin: "0 auto 24px",
    maxWidth: "900px",
  },
  heroAccent: {
    background: "linear-gradient(90deg, #60a5fa, #818cf8)",
    WebkitBackgroundClip: "text" as const,
    WebkitTextFillColor: "transparent" as const,
    backgroundClip: "text" as const,
  },
  heroP: {
    fontSize: "1.125rem",
    lineHeight: 1.75,
    color: "#cbd5e1",
    maxWidth: "640px",
    margin: "0 auto",
  },

  // Who we are
  sectionWhite: {
    background: "#fff",
    padding: "96px 24px",
  },
  sectionSlate: {
    background: "#f8fafc",
    padding: "96px 24px",
  },
  container: {
    maxWidth: "1024px",
    margin: "0 auto",
  },
  sectionLabel: {
    fontSize: "12px",
    fontWeight: 700,
    textTransform: "uppercase" as const,
    letterSpacing: "0.12em",
    color: "#2563eb",
    display: "block",
  },
  sectionH2: {
    fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
    fontWeight: 800,
    color: "#0f172a",
    margin: "12px 0 0",
    lineHeight: 1.2,
  },
  bodyText: {
    fontSize: "1rem",
    lineHeight: 1.75,
    color: "#475569",
    margin: "20px 0 0",
  },
  grid2: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "32px",
    alignItems: "center",
    marginTop: "0",
  },
  grid2cards: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  },
  infoCard: {
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "16px",
    padding: "20px",
  },
  infoCardLabel: {
    fontSize: "15px",
    fontWeight: 700,
    color: "#0f172a",
    margin: 0,
  },
  infoCardSub: {
    fontSize: "13px",
    color: "#64748b",
    margin: "4px 0 0",
  },
  infoCardEmoji: {
    fontSize: "20px",
    marginBottom: "8px",
    display: "block",
  },

  // Principles
  warningBox: {
    background: "#fffbeb",
    border: "1px solid #fbbf24",
    borderRadius: "16px",
    padding: "20px 24px",
    textAlign: "center" as const,
    marginTop: "36px",
  },
  warningText: {
    fontSize: "14px",
    fontWeight: 500,
    color: "#92400e",
    margin: 0,
  },
  grid3: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "24px",
    marginTop: "36px",
  },
  principleCard: {
    background: "#fff",
    border: "1px solid #e2e8f0",
    borderRadius: "20px",
    padding: "28px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
  },
  principleEmoji: {
    fontSize: "28px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "52px",
    height: "52px",
    background: "#eff6ff",
    borderRadius: "14px",
    marginBottom: "16px",
  },
  principleTitle: {
    fontSize: "15px",
    fontWeight: 700,
    color: "#0f172a",
    margin: "0 0 8px",
  },
  principleBody: {
    fontSize: "14px",
    lineHeight: 1.65,
    color: "#64748b",
    margin: 0,
  },

  // Steps
  grid4: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "24px",
    marginTop: "48px",
  },
  stepCard: {
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "20px",
    padding: "24px",
    position: "relative" as const,
  },
  stepNumber: {
    position: "absolute" as const,
    top: "16px",
    right: "20px",
    fontSize: "2.5rem",
    fontWeight: 900,
    color: "#e2e8f0",
    lineHeight: 1,
  },
  stepIconBox: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "48px",
    height: "48px",
    background: "#2563eb",
    borderRadius: "14px",
    fontSize: "20px",
    marginBottom: "16px",
    boxShadow: "0 4px 12px rgba(37,99,235,0.3)",
  },
  stepSubtitle: {
    fontSize: "11px",
    fontWeight: 700,
    textTransform: "uppercase" as const,
    letterSpacing: "0.1em",
    color: "#3b82f6",
    margin: "0 0 4px",
  },
  stepTitle: {
    fontSize: "15px",
    fontWeight: 800,
    color: "#0f172a",
    margin: "0 0 10px",
  },
  stepBody: {
    fontSize: "13px",
    lineHeight: 1.65,
    color: "#64748b",
    margin: 0,
  },

  // CTA
  ctaSection: {
    background: "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)",
    padding: "96px 24px",
    textAlign: "center" as const,
  },
  ctaH2: {
    fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
    fontWeight: 800,
    color: "#fff",
    margin: "0 auto 16px",
    maxWidth: "700px",
  },
  ctaP: {
    fontSize: "1.125rem",
    color: "#bfdbfe",
    margin: "0 auto 32px",
    maxWidth: "480px",
    lineHeight: 1.65,
  },
  ctaBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    background: "#fff",
    color: "#2563eb",
    padding: "16px 32px",
    borderRadius: "9999px",
    fontSize: "15px",
    fontWeight: 700,
    textDecoration: "none",
    boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
    transition: "transform 0.2s, box-shadow 0.2s",
  },

  // Shared
  textCenter: { textAlign: "center" as const },
  mt24: { marginTop: "24px" },
  mt12: { marginTop: "12px" },
  bodyTextLg: {
    fontSize: "1rem",
    lineHeight: 1.75,
    color: "#475569",
    maxWidth: "640px",
    margin: "16px auto 0",
  },
};

// ── Bileşenler ───────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section style={S.heroSection}>
      {/* Arka plan ışık efektleri */}
      <div aria-hidden style={{
        position: "absolute", top: "-128px", right: "-128px",
        width: "500px", height: "500px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)",
        filter: "blur(60px)", pointerEvents: "none",
      }} />
      <div aria-hidden style={{
        position: "absolute", bottom: "-128px", left: "-128px",
        width: "400px", height: "400px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
        filter: "blur(60px)", pointerEvents: "none",
      }} />
      <div style={{ position: "relative" }}>
        <span style={S.heroBadge}>Hakkımızda</span>
        <h1 style={S.heroH1}>
          Turkish Global Jobs:{" "}
          <span style={S.heroAccent}>
            Almanya&apos;daki Kariyer ve Eğitim Rehberiniz
          </span>
        </h1>
        <p style={S.heroP}>
          Pazarlama sloganlarıyla değil, gerçekçi ve hukuki temellere dayanan
          şeffaf danışmanlık hizmeti sunuyoruz.
        </p>
      </div>
    </section>
  );
}

function WhoWeAreSection() {
  return (
    <section style={S.sectionWhite}>
      <div style={S.container}>
        <div style={S.grid2}>
          <div>
            <span style={S.sectionLabel}>Biz Kimiz?</span>
            <h2 style={S.sectionH2}>Türkiye–Almanya Köprüsünde Uzman Ekip</h2>
            <p style={S.bodyText}>
              Turkish Global Jobs, Türkiye ve Almanya&apos;da faaliyet gösteren
              çift merkezli bir danışmanlık yapısına sahiptir.
              Türkiye&apos;deki ekibimiz adaylarla birebir çalışarak sürecin
              ilk adımlarını yönetirken, Almanya&apos;daki temsilcilerimiz
              yerel kurumlar, işverenler ve eğitim kuruluşlarıyla doğrudan
              iletişimi sürdürmektedir.
            </p>
            <p style={S.bodyText}>
              Vize danışmanlığı, dil eğitimi koordinasyonu ve iş başvurusu
              süreçlerini <strong style={{ color: "#0f172a" }}>doğrudan biz yönetiriz</strong>.
              Tercüme, noter tasdiki ve Almanya&apos;daki hukuki temsil gibi
              alanlarda ise alanında uzman, resmî partnerlere yönlendirme
              yaparak koordinasyonu sağlarız.
            </p>
          </div>
          <div style={S.grid2cards}>
            {INFO_CARDS.map(({ label, sub, emoji }) => (
              <div key={label} style={S.infoCard}>
                <span style={S.infoCardEmoji}>{emoji}</span>
                <p style={S.infoCardLabel}>{label}</p>
                <p style={S.infoCardSub}>{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PrinciplesSection() {
  return (
    <section style={S.sectionSlate}>
      <div style={S.container}>
        <div style={S.textCenter}>
          <span style={S.sectionLabel}>En Önemli Kısım</span>
          <h2 style={S.sectionH2}>İlkelerimiz ve Sınırlarımız</h2>
          <p style={S.bodyTextLg}>
            Sektörde yaygın olan yanıltıcı vaatlerden belirgin biçimde
            ayrılıyoruz. Aşağıdaki ilkeler müzakereye kapalıdır.
          </p>
        </div>
        <div style={S.warningBox}>
          <p style={S.warningText}>
            ⚠️ &quot;Kesin vize garantisi&quot; veya &quot;okul kabulü garantisi&quot; vaat
            eden hiçbir danışmanlık firmasına güvenmeyiniz. Bu tür vaatler
            hukuki olarak mümkün değildir ve dolandırıcılık belirtisidir.
          </p>
        </div>
        <div style={S.grid3}>
          {PRINCIPLES.map(({ emoji, title, body }) => (
            <div key={title} style={S.principleCard}>
              <span style={S.principleEmoji}>{emoji}</span>
              <h3 style={S.principleTitle}>{title}</h3>
              <p style={S.principleBody}>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowWeWorkSection() {
  return (
    <section style={S.sectionWhite}>
      <div style={S.container}>
        <div style={S.textCenter}>
          <span style={S.sectionLabel}>Çalışma Modelimiz</span>
          <h2 style={S.sectionH2}>4 Adımda Sürecimiz</h2>
        </div>
        <div style={S.grid4}>
          {STEPS.map(({ number, emoji, title, subtitle, body }) => (
            <div key={number} style={S.stepCard}>
              <span style={S.stepNumber}>{number}</span>
              <div style={S.stepIconBox}>{emoji}</div>
              <p style={S.stepSubtitle}>{subtitle}</p>
              <h3 style={S.stepTitle}>{title}</h3>
              <p style={S.stepBody}>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section style={S.ctaSection}>
      <h2 style={S.ctaH2}>
        Sürece nereden başlayacağınızı bilmiyor musunuz?
      </h2>
      <p style={S.ctaP}>
        Size en uygun yolu bulmak için ücretsiz ön değerlendirme formumuzu
        doldurun.
      </p>
      <Link href="/pre-application" style={S.ctaBtn}>
        Ön Başvuru Yap →
      </Link>
    </section>
  );
}

// ── Sayfa ────────────────────────────────────────────────────────────────────

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function HakkimizdaPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div>
      <HeroSection />
      <WhoWeAreSection />
      <PrinciplesSection />
      <HowWeWorkSection />
      <CtaSection />
    </div>
  );
}
