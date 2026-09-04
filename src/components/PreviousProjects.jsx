import { ArrowRight, GitBranch, TrendingUp, Clock, MessageCircle, CheckCircle, Calendar, DollarSign, ExternalLink } from 'lucide-react';

const iconMap = {
  TrendingUp: TrendingUp,
  Clock: Clock,
  MessageCircle: MessageCircle,
  CheckCircle: CheckCircle,
  Calendar: Calendar,
  DollarSign: DollarSign,
};

const DEFAULT_CLIENT_PROJECTS = [
  {
    id: 1725450001000,
    title: 'Prima Lane Luxury E-Commerce',
    category: 'E-Commerce & Retail Automation',
    description: 'Custom high-conversion e-commerce platform featuring automated catalog sync, dynamic checkout experience, and integrated customer retention flows built for Prima Lane.',
    url: 'https://primalane.com/',
    github_link: 'https://primalane.com/',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=500&fit=crop',
    technologies: ['React', 'Next.js', 'Shopify API', 'Tailwind CSS', 'Stripe'],
    metrics: [
      { label: 'Conversion Boost', value: '4.8x', icon: 'TrendingUp' },
      { label: 'Uptime SLA', value: '99.9%', icon: 'CheckCircle' },
      { label: 'Revenue Scaled', value: '+340%', icon: 'DollarSign' }
    ],
    status: 'published',
  },
  {
    id: 1725450002000,
    title: 'Alluri Resorts Luxury Booking Engine',
    category: 'Hospitality & Resort Tech',
    description: 'Full-stack luxury resort reservation system with instant room availability engine, automated guest WhatsApp updates, and zero-friction payment processing.',
    url: 'https://alluriresorts.com/',
    github_link: 'https://alluriresorts.com/',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=500&fit=crop',
    technologies: ['React', 'Node.js', 'Reservation Engine', 'WhatsApp API', 'Stripe'],
    metrics: [
      { label: 'Monthly Bookings', value: '350+', icon: 'Calendar' },
      { label: 'Automated Flow', value: '100%', icon: 'CheckCircle' },
      { label: 'Booking Speed', value: '< 1 sec', icon: 'Clock' }
    ],
    status: 'published',
  },
  {
    id: 1725450003000,
    title: 'Mana Care Patient Management Suite',
    category: 'Healthcare & Clinical Workflow AI',
    description: 'Intelligent healthcare management platform automating doctor scheduling, electronic health records (EHR), patient triage, and automated follow-up sequences.',
    url: 'http://mana-care.vercel.app/',
    github_link: 'http://mana-care.vercel.app/',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop',
    technologies: ['React', 'Vite', 'Cloud DB', 'Patient Portal', 'Telehealth'],
    metrics: [
      { label: 'Faster Check-ins', value: '60%', icon: 'Clock' },
      { label: 'Scheduling Friction', value: 'Zero', icon: 'CheckCircle' },
      { label: 'Patient Access', value: '24/7', icon: 'TrendingUp' }
    ],
    status: 'published',
  },
  {
    id: 1725450004000,
    title: 'Claims Automation Analytics Dashboard',
    category: 'Enterprise Fintech & Insurance AI',
    description: 'Enterprise claims processing dashboard powered by automated risk assessment workflows, real-time analytics, and automated approval pipelines.',
    url: 'https://claims-bice.vercel.app/dashboard',
    github_link: 'https://claims-bice.vercel.app/dashboard',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
    technologies: ['React', 'Claims Engine', 'Chart.js', 'Document AI', 'Analytics'],
    metrics: [
      { label: 'Reduced Claim Time', value: '75%', icon: 'Clock' },
      { label: 'Processing Accuracy', value: '99.2%', icon: 'CheckCircle' },
      { label: 'Claims Automated', value: '10k+', icon: 'TrendingUp' }
    ],
    status: 'published',
  },
  {
    id: 1725450005000,
    title: 'Kesar Kosmetics Digital Storefront',
    category: 'Beauty & Cosmetics E-Commerce',
    description: 'Ultra-fast digital storefront engineered for Kesar Kosmetics, featuring interactive product showcases, personalized beauty consultation quizzes, and one-click cart checkout.',
    url: 'https://www.kesarkosmetics.com/',
    github_link: 'https://www.kesarkosmetics.com/',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=500&fit=crop',
    technologies: ['React', 'E-Commerce Engine', 'Inventory API', 'Tailwind CSS'],
    metrics: [
      { label: 'Mobile Conversion', value: '3.2x', icon: 'TrendingUp' },
      { label: 'Repeat Buyer Growth', value: '45%', icon: 'DollarSign' },
      { label: 'Page Load', value: '< 800ms', icon: 'Clock' }
    ],
    status: 'published',
  },
  {
    id: 1725450006000,
    title: 'Weather Wiz Analytics & Forecast Engine',
    category: 'Weather Intelligence & Geospatial Analytics',
    description: 'Hyper-local weather forecasting application with live atmospheric data visualization, severe weather alert triggers, and interactive climate charts.',
    url: 'https://weather-wiz-ta32.vercel.app/',
    github_link: 'https://weather-wiz-ta32.vercel.app/',
    image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&h=500&fit=crop',
    technologies: ['React', 'OpenWeather API', 'GeoLocation', 'Chart.js', 'Vite'],
    metrics: [
      { label: 'Weather Intelligence', value: 'Real-time', icon: 'Clock' },
      { label: 'Active Queries', value: '50k+', icon: 'TrendingUp' },
      { label: 'Alert Accuracy', value: '99.8%', icon: 'CheckCircle' }
    ],
    status: 'published',
  },
];

export default function PreviousProjects({ projects = [] }) {
  const displayProjects = (projects && projects.length > 0) ? projects : DEFAULT_CLIENT_PROJECTS;

  return (
    <section style={{
      maxWidth: 1240,
      margin: '0 auto',
      padding: 'clamp(60px, 10vw, 100px) clamp(20px, 5vw, 32px)',
    }}>
      <div style={{
        textAlign: 'center',
        marginBottom: 'clamp(40px, 8vw, 64px)',
      }}>
        <p className="section-tag fade-up" style={{ marginBottom: 14 }}>
          Services Provided To Our Clients
        </p>
        <h2 className="fade-up" style={{
          fontSize: 'clamp(28px, 5.5vw, 50px)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          color: '#ffffff',
          animationDelay: '0.1s',
        }}>
          Live Client Projects & Custom Solutions
        </h2>
        <p className="fade-up" style={{
          color: '#94a3b8',
          fontSize: 'clamp(14px, 2.5vw, 17px)',
          maxWidth: 640,
          margin: '12px auto 0',
          lineHeight: 1.6,
        }}>
          Explore high-conversion web applications, booking platforms, clinical suites, and automated analytics built and delivered to our clients.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(280px, 45vw, 380px), 1fr))',
        gap: 24,
      }}>
        {displayProjects.map((project, idx) => {
          const targetUrl = project.url || project.github_link || '#';
          const isExternalUrl = targetUrl.startsWith('http://') || targetUrl.startsWith('https://');

          return (
            <div
              key={project.id || idx}
              className="glass-card scale-in"
              style={{
                animationDelay: `${idx * 0.08}s`,
                background: 'rgba(15, 23, 42, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: 20,
                overflow: 'hidden',
                transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.4)';
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(59, 130, 246, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.4)';
              }}
            >
              {/* Project Image Header with Gradient Overlay & Category Badge */}
              <div style={{
                width: '100%',
                height: 200,
                background: `url(${project.image}) center/cover no-repeat`,
                position: 'relative',
                overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(6, 6, 8, 0.2) 0%, rgba(15, 23, 42, 0.95) 100%)',
                }} />

                {project.category && (
                  <div style={{
                    position: 'absolute',
                    top: 14,
                    left: 14,
                    background: 'rgba(15, 23, 42, 0.85)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                    color: '#38bdf8',
                    fontSize: 11,
                    fontWeight: 600,
                    padding: '5px 12px',
                    borderRadius: 999,
                    letterSpacing: '0.03em',
                  }}>
                    {project.category}
                  </div>
                )}
              </div>

              {/* Content */}
              <div style={{
                padding: 'clamp(20px, 4vw, 28px)',
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
              }}>
                {/* Title */}
                <h3 style={{
                  fontSize: 'clamp(18px, 3vw, 22px)',
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: 10,
                  lineHeight: 1.3,
                  letterSpacing: '-0.02em',
                }}>
                  {project.title}
                </h3>

                {/* Description */}
                <p style={{
                  color: '#94a3b8',
                  fontSize: 'clamp(13px, 2vw, 15px)',
                  lineHeight: 1.65,
                  marginBottom: 20,
                  flex: 1,
                }}>
                  {project.description}
                </p>

                {/* Technologies */}
                {project.technologies && project.technologies.length > 0 && (
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 6,
                    marginBottom: 20,
                  }}>
                    {project.technologies.map((tech, i) => (
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
                )}

                {/* Metrics */}
                {project.metrics && project.metrics.length > 0 && (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
                    gap: 10,
                    marginBottom: 24,
                  }}>
                    {project.metrics.map((metric, i) => {
                      const IconComponent = iconMap[metric.icon] || TrendingUp;
                      return (
                        <div
                          key={i}
                          style={{
                            background: 'rgba(15, 23, 42, 0.6)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: 12,
                            padding: '10px 12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                          }}
                        >
                          <IconComponent size={16} color="#38bdf8" />
                          <div>
                            <div style={{
                              fontSize: '13px',
                              fontWeight: 700,
                              color: '#38bdf8',
                            }}>
                              {metric.value}
                            </div>
                            <div style={{
                              fontSize: '10px',
                              color: '#64748b',
                              marginTop: 2,
                              fontWeight: 500,
                            }}>
                              {metric.label}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Live Client Website Button */}
                {targetUrl !== '#' && (
                  <a
                    href={targetUrl}
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
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
