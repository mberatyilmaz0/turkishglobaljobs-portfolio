export type SectorDefinition = {
  value: string;
  tr: string;
  de: string;
  aliases?: readonly string[];
};

export const STANDARD_SECTORS = [
  { value: 'Bilişim ve Teknoloji', tr: 'Bilişim ve Teknoloji', de: 'IT und Technologie', aliases: ['Bilişim', 'Teknoloji', 'IT', 'Yazılım', 'Software', 'Informatik'] },
  { value: 'Mühendislik', tr: 'Mühendislik', de: 'Ingenieurwesen', aliases: ['Engineering', 'Ingenieur'] },
  { value: 'Sağlık ve Bakım', tr: 'Sağlık ve Bakım', de: 'Gesundheit und Pflege', aliases: ['Sağlık', 'Sağlık Hizmetleri', 'Bakım', 'Gesundheit', 'Gesundheitswesen', 'Pflege'] },
  { value: 'Eğitim', tr: 'Eğitim', de: 'Bildung', aliases: ['Eğitim ve Öğretim', 'Education'] },
  { value: 'Gıda ve Tarım', tr: 'Gıda ve Tarım', de: 'Lebensmittel und Landwirtschaft', aliases: ['Gıda', 'Tarım', 'Tarım ve Hayvancılık', 'Lebensmittel', 'Landwirtschaft'] },
  { value: 'Lojistik ve Ulaştırma', tr: 'Lojistik ve Ulaştırma', de: 'Logistik und Transport', aliases: ['Lojistik', 'Logistik', 'Ulaştırma', 'Transport'] },
  { value: 'İnşaat ve Yapı', tr: 'İnşaat ve Yapı', de: 'Bauwesen', aliases: ['İnşaat', 'Bau'] },
  { value: 'Üretim ve İmalat', tr: 'Üretim ve İmalat', de: 'Produktion und Fertigung', aliases: ['Üretim', 'İmalat', 'Fertigung'] },
  { value: 'Otomotiv', tr: 'Otomotiv', de: 'Automobilindustrie', aliases: ['Automotive', 'KFZ'] },
  { value: 'Enerji ve Yenilenebilir Enerji', tr: 'Enerji ve Yenilenebilir Enerji', de: 'Energie und erneuerbare Energien', aliases: ['Enerji', 'Energie'] },
  { value: 'Turizm ve Otelcilik', tr: 'Turizm ve Otelcilik', de: 'Tourismus und Gastgewerbe', aliases: ['Turizm', 'Otelcilik', 'Tourismus', 'Hotellerie'] },
  { value: 'Yiyecek ve İçecek Hizmetleri', tr: 'Yiyecek ve İçecek Hizmetleri', de: 'Gastronomie', aliases: ['Restoran', 'Gastronomi', 'Gastronomie'] },
  { value: 'Perakende ve Satış', tr: 'Perakende ve Satış', de: 'Einzelhandel und Vertrieb', aliases: ['Perakende', 'Satış', 'Vertrieb', 'Verkauf'] },
  { value: 'E-ticaret', tr: 'E-ticaret', de: 'E-Commerce', aliases: ['E-Ticaret', 'Ecommerce'] },
  { value: 'Finans ve Bankacılık', tr: 'Finans ve Bankacılık', de: 'Finanzen und Bankwesen', aliases: ['Finans', 'Bankacılık', 'Finance', 'Finanzen'] },
  { value: 'Muhasebe ve Mali İşler', tr: 'Muhasebe ve Mali İşler', de: 'Buchhaltung und Finanzwesen', aliases: ['Muhasebe', 'Mali İşler', 'Buchhaltung'] },
  { value: 'Sigortacılık', tr: 'Sigortacılık', de: 'Versicherungswesen', aliases: ['Sigorta', 'Versicherung'] },
  { value: 'Hukuk', tr: 'Hukuk', de: 'Rechtswesen', aliases: ['Hukuk Hizmetleri', 'Recht'] },
  { value: 'İnsan Kaynakları', tr: 'İnsan Kaynakları', de: 'Personalwesen', aliases: ['İK', 'HR', 'Human Resources'] },
  { value: 'Pazarlama ve Reklamcılık', tr: 'Pazarlama ve Reklamcılık', de: 'Marketing und Werbung', aliases: ['Pazarlama', 'Dijital Pazarlama', 'Reklamcılık', 'Marketing'] },
  { value: 'Medya ve İletişim', tr: 'Medya ve İletişim', de: 'Medien und Kommunikation', aliases: ['Medya', 'İletişim', 'Medien'] },
  { value: 'Tasarım ve Yaratıcı Hizmetler', tr: 'Tasarım ve Yaratıcı Hizmetler', de: 'Design und Kreativwirtschaft', aliases: ['Tasarım', 'Grafik Tasarım', 'Design'] },
  { value: 'Mimarlık ve Şehir Planlama', tr: 'Mimarlık ve Şehir Planlama', de: 'Architektur und Stadtplanung', aliases: ['Mimarlık', 'Architektur'] },
  { value: 'Gayrimenkul', tr: 'Gayrimenkul', de: 'Immobilien', aliases: ['Emlak', 'Immobilien'] },
  { value: 'Güvenlik', tr: 'Güvenlik', de: 'Sicherheitsdienste', aliases: ['Özel Güvenlik', 'Sicherheit'] },
  { value: 'Temizlik ve Tesis Hizmetleri', tr: 'Temizlik ve Tesis Hizmetleri', de: 'Reinigung und Facility Management', aliases: ['Temizlik', 'Tesis Yönetimi', 'Facility Management'] },
  { value: 'Bakım ve Teknik Servis', tr: 'Bakım ve Teknik Servis', de: 'Wartung und technischer Service', aliases: ['Bakım', 'Teknik Servis', 'Wartung'] },
  { value: 'Elektrik ve Elektronik', tr: 'Elektrik ve Elektronik', de: 'Elektrik und Elektronik', aliases: ['Elektrik', 'Elektronik', 'Elektrotechnik'] },
  { value: 'Makine ve Mekatronik', tr: 'Makine ve Mekatronik', de: 'Maschinenbau und Mechatronik', aliases: ['Makine', 'Mekatronik', 'Maschinenbau'] },
  { value: 'Kimya ve Laboratuvar', tr: 'Kimya ve Laboratuvar', de: 'Chemie und Labor', aliases: ['Kimya', 'Laboratuvar', 'Chemie'] },
  { value: 'İlaç', tr: 'İlaç', de: 'Pharmaindustrie', aliases: ['İlaç Endüstrisi', 'Pharma'] },
  { value: 'Biyoteknoloji', tr: 'Biyoteknoloji', de: 'Biotechnologie', aliases: ['Biotech'] },
  { value: 'Çevre ve Sürdürülebilirlik', tr: 'Çevre ve Sürdürülebilirlik', de: 'Umwelt und Nachhaltigkeit', aliases: ['Çevre', 'Sürdürülebilirlik', 'Umwelt'] },
  { value: 'Madencilik ve Doğal Kaynaklar', tr: 'Madencilik ve Doğal Kaynaklar', de: 'Bergbau und Rohstoffe', aliases: ['Madencilik', 'Bergbau'] },
  { value: 'Tekstil ve Moda', tr: 'Tekstil ve Moda', de: 'Textil und Mode', aliases: ['Tekstil', 'Moda', 'Textil'] },
  { value: 'Ambalaj ve Matbaa', tr: 'Ambalaj ve Matbaa', de: 'Verpackung und Druck', aliases: ['Ambalaj', 'Matbaa', 'Verpackung', 'Druck'] },
  { value: 'Mobilya ve Ahşap İşleri', tr: 'Mobilya ve Ahşap İşleri', de: 'Möbel und Holzverarbeitung', aliases: ['Mobilya', 'Ahşap', 'Holzverarbeitung'] },
  { value: 'Kuaförlük ve Kişisel Bakım', tr: 'Kuaförlük ve Kişisel Bakım', de: 'Friseur und Körperpflege', aliases: ['Kuaförlük', 'Kişisel Bakım', 'Kosmetik'] },
  { value: 'Spor ve Fitness', tr: 'Spor ve Fitness', de: 'Sport und Fitness', aliases: ['Spor', 'Fitness'] },
  { value: 'Kültür, Sanat ve Eğlence', tr: 'Kültür, Sanat ve Eğlence', de: 'Kultur, Kunst und Unterhaltung', aliases: ['Kültür', 'Sanat', 'Eğlence', 'Kultur'] },
  { value: 'Sosyal Hizmetler', tr: 'Sosyal Hizmetler', de: 'Soziale Arbeit', aliases: ['Sosyal Hizmet', 'Sozialwesen'] },
  { value: 'Kamu Yönetimi', tr: 'Kamu Yönetimi', de: 'Öffentliche Verwaltung', aliases: ['Kamu', 'Öffentlicher Dienst'] },
  { value: 'Sivil Toplum', tr: 'Sivil Toplum', de: 'Gemeinnützige Organisationen', aliases: ['STK', 'NGO', 'Nonprofit'] },
  { value: 'Araştırma ve Geliştirme', tr: 'Araştırma ve Geliştirme', de: 'Forschung und Entwicklung', aliases: ['Ar-Ge', 'ARGE', 'Forschung'] },
  { value: 'Bilim ve Akademi', tr: 'Bilim ve Akademi', de: 'Wissenschaft und Akademie', aliases: ['Bilim', 'Akademi', 'Wissenschaft'] },
  { value: 'Çeviri ve Dil Hizmetleri', tr: 'Çeviri ve Dil Hizmetleri', de: 'Übersetzung und Sprachdienste', aliases: ['Çeviri', 'Tercüme', 'Übersetzung'] },
  { value: 'Çağrı Merkezi ve Müşteri Hizmetleri', tr: 'Çağrı Merkezi ve Müşteri Hizmetleri', de: 'Callcenter und Kundenservice', aliases: ['Çağrı Merkezi', 'Müşteri Hizmetleri', 'Hizmet', 'Kundenservice'] },
  { value: 'Yönetim ve Danışmanlık', tr: 'Yönetim ve Danışmanlık', de: 'Management und Unternehmensberatung', aliases: ['Yönetim', 'Danışmanlık', 'Consulting'] },
  { value: 'Proje Yönetimi', tr: 'Proje Yönetimi', de: 'Projektmanagement', aliases: ['Proje', 'Project Management'] },
  { value: 'Satın Alma ve Tedarik Zinciri', tr: 'Satın Alma ve Tedarik Zinciri', de: 'Einkauf und Supply Chain', aliases: ['Satın Alma', 'Tedarik Zinciri', 'Einkauf'] },
  { value: 'Kalite Kontrol ve Güvence', tr: 'Kalite Kontrol ve Güvence', de: 'Qualitätskontrolle und -sicherung', aliases: ['Kalite', 'Kalite Kontrol', 'Qualitätssicherung'] },
  { value: 'Denizcilik', tr: 'Denizcilik', de: 'Maritime Wirtschaft', aliases: ['Denizcilik', 'Maritim'] },
  { value: 'Havacılık ve Uzay', tr: 'Havacılık ve Uzay', de: 'Luft- und Raumfahrt', aliases: ['Havacılık', 'Aviation'] },
  { value: 'Diğer', tr: 'Diğer', de: 'Sonstiges', aliases: ['Other', 'Sonstige'] },
] as const satisfies readonly SectorDefinition[];

function normalize(value: string) {
  return value.trim().toLocaleLowerCase();
}

export function findSectorDefinition(value: string) {
  const normalized = normalize(value);
  return STANDARD_SECTORS.find((sector) =>
    [sector.value, sector.tr, sector.de, ...(sector.aliases ?? [])].some((name) => normalize(name) === normalized),
  );
}

export function sectorMatches(jobSector: string, selectedSector: string) {
  const selected = STANDARD_SECTORS.find((sector) => sector.value === selectedSector);
  if (!selected) return normalize(jobSector) === normalize(selectedSector);
  return findSectorDefinition(jobSector)?.value === selected.value;
}
