import { Link } from 'react-router-dom';
import { Clock, ArrowRight, Tag } from 'lucide-react';
import WebsiteNav from '../../components/WebsiteNav';
import WebsiteFooter from '../../components/WebsiteFooter';
import Aurora from '../../components/Aurora';
import { useStore } from '../../store/useStore';

const AURORA_COLORS = ['#7cff67', '#B497CF', '#5227FF'];

const categoryColors = {
  'AI Automation': '#7cff67',
  'AI Voice': '#60a5fa',
  'Web Solutions': '#a78bfa',
  'Strategy': '#4ade80',
};

export default function BlogPage() {
  const blogPosts = useStore(s => s.blogPosts).filter(p => p.published);

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '400px', zIndex: 0 }}>
        <Aurora colorStops={AURORA_COLORS} amplitude={0.8} blend={0.4} speed={0.8} />
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <WebsiteNav />

      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px 60px', textAlign: 'center' }}>
        <p className="section-tag" style={{ marginBottom: 16 }}>Blog</p>
        <h1 style={{ 
          fontSize: 'clamp(36px,5vw,64px)', 
          fontWeight: 700, 
          letterSpacing: '-2px', 
          color: '#f0f0f0', 
          marginBottom: 20,
          textShadow: '0 4px 16px rgba(0, 0, 0, 0.6)',
        }}>
          AI Automation<br /><span className="gold-text">Insights & Strategies</span>
        </h1>
        <p style={{ 
          color: '#aaa', 
          fontSize: 'clamp(14px, 3vw, 18px)', 
          maxWidth: 520, 
          margin: '0 auto',
          lineHeight: 1.6,
          textShadow: '0 2px 8px rgba(0, 0, 0, 0.4)',
        }}>
          Practical guides on AI, automation, and building businesses that run themselves.
        </p>
      </section>

      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 80px' }}>
        {blogPosts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#666' }}>No posts yet. Check back soon.</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(340px,1fr))', gap: 24 }}>
            {blogPosts.map((p, idx) => (
              <article 
                key={p.id} 
                className="scale-in"
                style={{
                  animationDelay: `${idx * 0.05}s`,
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 16,
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Image */}
                <div style={{
                  width: '100%',
                  height: 200,
                  background: `url(${p.image}) center/cover`,
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(124, 255, 103, 0.1))',
                  }} />
                  <span 
                    className="badge"
                    style={{
                      position: 'absolute',
                      top: 12,
                      left: 12,
                      background: `${categoryColors[p.category] || '#3b82f6'}dd`,
                      color: '#fff',
                      border: 'none',
                      fontSize: 11,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {p.category}
                  </span>
                </div>

                {/* Content */}
                <div style={{
                  padding: 'clamp(16px, 3vw, 24px)',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                }}>
                  <h2 style={{
                    fontSize: 'clamp(14px, 3vw, 18px)',
                    fontWeight: 700,
                    color: '#f0f0f0',
                    lineHeight: 1.4,
                    marginBottom: 12,
                  }}>
                    {p.title}
                  </h2>

                  <p style={{
                    color: '#888',
                    fontSize: 'clamp(12px, 2vw, 14px)',
                    lineHeight: 1.6,
                    marginBottom: 16,
                    flex: 1,
                  }}>
                    {p.excerpt}
                  </p>

                  {/* Meta */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: 12,
                    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      fontSize: 'clamp(10px, 2vw, 12px)',
                      color: '#666',
                    }}>
                      <span>{p.date}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Clock size={12} /> {p.readTime} min
                      </span>
                    </div>
                    <button style={{
                      color: '#7cff67',
                      fontSize: 'clamp(11px, 2vw, 13px)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      fontWeight: 600,
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.gap = '8px';
                      e.currentTarget.style.color = '#a3ff7f';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.gap = '4px';
                      e.currentTarget.style.color = '#7cff67';
                    }}
                    >
                      Read More <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 80px', textAlign: 'center' }}>
        <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 20, padding: 48 }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: '#f0f0f0', letterSpacing: '-0.5px', marginBottom: 12 }}>Want AI Automation Tips Weekly?</h2>
          <p style={{ color: '#555', fontSize: 15, marginBottom: 28 }}>Join 500+ business owners getting our automation insights every week.</p>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', maxWidth: 400, margin: '0 auto' }}>
            <input className="input" placeholder="your@email.com" style={{ flex: 1 }} />
            <button className="btn-gold">Subscribe</button>
          </div>
        </div>
      </section>

      <WebsiteFooter />
      </div>
    </div>
  );
}
