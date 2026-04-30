import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Clock, MessageCircle } from 'lucide-react';
import WebsiteNav from '../../components/WebsiteNav';
import WebsiteFooter from '../../components/WebsiteFooter';

const projects = [
  {
    client: 'EduPrime Academy',
    tag: 'AI + Web', tagColor: '#c9a84c',
    title: 'AI-Powered LMS & Lead Qualification',
    challenge: 'EduPrime was losing 70% of website visitors without capturing leads. Their enrollment process was entirely manual.',
    solution: 'Built a full LMS platform with AI chatbot, automated lead scoring, and WhatsApp follow-up sequences.',
    results: [{ label: 'Conversion Rate', before: '4%', after: '17.6%' }, { label: 'Manual Hours/Week', before: '40hrs', after: '3hrs' }, { label: 'Monthly Enrollments', before: '28', after: '124' }],
    timeline: '6 weeks',
    value: '₹95,000',
  },
  {
    client: 'RetailX Corp',
    tag: 'AI Voice', tagColor: '#60a5fa',
    title: '24/7 WhatsApp AI Support Agent',
    challenge: `RetailX's support team was overwhelmed with 500+ daily WhatsApp queries, causing 4-hour response delays.`,
    solution: 'Deployed a custom AI agent on WhatsApp that handles product queries, order status, returns, and complaints autonomously.',
    results: [{ label: 'Response Time', before: '4 hours', after: '< 30 sec' }, { label: 'Resolution Rate', before: '71%', after: '96%' }, { label: 'Support Staff Required', before: '8', after: '2' }],
    timeline: '3 weeks',
    value: '₹1,20,000',
  },
  {
    client: 'MedCare Hospitals',
    tag: 'AI Voice', tagColor: '#60a5fa',
    title: 'AI Voice Appointment Booking System',
    challenge: 'Phone lines jammed daily. Staff spent 6+ hours/day manually booking appointments via calls.',
    solution: 'AI voice agent answers all inbound calls, collects patient info, checks doctor availability, and books appointments in real-time.',
    results: [{ label: 'Appointments/Day', before: '85', after: '210+' }, { label: 'Staff Call Time', before: '6hrs/day', after: '0.5hrs/day' }, { label: 'Patient Satisfaction', before: '3.4/5', after: '4.8/5' }],
    timeline: '4 weeks',
    value: '₹1,50,000',
  },
  {
    client: 'FinServe Ltd',
    tag: 'Web + Automation', tagColor: '#a78bfa',
    title: 'Financial Services Platform Rebuild',
    challenge: 'Outdated website with 8-second load time and 1.2% conversion rate was costing them thousands in lost leads monthly.',
    solution: 'Complete redesign with performance-first architecture, automated lead capture, and CRM integration.',
    results: [{ label: 'Page Load Time', before: '8.2s', after: '1.1s' }, { label: 'Lead Conversion', before: '1.2%', after: '5.8%' }, { label: 'Monthly Leads', before: '12', after: '67' }],
    timeline: '5 weeks',
    value: '₹2,00,000',
  },
];

export default function PortfolioPage() {
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
        {projects.map((p, i) => (
          <div key={p.client} className="card" style={{ padding: '40px', marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 24 }}>
              <div>
                <span className="badge" style={{ background: `${p.tagColor}15`, color: p.tagColor, border: `1px solid ${p.tagColor}30`, marginBottom: 12 }}>{p.tag}</span>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f0f0f0', letterSpacing: '-0.5px' }}>{p.title}</h2>
                <p style={{ color: '#555', fontSize: 13, marginTop: 4 }}>{p.client}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ display: 'flex', gap: 16 }}>
                  <div style={{ background: '#0e0e0e', border: '1px solid #1a1a1a', borderRadius: 8, padding: '10px 16px', textAlign: 'center' }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#c9a84c' }}>{p.value}</div>
                    <div style={{ fontSize: 11, color: '#444' }}>Project Value</div>
                  </div>
                  <div style={{ background: '#0e0e0e', border: '1px solid #1a1a1a', borderRadius: 8, padding: '10px 16px', textAlign: 'center' }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#f0f0f0' }}>{p.timeline}</div>
                    <div style={{ fontSize: 11, color: '#444' }}>Delivered In</div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 28 }}>
              <div>
                <div style={{ fontSize: 11, color: '#f03a3a', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>THE CHALLENGE</div>
                <p style={{ color: '#666', fontSize: 14, lineHeight: 1.7 }}>{p.challenge}</p>
              </div>
              <div>
                <div style={{ fontSize: 11, color: '#c9a84c', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>THE SOLUTION</div>
                <p style={{ color: '#666', fontSize: 14, lineHeight: 1.7 }}>{p.solution}</p>
              </div>
            </div>

            {/* Results */}
            <div>
              <div style={{ fontSize: 11, color: '#4ade80', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>BEFORE vs AFTER</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 12 }}>
                {p.results.map(r => (
                  <div key={r.label} style={{ background: '#0e0e0e', border: '1px solid #1a1a1a', borderRadius: 10, padding: 16 }}>
                    <div style={{ fontSize: 12, color: '#555', marginBottom: 10 }}>{r.label}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div>
                        <div style={{ fontSize: 11, color: '#444' }}>Before</div>
                        <div style={{ fontSize: 16, fontWeight: 600, color: '#666' }}>{r.before}</div>
                      </div>
                      <ArrowRight size={14} color="#333" />
                      <div>
                        <div style={{ fontSize: 11, color: '#4ade80' }}>After</div>
                        <div style={{ fontSize: 16, fontWeight: 600, color: '#4ade80' }}>{r.after}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>

      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 80px', textAlign: 'center' }}>
        <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 20, padding: 56 }}>
          <h2 style={{ fontSize: 36, fontWeight: 700, color: '#f0f0f0', letterSpacing: '-1px', marginBottom: 12 }}>Ready to Be Our Next Case Study?</h2>
          <p style={{ color: '#555', fontSize: 16, marginBottom: 32 }}>Let's map your automation opportunities and build something remarkable.</p>
          <button className="btn-gold" onClick={() => window.open('https://calendly.com', '_blank')} style={{ fontSize: 15, padding: '14px 32px' }}>Book a Free Strategy Call <ArrowRight size={16} /></button>
        </div>
      </section>

      <WebsiteFooter />
    </div>
  );
}
