import { useMemo } from 'react';
import { TrendingUp, Award, Target, DollarSign } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useStore } from '../../store/useStore';

export default function Team() {
  const { members, leads, projects, calculateProject } = useStore();

  const activeMembers = members.filter(m => m.active);

  // Calculate member metrics
  const memberMetrics = useMemo(() => {
    return activeMembers.map(member => {
      const leadsHandled = leads.filter(l => l.assigned === member.id).length;
      const dealsWon = leads.filter(l => l.assigned === member.id && l.status === 'won').length;
      const conversionRate = leadsHandled > 0 ? ((dealsWon / leadsHandled) * 100).toFixed(1) : 0;
      
      const memberProjects = projects.filter(p => p.teamMembers.some(tm => tm.memberId === member.id));
      const totalRevenue = memberProjects.reduce((sum, p) => {
        const calc = calculateProject(p);
        if (calc && !calc.error) {
          const payout = calc.payouts.find(py => py.memberId === member.id);
          return sum + (payout?.finalShare || 0);
        }
        return sum;
      }, 0);

      return {
        id: member.id,
        name: member.name,
        avatar: member.avatar,
        role: member.role,
        equity: member.equity,
        leadsHandled,
        dealsWon,
        conversionRate,
        projectsWorked: memberProjects.length,
        totalRevenue,
      };
    });
  }, [activeMembers, leads, projects, calculateProject]);

  // Sort by revenue
  const leaderboard = [...memberMetrics].sort((a, b) => b.totalRevenue - a.totalRevenue);

  // Monthly performance data
  const monthlyData = [
    { month: 'Jan', 'Arjun': 45000, 'Priya': 38000, 'Rohan': 32000, 'Sneha': 28000 },
    { month: 'Feb', 'Arjun': 52000, 'Priya': 41000, 'Rohan': 35000, 'Sneha': 31000 },
    { month: 'Mar', 'Arjun': 48000, 'Priya': 39000, 'Rohan': 33000, 'Sneha': 29000 },
    { month: 'Apr', 'Arjun': 61000, 'Priya': 45000, 'Rohan': 38000, 'Sneha': 35000 },
  ];

  const conversionData = memberMetrics.map(m => ({
    name: m.name.split(' ')[0],
    conversion: parseFloat(m.conversionRate),
    deals: m.dealsWon,
  }));

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#f0f0f0', letterSpacing: '-0.5px' }}>Team Performance</h1>
        <p style={{ color: '#555', fontSize: 14, marginTop: 4 }}>Track member metrics, earnings, and growth</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 24 }}>
        {[
          { label: 'Active Members', value: activeMembers.length, icon: TrendingUp, color: '#4ade80' },
          { label: 'Total Leads', value: leads.length, icon: Target, color: '#60a5fa' },
          { label: 'Deals Won', value: leads.filter(l => l.status === 'won').length, icon: Award, color: '#c9a84c' },
          { label: 'Total Revenue', value: `₹${(memberMetrics.reduce((s, m) => s + m.totalRevenue, 0) / 100000).toFixed(1)}L`, icon: DollarSign, color: '#a78bfa' },
        ].map(s => (
          <div key={s.label} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: `${s.color}15`, border: `1px solid ${s.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <s.icon size={16} color={s.color} />
              </div>
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#f0f0f0', letterSpacing: '-1px', marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: 12, color: '#555' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Leaderboard */}
      <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, padding: 24, marginBottom: 24 }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: '#f0f0f0', marginBottom: 16 }}>Leaderboard (by Revenue)</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {leaderboard.map((m, i) => (
            <div key={m.id} style={{ background: '#0e0e0e', borderRadius: 10, padding: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#c9a84c' }}>
                {i + 1}
              </div>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#c9a84c,#e4c677)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#0a0a0a' }}>
                {m.avatar}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#f0f0f0' }}>{m.name}</div>
                <div style={{ fontSize: 11, color: '#555', marginTop: 2 }}>{m.role}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#c9a84c' }}>₹{(m.totalRevenue / 100000).toFixed(1)}L</div>
                <div style={{ fontSize: 11, color: '#555', marginTop: 2 }}>{m.projectsWorked} projects</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
        {/* Monthly Revenue */}
        <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, padding: 20 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: '#f0f0f0', marginBottom: 16 }}>Monthly Revenue</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#444' }} />
              <YAxis tick={{ fontSize: 11, fill: '#444' }} />
              <Tooltip contentStyle={{ background: '#111', border: '1px solid #222', borderRadius: 8, fontSize: 12 }} formatter={(v) => `₹${v.toLocaleString()}`} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="Arjun" fill="#c9a84c" radius={[8, 8, 0, 0]} />
              <Bar dataKey="Priya" fill="#60a5fa" radius={[8, 8, 0, 0]} />
              <Bar dataKey="Rohan" fill="#a78bfa" radius={[8, 8, 0, 0]} />
              <Bar dataKey="Sneha" fill="#4ade80" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Conversion Rate */}
        <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, padding: 20 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: '#f0f0f0', marginBottom: 16 }}>Conversion Rate</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={conversionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#444' }} />
              <YAxis tick={{ fontSize: 11, fill: '#444' }} />
              <Tooltip contentStyle={{ background: '#111', border: '1px solid #222', borderRadius: 8, fontSize: 12 }} formatter={(v) => `${v}%`} />
              <Bar dataKey="conversion" fill="#c9a84c" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Member Details */}
      <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ padding: 20, borderBottom: '1px solid #1a1a1a', background: '#0e0e0e' }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: '#f0f0f0' }}>Member Details</h3>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1a1a1a', background: '#0e0e0e' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Member</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Leads</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Won</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Conversion</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Projects</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {memberMetrics.map(m => (
                <tr key={m.id} className="table-row">
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#c9a84c,#e4c677)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#0a0a0a' }}>
                        {m.avatar}
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: '#f0f0f0' }}>{m.name}</div>
                        <div style={{ fontSize: 11, color: '#444', marginTop: 2 }}>{m.role}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span className="badge" style={{ background: '#1a1a1a', color: '#888' }}>
                      {m.leadsHandled}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span className="badge" style={{ background: 'rgba(74,222,128,0.1)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.2)' }}>
                      {m.dealsWon}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span className="badge" style={{ background: 'rgba(201,168,76,0.1)', color: '#c9a84c', border: '1px solid rgba(201,168,76,0.2)' }}>
                      {m.conversionRate}%
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: 13, color: '#888' }}>{m.projectsWorked}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#c9a84c' }}>₹{(m.totalRevenue / 100000).toFixed(1)}L</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
