import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, User, Share2, CheckCircle } from 'lucide-react';
import WebsiteNav from '../../components/WebsiteNav';
import WebsiteFooter from '../../components/WebsiteFooter';
import Aurora from '../../components/Aurora';
import { useStore } from '../../store/useStore';
import { subscribeToNewsletter, checkEmailSubscription } from '../../services/newsletterService';

const AURORA_COLORS = ['#7cff67', '#B497CF', '#5227FF'];

export default function BlogDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const blogPosts = useStore(s => s.blogPosts);
  const post = blogPosts.find(p => p.id === parseInt(id));

  const [email, setEmail] = useState('');
  const [subscribeLoading, setSubscribeLoading] = useState(false);
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);
  const [subscribeError, setSubscribeError] = useState('');

  if (!post) {
    return (
      <div style={{ minHeight: '100vh', background: '#0a0a0a', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '400px', zIndex: 0 }}>
          <Aurora colorStops={AURORA_COLORS} amplitude={0.8} blend={0.4} speed={0.8} />
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <WebsiteNav />
          <section style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
            <h1 style={{ fontSize: 32, fontWeight: 700, color: '#f0f0f0', marginBottom: 16 }}>Blog Post Not Found</h1>
            <p style={{ color: '#888', marginBottom: 32 }}>The blog post you're looking for doesn't exist.</p>
            <button
              onClick={() => navigate('/blog')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 24px',
                background: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              <ArrowLeft size={16} />
              Back to Blog
            </button>
          </section>
          <WebsiteFooter />
        </div>
      </div>
    );
  }

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) {
      setSubscribeError('Please enter your email');
      return;
    }

    setSubscribeLoading(true);
    setSubscribeError('');

    try {
      // Check if already subscribed
      const existing = await checkEmailSubscription(email);
      if (existing) {
        setSubscribeError('This email is already subscribed!');
        setSubscribeLoading(false);
        return;
      }

      await subscribeToNewsletter(email);
      setSubscribeSuccess(true);
      setEmail('');
      setTimeout(() => setSubscribeSuccess(false), 3000);
    } catch (error) {
      setSubscribeError('Failed to subscribe. Please try again.');
      console.error('Subscribe error:', error);
    } finally {
      setSubscribeLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '400px', zIndex: 0 }}>
        <Aurora colorStops={AURORA_COLORS} amplitude={0.8} blend={0.4} speed={0.8} />
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <WebsiteNav />

        {/* Back Button */}
        <section style={{ maxWidth: 1200, margin: '0 auto', padding: '40px clamp(16px, 5vw, 24px) 0' }}>
          <button
            onClick={() => navigate('/blog')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 16px',
              background: '#111',
              border: '1px solid #1a1a1a',
              borderRadius: 8,
              color: '#888',
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: 600,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#2a2a2a';
              e.currentTarget.style.color = '#f0f0f0';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#1a1a1a';
              e.currentTarget.style.color = '#888';
            }}
          >
            <ArrowLeft size={14} />
            Back to Blog
          </button>
        </section>

        {/* Hero Section */}
        <section style={{ maxWidth: 900, margin: '0 auto', padding: 'clamp(40px, 8vw, 80px) clamp(16px, 5vw, 24px)' }}>
          <div style={{ marginBottom: 'clamp(20px, 5vw, 32px)' }}>
            <span
              style={{
                display: 'inline-block',
                padding: '6px 14px',
                background: 'rgba(124, 255, 103, 0.1)',
                border: '1px solid rgba(124, 255, 103, 0.3)',
                borderRadius: 999,
                color: '#7cff67',
                fontSize: 12,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: 16,
              }}
            >
              {post.category}
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(28px, 6vw, 48px)',
            fontWeight: 700,
            lineHeight: 1.2,
            color: '#f0f0f0',
            marginBottom: 24,
          }}>
            {post.title}
          </h1>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'clamp(16px, 3vw, 24px)',
            alignItems: 'center',
            paddingBottom: 24,
            borderBottom: '1px solid #1a1a1a',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: '#1a1a1a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                fontWeight: 700,
                color: '#3b82f6',
              }}>
                {post.author.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#f0f0f0' }}>{post.author}</div>
                <div style={{ fontSize: 12, color: '#666' }}>{post.date}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginLeft: 'auto', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#888', fontSize: 13 }}>
                <Clock size={14} />
                {post.readTime} min read
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 clamp(16px, 5vw, 24px)' }}>
          <div style={{
            width: '100%',
            height: 'clamp(250px, 50vw, 500px)',
            background: `url(${post.image}) center/cover`,
            borderRadius: 16,
            overflow: 'hidden',
            marginBottom: 'clamp(40px, 8vw, 60px)',
            border: '1px solid #1a1a1a',
          }}>
            <div style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(124, 255, 103, 0.05))',
            }} />
          </div>
        </section>

        {/* Content */}
        <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 clamp(16px, 5vw, 24px) clamp(40px, 8vw, 80px)' }}>
          <div style={{ lineHeight: 1.8, color: '#ccc', fontSize: 'clamp(14px, 2vw, 16px)' }}>
            {post.fullContent && post.fullContent.split('\n\n').map((paragraph, idx) => (
              <p key={idx} style={{ marginBottom: 24 }}>
                {paragraph}
              </p>
            ))}
          </div>

          {/* Key Takeaways */}
          {post.keyTakeaways && (
            <div style={{
              background: '#111',
              border: '1px solid #1a1a1a',
              borderRadius: 16,
              padding: 'clamp(20px, 4vw, 32px)',
              marginTop: 'clamp(40px, 8vw, 60px)',
              marginBottom: 'clamp(40px, 8vw, 60px)',
            }}>
              <h3 style={{ fontSize: 'clamp(16px, 3vw, 20px)', fontWeight: 700, color: '#f0f0f0', marginBottom: 20 }}>
                Key Takeaways
              </h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {post.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} style={{
                    display: 'flex',
                    gap: 12,
                    color: '#ccc',
                    fontSize: 'clamp(13px, 2vw, 15px)',
                    lineHeight: 1.6,
                  }}>
                    <span style={{ color: '#7cff67', fontWeight: 700, flexShrink: 0 }}>✓</span>
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* Newsletter CTA */}
        <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 clamp(16px, 5vw, 24px) clamp(40px, 8vw, 80px)' }}>
          <div style={{
            background: '#111',
            border: '1px solid #1a1a1a',
            borderRadius: 16,
            padding: 'clamp(24px, 5vw, 40px)',
            textAlign: 'center',
          }}>
            <h3 style={{ fontSize: 'clamp(18px, 4vw, 24px)', fontWeight: 700, color: '#f0f0f0', marginBottom: 12 }}>
              Get AI Automation Tips Weekly
            </h3>
            <p style={{ color: '#888', fontSize: 'clamp(13px, 2vw, 15px)', marginBottom: 24, lineHeight: 1.6 }}>
              Join 500+ business owners getting practical AI automation insights delivered to your inbox every week.
            </p>

            {subscribeSuccess ? (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: '12px 20px',
                background: 'rgba(74, 222, 128, 0.1)',
                border: '1px solid rgba(74, 222, 128, 0.3)',
                borderRadius: 8,
                color: '#4ade80',
                fontSize: 14,
                fontWeight: 600,
              }}>
                <CheckCircle size={16} />
                Successfully subscribed!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={subscribeLoading}
                  style={{
                    padding: '10px 16px',
                    background: '#0e0e0e',
                    border: '1px solid #1a1a1a',
                    borderRadius: 8,
                    color: '#f0f0f0',
                    fontSize: 14,
                    minWidth: '200px',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                  onBlur={(e) => e.target.style.borderColor = '#1a1a1a'}
                />
                <button
                  type="submit"
                  disabled={subscribeLoading}
                  style={{
                    padding: '10px 24px',
                    background: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    fontWeight: 600,
                    cursor: subscribeLoading ? 'not-allowed' : 'pointer',
                    opacity: subscribeLoading ? 0.6 : 1,
                    transition: 'all 0.2s ease',
                  }}
                >
                  {subscribeLoading ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
            )}

            {subscribeError && (
              <div style={{
                marginTop: 12,
                padding: '8px 12px',
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: 6,
                color: '#ef4444',
                fontSize: 12,
              }}>
                {subscribeError}
              </div>
            )}
          </div>
        </section>

        {/* Related Posts */}
        <section style={{ maxWidth: 900, margin: '0 auto', padding: 'clamp(40px, 8vw, 80px) clamp(16px, 5vw, 24px)' }}>
          <h3 style={{ fontSize: 'clamp(18px, 4vw, 24px)', fontWeight: 700, color: '#f0f0f0', marginBottom: 32 }}>
            More from {post.category}
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 20,
          }}>
            {useStore(s => s.blogPosts)
              .filter(p => p.category === post.category && p.id !== post.id)
              .slice(0, 3)
              .map(relatedPost => (
                <div
                  key={relatedPost.id}
                  onClick={() => navigate(`/blog/${relatedPost.id}`)}
                  style={{
                    background: '#111',
                    border: '1px solid #1a1a1a',
                    borderRadius: 12,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#2a2a2a';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#1a1a1a';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{
                    width: '100%',
                    height: 150,
                    background: `url(${relatedPost.image}) center/cover`,
                  }} />
                  <div style={{ padding: 16 }}>
                    <h4 style={{ fontSize: 14, fontWeight: 600, color: '#f0f0f0', marginBottom: 8, lineHeight: 1.3 }}>
                      {relatedPost.title}
                    </h4>
                    <p style={{ fontSize: 12, color: '#666' }}>{relatedPost.readTime} min read</p>
                  </div>
                </div>
              ))}
          </div>
        </section>

        <WebsiteFooter />
      </div>
    </div>
  );
}
