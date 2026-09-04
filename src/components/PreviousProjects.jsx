import { ArrowRight, GitBranch, TrendingUp, Clock, MessageCircle, CheckCircle, Calendar, DollarSign, ExternalLink } from 'lucide-react';

const iconMap = {
  TrendingUp: TrendingUp,
  Clock: Clock,
  MessageCircle: MessageCircle,
  CheckCircle: CheckCircle,
  Calendar: Calendar,
  DollarSign: DollarSign,
};

export default function PreviousProjects({ projects = [] }) {
  if (!projects || projects.length === 0) {
    return null;
  }

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
        {projects.map((project, idx) => {
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
