import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
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
    <nav className="navbar-glass" style={{
      position: 'sticky',
      top: 0,
      zIndex: 40,
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      background: 'rgba(10, 10, 10, 0.7)',
      backdropFilter: 'blur(16px)',
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: 'clamp(12px, 3vw, 24px)',
        height: 'auto',
        minHeight: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
      }}>
        {/* Logo */}
        <Link to="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          textDecoration: 'none',
          transition: 'all 0.3s ease',
        }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
          <svg width="36" height="36" viewBox="0 0 100 100">
            <polygon points="20,30 45,30 60,55 45,55" fill="#3b82f6" />
            <polygon points="55,25 85,25 70,50 55,50" fill="#60a5fa" />
            <polygon points="45,55 70,55 85,85 60,85" fill="#3b82f6" />
            <polygon points="30,60 55,60 40,85 15,85" fill="#60a5fa" />
          </svg>
          <span style={{
            fontWeight: 700,
            fontSize: 'clamp(16px, 3vw, 20px)',
            letterSpacing: '-0.5px',
            color: '#f0f0f0',
            background: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Velfound
          </span>
        </Link>

        {/* Desktop Links */}
        <div style={{
          display: 'flex',
          gap: 8,
          alignItems: 'center',
        }} className="hidden md:flex">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className="nav-link-premium"
              style={{
                padding: '8px 16px',
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 500,
                textDecoration: 'none',
                color: pathname === l.to ? '#3b82f6' : '#888',
                background: pathname === l.to ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                border: pathname === l.to ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid transparent',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                if (pathname !== l.to) {
                  e.currentTarget.style.background = 'rgba(59, 130, 246, 0.08)';
                  e.currentTarget.style.color = '#3b82f6';
                  e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.2)';
                }
              }}
              onMouseLeave={(e) => {
                if (pathname !== l.to) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#888';
                  e.currentTarget.style.borderColor = 'transparent';
                }
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* CTA + Mobile */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}>
          <button
            id="nav-cta-desktop"
            className="btn-gold nav-cta-glow"
            style={{
              fontSize: 13,
              padding: '10px 24px',
              fontWeight: 600,
              transition: 'all 0.3s ease',
            }}
            onClick={() => setBookingOpen(true)}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 0 30px rgba(59, 130, 246, 0.4)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(59,130,246,0.35)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Book a Call
          </button>
          <button
            data-mobile-menu-btn
            onClick={() => setOpen(!open)}
            style={{
              background: 'none',
              border: 'none',
              color: '#888',
              cursor: 'pointer',
              display: 'flex',
              padding: '8px',
              borderRadius: 8,
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
              e.currentTarget.style.color = '#3b82f6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'none';
              e.currentTarget.style.color = '#888';
            }}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '16px clamp(12px, 3vw, 24px)',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          background: 'rgba(10, 10, 10, 0.5)',
          backdropFilter: 'blur(8px)',
          animation: 'slideDown 0.3s ease-out',
        }}>
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              style={{
                padding: '12px 16px',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 500,
                textDecoration: 'none',
                color: pathname === l.to ? '#3b82f6' : '#888',
                background: pathname === l.to ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                border: pathname === l.to ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid transparent',
                transition: 'all 0.2s ease',
              }}
            >
              {l.label}
            </Link>
          ))}
          <button
            onClick={() => {
              setBookingOpen(true);
              setOpen(false);
            }}
            style={{
              padding: '12px 16px',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              background: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              marginTop: '8px',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(59, 130, 246, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Book a Call
          </button>
        </div>
      )}

      {/* Booking Modal */}
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </nav>
  );
}
