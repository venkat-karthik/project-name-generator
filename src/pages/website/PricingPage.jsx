import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, HelpCircle, MessageCircle } from 'lucide-react';
import WebsiteNav from '../../components/WebsiteNav';
import WebsiteFooter from '../../components/WebsiteFooter';
import Aurora from '../../components/Aurora';

const AURORA_COLORS = ['#7cff67', '#B497CF', '#5227FF'];

const tiers = [
  {
    name: 'Starter',
    range: '₹25,000 – ₹60,000',
    desc: 'For small businesses looking to automate their first workflow or launch a clean web presence.',
    features: ['Single workflow automation', 'Landing page or basic website', 'WhatsApp chatbot setup', 'Analytics integration', '30-day support'],
    ideal: 'Freelancers, startups, solo founders',
  },
  {
    name: 'Growth',
    range: '₹60,000 – ₹1,50,000',
    desc: 'For growing businesses ready to deploy serious AI systems and conversion-focused platforms.',
    features: ['Multi-workflow automation suite', 'Full business website', 'AI voice agent (inbound)', 'CRM integration & automation', 'Lead scoring & nurturing', '60-day support & iterations'],
    ideal: 'SMBs, clinics, schools, retailers',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    range: '₹1,50,000 – ₹5,00,000+',
    desc: 'For companies that want to fully automate operations and deploy AI across departments.',
    features: ['Full AI automation suite', 'Custom SaaS / internal tools', 'Multi-channel AI voice system', 'Team training & documentation', 'Monthly advisory retainer', 'Dedicated account manager', 'Custom integrations & APIs'],
    ideal: 'Hospitals, education groups, e-commerce',
  },
];

const factors = [
  { label: 'Project Complexity', desc: 'Number of systems, APIs, and integrations involved' },
  { label: 'AI Customisation', desc: 'Depth of custom training vs. off-the-shelf models' },
  { label: 'Team Size', desc: 'Number of users accessing the system' },
  { label: 'Timeline', desc: 'Rush projects or standard delivery windows' },
  { label: 'Ongoing Support', desc: 'Monthly retainer vs. one-time delivery' },
];

const faqs = [
  { q: 'Do you charge upfront?', a: 'We typically work with a 50% deposit upfront and 50% on delivery. For larger projects, we offer milestone-based payment.' },
  { q: 'Do you offer monthly retainers?', a: 'Yes. We offer ongoing support and advisory retainers starting at ₹15,000/month for maintenance and optimization.' },
  { q: 'Can you work within a tight budget?', a: 'We\'ll always be transparent about what\'s achievable at different price points. Book a call and we\'ll work with your constraints.' },
  { q: 'How long does a typical project take?', a: 'Most automation projects take 2–6 weeks. Complex SaaS or multi-system builds can take 6–12 weeks.' },
];

export default function PricingPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '400px', zIndex: 0 }}>
        <Aurora colorStops={AURORA_COLORS} amplitude={0.8} blend={0.4} speed={0.8} />
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <WebsiteNav />

      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px 60px', textAlign: 'center' }}>
        <p className="section-tag" style={{ marginBottom: 16 }}>Pricing</p>
        <h1 style={{ fontSize: 'clamp(36px,5vw,64px)', fontWeight: 700, letterSpacing: '-2px', color: '#f0f0f0', marginBottom: 20 }}>
          Transparent Pricing.<br /><span className="gold-text" style={{ background: 'linear-gradient(135deg, #7cff67, #B497CF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Custom to Your Needs.</span>
        </h1>
        <p style={{ color: '#555', fontSize: 18, maxWidth: 520, margin: '0 auto' }}>We don't do one-size-fits-all. Every project is scoped based on your specific needs and goals.</p>
      </section>

      {/* Tiers */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 16, marginBottom: 60 }}>
          {tiers.map(t => (
            <div key={t.name} className="card" style={{ padding: 32, border: t.highlighted ? '1px solid rgba(124,255,103,0.4)' : '1px solid #1e1e1e', position: 'relative' }}>
              {t.highlighted && (
                <div style={{ position: 'absolute', top: -1, left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg,#7cff67,#B497CF)', borderRadius: '0 0 8px 8px', padding: '4px 16px', fontSize: 11, fontWeight: 700, color: '#0a0a0a' }}>MOST POPULAR</div>
              )}
              <div style={{ marginTop: t.highlighted ? 12 : 0 }}>
                <p style={{ color: '#555', fontSize: 12, fontWeight: 600, marginBottom: 8 }}>{t.name}</p>
            <div className={t.highlighted ? 'gold-text' : ''} style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.5px', color: t.highlighted ? undefined : '#f0f0f0', marginBottom: 12, background: t.highlighted ? 'linear-gradient(135deg, #7cff67, #B497CF)' : 'none', WebkitBackgroundClip: t.highlighted ? 'text' : 'unset', WebkitTextFillColor: t.highlighted ? 'transparent' : 'unset', backgroundClip: t.highlighted ? 'text' : 'unset' }}>{t.range}</div>
                <p style={{ color: '#555', fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>{t.desc}</p>
                <div style={{ fontSize: 11, color: '#333', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Ideal for: {t.ideal}</div>
                <div style={{ borderTop: '1px solid #1a1a1a', paddingTop: 20, marginBottom: 24 }}>
                  {t.features.map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                      <CheckCircle2 size={14} color={t.highlighted ? '#7cff67' : '#4ade80'} />
                      <span style={{ color: '#777', fontSize: 13 }}>{f}</span>
                    </div>
                  ))}
                </div>
                <Link to="/contact">
                  <button className={t.highlighted ? 'btn-gold' : 'btn-outline'} style={{ width: '100%', justifyContent: 'center' }}>Get a Custom Quote <ArrowRight size={14} /></button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Factors */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 60px' }}>
        <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 16, padding: '40px' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f0f0f0', marginBottom: 8 }}>What Affects Your Price?</h2>
          <p style={{ color: '#555', fontSize: 14, marginBottom: 28 }}>Every project is unique. Here are the key factors we consider when scoping your build.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16 }}>
            {factors.map(f => (
              <div key={f.label} style={{ background: '#0e0e0e', border: '1px solid #1a1a1a', borderRadius: 10, padding: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#f0f0f0', marginBottom: 6 }}>{f.label}</div>
                <div style={{ fontSize: 12, color: '#555', lineHeight: 1.5 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 80px' }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, color: '#f0f0f0', letterSpacing: '-0.5px', marginBottom: 24 }}>Pricing FAQs</h2>
        {faqs.map(f => (
          <div key={f.q} style={{ background: '#0e0e0e', border: '1px solid #1a1a1a', borderRadius: 12, padding: '20px 24px', marginBottom: 8 }}>
            <div style={{ fontWeight: 600, color: '#f0f0f0', fontSize: 15, marginBottom: 8 }}>{f.q}</div>
            <p style={{ color: '#666', fontSize: 14, lineHeight: 1.6 }}>{f.a}</p>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 80px', textAlign: 'center' }}>
        <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 20, padding: 56 }}>
          <h2 style={{ fontSize: 36, fontWeight: 700, color: '#f0f0f0', letterSpacing: '-1px', marginBottom: 12 }}>Let's Talk Numbers</h2>
          <p style={{ color: '#555', fontSize: 16, marginBottom: 32 }}>Book a free call. We'll scope your project and give you a fixed quote with no surprises.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-gold" onClick={() => window.open('https://calendly.com', '_blank')} style={{ fontSize: 15, padding: '14px 32px' }}>Book Free Strategy Call <ArrowRight size={16} /></button>
            <button className="btn-outline" onClick={() => window.open('https://wa.me/919876543210', '_blank')} style={{ fontSize: 15, padding: '14px 32px' }}><MessageCircle size={14} /> WhatsApp Us</button>
          </div>
        </div>
      </section>

      <WebsiteFooter />
      </div>
    </div>
  );
}
