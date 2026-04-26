import { Link } from 'react-router-dom';
import { Zap, Twitter, Linkedin, Instagram, MessageCircle } from 'lucide-react';

export default function WebsiteFooter() {
  return (
    <footer style={{ borderTop: '1px solid #1a1a1a', background: '#080808', padding: '60px 24px 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 48, marginBottom: 48 }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <div style={{ width: 32, height: 32, background: 'linear-gradient(135deg,#c9a84c,#e4c677)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Zap size={16} color="#0a0a0a" fill="#0a0a0a" />
              </div>
              <span style={{ fontWeight: 700, fontSize: 18, color: '#f0f0f0' }}>Velfound</span>
            </div>
            <p style={{ color: '#555', fontSize: 13, lineHeight: 1.6, marginBottom: 20 }}>Build Less. Automate More.<br />We build systems that run your business.</p>
            <div style={{ display: 'flex', gap: 12 }}>
              {[Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a key={i} href="#" style={{ width: 36, height: 36, borderRadius: 8, border: '1px solid #1e1e1e', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555', transition: 'all 0.15s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#c9a84c'; e.currentTarget.style.color = '#c9a84c'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#1e1e1e'; e.currentTarget.style.color = '#555'; }}>
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <p style={{ color: '#f0f0f0', fontSize: 13, fontWeight: 600, marginBottom: 16 }}>Services</p>
            {['AI & Automation', 'AI Voice Systems', 'Web Solutions', 'Audit & Strategy'].map(s => (
              <Link key={s} to="/services" style={{ display: 'block', color: '#555', fontSize: 13, marginBottom: 10, textDecoration: 'none' }}
                onMouseEnter={e => e.currentTarget.style.color = '#c9a84c'}
                onMouseLeave={e => e.currentTarget.style.color = '#555'}>{s}</Link>
            ))}
          </div>

          {/* Company */}
          <div>
            <p style={{ color: '#f0f0f0', fontSize: 13, fontWeight: 600, marginBottom: 16 }}>Company</p>
            {[['About', '/about'], ['Portfolio', '/portfolio'], ['Blog', '/blog'], ['Pricing', '/pricing'], ['Contact', '/contact']].map(([l, h]) => (
              <Link key={l} to={h} style={{ display: 'block', color: '#555', fontSize: 13, marginBottom: 10, textDecoration: 'none' }}
                onMouseEnter={e => e.currentTarget.style.color = '#c9a84c'}
                onMouseLeave={e => e.currentTarget.style.color = '#555'}>{l}</Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <p style={{ color: '#f0f0f0', fontSize: 13, fontWeight: 600, marginBottom: 16 }}>Get in Touch</p>
            <a href="mailto:hello@velfound.com" style={{ display: 'block', color: '#555', fontSize: 13, marginBottom: 10, textDecoration: 'none' }}>hello@velfound.com</a>
            <button onClick={() => window.open('https://wa.me/919876543210', '_blank')} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#4ade80', fontSize: 13, background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginBottom: 10 }}>
              <MessageCircle size={14} /> WhatsApp Us
            </button>
            <p style={{ color: '#444', fontSize: 12 }}>Response within 2 hours</p>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #111', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ color: '#333', fontSize: 12 }}>© 2025 Velfound. All rights reserved.</p>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Privacy Policy', 'Terms of Service'].map(t => (
              <a key={t} href="#" style={{ color: '#333', fontSize: 12, textDecoration: 'none' }}>{t}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
