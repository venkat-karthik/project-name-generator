import { useState } from 'react';
import { X, Calendar, Clock, User, Mail, Phone } from 'lucide-react';
import { addBooking } from '../services/bookingsService';

export default function BookingModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Add booking using the service
      await addBooking(formData);

      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', date: '', time: '', message: '' });
      
      // Close modal after 2 seconds
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 2000);
    } catch (error) {
      console.error('Booking error:', error);
      alert('Failed to book. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.7)',
      backdropFilter: 'blur(4px)',
      zIndex: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    }}>
      <div style={{
        background: '#111',
        border: '1px solid #222',
        borderRadius: '16px',
        padding: '32px',
        width: '100%',
        maxWidth: '500px',
        maxHeight: '90vh',
        overflowY: 'auto',
        animation: 'fadeUp 0.3s ease-out',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#f0f0f0' }}>Book a Call</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#777', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {success ? (
          <div style={{
            textAlign: 'center',
            padding: '40px 20px',
            animation: 'fadeUp 0.3s ease-out',
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              background: 'linear-gradient(135deg, #c9a84c, #e4c677)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
            }}>
              <Calendar size={32} color="#0a0a0a" />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#f0f0f0', marginBottom: '8px' }}>Booking Confirmed!</h3>
            <p style={{ color: '#888', fontSize: '14px' }}>We'll contact you shortly to confirm your call.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Name */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#888', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
                style={{
                  background: '#0e0e0e',
                  border: '1px solid #1a1a1a',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  color: '#f0f0f0',
                  fontSize: '14px',
                  width: '100%',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                }}
                onFocus={(e) => e.target.style.borderColor = '#c9a84c'}
                onBlur={(e) => e.target.style.borderColor = '#1a1a1a'}
              />
            </div>

            {/* Email */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#888', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
                style={{
                  background: '#0e0e0e',
                  border: '1px solid #1a1a1a',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  color: '#f0f0f0',
                  fontSize: '14px',
                  width: '100%',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                }}
                onFocus={(e) => e.target.style.borderColor = '#c9a84c'}
                onBlur={(e) => e.target.style.borderColor = '#1a1a1a'}
              />
            </div>

            {/* Phone */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#888', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+91 XXXXX XXXXX"
                style={{
                  background: '#0e0e0e',
                  border: '1px solid #1a1a1a',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  color: '#f0f0f0',
                  fontSize: '14px',
                  width: '100%',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                }}
                onFocus={(e) => e.target.style.borderColor = '#c9a84c'}
                onBlur={(e) => e.target.style.borderColor = '#1a1a1a'}
              />
            </div>

            {/* Date */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#888', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Preferred Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                style={{
                  background: '#0e0e0e',
                  border: '1px solid #1a1a1a',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  color: '#f0f0f0',
                  fontSize: '14px',
                  width: '100%',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                }}
                onFocus={(e) => e.target.style.borderColor = '#c9a84c'}
                onBlur={(e) => e.target.style.borderColor = '#1a1a1a'}
              />
            </div>

            {/* Time */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#888', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Preferred Time
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                style={{
                  background: '#0e0e0e',
                  border: '1px solid #1a1a1a',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  color: '#f0f0f0',
                  fontSize: '14px',
                  width: '100%',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                }}
                onFocus={(e) => e.target.style.borderColor = '#c9a84c'}
                onBlur={(e) => e.target.style.borderColor = '#1a1a1a'}
              />
            </div>

            {/* Message */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#888', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Message (Optional)
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your project..."
                style={{
                  background: '#0e0e0e',
                  border: '1px solid #1a1a1a',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  color: '#f0f0f0',
                  fontSize: '14px',
                  width: '100%',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  resize: 'vertical',
                  minHeight: '80px',
                }}
                onFocus={(e) => e.target.style.borderColor = '#c9a84c'}
                onBlur={(e) => e.target.style.borderColor = '#1a1a1a'}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                background: loading ? '#666' : 'linear-gradient(135deg, #c9a84c, #e4c677)',
                color: '#0a0a0a',
                fontWeight: 600,
                borderRadius: '999px',
                padding: '12px 28px',
                fontSize: '14px',
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                marginTop: '8px',
              }}
              onMouseEnter={(e) => !loading && (e.target.style.filter = 'brightness(1.1)')}
              onMouseLeave={(e) => !loading && (e.target.style.filter = 'brightness(1)')}
            >
              {loading ? 'Booking...' : 'Confirm Booking'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
