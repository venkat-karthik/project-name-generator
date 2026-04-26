import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap } from 'lucide-react';

const links = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/blog', label: 'Blog' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function WebsiteNav() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <nav style={{ borderBottom: '1px solid #1a1a1a', background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 40 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <div style={{ width: 32, height: 32, background: 'linear-gradient(135deg,#c9a84c,#e4c677)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Zap size={16} color="#0a0a0a" fill="#0a0a0a" />
          </div>
          <span style={{ fontWeight: 700, fontSize: 18, letterSpacing: '-0.5px', color: '#f0f0f0' }}>Velfound</span>
        </Link>

        {/* Desktop Links */}
        <div style={{ display: 'flex', gap: 4 }} className="hidden md:flex">
          {links.map(l => (
            <Link key={l.to} to={l.to} style={{
              padding: '6px 14px', borderRadius: 8, fontSize: 13, fontWeight: 500, textDecoration: 'none',
              color: pathname === l.to ? '#f0f0f0' : '#777',
              background: pathname === l.to ? '#1a1a1a' : 'transparent',
              transition: 'all 0.15s',
            }}>
              {l.label}
            </Link>
          ))}
        </div>

        {/* CTA + Mobile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link to="/contact" className="btn-gold" style={{ fontSize: 13, padding: '8px 20px', display: 'none' }} id="nav-cta">Book a Call</Link>
          <button className="btn-gold" style={{ fontSize: 13, padding: '8px 20px' }} onClick={() => window.open('https://calendly.com', '_blank')}>Book a Call</button>
          <button onClick={() => setOpen(!open)} style={{ background: 'none', border: 'none', color: '#777', cursor: 'pointer', display: 'flex' }}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div style={{ borderTop: '1px solid #1a1a1a', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {links.map(l => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} style={{
              padding: '10px 12px', borderRadius: 8, fontSize: 14, fontWeight: 500, textDecoration: 'none',
              color: pathname === l.to ? '#c9a84c' : '#888',
              background: pathname === l.to ? '#1a1a1a' : 'transparent',
            }}>
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
