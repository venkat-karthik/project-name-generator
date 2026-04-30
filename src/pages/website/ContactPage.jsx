import { useState } from 'react';
import { MessageCircle, Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import WebsiteNav from '../../components/WebsiteNav';
import WebsiteFooter from '../../components/WebsiteFooter';
import Aurora from '../../components/Aurora';
import { contactService } from '../../services/contactService';

const OFFICIAL_EMAIL = 'velfound1@gmail.com';
const AURORA_COLORS = ['#7cff67', '#B497CF', '#5227FF'];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await contactService.submitContactForm({
        name: form.name,
        email: form.email,
        phone: form.phone,
        service: form.service,
        message: form.message,
      });
      setSent(true);
      setForm({ name: '', email: '', phone: '', service: '', message: '' });
      setTimeout(() => setSent(false), 3000);
    } catch (err) {
      setError('Failed to send message. Please try again.');
      console.error('Contact form error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '400px', zIndex: 0 }}>
        <Aurora colorStops={AURORA_COLORS} amplitude={0.8} blend={0.4} speed={0.8} />
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <WebsiteNav />

      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px 60px', textAlign: 'center' }}>
        <p className="section-tag" style={{ marginBottom: 16 }}>Contact Us</p>
        <h1 style={{ fontSize: 'clamp(36px,5vw,64px)', fontWeight: 700, letterSpacing: '-2px', color: '#f0f0f0', marginBottom: 20 }}>
          Let's Build Something<br /><span className="gold-text" style={{ background: 'linear-gradient(135deg, #7cff67, #B497CF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Remarkable Together</span>
        </h1>
        <p style={{ color: '#555', fontSize: 18, maxWidth: 520, margin: '0 auto' }}>Tell us about your project. We'll respond within 2 hours.</p>
      </section>

      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 32, alignItems: 'start' }}>
          {/* Contact Info */}
          <div>
            <div className="card" style={{ padding: 32, marginBottom: 16 }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: '#f0f0f0', marginBottom: 20 }}>Get In Touch</h3>

              <a href="mailto:velfound1@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20, textDecoration: 'none' }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: '#1a1a1a', border: '1px solid #222', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Mail size={16} color="#3b82f6" />
                </div>
                <div>
                  <div style={{ fontSize: 11, color: '#444', marginBottom: 2 }}>Email</div>
                  <div style={{ fontSize: 14, color: '#f0f0f0' }}>velfound1@gmail.com</div>
                </div>
              </a>

              <button onClick={() => window.open('https://wa.me/918309827125', '_blank')} style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20, background: 'none', border: 'none', cursor: 'pointer', padding: 0, width: '100%' }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MessageCircle size={16} color="#4ade80" />
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: 11, color: '#444', marginBottom: 2 }}>WhatsApp</div>
                  <div style={{ fontSize: 14, color: '#f0f0f0' }}>+91 83098 27125</div>
                </div>
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: '#1a1a1a', border: '1px solid #222', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MapPin size={16} color="#3b82f6" />
                </div>
                <div>
                  <div style={{ fontSize: 11, color: '#444', marginBottom: 2 }}>Location</div>
                  <div style={{ fontSize: 14, color: '#f0f0f0' }}>Bangalore, India (Remote-first)</div>
                </div>
              </div>
            </div>

            <div className="card" style={{ padding: 24 }}>
              <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80', marginTop: 4, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#f0f0f0', marginBottom: 2 }}>Response in 2 hours</div>
                  <div style={{ fontSize: 12, color: '#555' }}>Mon–Sat, 9AM–8PM IST</div>
                </div>
              </div>
              <button className="btn-gold" onClick={() => window.open('https://calendly.com', '_blank')} style={{ width: '100%', justifyContent: 'center', fontSize: 13 }}>Book a 30-min Strategy Call</button>
            </div>
          </div>

          {/* Form */}
          <div className="card" style={{ padding: 36 }}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <CheckCircle2 size={48} color="#4ade80" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: 20, fontWeight: 700, color: '#f0f0f0', marginBottom: 8 }}>Message Sent!</h3>
                <p style={{ color: '#555', fontSize: 14 }}>We'll get back to you within 2 hours.</p>
                <button className="btn-outline" onClick={() => setSent(false)} style={{ marginTop: 24 }}>Send Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: '#f0f0f0', marginBottom: 24 }}>Tell Us About Your Project</h3>
                {error && (
                  <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', padding: '12px', marginBottom: '16px', color: '#ef4444', fontSize: '13px' }}>
                    {error}
                  </div>
                )}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                  <div>
                    <label className="label">Full Name *</label>
                    <input className="input" placeholder="Rahul Sharma" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required disabled={loading} />
                  </div>
                  <div>
                    <label className="label">Email *</label>
                    <input className="input" type="email" placeholder="rahul@company.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required disabled={loading} />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                  <div>
                    <label className="label">Phone</label>
                    <input className="input" placeholder="+91 98765 43210" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} disabled={loading} />
                  </div>
                  <div>
                    <label className="label">Service Interested In</label>
                    <select className="input" value={form.service} onChange={e => setForm({...form, service: e.target.value})} disabled={loading}>
                      <option value="">Select a service</option>
                      <option>AI & Automation</option>
                      <option>AI Voice Systems</option>
                      <option>Web Solutions</option>
                      <option>Audit & Strategy</option>
                    </select>
                  </div>
                </div>
                <div style={{ marginBottom: 24 }}>
                  <label className="label">Tell us about your project *</label>
                  <textarea className="input" placeholder="Describe what you're trying to automate or build. The more detail, the better..." value={form.message} onChange={e => setForm({...form, message: e.target.value})} required disabled={loading} style={{ minHeight: 120 }} />
                </div>
                <button type="submit" className="btn-gold" style={{ width: '100%', justifyContent: 'center', fontSize: 15, padding: '14px', opacity: loading ? 0.6 : 1 }} disabled={loading}>
                  <Send size={15} /> {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Admin Access Section */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 24px', textAlign: 'center', borderTop: '1px solid #1a1a1a' }}>
        <p style={{ color: '#666', fontSize: 13, marginBottom: 16 }}>Team member?</p>
        <a href="/admin/login" style={{
          display: 'inline-block',
          padding: '10px 24px',
          background: '#1a1a1a',
          border: '1px solid #2a2a2a',
          borderRadius: '8px',
          color: '#3b82f6',
          textDecoration: 'none',
          fontSize: '13px',
          fontWeight: 600,
          transition: 'all 0.2s',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#3b82f6';
          e.currentTarget.style.background = 'rgba(59,130,246,0.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = '#2a2a2a';
          e.currentTarget.style.background = '#1a1a1a';
        }}>
          Admin Login
        </a>
      </section>

      <WebsiteFooter />
      </div>
    </div>
  );
}
