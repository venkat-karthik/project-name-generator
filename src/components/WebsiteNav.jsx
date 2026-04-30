import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap } from 'lucide-react';
import BookingModal from './BookingModal';

const links = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/solutions', label: 'Solutions' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/blog', label: 'Blog' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function WebsiteNav() {
  const [open, setOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <nav style={{ borderBottom: '1px solid #1a1a1a', background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 40 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(12px, 3vw, 24px)', height: 'auto', minHeight: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <svg width="32" height="32" viewBox="0 0 100 100">
            <polygon points="20,30 45,30 60,55 45,55" fill="#3b82f6" />
            <polygon points="55,25 85,25 70,50 55,50" fill="#60a5fa" />
            <polygon points="45,55 70,55 85,85 60,85" fill="#3b82f6" />
            <polygon points="30,60 55,60 40,85 15,85" fill="#60a5fa" />
          </svg>
          <span style={{ fontWeight: 700, fontSize: 'clamp(14px, 3vw, 18px)', letterSpacing: '-0.5px', color: '#f0f0f0' }}>Velfound</span>
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
          <button id="nav-cta-desktop" className="btn-gold" style={{ fontSize: 13, padding: '8px 20px' }} onClick={() => setBookingOpen(true)}>Book a Call</button>
          <button data-mobile-menu-btn onClick={() => setOpen(!open)} style={{ background: 'none', border: 'none', color: '#777', cursor: 'pointer', display: 'flex' }}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        
      </div>

      {/* Mobile Menu */}
      {open && (
        <div style={{ borderTop: '1px solid #1a1a1a', padding: '16px clamp(12px, 3vw, 24px)', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {links.map(l => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} style={{
              padding: '10px 12px', borderRadius: 8, fontSize: 14, fontWeight: 500, textDecoration: 'none',
              color: pathname === l.to ? '#3b82f6' : '#888',
              background: pathname === l.to ? '#1a1a1a' : 'transparent',
            }}>
              {l.label}
            </Link>
          ))}
          <button onClick={() => { setBookingOpen(true); setOpen(false); }} style={{
            padding: '10px 12px', borderRadius: 8, fontSize: 14, fontWeight: 500,
            background: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 600,
            marginTop: '8px',
          }}>
            Book a Call
          </button>
        </div>
      )}

      {/* Booking Modal */}
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </nav>
  );
}
