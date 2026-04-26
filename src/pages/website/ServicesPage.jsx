import { Link } from 'react-router-dom';
import { Bot, Zap, Globe, BarChart3, ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react';
import WebsiteNav from '../../components/WebsiteNav';
import WebsiteFooter from '../../components/WebsiteFooter';

const services = [
  {
    icon: Bot,
    tag: 'AI & Automation',
    problem: 'Your team spends 20+ hours/week on repetitive tasks — data entry, follow-ups, reporting, scheduling.',
    solution: 'We build custom AI automation pipelines that handle all of this automatically — triggered, monitored, and self-improving.',
    outcome: 'Teams report 15–30 hours saved per week. Processes that took hours now complete in seconds.',
    features: ['Workflow automation (Zapier/Make/custom)', 'AI email & follow-up sequences', 'CRM automation & enrichment', 'Auto-reporting dashboards', 'Document processing & extraction', 'Chatbot & AI assistant deployment'],
    cta: 'Automate Your Operations',
  },
  {
    icon: Zap,
    tag: 'AI Voice Systems',
    problem: 'Inbound calls go unanswered. Appointment booking is manual. Your team spends hours on the phone for basic queries.',
    solution: 'We build AI voice agents that answer calls 24/7, qualify leads, book appointments, and handle FAQs — in natural language.',
    outcome: 'Clients see 60–80% reduction in inbound call handling time and 200+ automated bookings per day.',
    features: ['Inbound AI voice agents (24/7)', 'Appointment booking & confirmation', 'Lead qualification calls', 'Multi-language support (Hindi, English)', 'CRM integration & call logging', 'WhatsApp AI chatbot deployment'],
    cta: 'Deploy Your Voice Agent',
  },
  {
    icon: Globe,
    tag: 'Web Solutions',
    problem: 'Your website looks outdated, loads slowly, and fails to convert visitors into leads. You're losing business every day.',
    solution: 'We build conversion-focused web platforms — landing pages, full websites, SaaS products, and internal tools.',
    outcome: 'Average 3–5x improvement in lead conversion rate. Pages that load in under 1.5 seconds.',
    features: ['Conversion-optimised landing pages', 'Full business websites', 'SaaS & web app development', 'Internal tools & dashboards', 'SEO-first architecture', 'Analytics & tracking setup'],
    cta: 'Build Your Web Platform',
  },
  {
    icon: BarChart3,
    tag: 'Audit & Strategy',
    problem: 'You know you need automation but don't know where to start. Your tech stack is a mess and ROI is unclear.',
    solution: 'We do a deep-dive audit of your entire business operations and deliver a prioritised automation roadmap.',
    outcome: 'Clear 90-day plan with ROI projections for each initiative. Know exactly what to build and in what order.',
    features: ['Operations workflow mapping', 'Tech stack audit & recommendations', 'Automation opportunity ranking', 'ROI projections per initiative', '90-day roadmap delivery', 'Monthly advisory calls'],
    cta: 'Get Your Audit',
  },
];

export default function ServicesPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a' }}>
      <WebsiteNav />

      {/* Header */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px 60px', textAlign: 'center' }}>
        <p className="section-tag" style={{ marginBottom: 16 }}>Our Services</p>
        <h1 style={{ fontSize: 'clamp(36px,5vw,64px)', fontWeight: 700, letterSpacing: '-2px', color: '#f0f0f0', marginBottom: 20 }}>
          Every System We Build Is<br /><span className="gold-text">Built to Scale</span>
        </h1>
        <p style={{ color: '#555', fontSize: 18, maxWidth: 520, margin: '0 auto' }}>
          We don't sell templates. We build custom AI systems, voice agents, and web solutions engineered for your specific business.
        </p>
      </section>

      {/* Services */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 80px' }}>
        {services.map((s, i) => (
          <div key={s.tag} className="card" style={{ padding: '48px 40px', marginBottom: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>
              {/* Left */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <s.icon size={22} color="#c9a84c" />
                  </div>
                  <span className="section-tag">{s.tag}</span>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#f03a3a', marginBottom: 8 }}>THE PROBLEM</div>
                  <p style={{ color: '#777', fontSize: 14, lineHeight: 1.7 }}>{s.problem}</p>
                </div>
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#c9a84c', marginBottom: 8 }}>OUR SOLUTION</div>
                  <p style={{ color: '#888', fontSize: 14, lineHeight: 1.7 }}>{s.solution}</p>
                </div>
                <div style={{ marginBottom: 28 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#4ade80', marginBottom: 8 }}>THE OUTCOME</div>
                  <p style={{ color: '#888', fontSize: 14, lineHeight: 1.7 }}>{s.outcome}</p>
                </div>

                <Link to="/contact">
                  <button className="btn-gold">{s.cta} <ArrowRight size={14} /></button>
                </Link>
              </div>

              {/* Right — Features */}
              <div style={{ background: '#0e0e0e', border: '1px solid #1a1a1a', borderRadius: 12, padding: 28 }}>
                <p style={{ color: '#555', fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 20 }}>What's Included</p>
                {s.features.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                    <CheckCircle2 size={15} color="#c9a84c" />
                    <span style={{ color: '#888', fontSize: 14 }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 80px', textAlign: 'center' }}>
        <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 20, padding: 56 }}>
          <h2 style={{ fontSize: 36, fontWeight: 700, color: '#f0f0f0', letterSpacing: '-1px', marginBottom: 12 }}>Not Sure What You Need?</h2>
          <p style={{ color: '#555', fontSize: 16, marginBottom: 32 }}>Book a free strategy call and we'll tell you exactly what to build and why.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-gold" onClick={() => window.open('https://calendly.com', '_blank')}>Book Free Strategy Call <ArrowRight size={14} /></button>
            <button className="btn-outline" onClick={() => window.open('https://wa.me/919876543210', '_blank')}><MessageCircle size={14} /> WhatsApp Us</button>
          </div>
        </div>
      </section>

      <WebsiteFooter />
    </div>
  );
}
