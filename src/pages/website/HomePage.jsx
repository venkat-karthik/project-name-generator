import { useState } from 'react';
import { ArrowRight, MessageCircle, Star } from 'lucide-react';
import { useStore } from '../../store/useStore';
import WebsiteNav from '../../components/WebsiteNav';
import WebsiteFooter from '../../components/WebsiteFooter';
import BookingModal from '../../components/BookingModal';
import PreviousProjects from '../../components/PreviousProjects';
import Aurora from '../../components/Aurora';

const testimonials = [
  {
    name: 'Rahul Verma',
    role: 'CEO, EduPrime Academy',
    text: 'Velfound transformed our lead pipeline completely. The AI qualification system paid for itself in 3 weeks.',
  },
  {
    name: 'Anita Joshi',
    role: 'COO, RetailX Corp',
    text: 'The WhatsApp AI agent handles more queries than our entire support team. Game-changer.',
  },
  {
    name: 'Dr. Suresh Nair',
    role: 'Director, MedCare Hospitals',
    text: 'Our phone lines used to be chaos. Now the AI handles everything. We just see the appointments in our calendar.',
  },
];

export default function HomePage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const { getPublishedProjects } = useStore();
  const publishedProjects = getPublishedProjects();

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, overflow: 'hidden' }}>
        <Aurora colorStops={['#7cff67', '#B497CF', '#5227FF']} blend={0.5} amplitude={1.0} speed={0.8} />
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <WebsiteNav />

        {/* Hero Section - Minimal & Clean */}
        <section className="aurora-bg-wrapper" style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: 'clamp(60px, 10vw, 100px) clamp(16px, 5vw, 24px) clamp(50px, 8vw, 80px)',
          textAlign: 'center',
          position: 'relative',
          minHeight: '500px',
        }}>
          <div className="fade-up">
            {/* Status Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: 'clamp(8px, 2vw, 12px) clamp(12px, 3vw, 20px)',
              borderRadius: 999,
              border: '1px solid rgba(124, 255, 103, 0.3)',
              background: 'rgba(124, 255, 103, 0.1)',
              marginBottom: 'clamp(20px, 5vw, 32px)',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}>
              <div style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#4ade80',
                animation: 'pulse 2s ease-in-out infinite',
              }} />
              <span style={{ fontSize: 'clamp(11px, 2vw, 12px)', color: '#888' }}>
                Now serving clients across India & Southeast Asia
              </span>
            </div>

            {/* Main Heading */}
            <h1 style={{
              fontSize: 'clamp(32px, 7vw, 80px)',
              fontWeight: 700,
              letterSpacing: '-2px',
              lineHeight: 1.05,
              color: '#f0f0f0',
              marginBottom: 24,
            }}>
              Student-Built AI
              <br />
              <span className="gold-text">For Real Business Impact</span>
            </h1>

            {/* Subheading */}
            <p style={{
              color: '#888',
              fontSize: 'clamp(14px, 3vw, 18px)',
              maxWidth: 560,
              margin: '0 auto 40px',
              lineHeight: 1.6,
            }}>
              A group of friends building custom AI automation systems. We learn, we build, we deliver results. No corporate BS, just real solutions for real businesses.
            </p>

            {/* CTA Buttons */}
            <div style={{
              display: 'flex',
              gap: 12,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}>
              <button
                className="btn-gold"
                onClick={() => setBookingOpen(true)}
                style={{
                  fontSize: 'clamp(12px, 2vw, 15px)',
                  padding: 'clamp(10px, 2vw, 14px) clamp(16px, 3vw, 32px)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                Book a Free Call
                <ArrowRight size={16} />
              </button>
              <button
                className="btn-outline"
                onClick={() => window.open('https://wa.me/918309827125', '_blank')}
                style={{
                  fontSize: 'clamp(12px, 2vw, 15px)',
                  padding: 'clamp(10px, 2vw, 14px) clamp(16px, 3vw, 32px)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <MessageCircle size={16} />
                WhatsApp Us
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div style={{
            marginTop: 'clamp(40px, 8vw, 72px)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(100px, 20vw, 160px), 1fr))',
            gap: 1,
            background: '#111',
            border: '1px solid #1a1a1a',
            borderRadius: 16,
            overflow: 'hidden',
          }}>
            {[
              ['₹2.4Cr+', 'Revenue Generated'],
              ['50+', 'Projects Delivered'],
              ['96%', 'Client Satisfaction'],
              ['3x', 'Avg. ROI for Clients'],
            ].map(([v, l]) => (
              <div
                key={l}
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  padding: 'clamp(16px, 3vw, 24px)',
                  textAlign: 'center',
                  borderRight: '1px solid rgba(255, 255, 255, 0.05)',
                }}
              >
                <div className="gold-text" style={{
                  fontSize: 'clamp(20px, 4vw, 28px)',
                  fontWeight: 700,
                  letterSpacing: '-1px',
                }}>
                  {v}
                </div>
                <div style={{
                  color: '#666',
                  fontSize: 'clamp(10px, 2vw, 12px)',
                  marginTop: 4,
                }}>
                  {l}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Reviews Section */}
        <section style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: 'clamp(60px, 10vw, 80px) clamp(16px, 5vw, 24px)',
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: 'clamp(40px, 8vw, 56px)',
          }}>
            <p className="section-tag fade-up" style={{ marginBottom: 12 }}>
              Client Reviews
            </p>
            <h2 className="fade-up" style={{
              fontSize: 'clamp(24px, 5vw, 44px)',
              fontWeight: 700,
              letterSpacing: '-1px',
              color: '#f0f0f0',
              animationDelay: '0.1s',
            }}>
              What Our Clients Say
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(240px, 45vw, 320px), 1fr))',
            gap: 20,
          }}>
            {testimonials.map((t, idx) => (
              <div
                key={t.name}
                className="scale-in"
                style={{
                  animationDelay: `${idx * 0.05}s`,
                  background: '#111',
                  border: '1px solid #1a1a1a',
                  borderRadius: 16,
                  padding: 'clamp(16px, 4vw, 28px)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#1a1a1a';
                  e.currentTarget.style.borderColor = '#2a2a2a';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#111';
                  e.currentTarget.style.borderColor = '#1a1a1a';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Stars */}
                <div style={{ display: 'flex', gap: 2, marginBottom: 16 }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="#7cff67" color="#7cff67" />
                  ))}
                </div>

                {/* Quote */}
                <p style={{
                  color: '#888',
                  fontSize: 'clamp(12px, 2vw, 14px)',
                  lineHeight: 1.7,
                  marginBottom: 20,
                  fontStyle: 'italic',
                }}>
                  "{t.text}"
                </p>

                {/* Author */}
                <div>
                  <div style={{
                    fontSize: 'clamp(12px, 2vw, 14px)',
                    fontWeight: 600,
                    color: '#f0f0f0',
                  }}>
                    {t.name}
                  </div>
                  <div style={{
                    fontSize: 'clamp(10px, 2vw, 12px)',
                    color: '#666',
                  }}>
                    {t.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Previous Projects Section */}
        <PreviousProjects projects={publishedProjects} />

        {/* Final CTA Section */}
        <section style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: 'clamp(40px, 8vw, 80px) clamp(16px, 5vw, 24px)',
        }}>
          <div style={{
            background: '#111',
            border: '1px solid #1a1a1a',
            borderRadius: 24,
            padding: 'clamp(32px, 8vw, 72px) clamp(16px, 5vw, 40px)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute',
              top: -100,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 400,
              height: 400,
              background: 'radial-gradient(circle, rgba(201, 168, 76, 0.06) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />

            <p className="section-tag" style={{ marginBottom: 16 }}>
              Ready to Automate?
            </p>
            <h2 style={{
              fontSize: 'clamp(24px, 5vw, 48px)',
              fontWeight: 700,
              letterSpacing: '-1px',
              color: '#f0f0f0',
              marginBottom: 16,
            }}>
              Let's Build Your System
            </h2>
            <p style={{
              color: '#888',
              fontSize: 'clamp(14px, 3vw, 16px)',
              maxWidth: 480,
              margin: '0 auto 36px',
              lineHeight: 1.6,
            }}>
              Book a free 30-min strategy call. We'll map your business and show you exactly what's possible with AI automation.
            </p>

            <div style={{
              display: 'flex',
              gap: 12,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}>
              <button
                className="btn-gold"
                onClick={() => setBookingOpen(true)}
                style={{
                  fontSize: 'clamp(12px, 2vw, 15px)',
                  padding: 'clamp(10px, 2vw, 14px) clamp(16px, 3vw, 32px)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                Book a Free Call
                <ArrowRight size={16} />
              </button>
              <button
                className="btn-outline"
                onClick={() => window.open('https://wa.me/918309827125', '_blank')}
                style={{
                  fontSize: 'clamp(12px, 2vw, 15px)',
                  padding: 'clamp(10px, 2vw, 14px) clamp(16px, 3vw, 32px)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <MessageCircle size={16} />
                Chat on WhatsApp
              </button>
            </div>
          </div>
        </section>

        <WebsiteFooter />
        <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
      </div>
    </div>
  );
}
