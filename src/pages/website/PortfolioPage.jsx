import { ArrowRight, ExternalLink } from 'lucide-react';
import WebsiteNav from '../../components/WebsiteNav';
import WebsiteFooter from '../../components/WebsiteFooter';
import { useStore } from '../../store/useStore';

export default function PortfolioPage() {
  const { getPublishedProjects } = useStore();
  const projects = getPublishedProjects ? getPublishedProjects() : [];

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a' }}>
      <WebsiteNav />

      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px 60px', textAlign: 'center' }}>
        <p className="section-tag" style={{ marginBottom: 16 }}>Case Studies</p>
        <h1 style={{ fontSize: 'clamp(36px,5vw,64px)', fontWeight: 700, letterSpacing: '-2px', color: '#f0f0f0', marginBottom: 20 }}>
          Results That Speak<br /><span className="gold-text">For Themselves</span>
        </h1>
        <p style={{ color: '#555', fontSize: 18, maxWidth: 520, margin: '0 auto' }}>Real projects. Real numbers. No fluff.</p>
      </section>

      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 80px' }}>
        {projects.length === 0 ? (
          <div style={{
            background: '#111',
            border: '1px dashed #222',
            borderRadius: 20,
            padding: 'clamp(32px, 8vw, 64px) clamp(16px, 5vw, 32px)',
            textAlign: 'center',
            marginBottom: 32,
          }}>
            <h3 style={{ fontSize: 'clamp(20px, 4vw, 24px)', fontWeight: 700, color: '#f0f0f0', marginBottom: 12 }}>
              New Case Studies & Client Stories Coming Soon
            </h3>
            <p style={{ color: '#888', fontSize: 16, maxWidth: 600, margin: '0 auto 28px', lineHeight: 1.6 }}>
              We are currently compiling confidential enterprise outcomes and recent AI deployments into comprehensive case studies. Check back soon or book a direct strategy call for a live demonstration of our autonomous systems.
            </p>
            <button
              onClick={() => window.open('https://calendly.com', '_blank')}
              className="safe-touch-target"
              style={{
                background: 'linear-gradient(135deg, #38bdf8, #60a5fa)',
                color: '#fff',
                border: 'none',
                padding: '14px 28px',
                borderRadius: 10,
                fontWeight: 600,
                fontSize: 15,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              Request Live Case Study Walkthrough <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          projects.map((p) => (
            <div key={p.id || p.title} className="card" style={{ padding: 'clamp(20px, 5vw, 40px)', marginBottom: 24, background: '#111', border: '1px solid #1e1e1e', borderRadius: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 24 }}>
                <div>
                  <span className="badge" style={{ background: 'rgba(56, 189, 248, 0.12)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.25)', marginBottom: 12, display: 'inline-block', padding: '4px 12px', borderRadius: 999, fontSize: 12, fontWeight: 600 }}>
                    Autonomous System
                  </span>
                  <h2 style={{ fontSize: 'clamp(20px, 4vw, 24px)', fontWeight: 700, color: '#f0f0f0', letterSpacing: '-0.5px', marginTop: 8 }}>{p.title}</h2>
                  {p.technologies && p.technologies.length > 0 && (
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12 }}>
                      {p.technologies.map((t, idx) => (
                        <span key={idx} style={{ background: '#18181b', color: '#a1a1aa', padding: '4px 10px', borderRadius: 6, fontSize: 12, border: '1px solid #27272a' }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {(p.url || (p.github_link && p.github_link !== '#')) && (
                  <div>
                    <a
                      href={p.url || p.github_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="safe-touch-target"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(56, 189, 248, 0.1))',
                        color: '#38bdf8',
                        padding: '10px 18px',
                        borderRadius: 10,
                        textDecoration: 'none',
                        fontSize: 14,
                        fontWeight: 600,
                        border: '1px solid rgba(56, 189, 248, 0.3)',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Visit Live Site / App <ExternalLink size={15} />
                    </a>
                  </div>
                )}
              </div>

              <p style={{ color: '#94a3b8', fontSize: 15, lineHeight: 1.7, marginBottom: 28 }}>
                {p.description}
              </p>

              {/* Metrics */}
              {p.metrics && p.metrics.length > 0 && (
                <div>
                  <div style={{ fontSize: 11, color: '#4ade80', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>PROVEN OUTCOMES</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(160px, 45vw, 220px), 1fr))', gap: 12 }}>
                    {p.metrics.map((m, i) => (
                      <div key={i} style={{ background: '#0e0e0e', border: '1px solid #1a1a1a', borderRadius: 10, padding: 16 }}>
                        <div style={{ fontSize: 12, color: '#888', marginBottom: 6 }}>{m.label}</div>
                        <div style={{ fontSize: 'clamp(18px, 4vw, 22px)', fontWeight: 800, color: '#4ade80' }}>{m.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </section>

      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(16px, 4vw, 24px) 80px', textAlign: 'center' }}>
        <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 20, padding: 'clamp(28px, 6vw, 56px)' }}>
          <h2 style={{ fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: 700, color: '#f0f0f0', letterSpacing: '-1px', marginBottom: 12 }}>Ready to Be Our Next Case Study?</h2>
          <p style={{ color: '#555', fontSize: 16, marginBottom: 32 }}>Let's map your automation opportunities and build something remarkable.</p>
          <button className="btn-gold" onClick={() => window.open('https://calendly.com', '_blank')} style={{ fontSize: 15, padding: '14px 32px', cursor: 'pointer' }}>Book a Free Strategy Call <ArrowRight size={16} /></button>
        </div>
      </section>

      <WebsiteFooter />
    </div>
  );
}
