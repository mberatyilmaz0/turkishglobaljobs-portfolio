// Varsayılan içerikler — DB kaydı yoksa ya da hata olursa bu değerler kullanılır.
// Metin kaynağı: sayfalardaki statik veriler ve tr.json / de.json

export type Bilingual<T> = { tr: T; de: T };

// ─── home.stats ──────────────────────────────────────────────────────────────
export type StatItem = { value: string; label: string };
export type HomeStatsContent = { items: StatItem[] };

export const HOME_STATS_DEFAULT: Bilingual<HomeStatsContent> = {
  tr: {
    items: [
      { value: '500+', label: 'Başarılı Danışan' },
      { value: '98%',  label: 'Müşteri Memnuniyeti' },
      { value: '7+',   label: 'Yıllık Deneyim' },
      { value: '3',    label: 'Dilde Destek' },
    ],
  },
  de: {
    items: [
      { value: '500+', label: 'Erfolgreiche Kunden' },
      { value: '98%',  label: 'Kundenzufriedenheit' },
      { value: '7+',   label: 'Jahre Erfahrung' },
      { value: '3',    label: 'Sprachen' },
    ],
  },
};

// ─── home.services ────────────────────────────────────────────────────────────
export type ServiceCard = { icon: string; title: string; desc: string };
export type HomeServicesContent = { label: string; title: string; subtitle: string; cards: ServiceCard[] };

export const HOME_SERVICES_DEFAULT: Bilingual<HomeServicesContent> = {
  tr: {
    label: 'Hizmetlerimiz',
    title: "Almanya'ya Giden Yolda Yanınızdayız",
    subtitle: 'Vize başvurusundan iş yerleşimine kadar her aşamada profesyonel destek sunuyoruz.',
    cards: [
      { icon: '🔵', title: 'Mavi Kart Danışmanlığı', desc: 'AB Mavi Kart başvurunuzu eksiksiz hazırlıyor, süreç boyunca sizi yönlendiriyoruz.' },
      { icon: '🎓', title: 'Fırsat Kartı (Chancenkarte)', desc: 'Puanlama sistemine göre uygunluğunuzu değerlendiriyor, başvurunuzu birlikte hazırlıyoruz.' },
      { icon: '📋', title: 'Mesleki Denklik', desc: "Türkiye'deki diplomanızın Almanya'da tanınması için gerekli tüm süreçleri yönetiyoruz." },
      { icon: '💼', title: 'İş Yerleştirme', desc: "Almanya'daki iş ortaklarımız aracılığıyla kariyer hedeflerinize uygun pozisyonlar buluyoruz." },
    ],
  },
  de: {
    label: 'Unsere Leistungen',
    title: 'Ihr Weg nach Deutschland – wir begleiten Sie',
    subtitle: 'Professionelle Unterstützung von der Visumbeantragung bis zur Stellenvermittlung.',
    cards: [
      { icon: '🔵', title: 'Blue Card Beratung', desc: 'Wir bereiten Ihren EU Blue Card Antrag vollständig vor und begleiten Sie durch den Prozess.' },
      { icon: '🎓', title: 'Chancenkarte', desc: 'Wir prüfen Ihre Eignung anhand des Punktesystems und erstellen gemeinsam Ihren Antrag.' },
      { icon: '📋', title: 'Berufsanerkennung', desc: 'Wir koordinieren die Anerkennung Ihres türkischen Abschlusses in Deutschland.' },
      { icon: '💼', title: 'Jobvermittlung', desc: 'Über unsere deutschen Partnerunternehmen finden wir passende Stellen für Ihre Karriereziele.' },
    ],
  },
};

// ─── home.process ─────────────────────────────────────────────────────────────
export type ProcessStep = { title: string; desc: string };
export type HomeProcessContent = { label: string; title: string; subtitle: string; steps: ProcessStep[] };

export const HOME_PROCESS_DEFAULT: Bilingual<HomeProcessContent> = {
  tr: {
    label: 'Nasıl Çalışıyoruz?',
    title: 'Süreç Nasıl İşliyor?',
    subtitle: '4 adımda Almanya hayalinize kavuşun. Uzman ekibimiz her aşamada yanınızda.',
    steps: [
      { title: 'Ücretsiz Ön Değerlendirme', desc: 'Formumuzu doldurun, uzman danışmanımız 24 saat içinde sizinle iletişime geçsin.' },
      { title: 'Profil & Belge Analizi',   desc: 'Eğitim, deneyim ve dil seviyenizi değerlendirerek size en uygun vize yolunu belirleriz.' },
      { title: 'Başvuru Hazırlığı',         desc: 'Tüm belgelerinizi hazırlar, çevirileri koordine eder ve başvuruyu birlikte tamamlarız.' },
      { title: "Almanya'ya Geçiş",          desc: 'Viziniz onaylandıktan sonra yerleşim ve iş süreçlerinde destek vermeye devam ederiz.' },
    ],
  },
  de: {
    label: 'Wie wir arbeiten',
    title: 'So läuft der Prozess ab',
    subtitle: 'In 4 Schritten zu Ihrem Deutschland-Traum. Unser Team begleitet Sie in jeder Phase.',
    steps: [
      { title: 'Kostenlose Erstbewertung', desc: 'Füllen Sie das Formular aus – unser Experte meldet sich innerhalb von 24 Stunden.' },
      { title: 'Profil- & Dokumentenanalyse', desc: 'Wir prüfen Ihre Qualifikation und ermitteln den optimalen Visaweg für Sie.' },
      { title: 'Bewerbungsvorbereitung',    desc: 'Wir bereiten alle Unterlagen vor, koordinieren Übersetzungen und reichen gemeinsam ein.' },
      { title: 'Start in Deutschland',     desc: 'Nach Visumgenehmigung unterstützen wir Sie weiter bei Wohnungs- und Jobsuche.' },
    ],
  },
};

// ─── home.faq ─────────────────────────────────────────────────────────────────
export type FaqItem = { q: string; a: string };
export type HomeFaqContent = { label: string; title: string; subtitle: string; items: FaqItem[] };

export const HOME_FAQ_DEFAULT: Bilingual<HomeFaqContent> = {
  tr: {
    label: 'Sık Sorulan Sorular',
    title: 'Aklınızdaki Soruların Yanıtları',
    subtitle: 'En çok merak edilen sorulara dürüst ve net yanıtlar veriyoruz.',
    items: [
      { q: 'Fırsat Kartı (Chancenkarte) nedir ve kimler başvurabilir?', a: "Fırsat Kartı, Almanya'da iş aramak için 1 yıla kadar kalma hakkı veren yeni bir vize türüdür. Yabancı ülke vatandaşları, belirli puan kriterlerini (eğitim, deneyim, dil, yaş) karşılıyorsa başvurabilir." },
      { q: 'Mavi Kart (Blaue Karte EU) için asgari maaş şartı nedir?', a: '2024 itibarıyla standart pozisyonlar için brüt yıllık yaklaşık 43.800 €, mühendislik ve IT gibi açık pozisyonlar için ise yaklaşık 34.200 € maaş gerekmektedir.' },
      { q: "Türkiye'deki diplomam Almanya'da geçerli mi?", a: "Türkiye'deki üniversitelerden alınan lisans ve yüksek lisans diplomaları genellikle Almanya'da tanınmaktadır. Ancak bazı meslekler için resmi denklik başvurusu gerekebilir. Ekibimiz bu süreci sizin için yönetir." },
      { q: "Almanca bilmeden Almanya'da iş bulabilir miyim?", a: "IT ve mühendislik gibi teknik alanlarda İngilizce yeterli olabilir. Ancak Almanca bilmek iş ve entegrasyon sürecini önemli ölçüde kolaylaştırır. B1 seviyesi çoğu pozisyon için yeterlidir." },
      { q: 'Hizmetiniz ücretli mi?', a: 'İlk ön değerlendirme görüşmemiz tamamen ücretsizdir. Sonrasında ihtiyacınıza özel danışmanlık paketlerini birlikte belirleriz. Gizli ücret yoktur.' },
    ],
  },
  de: {
    label: 'Häufig gestellte Fragen',
    title: 'Antworten auf Ihre Fragen',
    subtitle: 'Ehrliche und klare Antworten auf die häufigsten Fragen.',
    items: [
      { q: 'Was ist die Chancenkarte und wer kann sie beantragen?', a: 'Die Chancenkarte ist ein neues Visum, das qualifizierten Fachkräften erlaubt, bis zu 1 Jahr in Deutschland Arbeit zu suchen. Bewerber müssen bestimmte Punktekriterien (Qualifikation, Erfahrung, Sprache, Alter) erfüllen.' },
      { q: 'Welches Mindestgehalt gilt für die Blaue Karte EU?', a: 'Ab 2024 sind es ca. 43.800 € brutto/Jahr für Standardberufe und ca. 34.200 € für Engpassberufe wie IT und Ingenieurwesen.' },
      { q: 'Ist mein türkischer Abschluss in Deutschland anerkannt?', a: 'Bachelor- und Master-Abschlüsse türkischer Universitäten werden in der Regel anerkannt. Für reglementierte Berufe kann ein formelles Anerkennungsverfahren nötig sein. Unser Team begleitet diesen Prozess.' },
      { q: 'Kann ich ohne Deutschkenntnisse in Deutschland arbeiten?', a: 'In technischen Bereichen wie IT und Ingenieurwesen kann Englisch ausreichen. Deutschkenntnisse erleichtern die Integration jedoch erheblich. B1 reicht für die meisten Stellen.' },
      { q: 'Ist Ihre Beratung kostenpflichtig?', a: 'Das erste Erstgespräch ist komplett kostenlos. Danach legen wir gemeinsam ein passendes Beratungspaket fest. Es gibt keine versteckten Kosten.' },
    ],
  },
};

// ─── opportunity.scoring ──────────────────────────────────────────────────────
export type ScoringCard = { icon: string; title: string; points: string };
export type OpportunityScoringContent = { label: string; title: string; subtitle: string; cards: ScoringCard[] };

export const OPPORTUNITY_SCORING_DEFAULT: Bilingual<OpportunityScoringContent> = {
  tr: {
    label: 'Puanlama Sistemi',
    title: 'Nasıl Hesaplanıyor?',
    subtitle: 'Minimum puan: maksimum 70 üzerinden 6 puan.',
    cards: [
      { icon: '🎓', title: 'Eğitim Durumu',    points: 'max 20 puan' },
      { icon: '💼', title: 'İş Deneyimi',       points: 'max 12 puan' },
      { icon: '🗣️', title: 'Almanca Seviyesi', points: 'max 15 puan' },
      { icon: '🔤', title: 'İngilizce Seviyesi', points: 'max 10 puan' },
      { icon: '📅', title: 'Yaş',               points: 'max  8 puan' },
      { icon: '🇩🇪', title: 'Almanya Bağlantısı', points: 'max  5 puan' },
    ],
  },
  de: {
    label: 'Punktesystem',
    title: 'Wie wird berechnet?',
    subtitle: 'Mindestpunktzahl: 6 von max. 70 Punkten.',
    cards: [
      { icon: '🎓', title: 'Qualifikation',       points: 'max 20 Punkte' },
      { icon: '💼', title: 'Berufserfahrung',     points: 'max 12 Punkte' },
      { icon: '🗣️', title: 'Deutschkenntnisse',  points: 'max 15 Punkte' },
      { icon: '🔤', title: 'Englischkenntnisse',  points: 'max 10 Punkte' },
      { icon: '📅', title: 'Alter',               points: 'max  8 Punkte' },
      { icon: '🇩🇪', title: 'Deutschlandbezug',  points: 'max  5 Punkte' },
    ],
  },
};

// ─── opportunity.requirements ─────────────────────────────────────────────────
export type RequirementItem = { icon: string; text: string };
export type OpportunityRequirementsContent = { label: string; title: string; items: RequirementItem[] };

export const OPPORTUNITY_REQUIREMENTS_DEFAULT: Bilingual<OpportunityRequirementsContent> = {
  tr: {
    label: 'Başvuru Şartları',
    title: 'Ne Lazım?',
    items: [
      { icon: '📜', text: 'Tanınan mesleki veya yükseköğretim diploması' },
      { icon: '💰', text: "Almanya'da geçimini sağlayacak finansal kanıt" },
      { icon: '🏥', text: 'Geçerli sağlık sigortası' },
      { icon: '✈️', text: 'Geçerli pasaport' },
      { icon: '🎯', text: 'Minimum 6 puanlık puan (puan hesaplayıcı ile öğrenin)' },
    ],
  },
  de: {
    label: 'Voraussetzungen',
    title: 'Was brauche ich?',
    items: [
      { icon: '📜', text: 'Anerkannte Berufs- oder Hochschulausbildung' },
      { icon: '💰', text: 'Finanzielle Absicherung des Aufenthalts' },
      { icon: '🏥', text: 'Krankenversicherungsnachweis' },
      { icon: '✈️', text: 'Gültiger Reisepass' },
      { icon: '🎯', text: 'Mindestens 6 Punkte im Punktesystem' },
    ],
  },
};

// ─── education.compare ────────────────────────────────────────────────────────
export type CompareRow = { label: string; value: string };
export type CompareCard = { title: string; rows: CompareRow[] };
export type EducationCompareContent = { label: string; title: string; cards: CompareCard[] };

export const EDUCATION_COMPARE_DEFAULT: Bilingual<EducationCompareContent> = {
  tr: {
    label: 'Hızlı Karşılaştırma',
    title: 'Size Uygun Olan Hangisi?',
    cards: [
      {
        title: 'Üniversite',
        rows: [
          { label: 'Süre', value: '3-5 Yıl' },
          { label: 'Derece', value: 'Bachelor / Master' },
          { label: 'Maliyet', value: '~300 €/Dönem (devlet üni.)' },
          { label: 'Dil', value: 'B2/C1 Almanca veya İngilizce' },
        ],
      },
      {
        title: 'Ausbildung',
        rows: [
          { label: 'Süre', value: '2–3,5 Yıl' },
          { label: 'Derece', value: 'Meslek Sertifikası' },
          { label: 'Ücret', value: '600–900 €/Monat' },
          { label: 'Dil', value: 'B1/B2 Almanca' },
        ],
      },
    ],
  },
  de: {
    label: 'Schnellvergleich',
    title: 'Was passt zu Ihnen?',
    cards: [
      {
        title: 'Universität',
        rows: [
          { label: 'Dauer', value: '3-5 Jahre' },
          { label: 'Abschluss', value: 'Bachelor / Master' },
          { label: 'Kosten', value: '~300 €/Semester (staatl.)' },
          { label: 'Sprache', value: 'B2/C1 Deutsch oder Englisch' },
        ],
      },
      {
        title: 'Ausbildung',
        rows: [
          { label: 'Dauer', value: '2–3,5 Jahre' },
          { label: 'Abschluss', value: 'Berufsabschluss' },
          { label: 'Vergütung', value: '600–900 €/Monat' },
          { label: 'Sprache', value: 'B1/B2 Deutsch' },
        ],
      },
    ],
  },
};

// ─── education.uni ────────────────────────────────────────────────────────────
export type EduStep = { icon: string; text: string };
export type EduProgram = { name: string; tag: string };
export type EducationUniContent = {
  label: string; title: string; steps: EduStep[];
  rightLabel: string; rightTitle: string; programs: EduProgram[]; tipBox: string;
};

export const EDUCATION_UNI_DEFAULT: Bilingual<EducationUniContent> = {
  tr: {
    label: 'Üniversite Eğitimi',
    title: 'Üniversiteye Adım Adım',
    steps: [
      { icon: '📜', text: 'Denklik başvurusu (anabin / uni-assist üzerinden)' },
      { icon: '🗣️', text: 'Almanca dil belgesi (DSH, TestDaF veya B2/C1 sertifikası)' },
      { icon: '📋', text: 'Üniversite başvurusu (Bewerbung)' },
      { icon: '✉️', text: 'Kabul mektubu (Zulassung) alma' },
      { icon: '🏦', text: 'Blokaj hesabı açma (Sperrkonto ~11.208 €)' },
      { icon: '🛂', text: 'Öğrenci vizesi başvurusu' },
    ],
    rightLabel: 'Popüler Bölümler',
    rightTitle: 'Yüksek Talep Gören Alanlar',
    programs: [
      { name: 'Mühendislik',      tag: 'Çok sayıda İngilizce program mevcut' },
      { name: 'Bilgisayar Bilimleri', tag: 'Yüksek istihdam oranı' },
      { name: 'İşletme / MBA',   tag: 'Uluslararası tanınırlık' },
      { name: 'Tıp / Hemşirelik', tag: 'Denklik danışmanlığı şart' },
    ],
    tipBox: 'Pek çok Alman üniversitesi İngilizce yüksek lisans programı sunmaktadır. Yine de B2 Almanca seviyesi önerilir.',
  },
  de: {
    label: 'Hochschulstudium',
    title: 'Schritt für Schritt zum Studium',
    steps: [
      { icon: '📜', text: 'Anerkennung über anabin/uni-assist' },
      { icon: '🗣️', text: 'Deutschnachweis (DSH, TestDaF oder B2/C1)' },
      { icon: '📋', text: 'Hochschulbewerbung (Bewerbung)' },
      { icon: '✉️', text: 'Zulassungsbescheid erhalten' },
      { icon: '🏦', text: 'Sperrkonto eröffnen (~11.208 €)' },
      { icon: '🛂', text: 'Studienvisum beantragen' },
    ],
    rightLabel: 'Beliebte Studienfächer',
    rightTitle: 'Gefragte Studienrichtungen',
    programs: [
      { name: 'Ingenieurwesen',  tag: 'Viele englischsprachige Programme' },
      { name: 'Informatik',      tag: 'Sehr hohe Beschäftigungsquote' },
      { name: 'BWL / MBA',       tag: 'Internationale Anerkennung' },
      { name: 'Medizin / Pflege', tag: 'Anerkennungsberatung erforderlich' },
    ],
    tipBox: 'Viele deutsche Universitäten bieten englischsprachige Master-Programme an. Deutschkenntnisse ab B2 sind dennoch empfehlenswert.',
  },
};

// ─── education.aus ────────────────────────────────────────────────────────────
export type AusField = { icon: string; name: string };
export type EducationAusContent = {
  label: string; title: string; steps: EduStep[];
  rightLabel: string; rightTitle: string; fields: AusField[]; tipBox: string;
};

export const EDUCATION_AUS_DEFAULT: Bilingual<EducationAusContent> = {
  tr: {
    label: 'Ausbildung',
    title: "Ausbildung'a Adım Adım",
    steps: [
      { icon: '🔍', text: 'Ausbildung ilanlarını araştırma (Bundesagentur für Arbeit vb.)' },
      { icon: '🗣️', text: 'Almanca seviyesi (genellikle B1-B2)' },
      { icon: '📋', text: 'Şirkete başvuru dosyası gönderme' },
      { icon: '✉️', text: 'Ausbildungsvertrag (eğitim sözleşmesi) imzalama' },
      { icon: '🛂', text: 'Ausbildung vizesi başvurusu' },
      { icon: '🎓', text: 'Eğitim süresi: 2-3.5 yıl | Ücretli: 600-900 €/ay' },
    ],
    rightLabel: 'Popüler Ausbildung Alanları',
    rightTitle: 'Yüksek Talep Gören Meslekler',
    fields: [
      { icon: '⚙️', name: 'Mekatronik' },
      { icon: '🖥️', name: 'IT Uzmanı' },
      { icon: '🏥', name: 'Hemşire Yardımcısı' },
      { icon: '🍽️', name: 'Aşçılık' },
      { icon: '🔧', name: 'Elektrikçi' },
      { icon: '🚗', name: 'Otomotiv Teknisyeni' },
    ],
    tipBox: 'Ausbildung süresince maaş alırsınız: ortalama 600-900 €/ay. Eğitimin sonunda şirkete geçiş oranı çok yüksektir.',
  },
  de: {
    label: 'Ausbildung',
    title: 'Schritt für Schritt zur Ausbildung',
    steps: [
      { icon: '🔍', text: 'Ausbildungsangebote recherchieren' },
      { icon: '🗣️', text: 'Deutschkenntnisse (i. d. R. B1-B2)' },
      { icon: '📋', text: 'Bewerbungsunterlagen einreichen' },
      { icon: '✉️', text: 'Ausbildungsvertrag unterschreiben' },
      { icon: '🛂', text: 'Ausbildungsvisum beantragen' },
      { icon: '🎓', text: 'Ausbildungsdauer: 2-3,5 Jahre | Vergütung: 600-900 €/Monat' },
    ],
    rightLabel: 'Beliebte Ausbildungsberufe',
    rightTitle: 'Gefragte Ausbildungsberufe',
    fields: [
      { icon: '⚙️', name: 'Mechatronik' },
      { icon: '🖥️', name: 'IT-Fachinformatiker' },
      { icon: '🏥', name: 'Pflegefachassistenz' },
      { icon: '🍽️', name: 'Koch/Köchin' },
      { icon: '🔧', name: 'Elektriker' },
      { icon: '🚗', name: 'KFZ-Mechatroniker' },
    ],
    tipBox: 'Während der Ausbildung verdienen Sie direkt Geld: durchschnittlich 600-900 € im Monat – und übernommen werden viele!',
  },
};

// ─── about.principles ─────────────────────────────────────────────────────────
export type PrincipleCard = { icon: string; title: string; desc: string };
export type AboutPrinciplesContent = {
  label: string; title: string; subtitle: string; warning: string; cards: PrincipleCard[];
};

export const ABOUT_PRINCIPLES_DEFAULT: Bilingual<AboutPrinciplesContent> = {
  tr: {
    label: 'En Önemli Kısım',
    title: 'İlkelerimiz ve Sınırlarımız',
    subtitle: 'Sektörde yaygın olan yanıltıcı vaatlerden belirgin biçimde ayrılıyoruz. Aşağıdaki ilkeler müzakereye kapalıdır.',
    warning: '⚠️ "Kesin vize garantisi" veya "okul kabulü garantisi" vaat eden hiçbir danışmanlık firmasına güvenmeyiniz. Bu tür vaatler hukuki olarak mümkün değildir ve dolandırıcılık belirtisidir.',
    cards: [
      { icon: '🛡️', title: 'Garanti Vermeyiz, Gerçeği Söyleriz', desc: 'Kesin vize garantisi veya okul kabulü garantisi gibi sahte vaatlerde bulunmayız. Sürecimiz tamamen adayın niteliklerine ve resmî Alman kurumlarının standartlarına bağlıdır.' },
      { icon: '⚖️', title: 'Hukuki Temel', desc: 'Tüm danışmanlık süreçlerimiz Alman ve Türk hukukuna uygun şekilde yürütülür. Yanıltıcı reklamlara ve müşterimizin menfaatine zarar verecek yönlendirmelere kesinlikle yer vermeyiz.' },
      { icon: '🤝', title: 'Uzman Partner Ağı', desc: 'Hukuk, tercüme ve yerel kurum başvuruları gibi alanlarda resmî partner kurumlarla çalışırız. Hangi hizmetin kim tarafından sunulduğunu her zaman şeffaf biçimde paylaşırız.' },
    ],
  },
  de: {
    label: 'Das Wichtigste',
    title: 'Unsere Grundsätze und Grenzen',
    subtitle: 'Wir heben uns deutlich von irreführenden Versprechen in der Branche ab. Die folgenden Grundsätze sind nicht verhandelbar.',
    warning: '⚠️ Trauen Sie keinem Beratungsunternehmen, das "Garantien" für Visa oder Schulzulassungen verspricht. Solche Versprechen sind rechtlich nicht möglich und ein Zeichen für Betrug.',
    cards: [
      { icon: '🛡️', title: 'Keine Garantien – nur Wahrheit', desc: 'Wir machen keine falschen Versprechen wie Visumsgarantien oder Schulzulassungsgarantien. Unser Prozess basiert vollständig auf den Qualifikationen des Bewerbers.' },
      { icon: '⚖️', title: 'Rechtliche Grundlage', desc: 'Alle unsere Beratungsprozesse werden in Übereinstimmung mit deutschem und türkischem Recht durchgeführt. Irreführende Werbung ist für uns tabu.' },
      { icon: '🤝', title: 'Expertennetzwerk', desc: 'In Bereichen wie Recht, Übersetzung und Behördenanträge arbeiten wir mit offiziellen Partnerinstitutionen zusammen. Wir legen stets offen, wer welche Leistung erbringt.' },
    ],
  },
};
