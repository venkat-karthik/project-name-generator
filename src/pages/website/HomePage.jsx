import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, Zap, Bot, Globe, BarChart3, ChevronRight, Star, TrendingUp, Clock, Users } from 'lucide-react';
import WebsiteNav from '../../components/WebsiteNav';
import WebsiteFooter from '../../components/WebsiteFooter';

const services = [
  { icon: Bot, title: 'AI & Automation', desc: 'Replace manual workflows with intelligent systems that operate 24/7 without human intervention.' },
  { icon: Zap, title: 'AI Voice Systems', desc: 'Conversational AI voice agents that handle calls, book appointments, and qualify leads autonomously.' },
  { icon: Globe, title: 'Web Solutions', desc: 'High-performance websites and platforms engineered for conversion and scale.' },
  { icon: BarChart3, title: 'Audit & Strategy', desc: 'Deep-dive analysis of your current systems with a clear roadmap for automation and growth.' },
];

const steps = [
  { n: '01', title: 'Discovery Call', desc: 'We map your business workflows and identify the highest-leverage automation opportunities.' },
  { n: '02', title: 'Build & Deploy', desc: 'Our team builds custom AI systems, voice agents, and web solutions tailored to your operations.' },
  { n: '03', title: 'Scale & Optimise', desc: 'Monitor performance, iterate fast, and continuously expand automation across your business.' },
];

const caseStudies = [
  { client: 'EduPrime Academy', tag: 'AI + Web', title: '340% increase in lead conversion', desc: 'Built a full LMS + AI lead qualification system that tripled their enrollment rate in 3 months.', metrics: [{ label: 'Conversion Rate', v: '340%', up: true }, { label: 'Manual Hours Saved', v: '40h/wk', up: true }] },
  { client: 'RetailX Corp', tag: 'AI Voice', title: '24/7 WhatsApp AI assistant live', desc: 'Deployed an AI WhatsApp agent handling 500+ customer queries daily with 96% resolution rate.', metrics: [{ label: 'Daily Queries Handled', v: '500+', up: true }, { label: 'Resolution Rate', v: '96%', up: true }] },
  { client: 'MedCare Hospitals', tag: 'AI Voice', title: 'AI voice booking system', desc: 'Replaced their IVR with an AI voice agent that books 200+ appointments daily without human staff.', metrics: [{ label: 'Appointments/Day', v: '200+', up: true }, { label: 'Staff Cost Reduction', v: '60%', up: true }] },
];

const testimonials = [
  { name: 'Rahul Verma', role: 'CEO, EduPrime Academy', text: 'Velfound transformed our lead pipeline completely. The AI qualification system paid for itself in 3 weeks.' },
  { name: 'Anita Joshi', role: 'COO, RetailX Corp', text: 'The WhatsApp AI agent handles more queries than our entire support team. Game-changer.' },
  { name: 'Dr. Suresh Nair', role: 'Director, MedCare Hospitals', text: 'Our phone lines used to be chaos. Now the AI handles everything. We just see the appointments in our calendar.' },
];

export default function HomePage() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a' }}>
      <WebsiteNav />

      {/* Hero */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '100px 24px 80px', textAlign: 'center' }}>
        <div className="fade-up">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 999, border: '1px solid #1e1e1e', background: '#111', marginBottom: 32 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80' }} />
            <span style={{ fontSize: 12, color: '#888' }}>Now serving clients across India & Southeast Asia</span>
          </div>
          <p className="section-tag" style={{ marginBottom: 16 }}>Build Less. Automate More.</p>
          <h1 style={{ fontSize: 'clamp(40px,6vw,80px)', fontWeight: 700, letterSpacing: '-2px', lineHeight: 1.05, color: '#f0f0f0', marginBottom: 24 }}>
            We Build Systems That<br />
            <span className="gold-text">Run Your Business</span>
          </h1>
          <p style={{ color: '#666', fontSize: 18, maxWidth: 560, margin: '0 auto 40px', lineHeight: 1.6 }}>
            AI automation, voice agents, and web solutions that eliminate manual work and drive revenue — all without hiring more people.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-gold" onClick={() => window.open('https://calendly.com', '_blank')} style={{ fontSize: 15, padding: '14px 32px' }}>
              Book a Free Call <ArrowRight size={16} />
            </button>
            <button className="btn-outline" onClick={() => window.open('https://wa.me/919876543210', '_blank')} style={{ fontSize: 15, padding: '14px 32px' }}>
              <MessageCircle size={16} /> WhatsApp Us
            </button>
          </div>
        </div>

        {/* Stats Bar */}
        <div style={{ marginTop: 72, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 1, background: '#1a1a1a', border: '1px solid #1a1a1a', borderRadius: 16, overflow: 'hidden' }}>
          {[['₹2.4Cr+', 'Revenue Generated'], ['50+', 'Projects Delivered'], ['96%', 'Client Satisfaction'], ['3x', 'Avg. ROI for Clients']].map(([v, l]) => (
            <div key={l} style={{ background: '#0e0e0e', padding: '24px 16px', textAlign: 'center' }}>
              <div className="gold-text" style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-1px' }}>{v}</div>
              <div style={{ color: '#555', fontSize: 12, marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Overview */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <p className="section-tag" style={{ marginBottom: 12 }}>What We Build</p>
          <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 700, letterSpacing: '-1px', color: '#f0f0f0' }}>Automation Systems That Work While You Sleep</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 16 }}>
          {services.map(s => (
            <div key={s.title} className="card card-hover" style={{ padding: 28 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                <s.icon size={20} color="#c9a84c" />
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: '#f0f0f0', marginBottom: 10 }}>{s.title}</h3>
              <p style={{ color: '#555', fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>{s.desc}</p>
              <Link to="/services" style={{ color: '#c9a84c', fontSize: 13, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
                Learn more <ChevronRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <p className="section-tag" style={{ marginBottom: 12 }}>The Process</p>
          <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 700, letterSpacing: '-1px', color: '#f0f0f0' }}>From Idea to Automated System in 3 Steps</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 2 }}>
          {steps.map((s, i) => (
            <div key={s.n} style={{ position: 'relative', padding: 32, background: '#0e0e0e', border: '1px solid #1a1a1a', borderRadius: i === 0 ? '12px 0 0 12px' : i === 2 ? '0 12px 12px 0' : 0 }}>
              <div style={{ fontSize: 48, fontWeight: 800, color: '#1a1a1a', letterSpacing: '-2px', marginBottom: 16 }}>{s.n}</div>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#f0f0f0', marginBottom: 10 }}>{s.title}</h3>
              <p style={{ color: '#555', fontSize: 14, lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Case Studies */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <p className="section-tag" style={{ marginBottom: 12 }}>Case Studies</p>
          <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 700, letterSpacing: '-1px', color: '#f0f0f0' }}>Real Results for Real Businesses</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 16 }}>
          {caseStudies.map(c => (
            <div key={c.client} className="card" style={{ padding: 28 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                <span style={{ fontSize: 12, color: '#888' }}>{c.client}</span>
                <span className="badge" style={{ background: 'rgba(201,168,76,0.1)', color: '#c9a84c', border: '1px solid rgba(201,168,76,0.2)' }}>{c.tag}</span>
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#f0f0f0', marginBottom: 10 }}>{c.title}</h3>
              <p style={{ color: '#555', fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>{c.desc}</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {c.metrics.map(m => (
                  <div key={m.label} style={{ background: '#0e0e0e', border: '1px solid #1a1a1a', borderRadius: 8, padding: '12px 14px' }}>
                    <div style={{ fontSize: 20, fontWeight: 700, color: '#4ade80', letterSpacing: '-0.5px' }}>{m.v}</div>
                    <div style={{ fontSize: 11, color: '#444', marginTop: 2 }}>{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <Link to="/portfolio" className="btn-outline" style={{ display: 'inline-flex' }}>View All Case Studies <ArrowRight size={14} /></Link>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <p className="section-tag" style={{ marginBottom: 12 }}>Testimonials</p>
          <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 700, letterSpacing: '-1px', color: '#f0f0f0' }}>What Our Clients Say</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 16 }}>
          {testimonials.map(t => (
            <div key={t.name} className="card" style={{ padding: 28 }}>
              <div style={{ display: 'flex', gap: 2, marginBottom: 16 }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#c9a84c" color="#c9a84c" />)}
              </div>
              <p style={{ color: '#888', fontSize: 14, lineHeight: 1.7, marginBottom: 20, fontStyle: 'italic' }}>"{t.text}"</p>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#f0f0f0' }}>{t.name}</div>
                <div style={{ fontSize: 12, color: '#555' }}>{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 24, padding: '72px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)', width: 400, height: 400, background: 'radial-gradient(circle,rgba(201,168,76,0.06) 0%,transparent 70%)', pointerEvents: 'none' }} />
          <p className="section-tag" style={{ marginBottom: 16 }}>Ready to Automate?</p>
          <h2 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 700, letterSpacing: '-1px', color: '#f0f0f0', marginBottom: 16 }}>Let's Build Your System</h2>
          <p style={{ color: '#555', fontSize: 16, maxWidth: 480, margin: '0 auto 36px', lineHeight: 1.6 }}>Book a free 30-min strategy call. We'll map your business and show you exactly what's possible with AI automation.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-gold" onClick={() => window.open('https://calendly.com', '_blank')} style={{ fontSize: 15, padding: '14px 32px' }}>
              Book a Free Call <ArrowRight size={16} />
            </button>
            <button className="btn-outline" onClick={() => window.open('https://wa.me/919876543210', '_blank')} style={{ fontSize: 15, padding: '14px 32px' }}>
              <MessageCircle size={16} /> Chat on WhatsApp
            </button>
          </div>
        </div>
      </section>

      <WebsiteFooter />
    </div>
  );
}
