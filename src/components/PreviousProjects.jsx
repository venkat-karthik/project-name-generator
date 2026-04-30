import { Link } from 'react-router-dom';
import { ArrowRight, GitBranch, TrendingUp, Clock, MessageCircle, CheckCircle, Calendar, DollarSign } from 'lucide-react';

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
      maxWidth: 1200,
      margin: '0 auto',
      padding: 'clamp(60px, 10vw, 80px) clamp(16px, 5vw, 24px)',
    }}>
      <div style={{
        textAlign: 'center',
        marginBottom: 'clamp(40px, 8vw, 56px)',
      }}>
        <p className="section-tag fade-up" style={{ marginBottom: 12 }}>
          Previous Projects
        </p>
        <h2 className="fade-up" style={{
          fontSize: 'clamp(24px, 5vw, 44px)',
          fontWeight: 700,
          letterSpacing: '-1px',
          color: '#f0f0f0',
          animationDelay: '0.1s',
        }}>
          Real Projects. Real Results.
        </h2>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(240px, 45vw, 320px), 1fr))',
        gap: 20,
      }}>
        {projects.map((project, idx) => (
          <div
            key={project.id}
            className="scale-in"
            style={{
              animationDelay: `${idx * 0.05}s`,
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 16,
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* Project Image */}
            <div style={{
              width: '100%',
              height: 180,
              background: `url(${project.image}) center/cover`,
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(124, 255, 103, 0.1))',
              }} />
            </div>

            {/* Content */}
            <div style={{
              padding: 'clamp(16px, 3vw, 24px)',
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
            }}>
              {/* Title */}
              <h3 style={{
                fontSize: 'clamp(14px, 3vw, 18px)',
                fontWeight: 600,
                color: '#f0f0f0',
                marginBottom: 10,
                lineHeight: 1.3,
              }}>
                {project.title}
              </h3>

              {/* Description */}
              <p style={{
                color: '#888',
                fontSize: 'clamp(12px, 2vw, 14px)',
                lineHeight: 1.6,
                marginBottom: 16,
                flex: 1,
              }}>
                {project.description}
              </p>

              {/* Technologies */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 6,
                marginBottom: 16,
              }}>
                {project.technologies?.slice(0, 3).map((tech, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: '11px',
                      padding: '4px 10px',
                      borderRadius: 999,
                      background: 'rgba(59, 130, 246, 0.1)',
                      color: '#3b82f6',
                      border: '1px solid rgba(59, 130, 246, 0.2)',
                      fontWeight: 500,
                    }}
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies?.length > 3 && (
                  <span
                    style={{
                      fontSize: '11px',
                      padding: '4px 10px',
                      borderRadius: 999,
                      background: 'rgba(124, 255, 103, 0.1)',
                      color: '#7cff67',
                      border: '1px solid rgba(124, 255, 103, 0.2)',
                      fontWeight: 500,
                    }}
                  >
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>

              {/* Metrics */}
              {project.metrics && project.metrics.length > 0 && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 10,
                  marginBottom: 16,
                }}>
                  {project.metrics.slice(0, 2).map((metric, i) => {
                    const IconComponent = iconMap[metric.icon] || TrendingUp;
                    return (
                      <div
                        key={i}
                        style={{
                          background: 'rgba(59, 130, 246, 0.05)',
                          border: '1px solid rgba(59, 130, 246, 0.1)',
                          borderRadius: 8,
                          padding: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                        }}
                      >
                        <IconComponent size={14} color="#3b82f6" />
                        <div>
                          <div style={{
                            fontSize: '12px',
                            fontWeight: 700,
                            color: '#3b82f6',
                          }}>
                            {metric.value}
                          </div>
                          <div style={{
                            fontSize: '9px',
                            color: '#666',
                            marginTop: 2,
                          }}>
                            {metric.label}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* GitHub Link */}
              {project.github_link && (
                <a
                  href={project.github_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    color: '#3b82f6',
                    fontSize: '12px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.gap = '10px';
                    e.currentTarget.style.color = '#60a5fa';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.gap = '6px';
                    e.currentTarget.style.color = '#3b82f6';
                  }}
                >
                  <GitBranch size={14} />
                  View on GitHub
                  <ArrowRight size={12} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
