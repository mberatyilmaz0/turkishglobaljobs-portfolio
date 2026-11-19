import { localizedPath, localizedUrl, type Locale } from './site';

export type JobLandingPage = {
  key: string;
  field: 'sector' | 'location';
  terms: string[];
  slugs: Record<Locale, string>;
  copy: Record<Locale, {
    title: string;
    metaTitle: string;
    description: string;
    intro: string;
    sectionTitle: string;
    sectionText: string;
  }>;
};

export const JOB_LANDING_PAGES: JobLandingPage[] = [
  {
    key: 'software',
    field: 'sector',
    terms: ['yazılım', 'software', 'bilişim', 'informatik', 'IT'],
    slugs: { tr: 'almanya-yazilim-is-ilanlari', de: 'software-jobs-deutschland' },
    copy: {
      tr: {
        title: 'Almanya Yazılım ve IT İş İlanları',
        metaTitle: 'Almanya Yazılım ve IT İş İlanları',
        description: 'Almanya’daki güncel yazılım, bilişim ve IT iş ilanlarını inceleyin. Çalışma şartlarını karşılaştırın ve ön başvurunuzu oluşturun.',
        intro: 'Yazılım geliştirme, veri, siber güvenlik ve BT alanlarındaki aktif fırsatları tek sayfada inceleyin. İlan detaylarında çalışma modeli, konum ve belirtilen dil şartlarını karşılaştırabilirsiniz.',
        sectionTitle: 'Türkiye’den Almanya’ya yazılım kariyeri',
        sectionText: 'Teknik deneyiminizi ve kullandığınız teknolojileri güncel bir CV ile sunmanız, işverenlerin profilinizi değerlendirmesini kolaylaştırır. Başvuru öncesinde ilanın dil beklentisini ve çalışma izni sürecine ilişkin koşullarını kontrol edin.',
      },
      de: {
        title: 'Software- und IT-Jobs in Deutschland',
        metaTitle: 'Software- und IT-Jobs in Deutschland',
        description: 'Aktuelle Software-, IT- und Tech-Stellen in Deutschland entdecken, Arbeitsbedingungen vergleichen und eine unverbindliche Vorab-Bewerbung senden.',
        intro: 'Entdecken Sie aktuelle Stellen in Softwareentwicklung, Data, Cybersecurity und IT. In den Stellendetails finden Sie Arbeitsmodell, Standort und angegebene Sprachanforderungen.',
        sectionTitle: 'Von der Türkei in die deutsche IT-Branche',
        sectionText: 'Ein aktueller Lebenslauf mit klar beschriebener Berufserfahrung und eingesetzten Technologien erleichtert die erste Prüfung. Prüfen Sie vor der Bewerbung die Sprachanforderungen und die Voraussetzungen für Ihre Arbeitserlaubnis.',
      },
    },
  },
  {
    key: 'engineering',
    field: 'sector',
    terms: ['mühendis', 'engineering', 'ingenieur'],
    slugs: { tr: 'almanya-muhendislik-is-ilanlari', de: 'ingenieur-jobs-deutschland' },
    copy: {
      tr: {
        title: 'Almanya Mühendislik İş İlanları',
        metaTitle: 'Almanya Mühendislik İş İlanları',
        description: 'Almanya’da mühendislik alanındaki aktif iş ilanlarını, şehirleri, çalışma modellerini ve başvuru koşullarını inceleyin.',
        intro: 'Makine, elektrik, inşaat, otomotiv ve diğer mühendislik disiplinlerindeki aktif ilanları keşfedin. Her ilanda mesleki deneyim, dil ve konum bilgilerini kendi profilinizle karşılaştırın.',
        sectionTitle: 'Mühendislik başvurusu ve mesleki denklik',
        sectionText: 'Diploma ve meslek geçmişinizin Almanya’daki karşılığı, başvurulacak pozisyona göre önem taşır. Güncel denklik ve çalışma izni koşullarını resmî kaynaklardan kontrol ederek başvuru dosyanızı hazırlayın.',
      },
      de: {
        title: 'Ingenieur- und Engineering-Jobs in Deutschland',
        metaTitle: 'Ingenieur-Jobs in Deutschland',
        description: 'Aktuelle Engineering-Stellen in Deutschland nach Standort, Arbeitsmodell und Anforderungen entdecken und sich für passende Positionen voranmelden.',
        intro: 'Finden Sie aktuelle Stellen in Maschinenbau, Elektrotechnik, Bauwesen, Automotive und weiteren technischen Bereichen. Vergleichen Sie Erfahrung, Sprachanforderungen und Standort mit Ihrem Profil.',
        sectionTitle: 'Bewerbung und berufliche Anerkennung',
        sectionText: 'Die deutsche Entsprechung Ihres Abschlusses und Ihrer Berufserfahrung kann je nach Position wichtig sein. Prüfen Sie aktuelle Anerkennungs- und Aufenthaltsanforderungen über offizielle Quellen.',
      },
    },
  },
  {
    key: 'healthcare',
    field: 'sector',
    terms: ['sağlık', 'gesundheit', 'health', 'pflege'],
    slugs: { tr: 'almanya-saglik-is-ilanlari', de: 'jobs-gesundheitswesen-deutschland' },
    copy: {
      tr: {
        title: 'Almanya Sağlık Sektörü İş İlanları',
        metaTitle: 'Almanya Sağlık ve Bakım İş İlanları',
        description: 'Almanya’daki sağlık ve bakım sektörü iş ilanlarını inceleyin; konum, dil seviyesi ve çalışma koşullarını karşılaştırın.',
        intro: 'Sağlık ve bakım alanındaki güncel pozisyonları inceleyin. Reglemente mesleklerde denklik ve dil koşulları pozisyona göre değişebildiği için ilan açıklamasını dikkatle okuyun.',
        sectionTitle: 'Sağlık mesleklerinde denklik ve dil şartı',
        sectionText: 'Sağlık alanındaki başvurularda diploma tanınması, meslek izni ve yeterli Almanca seviyesi öne çıkar. Güncel gereklilikleri yetkili kurumların ve resmî danışma portallarının bilgileriyle doğrulayın.',
      },
      de: {
        title: 'Jobs im Gesundheitswesen in Deutschland',
        metaTitle: 'Gesundheits- und Pflegejobs in Deutschland',
        description: 'Aktuelle Stellen in Gesundheits- und Pflegeberufen in Deutschland entdecken und Standort, Sprachniveau und Arbeitsbedingungen vergleichen.',
        intro: 'Entdecken Sie aktuelle Positionen im Gesundheits- und Pflegebereich. Bei reglementierten Berufen können Anerkennung und Sprachanforderungen je nach Tätigkeit variieren.',
        sectionTitle: 'Anerkennung und Sprachanforderungen',
        sectionText: 'Bei Gesundheitsberufen stehen die Anerkennung des Abschlusses, die Berufserlaubnis und ausreichende Deutschkenntnisse im Vordergrund. Prüfen Sie die aktuellen Anforderungen bei den zuständigen Stellen.',
      },
    },
  },
  {
    key: 'logistics',
    field: 'sector',
    terms: ['lojistik', 'logistik', 'logistics'],
    slugs: { tr: 'almanya-lojistik-is-ilanlari', de: 'logistik-jobs-deutschland' },
    copy: {
      tr: {
        title: 'Almanya Lojistik İş İlanları',
        metaTitle: 'Almanya Lojistik ve Depo İş İlanları',
        description: 'Almanya’da lojistik, depo, tedarik zinciri ve ulaştırma alanındaki aktif iş ilanlarını ve çalışma koşullarını inceleyin.',
        intro: 'Depo operasyonları, tedarik zinciri, nakliye ve lojistik planlama alanlarındaki aktif ilanları karşılaştırın. Vardiya, konum ve çalışma modeli gibi bilgileri ilan detayında kontrol edin.',
        sectionTitle: 'Lojistik alanında başvuru hazırlığı',
        sectionText: 'Deneyiminizi, kullandığınız sistemleri ve varsa mesleki belgelerinizi CV’nizde açıkça belirtin. İlanda istenen dil seviyesi ve çalışma koşullarının beklentilerinizle uyumlu olduğundan emin olun.',
      },
      de: {
        title: 'Logistik-Jobs in Deutschland',
        metaTitle: 'Logistik- und Lagerjobs in Deutschland',
        description: 'Aktuelle Stellen in Logistik, Lager, Supply Chain und Transport in Deutschland entdecken und Arbeitsbedingungen vergleichen.',
        intro: 'Vergleichen Sie aktuelle Stellen in Lagerbetrieb, Supply Chain, Transport und Logistikplanung. Informationen zu Schichten, Standort und Arbeitsmodell finden Sie in den Stellendetails.',
        sectionTitle: 'Vorbereitung Ihrer Bewerbung in der Logistik',
        sectionText: 'Beschreiben Sie Berufserfahrung, eingesetzte Systeme und relevante Nachweise klar im Lebenslauf. Prüfen Sie, ob Sprachniveau und Arbeitsbedingungen zu Ihren Erwartungen passen.',
      },
    },
  },
  {
    key: 'berlin',
    field: 'location',
    terms: ['berlin'],
    slugs: { tr: 'berlin-is-ilanlari', de: 'jobs-berlin' },
    copy: {
      tr: {
        title: 'Berlin İş İlanları',
        metaTitle: 'Berlin İş İlanları | Almanya’da Çalışma Fırsatları',
        description: 'Berlin’deki güncel iş ilanlarını sektör, çalışma modeli ve dil şartı açısından inceleyin, size uygun pozisyona ön başvuru yapın.',
        intro: 'Berlin ve çevresindeki aktif iş fırsatlarını keşfedin. Teknoloji, hizmet, mühendislik ve diğer sektörlerdeki ilanları konum ve çalışma koşullarına göre değerlendirin.',
        sectionTitle: 'Berlin’de çalışmak ve yaşamak',
        sectionText: 'Berlin uluslararası ekipleri ve farklı sektörlerden iş fırsatlarıyla öne çıkar. Başvuru yaparken konut, ulaşım ve yaşam maliyetlerini değerlendirin; çalışma ve oturum koşullarını resmî kaynaklardan kontrol edin.',
      },
      de: {
        title: 'Jobs in Berlin',
        metaTitle: 'Jobs in Berlin | Aktuelle Stellenangebote',
        description: 'Aktuelle Jobs in Berlin nach Branche, Arbeitsmodell und Sprachanforderungen entdecken und sich für passende Stellen voranmelden.',
        intro: 'Entdecken Sie aktuelle Stellen in Berlin und Umgebung. Vergleichen Sie Angebote aus Technologie, Dienstleistung, Engineering und weiteren Branchen nach Standort und Arbeitsbedingungen.',
        sectionTitle: 'Arbeiten und Leben in Berlin',
        sectionText: 'Berlin ist für internationale Teams und vielfältige Branchen bekannt. Berücksichtigen Sie Wohnen, Verkehr und Lebenshaltungskosten und prüfen Sie Arbeits- und Aufenthaltsbedingungen über offizielle Quellen.',
      },
    },
  },
  {
    key: 'hamburg',
    field: 'location',
    terms: ['hamburg'],
    slugs: { tr: 'hamburg-is-ilanlari', de: 'jobs-hamburg' },
    copy: {
      tr: {
        title: 'Hamburg İş İlanları',
        metaTitle: 'Hamburg İş İlanları | Güncel Almanya İşleri',
        description: 'Hamburg’daki güncel iş ilanlarını inceleyin; lojistik, mühendislik, teknoloji ve diğer sektörlerdeki fırsatları karşılaştırın.',
        intro: 'Hamburg’daki aktif pozisyonları tek sayfada görüntüleyin. Liman ekonomisi, lojistik, ticaret, teknoloji ve hizmet alanlarındaki ilanların koşullarını karşılaştırın.',
        sectionTitle: 'Hamburg’da iş ararken nelere dikkat edilmeli?',
        sectionText: 'Pozisyonun şehir içindeki konumu, ulaşım ve konut bütçesi karar sürecinde önemlidir. Mesleki yeterliliklerinizi ve dil seviyenizi ilanın beklentileriyle karşılaştırarak daha hedefli başvuru yapabilirsiniz.',
      },
      de: {
        title: 'Jobs in Hamburg',
        metaTitle: 'Jobs in Hamburg | Aktuelle Stellenangebote',
        description: 'Aktuelle Jobs in Hamburg entdecken und Stellen in Logistik, Engineering, Technologie und weiteren Branchen vergleichen.',
        intro: 'Finden Sie aktuelle Positionen in Hamburg auf einer Seite. Vergleichen Sie Angebote aus Hafenwirtschaft, Logistik, Handel, Technologie und Dienstleistung.',
        sectionTitle: 'Worauf Sie bei der Jobsuche in Hamburg achten sollten',
        sectionText: 'Standort, Verkehrsanbindung und Wohnbudget sind bei der Entscheidung wichtig. Vergleichen Sie Ihre Qualifikationen und Sprachkenntnisse mit den Anforderungen der Stelle.',
      },
    },
  },
  {
    key: 'munich',
    field: 'location',
    terms: ['münih', 'munich', 'münchen'],
    slugs: { tr: 'munih-is-ilanlari', de: 'jobs-muenchen' },
    copy: {
      tr: {
        title: 'Münih İş İlanları',
        metaTitle: 'Münih İş İlanları | Güncel Çalışma Fırsatları',
        description: 'Münih ve çevresindeki aktif iş ilanlarını inceleyin; teknoloji, mühendislik ve diğer sektörlerdeki pozisyonları karşılaştırın.',
        intro: 'Münih ve çevresindeki aktif iş fırsatlarını keşfedin. Teknoloji, otomotiv, mühendislik ve hizmet sektöründeki ilanların deneyim ve dil beklentilerini inceleyin.',
        sectionTitle: 'Münih’te kariyer ve yaşam planlaması',
        sectionText: 'Münih güçlü bir iş piyasasına sahiptir; konut ve yaşam maliyetlerini de başvuru kararınıza dahil edin. İş teklifi, çalışma saatleri ve yan hakları birlikte değerlendirin.',
      },
      de: {
        title: 'Jobs in München',
        metaTitle: 'Jobs in München | Aktuelle Stellenangebote',
        description: 'Aktuelle Jobs in München und Umgebung entdecken und Positionen in Technologie, Engineering und weiteren Branchen vergleichen.',
        intro: 'Entdecken Sie aktuelle Stellen in München und Umgebung. Prüfen Sie Erfahrungs- und Sprachanforderungen in Technologie, Automotive, Engineering und Dienstleistung.',
        sectionTitle: 'Karriere und Lebensplanung in München',
        sectionText: 'München bietet einen starken Arbeitsmarkt; berücksichtigen Sie auch Wohn- und Lebenshaltungskosten. Bewerten Sie Angebot, Arbeitszeiten und Zusatzleistungen gemeinsam.',
      },
    },
  },
  {
    key: 'cologne',
    field: 'location',
    terms: ['köln', 'cologne'],
    slugs: { tr: 'koln-is-ilanlari', de: 'jobs-koeln' },
    copy: {
      tr: {
        title: 'Köln İş İlanları',
        metaTitle: 'Köln İş İlanları | Almanya’da Güncel İşler',
        description: 'Köln ve çevresindeki aktif iş ilanlarını inceleyin; sektör, konum, dil seviyesi ve çalışma koşullarını karşılaştırın.',
        intro: 'Köln ve çevresindeki güncel pozisyonları keşfedin. Farklı sektörlerdeki aktif ilanları çalışma modeli, konum ve başvuru koşulları açısından değerlendirin.',
        sectionTitle: 'Köln ve çevresinde iş arama',
        sectionText: 'Köln, çevresindeki şehirlerle birlikte geniş bir çalışma bölgesi oluşturur. Ulaşım seçeneklerini ve ilanın gerçek çalışma konumunu kontrol ederek başvurunuzu planlayın.',
      },
      de: {
        title: 'Jobs in Köln',
        metaTitle: 'Jobs in Köln | Aktuelle Stellenangebote',
        description: 'Aktuelle Jobs in Köln und Umgebung entdecken und Branche, Standort, Sprachniveau und Arbeitsbedingungen vergleichen.',
        intro: 'Entdecken Sie aktuelle Positionen in Köln und Umgebung. Vergleichen Sie Stellen verschiedener Branchen nach Arbeitsmodell, Standort und Anforderungen.',
        sectionTitle: 'Jobsuche in Köln und der Region',
        sectionText: 'Köln bildet mit den umliegenden Städten einen großen Arbeitsmarkt. Prüfen Sie Verkehrsanbindung und tatsächlichen Arbeitsort, bevor Sie sich bewerben.',
      },
    },
  },
];

export function getJobLandingPage(locale: string, slug: string) {
  const loc: Locale = locale === 'de' ? 'de' : 'tr';
  return JOB_LANDING_PAGES.find((page) => page.slugs[loc] === slug);
}

export function jobLandingPath(locale: Locale, page: JobLandingPage) {
  return `${localizedPath(locale, '/job-search')}/${page.slugs[locale]}`;
}

export function jobLandingUrl(locale: Locale, page: JobLandingPage) {
  return `${localizedUrl(locale, '/job-search')}/${page.slugs[locale]}`;
}

export function jobLandingAlternates(locale: Locale, page: JobLandingPage) {
  return {
    canonical: jobLandingUrl(locale, page),
    languages: {
      tr: jobLandingUrl('tr', page),
      de: jobLandingUrl('de', page),
      'x-default': jobLandingUrl('tr', page),
    },
  };
}

