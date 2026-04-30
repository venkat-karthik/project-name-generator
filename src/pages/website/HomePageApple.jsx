import { useState } from 'react';
import { ArrowRight, MessageCircle, Star, Zap } from 'lucide-react';
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

export default function HomePageApple() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const { getPublishedProjects } = useStore();
  const publishedProjects = getPublishedProjects();

  return (
    <div style={{ minHeight: '100vh', background: '#ffffff', position: 'relative', overflow: 'hidden' }}>
      {/* Subtle gradient background */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, #ffffff 0%, #f5f5f7 100%)',
        zIndex: 0,
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <WebsiteNav />

        {/* Hero Section - Apple Style */}
        <section style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: 'clamp(60px, 15vw, 120px) clamp(16px, 5vw, 24px)',
          textAlign: 'center',
          position: 'relative',
        }}>
          <div style={{ marginBottom: 'clamp(20px, 5vw, 40px)' }}>
            <h1 style={{
              fontSize: 'clamp(36px, 8vw, 72px)',
              fontWeight: 700,
              lineHeight: 1.1,
              color: '#000000',
              letterSpacing: '-1px',
              marginBottom: 24,
            }}>
              AI Automation
              <br />
              <span style={{ color: '#555555' }}>Built for Real Business</span>
            </h1>
          </div>

          <p style={{
            fontSize: 'clamp(16px, 3vw, 21px)',
            color: '#555555',
            maxWidth: 600,
            margin: '0 auto 40px',
            lineHeight: 1.6,
            fontWeight: 400,
          }}>
            We're a team of students building custom AI systems that automate your business. No fluff. Just results.
          </p>

          {/* CTA Buttons */}
          <div style={{
            display: 'flex',
            gap: 12,
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: 'clamp(60px, 10vw, 100px)',
          }}>
            <button
              onClick={() => setBookingOpen(true)}
              style={{
                padding: '12px 32px',
                background: '#000000',
                color: '#ffffff',
                border: 'none',
                borderRadius: 999,
                fontSize: 16,
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#1a1a1a';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#000000';
              }}
            >
              Book a Call
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => window.open('https://wa.me/918309827125', '_blank')}
              style={{
                padding: '12px 32px',
                background: 'transparent',
                color: '#000000',
                border: '1px solid #d5d5d7',
                borderRadius: 999,
                fontSize: 16,
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#000000';
                e.currentTarget.style.background = '#f5f5f7';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#d5d5d7';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <MessageCircle size={16} />
              WhatsApp
            </button>
          </div>

          {/* Hero Image/Visual */}
          <div style={{
            width: '100%',
            height: 'clamp(300px, 50vw, 600px)',
            background: 'linear-gradient(135deg, #f5f5f7 0%, #e8e8eb 100%)',
            borderRadius: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#999999',
            fontSize: 16,
            fontWeight: 500,
            border: '1px solid #d5d5d7',
          }}>
            <div style={{ textAlign: 'center' }}>
              <Zap size={48} style={{ margin: '0 auto 16px', color: '#555555' }} />
              <p>AI Automation in Action</p>
            </div>
          </div>
        </section>

        {/* Features Section - Apple Style Grid */}
        <section style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: 'clamp(80px, 15vw, 120px) clamp(16px, 5vw, 24px)',
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(24px, 5vw, 40px)',
          }}>
            {[
              {
                title: 'Lead Qualification',
                description: 'AI automatically qualifies leads, increasing conversion by 340%',
              },
              {
                title: '24/7 Support',
                description: 'Voice and chat agents handle customer inquiries round the clock',
              },
              {
                title: 'Cost Reduction',
                description: 'Reduce operational costs by 60% without sacrificing quality',
              },
              {
                title: 'Seamless Integration',
                description: 'Works with your existing tools and systems',
              },
              {
                title: 'Real-time Analytics',
                description: 'Track performance and ROI with detailed dashboards',
              },
              {
                title: 'Continuous Learning',
                description: 'AI improves with every interaction',
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                style={{
                  padding: 'clamp(24px, 4vw, 32px)',
                  background: '#ffffff',
                  border: '1px solid #d5d5d7',
                  borderRadius: 16,
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#000000';
                  e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#d5d5d7';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <h3 style={{
                  fontSize: 'clamp(16px, 3vw, 20px)',
                  fontWeight: 600,
                  color: '#000000',
                  marginBottom: 12,
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  fontSize: 'clamp(14px, 2vw, 16px)',
                  color: '#555555',
                  lineHeight: 1.6,
                }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Previous Projects Section */}
        <section style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: 'clamp(80px, 15vw, 120px) clamp(16px, 5vw, 24px)',
        }}>
          <div style={{ marginBottom: 'clamp(40px, 8vw, 60px)' }}>
            <h2 style={{
              fontSize: 'clamp(28px, 6vw, 48px)',
              fontWeight: 700,
              color: '#000000',
              letterSpacing: '-1px',
              marginBottom: 16,
            }}>
              Real Projects. Real Results.
            </h2>
            <p style={{
              fontSize: 'clamp(16px, 3vw, 18px)',
              color: '#555555',
              maxWidth: 600,
            }}>
              See how we've helped businesses automate and scale.
            </p>
          </div>
          <PreviousProjects projects={publishedProjects} />
        </section>

        {/* Reviews Section - Apple Style */}
        <section style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: 'clamp(80px, 15vw, 120px) clamp(16px, 5vw, 24px)',
        }}>
          <div style={{ marginBottom: 'clamp(40px, 8vw, 60px)', textAlign: 'center' }}>
            <h2 style={{
              fontSize: 'clamp(28px, 6vw, 48px)',
              fontWeight: 700,
              color: '#000000',
              letterSpacing: '-1px',
              marginBottom: 16,
            }}>
              Loved by Businesses
            </h2>
            <p style={{
              fontSize: 'clamp(16px, 3vw, 18px)',
              color: '#555555',
              maxWidth: 600,
              margin: '0 auto',
            }}>
              See what our clients have to say.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'clamp(24px, 5vw, 32px)',
          }}>
            {testimonials.map((t, idx) => (
              <div
                key={t.name}
                style={{
                  padding: 'clamp(24px, 4vw, 32px)',
                  background: '#ffffff',
                  border: '1px solid #d5d5d7',
                  borderRadius: 16,
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#000000';
                  e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#d5d5d7';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Stars */}
                <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="#000000" color="#000000" />
                  ))}
                </div>

                {/* Quote */}
                <p style={{
                  color: '#555555',
                  fontSize: 'clamp(14px, 2vw, 16px)',
                  lineHeight: 1.7,
                  marginBottom: 20,
                  fontStyle: 'italic',
                }}>
                  "{t.text}"
                </p>

                {/* Author */}
                <div>
                  <div style={{
                    fontSize: 'clamp(14px, 2vw, 16px)',
                    fontWeight: 600,
                    color: '#000000',
                  }}>
                    {t.name}
                  </div>
                  <div style={{
                    fontSize: 'clamp(12px, 2vw, 14px)',
                    color: '#999999',
                  }}>
                    {t.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA Section - Apple Style */}
        <section style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: 'clamp(80px, 15vw, 120px) clamp(16px, 5vw, 24px)',
        }}>
          <div style={{
            background: '#000000',
            borderRadius: 24,
            padding: 'clamp(40px, 8vw, 80px) clamp(24px, 5vw, 48px)',
            textAlign: 'center',
            color: '#ffffff',
          }}>
            <h2 style={{
              fontSize: 'clamp(28px, 6vw, 48px)',
              fontWeight: 700,
              letterSpacing: '-1px',
              marginBottom: 16,
            }}>
              Ready to Automate?
            </h2>
            <p style={{
              fontSize: 'clamp(16px, 3vw, 18px)',
              color: '#a1a1a6',
              maxWidth: 600,
              margin: '0 auto 40px',
              lineHeight: 1.6,
            }}>
              Book a free 30-minute strategy call. We'll map your business and show you exactly what's possible with AI automation.
            </p>

            <div style={{
              display: 'flex',
              gap: 12,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}>
              <button
                onClick={() => setBookingOpen(true)}
                style={{
                  padding: '12px 32px',
                  background: '#ffffff',
                  color: '#000000',
                  border: 'none',
                  borderRadius: 999,
                  fontSize: 16,
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f5f5f7';
                  e.currentTarget.style.color = '#000000';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#ffffff';
                  e.currentTarget.style.color = '#000000';
                }}
              >
                Book a Call
                <ArrowRight size={16} />
              </button>
              <button
                onClick={() => window.open('https://wa.me/918309827125', '_blank')}
                style={{
                  padding: '12px 32px',
                  background: 'transparent',
                  color: '#ffffff',
                  border: '1px solid #424245',
                  borderRadius: 999,
                  fontSize: 16,
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#ffffff';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#424245';
                  e.currentTarget.style.background = 'transparent';
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
