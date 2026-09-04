import { useState } from 'react';
import { ArrowRight, MessageCircle, Star, Cpu, ShieldCheck, Zap, Layers, BarChart3, Clock, TrendingUp, ExternalLink, Globe, Sparkles } from 'lucide-react';
import { useStore } from '../../store/useStore';
import WebsiteNav from '../../components/WebsiteNav';
import WebsiteFooter from '../../components/WebsiteFooter';
import BookingModal from '../../components/BookingModal';
import PreviousProjects from '../../components/PreviousProjects';
import Aurora from '../../components/Aurora';

// Testimonials are now managed dynamically from the Admin Dashboard (`useStore`)

const capabilities = [
  {
    title: 'Autonomous AI Sales & Lead Agents',
    description: 'Custom-trained conversational AI agents deployed across WhatsApp, Web, and Voice to qualify, nurture, and close inbound leads 24/7.',
    icon: Zap,
    tag: 'Revenue Engine'
  },
  {
    title: 'Enterprise Workflow & CRM Automation',
    description: 'Seamless bi-directional integration connecting your CRM, ERP, Billing, and internal communications to eliminate manual data entry entirely.',
    icon: Layers,
    tag: 'Operational Speed'
  },
  {
    title: 'Custom Multi-Agent AI Ecosystems',
    description: 'Specialized autonomous agents collaborating to handle complex document analysis, automated customer support, and financial forecasting.',
    icon: Cpu,
    tag: 'Next-Gen Intelligence'
  }
];

const clientServicesProvided = [
  {
    id: 'primalane',
    title: 'Prima Lane Luxury Storefront',
    category: 'E-Commerce & Retail AI',
    url: 'https://primalane.com/',
    description: 'Custom high-conversion e-commerce platform featuring automated catalog sync, dynamic checkout experience, and integrated customer retention flows built for Prima Lane.',
    technologies: ['React', 'Next.js', 'Shopify API', 'Tailwind CSS', 'Stripe'],
    metrics: [
      { label: 'Conversion Boost', value: '4.8x' },
      { label: 'Uptime SLA', value: '99.9%' },
      { label: 'Revenue Scaled', value: '+340%' }
    ],
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=500&fit=crop',
  },
  {
    id: 'alluriresorts',
    title: 'Alluri Resorts Luxury Booking Engine',
    category: 'Hospitality & Resort Tech',
    url: 'https://alluriresorts.com/',
    description: 'Full-stack luxury resort reservation system with instant room availability engine, automated guest WhatsApp updates, and zero-friction payment processing.',
    technologies: ['React', 'Node.js', 'Reservation Engine', 'WhatsApp API', 'Stripe'],
    metrics: [
      { label: 'Monthly Bookings', value: '350+' },
      { label: 'Automated Flow', value: '100%' },
      { label: 'Booking Speed', value: '< 1 sec' }
    ],
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=500&fit=crop',
  },
  {
    id: 'manacare',
    title: 'Mana Care Patient Management Suite',
    category: 'Healthcare & Clinical Workflow AI',
    url: 'http://mana-care.vercel.app/',
    description: 'Intelligent healthcare management platform automating doctor scheduling, electronic health records (EHR), patient triage, and automated follow-up sequences.',
    technologies: ['React', 'Vite', 'Cloud DB', 'Patient Portal', 'Telehealth'],
    metrics: [
      { label: 'Faster Check-ins', value: '60%' },
      { label: 'Scheduling Friction', value: 'Zero' },
      { label: 'Patient Access', value: '24/7' }
    ],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop',
  },
  {
    id: 'claimsdashboard',
    title: 'Claims Automation Analytics Dashboard',
    category: 'Enterprise Fintech & Insurance AI',
    url: 'https://claims-bice.vercel.app/dashboard',
    description: 'Enterprise claims processing dashboard powered by automated risk assessment workflows, real-time analytics, and automated approval pipelines.',
    technologies: ['React', 'Claims Engine', 'Chart.js', 'Document AI', 'Analytics'],
    metrics: [
      { label: 'Reduced Claim Time', value: '75%' },
      { label: 'Processing Accuracy', value: '99.2%' },
      { label: 'Claims Automated', value: '10k+' }
    ],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
  },
  {
    id: 'kesarkosmetics',
    title: 'Kesar Kosmetics Digital Storefront',
    category: 'Beauty & Cosmetics E-Commerce',
    url: 'https://www.kesarkosmetics.com/',
    description: 'Ultra-fast digital storefront engineered for Kesar Kosmetics, featuring interactive product showcases, personalized beauty consultation quizzes, and one-click cart checkout.',
    technologies: ['React', 'E-Commerce Engine', 'Inventory API', 'Tailwind CSS'],
    metrics: [
      { label: 'Mobile Conversion', value: '3.2x' },
      { label: 'Repeat Buyer Growth', value: '45%' },
      { label: 'Page Load', value: '< 800ms' }
    ],
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=500&fit=crop',
  },
  {
    id: 'weatherwiz',
    title: 'Weather Wiz Analytics & Forecast Engine',
    category: 'Weather Intelligence & Geospatial Analytics',
    url: 'https://weather-wiz-ta32.vercel.app/',
    description: 'Hyper-local weather forecasting application with live atmospheric data visualization, severe weather alert triggers, and interactive climate charts.',
    technologies: ['React', 'OpenWeather API', 'GeoLocation', 'Chart.js', 'Vite'],
    metrics: [
      { label: 'Weather Intelligence', value: 'Real-time' },
      { label: 'Active Queries', value: '50k+' },
      { label: 'Alert Accuracy', value: '99.8%' }
    ],
    image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&h=500&fit=crop',
  },
];

export default function HomePage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [teamSize, setTeamSize] = useState(25);
  const [avgHourlyCost, setAvgHourlyCost] = useState(800);
  const { getPublishedProjects, getPublishedTestimonials } = useStore();
  const publishedProjects = getPublishedProjects();
  const publishedTestimonials = getPublishedTestimonials ? getPublishedTestimonials() : [];

  // ROI Calculator computation
  const hoursSavedPerEmployee = 14; // 14 hours saved per week
  const monthlySavings = Math.round((teamSize * hoursSavedPerEmployee * avgHourlyCost * 4.33) / 1000) * 1000;
  const annualSavings = monthlySavings * 12;

  return (
    <div style={{ minHeight: '100vh', background: '#060608', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, overflow: 'hidden' }}>
        <Aurora colorStops={['#1e293b', '#2563eb', '#0f172a']} blend={0.6} amplitude={0.8} speed={0.5} />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <WebsiteNav />

        {/* Hero Section */}
        <section className="aurora-bg-wrapper" style={{
          maxWidth: 1240,
          margin: '0 auto',
          padding: 'clamp(70px, 12vw, 130px) clamp(20px, 5vw, 32px) clamp(60px, 10vw, 100px)',
          textAlign: 'center',
          position: 'relative',
        }}>
          <div className="fade-up">
            {/* Status Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: 'clamp(8px, 2vw, 10px) clamp(16px, 3vw, 22px)',
              borderRadius: 999,
              border: '1px solid rgba(59, 130, 246, 0.3)',
              background: 'rgba(59, 130, 246, 0.08)',
              marginBottom: 'clamp(24px, 5vw, 36px)',
              boxShadow: '0 0 24px rgba(59, 130, 246, 0.15)',
            }}>
              <div style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#38bdf8',
                boxShadow: '0 0 10px #38bdf8',
                animation: 'pulse 2s ease-in-out infinite',
              }} />
              <span style={{ fontSize: 'clamp(12px, 2vw, 13px)', color: '#93c5fd', fontWeight: 600, letterSpacing: '0.02em' }}>
                Next-Gen Autonomous AI Systems for High-Growth Enterprises
              </span>
            </div>

            {/* Main Heading */}
            <h1 style={{
              fontSize: 'clamp(36px, 7.5vw, 84px)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 1.08,
              color: '#ffffff',
              marginBottom: 28,
              maxWidth: 1080,
              margin: '0 auto 28px',
            }}>
              Turn Your Enterprise Into An
              <br />
              <span className="gold-text">Autonomous AI Powerhouse</span>
            </h1>

            {/* Subheading */}
            <p style={{
              color: '#94a3b8',
              fontSize: 'clamp(16px, 3vw, 20px)',
              maxWidth: 680,
              margin: '0 auto 44px',
              lineHeight: 1.65,
              fontWeight: 400,
            }}>
              We architect, train, and deploy custom AI automation systems that eliminate bottlenecks, scale revenue effortlessly, and operate with zero downtime.
            </p>

            {/* CTA Buttons */}
            <div style={{
              display: 'flex',
              gap: 16,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}>
              <button
                className="btn-gold"
                onClick={() => setBookingOpen(true)}
                style={{
                  fontSize: 'clamp(14px, 2vw, 16px)',
                  padding: '16px 36px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                Schedule AI Architecture Call
                <ArrowRight size={18} />
              </button>
              <button
                className="btn-outline"
                onClick={() => window.open('https://wa.me/918309827125', '_blank')}
                style={{
                  fontSize: 'clamp(14px, 2vw, 16px)',
                  padding: '16px 36px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <MessageCircle size={18} color="#38bdf8" />
                Live WhatsApp Consult
              </button>
            </div>
          </div>

          {/* Premium Enterprise Stats Bar */}
          <div style={{
            marginTop: 'clamp(50px, 9vw, 90px)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(140px, 22vw, 220px), 1fr))',
            gap: 1,
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: 20,
            overflow: 'hidden',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(16px)',
          }}>
            {[
              ['₹3.4 Lakh+', 'Client Revenue Scaled', TrendingUp, '#38bdf8'],
              ['13+', 'Autonomous Systems Built', Cpu, '#60a5fa'],
              ['99.4%', 'System Uptime & SLA', ShieldCheck, '#4ade80'],
              ['4.6x', 'Avg. Enterprise ROI', BarChart3, '#93c5fd'],
            ].map(([val, label, IconComp, color], idx) => (
              <div
                key={label}
                style={{
                  background: 'rgba(15, 23, 42, 0.75)',
                  padding: 'clamp(20px, 4vw, 32px)',
                  textAlign: 'center',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
                  <IconComp size={20} color={color} />
                </div>
                <div style={{
                  fontSize: 'clamp(24px, 4.5vw, 34px)',
                  fontWeight: 800,
                  color: '#ffffff',
                  letterSpacing: '-0.03em',
                }}>
                  {val}
                </div>
                <div style={{
                  color: '#94a3b8',
                  fontSize: 'clamp(11px, 2vw, 13px)',
                  fontWeight: 500,
                  marginTop: 4,
                }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Core Capabilities Section */}
        <section style={{
          maxWidth: 1240,
          margin: '0 auto',
          padding: 'clamp(60px, 10vw, 100px) clamp(20px, 5vw, 32px)',
        }}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 8vw, 64px)' }}>
            <p className="section-tag fade-up" style={{ marginBottom: 14 }}>
              System Architecture
            </p>
            <h2 className="fade-up" style={{
              fontSize: 'clamp(28px, 5.5vw, 50px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: '#ffffff',
            }}>
              What We Build For Your Business
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(280px, 45vw, 380px), 1fr))',
            gap: 24,
          }}>
            {capabilities.map((cap, idx) => (
              <div
                key={cap.title}
                className="glass-card scale-in"
                style={{
                  animationDelay: `${idx * 0.1}s`,
                  padding: 'clamp(24px, 5vw, 36px)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '4px 12px',
                  borderRadius: 999,
                  background: 'rgba(59, 130, 246, 0.12)',
                  color: '#60a5fa',
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  marginBottom: 20,
                  border: '1px solid rgba(59, 130, 246, 0.25)',
                }}>
                  {cap.tag}
                </div>

                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.2), rgba(59, 130, 246, 0.05))',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 20,
                }}>
                  <cap.icon size={24} color="#38bdf8" />
                </div>

                <h3 style={{
                  fontSize: 'clamp(18px, 3vw, 22px)',
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: 12,
                  letterSpacing: '-0.02em',
                }}>
                  {cap.title}
                </h3>

                <p style={{
                  color: '#94a3b8',
                  fontSize: 'clamp(13px, 2vw, 15px)',
                  lineHeight: 1.65,
                }}>
                  {cap.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Services Provided To Our Clients Section */}
        <section style={{
          maxWidth: 1240,
          margin: '0 auto',
          padding: 'clamp(60px, 10vw, 100px) clamp(20px, 5vw, 32px)',
        }}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 8vw, 64px)' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 16px',
              borderRadius: 999,
              background: 'rgba(56, 189, 248, 0.1)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              color: '#38bdf8',
              fontSize: 13,
              fontWeight: 600,
              marginBottom: 16,
            }}>
              <Globe size={14} />
              <span>Proven Client Impact</span>
            </div>
            <h2 className="fade-up" style={{
              fontSize: 'clamp(28px, 5.5vw, 52px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: '#ffffff',
            }}>
              Services Provided To Our Clients
            </h2>
            <p style={{
              color: '#94a3b8',
              fontSize: 'clamp(14px, 2.5vw, 17px)',
              maxWidth: 680,
              margin: '12px auto 0',
              lineHeight: 1.6,
            }}>
              Explore custom e-commerce stores, healthcare portals, booking platforms, and automated dashboards built and deployed by our team for live client operations.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(280px, 45vw, 380px), 1fr))',
            gap: 24,
          }}>
            {clientServicesProvided.map((service, idx) => (
              <div
                key={service.id}
                className="glass-card scale-in"
                style={{
                  animationDelay: `${idx * 0.08}s`,
                  background: 'rgba(15, 23, 42, 0.75)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: 22,
                  overflow: 'hidden',
                  transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 12px 36px rgba(0, 0, 0, 0.45)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.4)';
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 20px 45px rgba(56, 189, 248, 0.18)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 12px 36px rgba(0, 0, 0, 0.45)';
                }}
              >
                {/* Image Header with Category Badge */}
                <div style={{
                  width: '100%',
                  height: 200,
                  background: `url(${service.image}) center/cover no-repeat`,
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(6, 6, 8, 0.25) 0%, rgba(15, 23, 42, 0.95) 100%)',
                  }} />

                  <div style={{
                    position: 'absolute',
                    top: 14,
                    left: 14,
                    background: 'rgba(15, 23, 42, 0.85)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(56, 189, 248, 0.35)',
                    color: '#38bdf8',
                    fontSize: 11,
                    fontWeight: 600,
                    padding: '5px 12px',
                    borderRadius: 999,
                    letterSpacing: '0.03em',
                  }}>
                    {service.category}
                  </div>
                </div>

                {/* Content Body */}
                <div style={{
                  padding: 'clamp(20px, 4vw, 28px)',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                }}>
                  <h3 style={{
                    fontSize: 'clamp(18px, 3vw, 22px)',
                    fontWeight: 700,
                    color: '#ffffff',
                    marginBottom: 10,
                    lineHeight: 1.3,
                    letterSpacing: '-0.02em',
                  }}>
                    {service.title}
                  </h3>

                  <p style={{
                    color: '#94a3b8',
                    fontSize: 'clamp(13px, 2vw, 15px)',
                    lineHeight: 1.65,
                    marginBottom: 20,
                    flex: 1,
                  }}>
                    {service.description}
                  </p>

                  {/* Technologies */}
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 6,
                    marginBottom: 20,
                  }}>
                    {service.technologies.map((tech, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: '11px',
                          padding: '4px 10px',
                          borderRadius: 999,
                          background: 'rgba(59, 130, 246, 0.12)',
                          color: '#60a5fa',
                          border: '1px solid rgba(59, 130, 246, 0.25)',
                          fontWeight: 500,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Metrics */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: 8,
                    marginBottom: 24,
                  }}>
                    {service.metrics.map((m, i) => (
                      <div
                        key={i}
                        style={{
                          background: 'rgba(15, 23, 42, 0.6)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: 12,
                          padding: '8px 10px',
                          textAlign: 'center',
                        }}
                      >
                        <div style={{
                          fontSize: '13px',
                          fontWeight: 700,
                          color: '#38bdf8',
                        }}>
                          {m.value}
                        </div>
                        <div style={{
                          fontSize: '10px',
                          color: '#64748b',
                          marginTop: 2,
                          fontWeight: 500,
                        }}>
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Action Link Button */}
                  <a
                    href={service.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold safe-touch-target"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                      width: '100%',
                      padding: '12px 20px',
                      fontSize: '14px',
                      fontWeight: 600,
                      borderRadius: 12,
                      textDecoration: 'none',
                      boxSizing: 'border-box',
                    }}
                  >
                    Visit Client Site / Live App
                    <ExternalLink size={15} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive AI Automation ROI Calculator Section */}
        <section style={{
          maxWidth: 1240,
          margin: '0 auto',
          padding: 'clamp(60px, 10vw, 100px) clamp(20px, 5vw, 32px)',
        }}>
          <div style={{
            background: 'rgba(15, 23, 42, 0.65)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: 24,
            padding: 'clamp(32px, 6vw, 60px)',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(16px)',
          }}>
            <div style={{ textAlign: 'center', marginBottom: 'clamp(36px, 6vw, 50px)' }}>
              <p className="section-tag" style={{ marginBottom: 12 }}>Interactive ROI Simulator</p>
              <h2 style={{ fontSize: 'clamp(26px, 5vw, 42px)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.03em' }}>
                Calculate Your Annual Automation Impact
              </h2>
              <p style={{ color: '#94a3b8', fontSize: 'clamp(14px, 2.5vw, 16px)', marginTop: 8 }}>
                See how much time and operational budget our autonomous AI systems unlock for your team.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(280px, 45vw, 440px), 1fr))', gap: 40, alignItems: 'center' }}>
              {/* Sliders */}
              <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: 'clamp(20px, 4vw, 32px)', borderRadius: 18, border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <div style={{ marginBottom: 28 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                    <label style={{ color: '#e2e8f0', fontWeight: 600, fontSize: 14 }}>Team Size (Employees)</label>
                    <span style={{ color: '#38bdf8', fontWeight: 700, fontSize: 16 }}>{teamSize} members</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="200"
                    step="5"
                    value={teamSize}
                    onChange={(e) => setTeamSize(parseInt(e.target.value))}
                    style={{ width: '100%', accentColor: '#3b82f6', cursor: 'pointer', height: 6 }}
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                    <label style={{ color: '#e2e8f0', fontWeight: 600, fontSize: 14 }}>Avg. Hourly Cost per Employee</label>
                    <span style={{ color: '#38bdf8', fontWeight: 700, fontSize: 16 }}>₹{avgHourlyCost}/hr</span>
                  </div>
                  <input
                    type="range"
                    min="300"
                    max="3000"
                    step="100"
                    value={avgHourlyCost}
                    onChange={(e) => setAvgHourlyCost(parseInt(e.target.value))}
                    style={{ width: '100%', accentColor: '#3b82f6', cursor: 'pointer', height: 6 }}
                  />
                </div>
              </div>

              {/* Output Results */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.2), rgba(30, 58, 138, 0.4))', border: '1px solid rgba(59, 130, 246, 0.4)', borderRadius: 18, padding: 'clamp(24px, 4vw, 32px)', textAlign: 'center' }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#93c5fd', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
                    Estimated Annual Financial Value
                  </div>
                  <div style={{ fontSize: 'clamp(32px, 6vw, 48px)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.04em' }}>
                    ₹{(annualSavings / 100000).toFixed(1)} Lakhs
                  </div>
                  <div style={{ fontSize: 13, color: '#cbd5e1', marginTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                    <Clock size={15} color="#38bdf8" /> Saves approx. {(teamSize * hoursSavedPerEmployee * 52).toLocaleString()} hours annually
                  </div>
                </div>

                <button
                  className="btn-gold"
                  onClick={() => setBookingOpen(true)}
                  style={{ width: '100%', justifyContent: 'center', padding: '16px 28px', fontSize: 15 }}
                >
                  Claim Your Custom AI Roadmap <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Client Reviews Section - Automatically appears when testimonials are added in Admin panel */}
        {publishedTestimonials.length > 0 && (
          <section style={{
            maxWidth: 1240,
            margin: '0 auto',
            padding: 'clamp(60px, 10vw, 100px) clamp(20px, 5vw, 32px)',
          }}>
            <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 8vw, 64px)' }}>
              <p className="section-tag fade-up" style={{ marginBottom: 14 }}>Proven Outcomes</p>
              <h2 className="fade-up" style={{
                fontSize: 'clamp(28px, 5.5vw, 50px)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                color: '#ffffff',
              }}>
                Trusted By Industry Leaders
              </h2>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(280px, 45vw, 380px), 1fr))',
              gap: 24,
            }}>
              {publishedTestimonials.map((t, idx) => (
                <div
                  key={t.id || t.name}
                  className="glass-card scale-in"
                  style={{
                    animationDelay: `${idx * 0.1}s`,
                    padding: 'clamp(24px, 5vw, 36px)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                      <div style={{ display: 'flex', gap: 4 }}>
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={16} fill="#38bdf8" color="#38bdf8" />
                        ))}
                      </div>
                      {t.metrics && (
                        <span style={{
                          fontSize: 11,
                          fontWeight: 700,
                          color: '#4ade80',
                          background: 'rgba(74, 222, 128, 0.12)',
                          padding: '4px 10px',
                          borderRadius: 999,
                          border: '1px solid rgba(74, 222, 128, 0.25)'
                        }}>
                          {t.metrics}
                        </span>
                      )}
                    </div>

                    <p style={{
                      color: '#cbd5e1',
                      fontSize: 'clamp(14px, 2vw, 16px)',
                      lineHeight: 1.7,
                      marginBottom: 24,
                    }}>
                      "{t.text}"
                    </p>
                  </div>

                  <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: 16 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#ffffff' }}>
                      {t.name}
                    </div>
                    <div style={{ fontSize: 13, color: '#64748b', marginTop: 2 }}>
                      {t.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Previous Projects Section */}
        <PreviousProjects projects={publishedProjects} />

        {/* Final CTA Section */}
        <section style={{
          maxWidth: 1240,
          margin: '0 auto',
          padding: 'clamp(40px, 8vw, 100px) clamp(20px, 5vw, 32px)',
        }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.9))',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            borderRadius: 28,
            padding: 'clamp(40px, 8vw, 80px) clamp(20px, 5vw, 50px)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 30px 70px rgba(0, 0, 0, 0.6)',
          }}>
            <div style={{
              position: 'absolute',
              top: -120,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 500,
              height: 500,
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />

            <p className="section-tag" style={{ marginBottom: 16 }}>
              Scale Without Limits
            </p>
            <h2 style={{
              fontSize: 'clamp(28px, 6vw, 56px)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              color: '#ffffff',
              marginBottom: 18,
              maxWidth: 800,
              margin: '0 auto 18px',
            }}>
              Ready To Build Your Custom AI Ecosystem?
            </h2>
            <p style={{
              color: '#94a3b8',
              fontSize: 'clamp(15px, 2.8vw, 18px)',
              maxWidth: 580,
              margin: '0 auto 40px',
              lineHeight: 1.65,
            }}>
              Schedule a 30-minute technical discovery session. We will map your operational bottlenecks and provide an exact architecture blueprint.
            </p>

            <div style={{
              display: 'flex',
              gap: 16,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}>
              <button
                className="btn-gold"
                onClick={() => setBookingOpen(true)}
                style={{
                  fontSize: 'clamp(14px, 2vw, 16px)',
                  padding: '16px 36px',
                }}
              >
                Schedule Discovery Call
                <ArrowRight size={18} />
              </button>
              <button
                className="btn-outline"
                onClick={() => window.open('https://wa.me/918309827125', '_blank')}
                style={{
                  fontSize: 'clamp(14px, 2vw, 16px)',
                  padding: '16px 36px',
                }}
              >
                <MessageCircle size={18} color="#38bdf8" />
                Connect on WhatsApp
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
