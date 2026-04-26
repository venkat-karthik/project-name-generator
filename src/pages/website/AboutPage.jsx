import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Target, Users2, Heart } from 'lucide-react';
import WebsiteNav from '../../components/WebsiteNav';
import WebsiteFooter from '../../components/WebsiteFooter';

const team = [
  { name: 'Arjun Sharma', role: 'Founder & CEO', skills: 'Strategy, AI, Business Development', avatar: 'AS', desc: 'Built Velfound to make enterprise-grade AI accessible to every business. 6 years in tech & automation.' },
  { name: 'Priya Mehta', role: 'Lead Developer', skills: 'React, Node.js, System Architecture', avatar: 'PM', desc: 'Full-stack engineer obsessed with performance and clean code. Shipped 30+ production systems.' },
  { name: 'Rohan Das', role: 'AI Engineer', skills: 'Python, ML, Voice AI', avatar: 'RD', desc: 'Specialises in deploying LLMs and voice AI systems for real-world business use cases.' },
  { name: 'Sneha Patel', role: 'BD Manager', skills: 'Sales, CRM, Client Success', avatar: 'SP', desc: 'Ensures every client sees measurable ROI from their Velfound systems.' },
];

const values = [
  { icon: Target, title: 'Outcome-Obsessed', desc: 'We measure success by your business results — not lines of code or hours billed.' },
  { icon: Zap, title: 'Speed Without Compromise', desc: 'We move fast, but never cut corners on quality, security, or reliability.' },
  { icon: Users2, title: 'Radical Transparency', desc: 'You always know what we\'re building, why, and how much it costs.' },
  { icon: Heart, title: 'Long-Term Partners', desc: 'We build systems that keep working. And we\'re here when you need to scale.' },
];

export default function AboutPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a' }}>
      <WebsiteNav />

      {/* Hero */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px 60px', textAlign: 'center' }}>
        <p className="section-tag" style={{ marginBottom: 16 }}>About Velfound</p>
        <h1 style={{ fontSize: 'clamp(36px,5vw,64px)', fontWeight: 700, letterSpacing: '-2px', color: '#f0f0f0', marginBottom: 20 }}>
          We Started Because<br /><span className="gold-text">Businesses Deserved Better</span>
        </h1>
        <p style={{ color: '#555', fontSize: 18, maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}>
          Most automation agencies overpromise and underdeliver. We built Velfound to change that — with real systems, real results, and a team that actually cares.
        </p>
      </section>

      {/* Story */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px 80px' }}>
        <div className="card" style={{ padding: '48px 56px' }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#f0f0f0', marginBottom: 20 }}>Our Story</h2>
          <div style={{ color: '#666', fontSize: 15, lineHeight: 1.8 }}>
            <p style={{ marginBottom: 16 }}>Velfound was founded in 2023 when our CEO Arjun was helping a friend's business automate their customer follow-up process. What should have been a simple task revealed a much bigger problem: businesses were drowning in manual work, but the tools to fix it were either too expensive, too complex, or too generic.</p>
            <p style={{ marginBottom: 16 }}>We started with one belief: <span style={{ color: '#c9a84c' }}>every business should have access to AI systems that actually work.</span> Not demos. Not templates. Real, custom-built automation that runs your operations while you sleep.</p>
            <p>Today, Velfound has delivered 50+ projects across India and Southeast Asia — from AI voice agents for hospitals to full automation suites for e-commerce brands. Every project we build is designed to generate measurable ROI within 90 days.</p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <p className="section-tag" style={{ marginBottom: 12 }}>Our Values</p>
          <h2 style={{ fontSize: 'clamp(28px,4vw,40px)', fontWeight: 700, color: '#f0f0f0', letterSpacing: '-1px' }}>How We Work</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 16 }}>
          {values.map(v => (
            <div key={v.title} className="card" style={{ padding: 28 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                <v.icon size={20} color="#c9a84c" />
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 600, color: '#f0f0f0', marginBottom: 8 }}>{v.title}</h3>
              <p style={{ color: '#555', fontSize: 13, lineHeight: 1.6 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <p className="section-tag" style={{ marginBottom: 12 }}>The Team</p>
          <h2 style={{ fontSize: 'clamp(28px,4vw,40px)', fontWeight: 700, color: '#f0f0f0', letterSpacing: '-1px' }}>Built By Builders</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 16 }}>
          {team.map(m => (
            <div key={m.name} className="card" style={{ padding: 28, textAlign: 'center' }}>
              <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'linear-gradient(135deg,#c9a84c,#e4c677)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: 18, fontWeight: 700, color: '#0a0a0a' }}>{m.avatar}</div>
              <h3 style={{ fontSize: 15, fontWeight: 600, color: '#f0f0f0', marginBottom: 4 }}>{m.name}</h3>
              <p style={{ color: '#c9a84c', fontSize: 12, marginBottom: 12 }}>{m.role}</p>
              <p style={{ color: '#555', fontSize: 13, lineHeight: 1.6, marginBottom: 12 }}>{m.desc}</p>
              <p style={{ color: '#333', fontSize: 11 }}>{m.skills}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 80px', textAlign: 'center' }}>
        <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 20, padding: 56 }}>
          <h2 style={{ fontSize: 36, fontWeight: 700, color: '#f0f0f0', letterSpacing: '-1px', marginBottom: 12 }}>Join the Companies We've Helped</h2>
          <p style={{ color: '#555', fontSize: 16, marginBottom: 32 }}>Let's build your automation system together.</p>
          <Link to="/contact"><button className="btn-gold" style={{ fontSize: 15, padding: '14px 32px' }}>Get in Touch <ArrowRight size={16} /></button></Link>
        </div>
      </section>

      <WebsiteFooter />
    </div>
  );
}
