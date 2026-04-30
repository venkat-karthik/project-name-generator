import { useState, useEffect } from 'react';
import { Calendar, Mail, Phone, User, Trash2, CheckCircle, Clock, MessageSquare, X } from 'lucide-react';
import { listenToBookings, updateBookingStatus, deleteBooking, addBookingNotes } from '../../services/bookingsService';

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [notes, setNotes] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const unsubscribe = listenToBookings((data) => {
      setBookings(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await updateBookingStatus(bookingId, newStatus);
    } catch (error) {
      alert('Failed to update status');
    }
  };

  const handleAddNotes = async (bookingId) => {
    if (!notes.trim()) return;
    try {
      await addBookingNotes(bookingId, notes);
      setNotes('');
      setSelectedBooking(null);
    } catch (error) {
      alert('Failed to add notes');
    }
  };

  const handleDelete = async (bookingId) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await deleteBooking(bookingId);
      } catch (error) {
        alert('Failed to delete booking');
      }
    }
  };

  const filteredBookings = filter === 'all' 
    ? bookings 
    : bookings.filter(b => b.status === filter);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#60a5fa';
      case 'confirmed': return '#4ade80';
      case 'completed': return '#3b82f6';
      case 'cancelled': return '#ef4444';
      default: return '#888';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock size={16} />;
      case 'confirmed': return <CheckCircle size={16} />;
      case 'completed': return <CheckCircle size={16} />;
      case 'cancelled': return <X size={16} />;
      default: return null;
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 700, color: '#f0f0f0', marginBottom: '8px' }}>Bookings</h1>
        <p style={{ color: '#666', fontSize: '14px' }}>Manage all client booking requests</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        {[
          { label: 'Total Bookings', value: bookings.length, color: '#3b82f6' },
          { label: 'Pending', value: bookings.filter(b => b.status === 'pending').length, color: '#60a5fa' },
          { label: 'Confirmed', value: bookings.filter(b => b.status === 'confirmed').length, color: '#4ade80' },
          { label: 'Completed', value: bookings.filter(b => b.status === 'completed').length, color: '#3b82f6' },
        ].map(stat => (
          <div key={stat.label} style={{ background: '#111', border: '1px solid #1a1a1a', borderRadius: '12px', padding: '20px' }}>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px', textTransform: 'uppercase', fontWeight: 600 }}>{stat.label}</div>
            <div style={{ fontSize: '32px', fontWeight: 700, color: stat.color }}>{stat.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              background: filter === status ? '#3b82f6' : '#1a1a1a',
              color: filter === status ? '#fff' : '#888',
              cursor: 'pointer',
              fontWeight: 500,
              fontSize: '13px',
              transition: 'all 0.2s',
              textTransform: 'capitalize',
            }}
          >
            {status}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>Loading bookings...</div>
      ) : filteredBookings.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>No bookings found</div>
      ) : (
        <div style={{ display: 'grid', gap: '16px' }}>
          {filteredBookings.map(booking => (
            <div key={booking.id} style={{ background: '#111', border: '1px solid #1a1a1a', borderRadius: '12px', padding: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '20px', marginBottom: '16px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <User size={20} color="#3b82f6" />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#f0f0f0' }}>{booking.name}</h3>
                      <p style={{ fontSize: '12px', color: '#666' }}>Booking ID: {booking.id.slice(0, 8)}</p>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#888' }}>
                      <Mail size={14} />
                      <a href={`mailto:${booking.email}`} style={{ color: '#3b82f6', textDecoration: 'none' }}>{booking.email}</a>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#888' }}>
                      <Phone size={14} />
                      <a href={`tel:${booking.phone}`} style={{ color: '#3b82f6', textDecoration: 'none' }}>{booking.phone}</a>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#888' }}>
                      <Calendar size={14} />
                      {booking.date} at {booking.time}
                    </div>
                  </div>

                  {booking.message && (
                    <div style={{ background: '#0e0e0e', border: '1px solid #1a1a1a', borderRadius: '8px', padding: '12px', marginBottom: '12px' }}>
                      <p style={{ fontSize: '12px', color: '#666', marginBottom: '4px', fontWeight: 600 }}>Message:</p>
                      <p style={{ fontSize: '13px', color: '#888', lineHeight: '1.5' }}>{booking.message}</p>
                    </div>
                  )}

                  {booking.notes && (
                    <div style={{ background: '#0e0e0e', border: '1px solid #1a1a1a', borderRadius: '8px', padding: '12px' }}>
                      <p style={{ fontSize: '12px', color: '#666', marginBottom: '4px', fontWeight: 600 }}>Notes:</p>
                      <p style={{ fontSize: '13px', color: '#888', lineHeight: '1.5' }}>{booking.notes}</p>
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '150px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', background: '#0e0e0e', borderRadius: '8px', color: getStatusColor(booking.status), fontWeight: 600, fontSize: '13px' }}>
                    {getStatusIcon(booking.status)}
                    {booking.status}
                  </div>

                  <select
                    value={booking.status}
                    onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                    style={{
                      padding: '8px 12px',
                      background: '#0e0e0e',
                      border: '1px solid #1a1a1a',
                      borderRadius: '8px',
                      color: '#f0f0f0',
                      fontSize: '12px',
                      cursor: 'pointer',
                    }}
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>

                  <button
                    onClick={() => setSelectedBooking(booking.id === selectedBooking ? null : booking.id)}
                    style={{
                      padding: '8px 12px',
                      background: '#1a1a1a',
                      border: '1px solid #2a2a2a',
                      borderRadius: '8px',
                      color: '#3b82f6',
                      fontSize: '12px',
                      cursor: 'pointer',
                      fontWeight: 500,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                    }}
                  >
                    <MessageSquare size={14} />
                    Notes
                  </button>

                  <button
                    onClick={() => handleDelete(booking.id)}
                    style={{
                      padding: '8px 12px',
                      background: '#ef4444',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '12px',
                      cursor: 'pointer',
                      fontWeight: 500,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                    }}
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </div>

              {selectedBooking === booking.id && (
                <div style={{ borderTop: '1px solid #1a1a1a', paddingTop: '16px' }}>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add notes about this booking..."
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: '#0e0e0e',
                      border: '1px solid #1a1a1a',
                      borderRadius: '8px',
                      color: '#f0f0f0',
                      fontSize: '13px',
                      minHeight: '80px',
                      resize: 'vertical',
                      marginBottom: '12px',
                    }}
                  />
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => handleAddNotes(booking.id)}
                      style={{
                        padding: '8px 16px',
                        background: '#3b82f6',
                        border: 'none',
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '12px',
                        cursor: 'pointer',
                        fontWeight: 600,
                      }}
                    >
                      Save Notes
                    </button>
                    <button
                      onClick={() => { setSelectedBooking(null); setNotes(''); }}
                      style={{
                        padding: '8px 16px',
                        background: '#1a1a1a',
                        border: '1px solid #2a2a2a',
                        borderRadius: '8px',
                        color: '#888',
                        fontSize: '12px',
                        cursor: 'pointer',
                        fontWeight: 600,
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
