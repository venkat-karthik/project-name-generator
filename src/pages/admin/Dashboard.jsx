import { Link } from 'react-router-dom';
import { TrendingUp, Users, DollarSign, FolderKanban, ArrowUpRight, ArrowRight, Clock, CheckCircle } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { useStore } from '../../store/useStore';

const revenueData = [
  { month: 'Nov', revenue: 85000 }, { month: 'Dec', revenue: 120000 }, { month: 'Jan', revenue: 95000 },
  { month: 'Feb', revenue: 180000 }, { month: 'Mar', revenue: 145000 }, { month: 'Apr', revenue: 215000 },
];

const fmt = (n) => n >= 100000 ? `₹${(n/100000).toFixed(1)}L` : `₹${(n/1000).toFixed(0)}K`;

export default function Dashboard() {
  const { leads, projects, members, currentUser } = useStore();

  const activeLeads = leads.filter(l => !['won', 'lost'].includes(l.status)).length;
  const wonLeads = leads.filter(l => l.status === 'won').length;
  const totalRevenue = projects.filter(p => p.paymentStatus !== 'not_paid').reduce((s, p) => s + p.totalValue, 0);
  const approvedProjects = projects.filter(p => p.status === 'approved').length;
  const activeMembers = members.filter(m => m.active).length;

  const stats = [
    { label: 'Total Revenue', value: fmt(totalRevenue), icon: DollarSign, change: '+18%', color: '#c9a84c' },
    { label: 'Active Leads', value: activeLeads, icon: Users, change: '+5 this week', color: '#60a5fa' },
    { label: 'Projects', value: projects.length, icon: FolderKanban, change: `${approvedProjects} approved`, color: '#a78bfa' },
    { label: 'Team Members', value: activeMembers, icon: TrendingUp, change: 'Active', color: '#4ade80' },
  ];

  const recentActivity = [
    { text: 'New lead added: MedCare Hospitals', time: '2h ago', type: 'lead' },
    { text: 'Project EduPrime LMS approved', time: '1d ago', type: 'project' },
    { text: 'RetailX moved to Proposal', time: '2d ago', type: 'lead' },
    { text: 'Finance calc updated: RetailX Bot', time: '3d ago', type: 'finance' },
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#f0f0f0', letterSpacing: '-0.5px' }}>
          Good morning, {currentUser?.name?.split(' ')[0]} 👋
        </h1>
        <p style={{ color: '#555', fontSize: 14, marginTop: 4 }}>Here's what's happening at Velfound today.</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 12, marginBottom: 24 }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: `${s.color}15`, border: `1px solid ${s.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <s.icon size={16} color={s.color} />
              </div>
              <span style={{ fontSize: 11, color: '#4ade80', background: 'rgba(74,222,128,0.1)', padding: '3px 8px', borderRadius: 999 }}>{s.change}</span>
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#f0f0f0', letterSpacing: '-1px', marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: 12, color: '#555' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, marginBottom: 16 }}>
        {/* Revenue Chart */}
        <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div>
              <h3 style={{ fontSize: 14, fontWeight: 600, color: '#f0f0f0' }}>Revenue Trend</h3>
              <p style={{ fontSize: 12, color: '#555' }}>Last 6 months</p>
            </div>
            <span className="gold-text" style={{ fontSize: 20, fontWeight: 700 }}>{fmt(totalRevenue)}</span>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="rg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#c9a84c" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#c9a84c" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#444' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#111', border: '1px solid #222', borderRadius: 8, fontSize: 12 }} formatter={(v) => [fmt(v), 'Revenue']} />
              <Area type="monotone" dataKey="revenue" stroke="#c9a84c" fill="url(#rg)" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pipeline Summary */}
        <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, padding: 24 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: '#f0f0f0', marginBottom: 16 }}>Lead Pipeline</h3>
          {[
            { label: 'New', count: leads.filter(l => l.status === 'new').length, color: '#60a5fa' },
            { label: 'Contacted', count: leads.filter(l => l.status === 'contacted').length, color: '#a78bfa' },
            { label: 'Qualified', count: leads.filter(l => l.status === 'qualified').length, color: '#c9a84c' },
            { label: 'Proposal', count: leads.filter(l => l.status === 'proposal').length, color: '#f59e0b' },
            { label: 'Won', count: wonLeads, color: '#4ade80' },
            { label: 'Lost', count: leads.filter(l => l.status === 'lost').length, color: '#f87171' },
          ].map(s => (
            <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: s.color }} />
                <span style={{ fontSize: 13, color: '#777' }}>{s.label}</span>
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#f0f0f0' }}>{s.count}</span>
            </div>
          ))}
          <Link to="/admin/crm" style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#c9a84c', fontSize: 12, marginTop: 16, textDecoration: 'none' }}>
            View CRM <ArrowRight size={12} />
          </Link>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Recent Projects */}
        <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: '#f0f0f0' }}>Recent Projects</h3>
            <Link to="/admin/projects" style={{ fontSize: 11, color: '#c9a84c', textDecoration: 'none' }}>View all</Link>
          </div>
          {projects.map(p => (
            <Link key={p.id} to={`/admin/projects/${p.id}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #1a1a1a', textDecoration: 'none' }}>
              <div>
                <div style={{ fontSize: 13, color: '#f0f0f0', fontWeight: 500 }}>{p.name}</div>
                <div style={{ fontSize: 11, color: '#444', marginTop: 2 }}>₹{p.totalValue?.toLocaleString()}</div>
              </div>
              <span className={`badge status-${p.status}`} style={{ fontSize: 10 }}>{p.status}</span>
            </Link>
          ))}
        </div>

        {/* Recent Activity */}
        <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, padding: 24 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: '#f0f0f0', marginBottom: 16 }}>Recent Activity</h3>
          {recentActivity.map((a, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 14, alignItems: 'flex-start' }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {a.type === 'project' ? <CheckCircle size={12} color="#4ade80" /> : a.type === 'finance' ? <DollarSign size={12} color="#c9a84c" /> : <Users size={12} color="#60a5fa" />}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 12, color: '#ccc', lineHeight: 1.4 }}>{a.text}</p>
                <p style={{ fontSize: 11, color: '#444', marginTop: 2 }}>{a.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
