import { useState } from 'react';
import { Shield, Search, Filter } from 'lucide-react';
import { useStore } from '../../store/useStore';

export default function AuditLog() {
  const { auditLogs, members, currentUser } = useStore();
  const [search, setSearch] = useState('');
  const [filterUser, setFilterUser] = useState('');

  const isFounder = currentUser?.accessLevel === 'founder';

  if (!isFounder) {
    return (
      <div style={{ padding: 40, textAlign: 'center' }}>
        <Shield size={48} color="#f87171" style={{ margin: '0 auto 16px' }} />
        <h2 style={{ fontSize: 18, fontWeight: 700, color: '#f0f0f0', marginBottom: 8 }}>Access Denied</h2>
        <p style={{ color: '#555', fontSize: 14 }}>Only founders can view audit logs.</p>
      </div>
    );
  }

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(search.toLowerCase());
    const matchesUser = !filterUser || log.userId === parseInt(filterUser);
    return matchesSearch && matchesUser;
  });

  const getMemberName = (userId) => {
    const member = members.find(m => m.id === userId);
    return member?.name || 'Unknown User';
  };

  const getMemberAvatar = (userId) => {
    const member = members.find(m => m.id === userId);
    return member?.avatar || '?';
  };

  const getActionColor = (action) => {
    if (action.includes('Approved')) return '#4ade80';
    if (action.includes('Created')) return '#60a5fa';
    if (action.includes('Updated')) return '#c9a84c';
    if (action.includes('Deleted')) return '#f87171';
    if (action.includes('Moved')) return '#a78bfa';
    return '#888';
  };

  const getActionIcon = (action) => {
    if (action.includes('Approved')) return '✓';
    if (action.includes('Created')) return '+';
    if (action.includes('Updated')) return '✎';
    if (action.includes('Deleted')) return '✕';
    if (action.includes('Moved')) return '→';
    return '•';
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#f0f0f0', letterSpacing: '-0.5px' }}>Audit Log</h1>
        <p style={{ color: '#555', fontSize: 14, marginTop: 4 }}>Track all system actions and changes</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 24 }}>
        {[
          { label: 'Total Actions', value: auditLogs.length, color: '#c9a84c' },
          { label: 'This Month', value: auditLogs.filter(l => {
            const date = new Date(l.timestamp);
            const now = new Date();
            return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
          }).length, color: '#60a5fa' },
          { label: 'Active Users', value: new Set(auditLogs.map(l => l.userId)).size, color: '#4ade80' },
        ].map(s => (
          <div key={s.label} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, padding: 16 }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: s.color, letterSpacing: '-1px', marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: 12, color: '#555' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Search & Filter */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#444' }} />
          <input
            type="text"
            placeholder="Search actions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input"
            style={{ paddingLeft: 40 }}
          />
        </div>
        <select
          value={filterUser}
          onChange={(e) => setFilterUser(e.target.value)}
          className="input"
          style={{ width: 200 }}
        >
          <option value="">All Users</option>
          {members.filter(m => m.active).map(m => (
            <option key={m.id} value={m.id}>{m.name}</option>
          ))}
        </select>
      </div>

      {/* Audit Log Table */}
      <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1a1a1a', background: '#0e0e0e' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.05em' }}>User</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Action</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Timestamp</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map(log => {
                const actionColor = getActionColor(log.action);
                const actionIcon = getActionIcon(log.action);
                const timestamp = new Date(log.timestamp);
                const now = new Date();
                const diffMs = now - timestamp;
                const diffMins = Math.floor(diffMs / 60000);
                const diffHours = Math.floor(diffMs / 3600000);
                const diffDays = Math.floor(diffMs / 86400000);
                
                let timeAgo = '';
                if (diffMins < 1) timeAgo = 'Just now';
                else if (diffMins < 60) timeAgo = `${diffMins}m ago`;
                else if (diffHours < 24) timeAgo = `${diffHours}h ago`;
                else if (diffDays < 7) timeAgo = `${diffDays}d ago`;
                else timeAgo = timestamp.toLocaleDateString('en-IN');

                return (
                  <tr key={log.id} className="table-row">
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#c9a84c,#e4c677)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#0a0a0a' }}>
                          {getMemberAvatar(log.userId)}
                        </div>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: '#f0f0f0' }}>{getMemberName(log.userId)}</div>
                          <div style={{ fontSize: 11, color: '#444', marginTop: 2 }}>ID: {log.userId}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 24, height: 24, borderRadius: '50%', background: `${actionColor}15`, border: `1px solid ${actionColor}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: actionColor }}>
                          {actionIcon}
                        </div>
                        <span style={{ fontSize: 13, color: '#f0f0f0' }}>{log.action}</span>
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ fontSize: 12, color: '#888' }}>
                        {timestamp.toLocaleString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </div>
                      <div style={{ fontSize: 11, color: '#444', marginTop: 2 }}>{timeAgo}</div>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span className="badge" style={{ background: `${actionColor}15`, color: actionColor, border: `1px solid ${actionColor}30` }}>
                        Completed
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredLogs.length === 0 && (
          <div style={{ padding: 40, textAlign: 'center', color: '#555' }}>
            <Shield size={32} style={{ margin: '0 auto 12px', opacity: 0.5 }} />
            <p>No audit logs found.</p>
          </div>
        )}
      </div>

      {/* Legend */}
      <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, padding: 20, marginTop: 24 }}>
        <h3 style={{ fontSize: 13, fontWeight: 600, color: '#f0f0f0', marginBottom: 12 }}>Action Types</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12 }}>
          {[
            { icon: '✓', label: 'Approved', color: '#4ade80' },
            { icon: '+', label: 'Created', color: '#60a5fa' },
            { icon: '✎', label: 'Updated', color: '#c9a84c' },
            { icon: '✕', label: 'Deleted', color: '#f87171' },
            { icon: '→', label: 'Moved', color: '#a78bfa' },
          ].map(a => (
            <div key={a.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: `${a.color}15`, border: `1px solid ${a.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: a.color }}>
                {a.icon}
              </div>
              <span style={{ fontSize: 12, color: '#888' }}>{a.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
