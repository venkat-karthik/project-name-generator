import { useState } from 'react';
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, FolderKanban, TrendingUp, DollarSign,
  BarChart3, AlertTriangle, UserCog, FileText, Zap, Bell, ChevronDown,
  LogOut, Menu, X, ExternalLink, Shield
} from 'lucide-react';
import { useStore } from '../store/useStore';

const navItems = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/crm', icon: FolderKanban, label: 'CRM / Leads' },
  { to: '/admin/projects', icon: FileText, label: 'Projects' },
  { to: '/admin/team', icon: TrendingUp, label: 'Team Performance' },
  { to: '/admin/earnings', icon: DollarSign, label: 'Earnings' },
  { to: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/admin/disputes', icon: AlertTriangle, label: 'Disputes' },
];

const founderOnly = [
  { to: '/admin/members', icon: UserCog, label: 'Member Management' },
  { to: '/admin/blog', icon: Zap, label: 'Blog Manager' },
  { to: '/admin/audit', icon: Shield, label: 'Audit Log' },
];

const roles = ['founder', 'core', 'viewer'];

export default function AdminLayout() {
  const { currentUser, members, notifications, setCurrentUser } = useStore();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifOpen, setNotifOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const unread = notifications.filter(n => !n.read).length;

  const isFounder = currentUser?.accessLevel === 'founder';

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#080808', overflow: 'hidden' }}>
      {/* Sidebar */}
      <aside style={{
        width: sidebarOpen ? 220 : 60, flexShrink: 0, background: '#0a0a0a',
        borderRight: '1px solid #141414', display: 'flex', flexDirection: 'column',
        transition: 'width 0.2s ease', overflow: 'hidden'
      }}>
        {/* Logo */}
        <div style={{ padding: '16px 16px', borderBottom: '1px solid #141414', display: 'flex', alignItems: 'center', gap: 10, minHeight: 60 }}>
          <div style={{ width: 28, height: 28, flexShrink: 0, background: 'linear-gradient(135deg,#c9a84c,#e4c677)', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Zap size={14} color="#0a0a0a" fill="#0a0a0a" />
          </div>
          {sidebarOpen && <span style={{ fontWeight: 700, fontSize: 15, letterSpacing: '-0.3px', color: '#f0f0f0', whiteSpace: 'nowrap' }}>Velfound</span>}
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '12px 8px', overflowY: 'auto' }}>
          <div style={{ marginBottom: 8 }}>
            {sidebarOpen && <p style={{ fontSize: 10, color: '#333', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 8px', marginBottom: 4 }}>Main</p>}
            {navItems.map(item => (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`} style={{ justifyContent: sidebarOpen ? 'flex-start' : 'center' }} title={!sidebarOpen ? item.label : undefined}>
                <item.icon size={16} style={{ flexShrink: 0 }} />
                {sidebarOpen && item.label}
              </NavLink>
            ))}
          </div>

          {isFounder && (
            <div style={{ marginTop: 16 }}>
              {sidebarOpen && <p style={{ fontSize: 10, color: '#333', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 8px', marginBottom: 4 }}>Founder Only</p>}
              {founderOnly.map(item => (
                <NavLink key={item.to} to={item.to} className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`} style={{ justifyContent: sidebarOpen ? 'flex-start' : 'center' }} title={!sidebarOpen ? item.label : undefined}>
                  <item.icon size={16} style={{ flexShrink: 0 }} />
                  {sidebarOpen && item.label}
                </NavLink>
              ))}
            </div>
          )}

          <div style={{ marginTop: 16, borderTop: '1px solid #141414', paddingTop: 16 }}>
            <Link to="/" className="sidebar-link" style={{ justifyContent: sidebarOpen ? 'flex-start' : 'center' }} title={!sidebarOpen ? 'View Website' : undefined}>
              <ExternalLink size={16} style={{ flexShrink: 0 }} />
              {sidebarOpen && 'View Website'}
            </Link>
          </div>
        </nav>

        {/* User */}
        <div style={{ padding: '12px 8px', borderTop: '1px solid #141414' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 8, cursor: 'pointer', transition: 'background 0.15s' }}
            onClick={() => setUserMenuOpen(!userMenuOpen)}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg,#c9a84c,#e4c677)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#0a0a0a', flexShrink: 0 }}>
              {currentUser?.avatar}
            </div>
            {sidebarOpen && (
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#f0f0f0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{currentUser?.name}</div>
                <div style={{ fontSize: 10, color: '#c9a84c', textTransform: 'capitalize' }}>{currentUser?.accessLevel}</div>
              </div>
            )}
          </div>

          {/* Role switcher for demo */}
          {userMenuOpen && sidebarOpen && (
            <div style={{ background: '#111', border: '1px solid #222', borderRadius: 8, padding: 8, marginTop: 4 }}>
              <p style={{ fontSize: 10, color: '#444', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', padding: '4px 8px', marginBottom: 4 }}>Switch Demo Role</p>
              {members.filter(m => m.active).map(m => (
                <button key={m.id} onClick={() => { setCurrentUser(m); setUserMenuOpen(false); }} style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', background: currentUser?.id === m.id ? '#1a1a1a' : 'none', border: 'none', borderRadius: 6, padding: '7px 8px', cursor: 'pointer', color: currentUser?.id === m.id ? '#c9a84c' : '#777', fontSize: 12, textAlign: 'left' }}>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: '#c9a84c' }}>{m.avatar}</div>
                  <span>{m.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header */}
        <header style={{ height: 60, borderBottom: '1px solid #141414', background: '#0a0a0a', display: 'flex', alignItems: 'center', padding: '0 20px', gap: 12, flexShrink: 0 }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', display: 'flex', padding: 4, borderRadius: 6 }}>
            <Menu size={18} />
          </button>

          <div style={{ flex: 1 }} />

          {/* Notifications */}
          <div style={{ position: 'relative' }}>
            <button onClick={() => setNotifOpen(!notifOpen)} style={{ position: 'relative', background: 'none', border: '1px solid #1e1e1e', borderRadius: 8, padding: '7px', cursor: 'pointer', color: '#666', display: 'flex' }}>
              <Bell size={16} />
              {unread > 0 && <span style={{ position: 'absolute', top: -4, right: -4, width: 16, height: 16, borderRadius: '50%', background: '#c9a84c', color: '#0a0a0a', fontSize: 9, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{unread}</span>}
            </button>
            {notifOpen && (
              <div style={{ position: 'absolute', top: 44, right: 0, width: 300, background: '#111', border: '1px solid #222', borderRadius: 12, padding: 12, zIndex: 50, boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: '#f0f0f0', marginBottom: 12, padding: '4px 8px' }}>Notifications</p>
                {notifications.map(n => (
                  <div key={n.id} style={{ padding: '10px 8px', borderRadius: 8, background: n.read ? 'none' : '#1a1a1a', marginBottom: 4, display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                    {!n.read && <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#c9a84c', flexShrink: 0, marginTop: 4 }} />}
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 12, color: '#ccc', lineHeight: 1.4 }}>{n.text}</p>
                      <p style={{ fontSize: 11, color: '#444', marginTop: 2 }}>{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Role Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', background: '#111', border: '1px solid #1e1e1e', borderRadius: 8 }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'linear-gradient(135deg,#c9a84c,#e4c677)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: '#0a0a0a' }}>{currentUser?.avatar}</div>
            <span style={{ fontSize: 12, color: '#888' }}>{currentUser?.name}</span>
            <span className="badge" style={{ background: isFounder ? 'rgba(201,168,76,0.15)' : '#1a1a1a', color: isFounder ? '#c9a84c' : '#666', fontSize: 10 }}>{currentUser?.accessLevel}</span>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ flex: 1, overflow: 'auto', padding: '24px' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
