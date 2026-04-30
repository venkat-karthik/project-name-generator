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
        <h1 style={{ fontSize: 'clamp(36px,5vw,64px)', fontWeight: 700, letterSpacing: '-2px', color: '#f0f0f0', marginBottom: 20 }}>
          AI Automation<br /><span className="gold-text" style={{ background: 'linear-gradient(135deg, #7cff67, #B497CF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Insights & Strategies</span>
        </h1>
        <p style={{ color: '#555', fontSize: 18, maxWidth: 520, margin: '0 auto' }}>Practical guides on AI, automation, and building businesses that run themselves.</p>
      </section>

      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 80px' }}>
        {blogPosts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#444' }}>No posts yet. Check back soon.</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(340px,1fr))', gap: 16 }}>
            {blogPosts.map(p => (
              <article key={p.id} className="card card-hover" style={{ padding: 28 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <span className="badge" style={{ background: `${categoryColors[p.category] || '#c9a84c'}15`, color: categoryColors[p.category] || '#c9a84c', border: `1px solid ${categoryColors[p.category] || '#c9a84c'}30` }}>
                    {p.category}
                  </span>
                  <span style={{ color: '#444', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Clock size={12} /> {p.readTime} min read
                  </span>
                </div>
                <h2 style={{ fontSize: 17, fontWeight: 600, color: '#f0f0f0', lineHeight: 1.4, marginBottom: 12 }}>{p.title}</h2>
                <p style={{ color: '#555', fontSize: 13, lineHeight: 1.6, marginBottom: 20 }}>{p.excerpt}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#444', fontSize: 12 }}>{p.date}</span>
                  <button style={{ color: '#7cff67', fontSize: 13, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                    Read More <ArrowRight size={13} />
                  </button>
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
