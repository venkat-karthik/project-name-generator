import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, X, CheckCircle2 } from 'lucide-react';
import WebsiteNav from '../../components/WebsiteNav';
import WebsiteFooter from '../../components/WebsiteFooter';
import Aurora from '../../components/Aurora';

const AURORA_COLORS = ['#7cff67', '#B497CF', '#5227FF'];

const solutionsData = [
  {
    category: 'AI & Automation',
    color: '#c9a84c',
    items: [
      {
        title: 'WhatsApp Business Automation',
        shortDesc: 'End-to-end automated WhatsApp interactions.',
        fullDesc: 'Automate your entire WhatsApp communication flow. Handle customer inquiries, send order updates, process payments, and manage conversations 24/7 without manual intervention. Perfect for e-commerce, support, and lead nurturing.',
        benefits: ['24/7 automated responses', 'Lead qualification', 'Order updates', 'Payment processing', 'Multi-language support', 'CRM integration']
      },
      {
        title: 'AI Lead Qualification',
        shortDesc: 'Automatic scoring and filtering for every lead.',
        fullDesc: 'Let AI automatically qualify your leads based on custom criteria. Score leads by engagement level, budget, timeline, and fit. Automatically route hot leads to your sales team and nurture cold leads with automated sequences.',
        benefits: ['Automatic lead scoring', 'Custom qualification rules', 'Smart routing', 'Lead nurturing sequences', 'Real-time notifications', 'Sales team efficiency']
      },
      {
        title: 'Appointment Booking Automation',
        shortDesc: 'Zero-touch scheduling and reminders.',
        fullDesc: 'Eliminate back-and-forth emails. Let customers book appointments directly through WhatsApp, SMS, or your website. Automatic reminders reduce no-shows by 80%. Integrates with your calendar and sends confirmations instantly.',
        benefits: ['Direct booking links', 'Automatic reminders', 'No-show reduction', 'Calendar sync', 'Timezone handling', 'Instant confirmations']
      },
      {
        title: 'Follow-up Sequence Automation',
        shortDesc: 'Multi-channel automated engagement sequences.',
        fullDesc: 'Create sophisticated follow-up sequences that run automatically across email, SMS, and WhatsApp. Personalize based on user behavior. Increase conversion rates by 3-5x with perfectly timed touchpoints.',
        benefits: ['Multi-channel sequences', 'Behavior-based triggers', 'Personalization', 'A/B testing', 'Performance analytics', 'Conversion tracking']
      },
      {
        title: 'Cart Abandonment Recovery',
        shortDesc: 'Automated recovery sequences for lost sales.',
        fullDesc: 'Recover 20-30% of abandoned carts automatically. Send personalized recovery messages at the perfect time. Offer discounts, highlight product benefits, or address objections — all without manual work.',
        benefits: ['Automatic detection', 'Personalized messages', 'Smart timing', 'Discount automation', 'Product recommendations', 'Revenue recovery']
      },
      {
        title: 'Invoice & Payment Reminder',
        shortDesc: 'Hands-free payment collection systems.',
        fullDesc: 'Stop chasing payments. Automatically send invoices, payment reminders, and follow-ups. Accept payments directly through WhatsApp or email. Reduce payment cycles from 45 days to 7 days.',
        benefits: ['Automatic invoicing', 'Payment reminders', 'Direct payment links', 'Late payment alerts', 'Payment tracking', 'Faster cash flow']
      },
      {
        title: 'Internal Workflow Automation',
        shortDesc: 'Seamless data bridging across your daily tools.',
        fullDesc: 'Connect your CRM, email, spreadsheets, and tools. Automate data entry, task creation, and notifications. Eliminate manual data transfer and keep everything in sync automatically.',
        benefits: ['Tool integration', 'Data sync', 'Task automation', 'Notification routing', 'Error reduction', 'Team efficiency']
      },
      {
        title: 'Custom AI & Automation',
        shortDesc: 'Bespoke systems engineered for your bottleneck.',
        fullDesc: 'Every business is unique. We engineer custom automation solutions for your specific workflows. From complex approval processes to specialized integrations — we build exactly what you need.',
        benefits: ['Custom logic', 'Deep integrations', 'Scalable architecture', 'Future-proof design', 'Dedicated support', 'Continuous optimization']
      },
    ]
  },
  {
    category: 'AI Voice',
    color: '#60a5fa',
    items: [
      {
        title: 'Inbound AI Voice Agent',
        shortDesc: '24/7 intelligent answering and lead routing.',
        fullDesc: 'Never miss a call again. AI voice agents answer calls 24/7, qualify leads, book appointments, and route to the right team member. Reduce call handling costs by 70% while improving customer satisfaction.',
        benefits: ['24/7 availability', 'Lead qualification', 'Appointment booking', 'Smart routing', 'Call recording', 'Performance analytics']
      },
      {
        title: 'Outbound AI Voice Agent',
        shortDesc: 'Scalable proactive calling and engagement.',
        fullDesc: 'Make thousands of calls simultaneously. AI voice agents conduct surveys, follow-ups, payment reminders, and appointment confirmations. Perfect for campaigns, collections, and customer engagement at scale.',
        benefits: ['Mass calling', 'Campaign automation', 'Survey collection', 'Payment reminders', 'Appointment confirmation', 'Cost efficiency']
      },
      {
        title: 'Custom Voice Agent',
        shortDesc: 'Complex voice logic and deep system integrations.',
        fullDesc: 'Build sophisticated voice agents for complex scenarios. Handle multi-step conversations, access real-time data, integrate with your systems, and provide personalized responses based on customer history.',
        benefits: ['Complex conversations', 'Real-time data access', 'System integration', 'Personalization', 'Advanced logic', 'Custom workflows']
      },
    ]
  },
  {
    category: 'Web',
    color: '#a78bfa',
    items: [
      {
        title: 'Business Website',
        shortDesc: 'Professional, conversion-focused online presence.',
        fullDesc: 'A beautiful, fast website that converts visitors into leads. Built for speed, SEO, and conversions. Includes contact forms, service pages, testimonials, and everything you need to establish credibility online.',
        benefits: ['Mobile responsive', 'SEO optimized', 'Fast loading', 'Contact forms', 'Testimonials', 'Analytics tracking']
      },
      {
        title: 'Landing Page',
        shortDesc: 'High-velocity standalone pages for campaigns.',
        fullDesc: 'Single-purpose pages designed to convert. Perfect for campaigns, product launches, or lead generation. Optimized for a specific audience and action. Includes A/B testing and conversion tracking.',
        benefits: ['Campaign focused', 'High conversion', 'A/B testing', 'Analytics', 'Fast deployment', 'Mobile optimized']
      },
      {
        title: 'Website Redesign',
        shortDesc: 'Total overhaul of speed, structure, and conversion.',
        fullDesc: 'Your website is costing you leads. We redesign for speed, user experience, and conversions. Modern design, faster loading, better navigation, and optimized conversion funnels.',
        benefits: ['Speed improvement', 'UX redesign', 'Conversion optimization', 'Modern design', 'Mobile first', 'SEO boost']
      },
      {
        title: 'Website + Lead Pipeline',
        shortDesc: 'High-converting site fully wired into CRM.',
        fullDesc: 'Your website automatically feeds leads into your CRM. Visitors fill forms, get instant follow-ups via email/WhatsApp, and are automatically qualified. Your sales team only sees hot leads.',
        benefits: ['Auto lead capture', 'CRM integration', 'Instant follow-up', 'Lead qualification', 'Sales efficiency', 'Conversion tracking']
      },
      {
        title: 'E-commerce Store',
        shortDesc: 'Optimized storefront with recovery systems.',
        fullDesc: 'A complete e-commerce solution with product catalog, shopping cart, payment processing, and automated recovery for abandoned carts. Includes inventory management and order tracking.',
        benefits: ['Product catalog', 'Payment processing', 'Cart recovery', 'Inventory management', 'Order tracking', 'Analytics']
      },
      {
        title: 'Custom Web Solution',
        shortDesc: 'Tailored portals, dashboards, and platforms.',
        fullDesc: 'Need something unique? We build custom web applications — internal dashboards, client portals, booking platforms, or specialized tools. Built to scale with your business.',
        benefits: ['Custom design', 'Scalable architecture', 'Real-time data', 'User management', 'Advanced features', 'Future-proof']
      },
    ]
  },
  {
    category: 'Audit & Strategy',
    color: '#4ade80',
    items: [
      {
        title: 'Business Automation Audit',
        shortDesc: 'Comprehensive mapping of operational leaks.',
        fullDesc: 'We map your entire business workflow and identify automation opportunities. Detailed report with ROI projections for each opportunity, prioritized roadmap, and implementation timeline.',
        benefits: ['Workflow mapping', 'Opportunity identification', 'ROI projections', 'Prioritized roadmap', 'Implementation plan', 'Cost analysis']
      },
      {
        title: 'Conversion & Website Audit',
        shortDesc: 'Deep analysis of digital friction points.',
        fullDesc: 'Why aren\'t visitors converting? We analyze your website, landing pages, and funnels to identify friction points. Detailed report with specific recommendations to improve conversion rates.',
        benefits: ['Funnel analysis', 'Friction identification', 'UX recommendations', 'Copy optimization', 'CTA improvements', 'Conversion roadmap']
      },
    ]
  },
];

export default function SolutionsPage() {
  const [selectedSolution, setSelectedSolution] = useState(null);

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '400px', zIndex: 0 }}>
        <Aurora colorStops={AURORA_COLORS} amplitude={0.8} blend={0.4} speed={0.8} />
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <WebsiteNav />

      {/* Header */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px 60px', textAlign: 'center' }}>
        <p className="section-tag fade-up" style={{ marginBottom: 16 }}>Our Solutions</p>
        <h1 className="fade-up" style={{ fontSize: 'clamp(36px,5vw,64px)', fontWeight: 700, letterSpacing: '-2px', color: '#f0f0f0', marginBottom: 20, animationDelay: '0.1s' }}>
          Complete Automation<br /><span className="gold-text" style={{ background: 'linear-gradient(135deg, #7cff67, #B497CF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Solutions for Every Need</span>
        </h1>
        <p className="fade-up" style={{ color: '#555', fontSize: 18, maxWidth: 600, margin: '0 auto', animationDelay: '0.2s' }}>
          From WhatsApp automation to AI voice agents to custom web platforms — we have the solution for your business.
        </p>
      </section>

      {/* Solutions Grid */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 80px' }}>
        {solutionsData.map((category, catIdx) => (
          <div key={category.category} style={{ marginBottom: catIdx !== solutionsData.length - 1 ? 60 : 0 }}>
            {/* Category Header */}
            <div className="slide-in-left" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32, animationDelay: `${catIdx * 0.1}s` }}>
              <div style={{ width: 4, height: 32, background: category.color, borderRadius: 2 }} />
              <h2 style={{ fontSize: 28, fontWeight: 700, color: '#f0f0f0', letterSpacing: '-0.5px' }}>
                {category.category}
              </h2>
            </div>

            {/* Solutions Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
              {category.items.map((item, idx) => (
                <div
                  key={item.title}
                  className="card scale-in"
                  onClick={() => setSelectedSolution(item)}
                  style={{
                    padding: 28,
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    animationDelay: `${idx * 0.05}s`,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                    e.currentTarget.style.boxShadow = `0 20px 40px ${category.color}20`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.5)';
                  }}
                >
                  {/* Animated background gradient */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `linear-gradient(135deg, ${category.color}10, transparent)`,
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    pointerEvents: 'none',
                  }} className="gradient-bg" />

                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 16 }}>
                      <div style={{
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                        background: `${category.color}15`,
                        border: `1px solid ${category.color}30`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        <CheckCircle2 size={20} color={category.color} />
                      </div>
                      <h3 style={{ fontSize: 16, fontWeight: 600, color: '#f0f0f0', lineHeight: 1.3 }}>
                        {item.title}
                      </h3>
                    </div>
                    <p style={{ color: '#666', fontSize: 14, lineHeight: 1.6, flex: 1 }}>
                      {item.shortDesc}
                    </p>
                    <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 8, color: category.color, fontSize: 13, fontWeight: 600 }}>
                      Click to learn more <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 80px', textAlign: 'center' }}>
        <div className="fade-up" style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 20, padding: 56 }}>
          <h2 style={{ fontSize: 36, fontWeight: 700, color: '#f0f0f0', letterSpacing: '-1px', marginBottom: 12 }}>
            Not Sure Which Solution You Need?
          </h2>
          <p style={{ color: '#555', fontSize: 16, marginBottom: 32 }}>
            Book a free strategy call and we'll recommend the perfect solution for your business.
          </p>
          <button className="btn-gold" onClick={() => window.open('https://calendly.com', '_blank')} style={{ fontSize: 15, padding: '14px 32px' }}>
            Book Free Strategy Call <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* Modal */}
      {selectedSolution && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50,
          padding: '20px',
          animation: 'fadeUp 0.3s ease-out',
        }} onClick={() => setSelectedSolution(null)}>
          <div
            className="card scale-in"
            style={{
              maxWidth: 600,
              maxHeight: '90vh',
              overflow: 'auto',
              padding: 40,
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedSolution(null)}
              style={{
                position: 'absolute',
                top: 20,
                right: 20,
                background: 'none',
                border: 'none',
                color: '#888',
                cursor: 'pointer',
                fontSize: 24,
                padding: 0,
                width: 32,
                height: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <X size={24} />
            </button>

            {/* Content */}
            <h2 style={{ fontSize: 28, fontWeight: 700, color: '#f0f0f0', marginBottom: 16 }}>
              {selectedSolution.title}
            </h2>

            <p style={{ color: '#888', fontSize: 14, marginBottom: 24, fontStyle: 'italic' }}>
              {selectedSolution.shortDesc}
            </p>

            <div style={{ background: '#0e0e0e', border: '1px solid #1a1a1a', borderRadius: 12, padding: 20, marginBottom: 24 }}>
              <h3 style={{ fontSize: 14, fontWeight: 600, color: '#7cff67', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                What You Get
              </h3>
              <p style={{ color: '#888', fontSize: 15, lineHeight: 1.8 }}>
                {selectedSolution.fullDesc}
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: 14, fontWeight: 600, color: '#f0f0f0', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Key Benefits
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {selectedSolution.benefits.map((benefit) => (
                  <div key={benefit} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <CheckCircle2 size={16} color="#7cff67" style={{ marginTop: 2, flexShrink: 0 }} />
                    <span style={{ color: '#888', fontSize: 13 }}>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <button
              className="btn-gold"
              onClick={() => window.open('https://calendly.com', '_blank')}
              style={{ width: '100%', justifyContent: 'center', marginTop: 28, fontSize: 14, padding: '12px 24px' }}
            >
              Get Started <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      <WebsiteFooter />
      </div>
    </div>
  );
}
