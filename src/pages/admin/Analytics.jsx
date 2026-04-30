import { useMemo } from 'react';
import { TrendingUp, BarChart3, PieChart, Target } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart as RechartsPie, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useStore } from '../../store/useStore';

export default function Analytics() {
  const { leads, projects, members, calculateProject } = useStore();

  // Revenue by service
  const revenueByService = useMemo(() => {
    const services = {};
    projects.forEach(p => {
      const calc = calculateProject(p);
      if (calc && !calc.error) {
        const service = p.name.includes('LMS') ? 'Web Solutions' : p.name.includes('Bot') ? 'AI Voice' : 'AI Automation';
        services[service] = (services[service] || 0) + calc.workPool;
      }
    });
    return Object.entries(services).map(([name, value]) => ({ name, value }));
  }, [projects, calculateProject]);

  // Conversion funnel
  const conversionFunnel = useMemo(() => {
    return [
      { stage: 'New', count: leads.filter(l => l.status === 'new').length },
      { stage: 'Contacted', count: leads.filter(l => l.status === 'contacted').length },
      { stage: 'Qualified', count: leads.filter(l => l.status === 'qualified').length },
      { stage: 'Proposal', count: leads.filter(l => l.status === 'proposal').length },
      { stage: 'Won', count: leads.filter(l => l.status === 'won').length },
    ];
  }, [leads]);

  // Monthly revenue trend
  const monthlyRevenue = [
    { month: 'Jan', revenue: 85000, target: 100000 },
    { month: 'Feb', revenue: 120000, target: 100000 },
    { month: 'Mar', revenue: 95000, target: 100000 },
    { month: 'Apr', revenue: 215000, target: 150000 },
  ];

  // Top performers
  const topPerformers = useMemo(() => {
    return members
      .filter(m => m.active)
      .map(m => {
        const dealsWon = leads.filter(l => l.assigned === m.id && l.status === 'won').length;
        const totalValue = leads
          .filter(l => l.assigned === m.id && l.status === 'won')
          .reduce((sum, l) => sum + l.value, 0);
        return { name: m.name, deals: dealsWon, value: totalValue };
      })
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, [members, leads]);

  // KPIs
  const totalRevenue = projects.reduce((sum, p) => {
    const calc = calculateProject(p);
    return sum + (calc && !calc.error ? calc.workPool : 0);
  }, 0);

  const conversionRate = leads.length > 0 ? ((leads.filter(l => l.status === 'won').length / leads.length) * 100).toFixed(1) : 0;
  const avgDealValue = leads.length > 0 ? (leads.reduce((sum, l) => sum + l.value, 0) / leads.length).toFixed(0) : 0;
  const activeProjects = projects.filter(p => p.status !== 'approved').length;

  const serviceColors = {
    'Web Solutions': '#60a5fa',
    'AI Voice': '#a78bfa',
    'AI Automation': '#c9a84c',
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#f0f0f0', letterSpacing: '-0.5px' }}>Analytics</h1>
        <p style={{ color: '#555', fontSize: 14, marginTop: 4 }}>Business metrics and performance insights</p>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 24 }}>
        {[
          { label: 'Total Revenue', value: `₹${(totalRevenue / 100000).toFixed(1)}L`, icon: TrendingUp, color: '#c9a84c' },
          { label: 'Conversion Rate', value: `${conversionRate}%`, icon: Target, color: '#4ade80' },
          { label: 'Avg Deal Value', value: `₹${(avgDealValue / 1000).toFixed(0)}K`, icon: BarChart3, color: '#60a5fa' },
          { label: 'Active Projects', value: activeProjects, icon: PieChart, color: '#a78bfa' },
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

      {/* Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
        {/* Revenue Trend */}
        <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, padding: 20 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: '#f0f0f0', marginBottom: 16 }}>Revenue Trend vs Target</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#444' }} />
              <YAxis tick={{ fontSize: 11, fill: '#444' }} />
              <Tooltip contentStyle={{ background: '#111', border: '1px solid #222', borderRadius: 8, fontSize: 12 }} formatter={(v) => `₹${v.toLocaleString()}`} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="revenue" stroke="#c9a84c" strokeWidth={2} dot={{ fill: '#c9a84c', r: 4 }} />
              <Line type="monotone" dataKey="target" stroke="#444" strokeWidth={2} strokeDasharray="5 5" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue by Service */}
        <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, padding: 20 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: '#f0f0f0', marginBottom: 16 }}>Revenue by Service</h3>
          <ResponsiveContainer width="100%" height={250}>
            <RechartsPie data={revenueByService} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={2} dataKey="value">
              {revenueByService.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={serviceColors[entry.name] || '#c9a84c'} />
              ))}
            </RechartsPie>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
        {/* Conversion Funnel */}
        <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, padding: 20 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: '#f0f0f0', marginBottom: 16 }}>Lead Conversion Funnel</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={conversionFunnel}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
              <XAxis dataKey="stage" tick={{ fontSize: 11, fill: '#444' }} />
              <YAxis tick={{ fontSize: 11, fill: '#444' }} />
              <Tooltip contentStyle={{ background: '#111', border: '1px solid #222', borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="count" fill="#c9a84c" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Performers */}
        <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, padding: 20 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: '#f0f0f0', marginBottom: 16 }}>Top Performers</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {topPerformers.map((p, i) => (
              <div key={i} style={{ background: '#0e0e0e', borderRadius: 8, padding: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#f0f0f0' }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: '#555', marginTop: 2 }}>{p.deals} deals won</div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#c9a84c' }}>₹{(p.value / 100000).toFixed(1)}L</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Lead Metrics */}
        <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, padding: 20 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: '#f0f0f0', marginBottom: 16 }}>Lead Metrics</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { label: 'Total Leads', value: leads.length, color: '#60a5fa' },
              { label: 'New Leads', value: leads.filter(l => l.status === 'new').length, color: '#888' },
              { label: 'Qualified', value: leads.filter(l => l.status === 'qualified').length, color: '#c9a84c' },
              { label: 'Won Deals', value: leads.filter(l => l.status === 'won').length, color: '#4ade80' },
              { label: 'Lost Deals', value: leads.filter(l => l.status === 'lost').length, color: '#f87171' },
            ].map(m => (
              <div key={m.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #1a1a1a' }}>
                <span style={{ fontSize: 12, color: '#888' }}>{m.label}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: m.color }}>{m.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Project Metrics */}
        <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, padding: 20 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: '#f0f0f0', marginBottom: 16 }}>Project Metrics</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { label: 'Total Projects', value: projects.length, color: '#60a5fa' },
              { label: 'Draft', value: projects.filter(p => p.status === 'draft').length, color: '#666' },
              { label: 'Under Review', value: projects.filter(p => p.status === 'review').length, color: '#e4c677' },
              { label: 'Approved', value: projects.filter(p => p.status === 'approved').length, color: '#4ade80' },
              { label: 'Fully Paid', value: projects.filter(p => p.paymentStatus === 'fully_paid').length, color: '#c9a84c' },
            ].map(m => (
              <div key={m.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #1a1a1a' }}>
                <span style={{ fontSize: 12, color: '#888' }}>{m.label}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: m.color }}>{m.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
