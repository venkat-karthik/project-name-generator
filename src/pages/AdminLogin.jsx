import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';
import { Zap, AlertCircle, Loader } from 'lucide-react';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { signInWithGoogle, loading, error } = useAdminAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState(null);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setLocalError(null);
      console.log('Login page: Starting sign-in');
      await signInWithGoogle();
      console.log('Login page: Sign-in successful, navigating to dashboard');
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Login page: Sign-in error:', err);
      const errorMsg = err.message || 'Failed to sign in. Please check your email and try again.';
      setLocalError(errorMsg);
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <Loader size={32} color="#c9a84c" style={{ animation: 'spin 1s linear infinite', margin: '0 auto 16px' }} />
          <p style={{ color: '#888' }}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
            <div style={{ width: 40, height: 40, background: 'linear-gradient(135deg,#c9a84c,#e4c677)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={20} color="#0a0a0a" fill="#0a0a0a" />
            </div>
            <span style={{ fontWeight: 700, fontSize: 20, letterSpacing: '-0.5px', color: '#f0f0f0' }}>Velfound</span>
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#f0f0f0', marginBottom: 8, letterSpacing: '-0.5px' }}>Admin Access</h1>
          <p style={{ color: '#555', fontSize: 14 }}>Sign in with your Google account to access the admin panel</p>
        </div>

        {/* Error Message */}
        {(error || localError) && (
          <div style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: 12, padding: 16, marginBottom: 24, display: 'flex', gap: 12 }}>
            <AlertCircle size={20} color="#f87171" style={{ flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#f87171', marginBottom: 4 }}>Access Denied</p>
              <p style={{ fontSize: 12, color: '#f87171', lineHeight: 1.5 }}>
                {error || localError}
              </p>
            </div>
          </div>
        )}

        {/* Sign In Button */}
        <button
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          style={{
            width: '100%',
            background: 'linear-gradient(135deg, #c9a84c, #e4c677)',
            color: '#0a0a0a',
            fontWeight: 600,
            border: 'none',
            borderRadius: 12,
            padding: '14px 20px',
            fontSize: 15,
            cursor: isLoading ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            transition: 'all 0.2s ease',
            opacity: isLoading ? 0.7 : 1,
          }}
          onMouseEnter={(e) => !isLoading && (e.currentTarget.style.filter = 'brightness(1.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.filter = 'brightness(1)')}
        >
          {isLoading ? (
            <>
              <Loader size={16} style={{ animation: 'spin 1s linear infinite' }} />
              Signing in...
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="1" />
                <path d="M12 1v6m0 6v6" />
              </svg>
              Sign in with Google
            </>
          )}
        </button>

        {/* Info Box */}
        <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, padding: 16, marginTop: 24 }}>
          <p style={{ fontSize: 12, color: '#888', lineHeight: 1.6 }}>
            <strong style={{ color: '#c9a84c' }}>Admin Access Only:</strong> This page is restricted to authorized administrators only. If you believe you should have access, please contact the administrator.
          </p>
        </div>

        {/* Back to Website */}
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <a href="/" style={{ color: '#c9a84c', fontSize: 13, textDecoration: 'none', fontWeight: 500 }}>
            ← Back to Website
          </a>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
