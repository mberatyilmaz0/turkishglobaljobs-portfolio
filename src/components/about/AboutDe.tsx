import Link from 'next/link';
import AppIcon from '@/components/ui/AppIcon';
import type { AboutPrinciplesContent } from '@/lib/contentDefaults';
import { localizedPath } from '@/lib/site';

const STEPS = [
  { title: 'Vorab-Bewerbung', subtitle: 'Informationen aufnehmen', text: 'Wir erfassen Dokumente, Bildungsweg und Ziele systematisch, ohne an dieser Stelle ein Ergebnis zu versprechen.' },
  { title: 'Realistische Einschätzung', subtitle: 'Eignung prüfen', text: 'Wir analysieren die vorliegenden Informationen im Hinblick auf die aktuellen Kriterien der zuständigen Stellen.' },
  { title: 'Fahrplan und Vereinbarung', subtitle: 'Planung', text: 'Nach der Einschätzung erstellen wir einen Schritt-für-Schritt-Fahrplan. Leistungen und Kosten werden transparent vereinbart.' },
  { title: 'Transparente Begleitung', subtitle: 'Begleitung', text: 'Wir informieren regelmäßig über den Stand und kommunizieren Hindernisse oder negative Entwicklungen offen.' },
];

export default function AboutDe({ principles }: { principles: AboutPrinciplesContent }) {
  return (
    <main style={{ paddingTop: 72, background: '#f8fafc' }}>
      <section style={{ background: 'linear-gradient(135deg, #0f172a, #1e3a8a)', padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p style={{ color: '#93c5fd', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: 12, fontWeight: 700 }}>Über uns</p>
          <h1 style={{ color: '#fff', fontSize: 'clamp(2rem, 5vw, 3.4rem)', lineHeight: 1.15 }}>Turkish Global Jobs: Ihr Ratgeber für Karriere und Bildung in Deutschland</h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.1rem', lineHeight: 1.75 }}>Wir begleiten Ihren Weg mit realistischen Einschätzungen, transparenten Schritten und klar kommunizierten Leistungen.</p>
        </div>
      </section>

      <section style={{ background: '#fff', padding: '72px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{ color: '#0f172a', fontSize: 'clamp(1.7rem, 3vw, 2.4rem)' }}>Eine Brücke zwischen der Türkei und Deutschland</h2>
          <p style={{ color: '#475569', lineHeight: 1.8 }}>Turkish Global Jobs richtet sich an Menschen, die von der Türkei aus eine berufliche oder schulische Perspektive in Deutschland suchen. Wir verbinden aktuelle Stelleninformationen mit verständlichen Inhalten zu Bewerbung, Anerkennung und Bildung.</p>
          <p style={{ color: '#475569', lineHeight: 1.8 }}>Bei speziellen rechtlichen, notariellen oder übersetzungsbezogenen Fragen verweisen wir an entsprechend qualifizierte Stellen. Der konkrete Leistungsumfang wird vor Beginn transparent besprochen.</p>
        </div>
      </section>

      <section style={{ padding: '72px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 32px' }}>
            <h2 style={{ color: '#0f172a', fontSize: 'clamp(1.7rem, 3vw, 2.4rem)' }}>{principles.title}</h2>
            <p style={{ color: '#64748b', lineHeight: 1.75 }}>{principles.subtitle}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 18 }}>
            {principles.cards.map((card) => (
              <article key={card.title} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 18, padding: 26 }}>
                <AppIcon name={card.icon} size={27} color="#2563eb" />
                <h3 style={{ color: '#0f172a', margin: '16px 0 8px' }}>{card.title}</h3>
                <p style={{ color: '#64748b', lineHeight: 1.7 }}>{card.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: '#fff', padding: '72px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={{ color: '#0f172a', fontSize: 'clamp(1.7rem, 3vw, 2.4rem)' }}>Unsere Zusammenarbeit in 4 Schritten</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 18, marginTop: 32 }}>
            {STEPS.map((step, index) => (
              <article key={step.title} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 18, padding: 24 }}>
                <span style={{ color: '#2563eb', fontWeight: 800 }}>0{index + 1}</span>
                <p style={{ color: '#64748b', fontSize: 12, textTransform: 'uppercase' }}>{step.subtitle}</p>
                <h3 style={{ color: '#0f172a' }}>{step.title}</h3>
                <p style={{ color: '#64748b', lineHeight: 1.7 }}>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: '#1d4ed8', padding: '72px 24px', textAlign: 'center' }}>
        <h2 style={{ color: '#fff', fontSize: 'clamp(1.7rem, 3vw, 2.4rem)' }}>Sie wissen noch nicht, wo Sie beginnen sollen?</h2>
        <p style={{ color: '#dbeafe', lineHeight: 1.75 }}>Beschreiben Sie uns Ihr Ziel und Ihr Profil über das Vorab-Bewerbungsformular.</p>
        <Link href={localizedPath('de', '/pre-application')} style={{ display: 'inline-block', marginTop: 20, background: '#fff', color: '#1d4ed8', padding: '15px 28px', borderRadius: 999, textDecoration: 'none', fontWeight: 700 }}>Vorab-Bewerbung starten →</Link>
      </section>
    </main>
  );
}
