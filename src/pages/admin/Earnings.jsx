import { useMemo, useState } from 'react';
import { Download, DollarSign, TrendingUp, Award } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useStore } from '../../store/useStore';

export default function Earnings() {
  const { members, projects, calculateProject, currentUser } = useStore();
  const [selectedMember, setSelectedMember] = useState(null);

  const activeMembers = members.filter(m => m.active);

  // Calculate earnings for each member
  const memberEarnings = useMemo(() => {
    return activeMembers.map(member => {
      let totalWork = 0;
      let totalBD = 0;
      let totalSub = 0;
      const projectBreakdown = [];

      projects.forEach(p => {
        const calc = calculateProject(p);
        if (calc && !calc.error) {
          // Work share
          const payout = calc.payouts.find(py => py.memberId === member.id);
          if (payout) {
            totalWork += payout.share;
            totalSub += payout.subDeductions;
            projectBreakdown.push({
              projectName: p.name,
              workShare: payout.share,
              subDeductions: payout.subDeductions,
              finalShare: payout.finalShare,
              bdBonus: 0,
            });
          }

          // BD bonus
          if (calc.bdMemberId === member.id) {
            totalBD += calc.bdAmount;
            const existing = projectBreakdown.find(pb => pb.projectName === p.name);
            if (existing) {
              existing.bdBonus = calc.bdAmount;
            } else {
              projectBreakdown.push({
                projectName: p.name,
                workShare: 0,
                subDeductions: 0,
                finalShare: 0,
                bdBonus: calc.bdAmount,
              });
            }
          }
        }
      });

      return {
        id: member.id,
        name: member.name,
        avatar: member.avatar,
        role: member.role,
        equity: member.equity,
        totalWork,
        totalBD,
        totalSub,
        totalEarnings: totalWork + totalBD - totalSub,
        projectBreakdown,
      };
    });
  }, [activeMembers, projects, calculateProject]);

  const totalEarnings = memberEarnings.reduce((sum, m) => sum + m.totalEarnings, 0);
  const totalBD = memberEarnings.reduce((sum, m) => sum + m.totalBD, 0);

  const monthlyEarnings = [
    { month: 'Jan', earnings: 145000 },
    { month: 'Feb', earnings: 168000 },
    { month: 'Mar', earnings: 152000 },
    { month: 'Apr', earnings: 195000 },
  ];

  const handleExport = () => {
    let csv = 'Member,Role,Total Work,BD Bonus,Sub Deductions,Total Earnings\n';
    memberEarnings.forEach(m => {
      csv += `${m.name},${m.role},₹${m.totalWork.toLocaleString()},₹${m.totalBD.toLocaleString()},₹${m.totalSub.toLocaleString()},₹${m.totalEarnings.toLocaleString()}\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `earnings-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#f0f0f0', letterSpacing: '-0.5px' }}>Earnings</h1>
          <p style={{ color: '#555', fontSize: 14, marginTop: 4 }}>Track member earnings, bonuses, and payouts</p>
        </div>
        <button className="btn-outline" onClick={handleExport} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Download size={16} /> Export CSV
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 24 }}>
        {[
          { label: 'Total Earnings', value: `₹${(totalEarnings / 100000).toFixed(1)}L`, icon: DollarSign, color: '#c9a84c' },
          { label: 'BD Bonuses', value: `₹${(totalBD / 100000).toFixed(1)}L`, icon: Award, color: '#f59e0b' },
          { label: 'Members', value: activeMembers.length, icon: TrendingUp, color: '#4ade80' },
          { label: 'Avg per Member', value: `₹${(totalEarnings / activeMembers.length / 100000).toFixed(1)}L`, icon: DollarSign, color: '#60a5fa' },
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

      {/* Monthly Trend */}
      <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, padding: 20, marginBottom: 24 }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: '#f0f0f0', marginBottom: 16 }}>Monthly Earnings Trend</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={monthlyEarnings}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#444' }} />
            <YAxis tick={{ fontSize: 11, fill: '#444' }} />
            <Tooltip contentStyle={{ background: '#111', border: '1px solid #222', borderRadius: 8, fontSize: 12 }} formatter={(v) => `₹${v.toLocaleString()}`} />
            <Bar dataKey="earnings" fill="#c9a84c" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Member Earnings Table */}
      <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, overflow: 'hidden', marginBottom: 24 }}>
        <div style={{ padding: 20, borderBottom: '1px solid #1a1a1a', background: '#0e0e0e' }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: '#f0f0f0' }}>Member Earnings Summary</h3>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1a1a1a', background: '#0e0e0e' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Member</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Work Share</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.05em' }}>BD Bonus</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Sub Deductions</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Earnings</th>
                <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: 12, fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {memberEarnings.map(m => (
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
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#60a5fa' }}>₹{(m.totalWork / 100000).toFixed(1)}L</div>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#f59e0b' }}>₹{(m.totalBD / 100000).toFixed(1)}L</div>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#f87171' }}>-₹{(m.totalSub / 100000).toFixed(1)}L</div>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#c9a84c' }}>₹{(m.totalEarnings / 100000).toFixed(1)}L</div>
                  </td>
                  <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                    <button onClick={() => setSelectedMember(m)} style={{ background: 'none', border: 'none', color: '#c9a84c', cursor: 'pointer', fontSize: 12, fontWeight: 500 }}>
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Member Detail Modal */}
      {selectedMember && (
        <div className="modal-backdrop" onClick={() => setSelectedMember(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg,#c9a84c,#e4c677)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#0a0a0a' }}>
                  {selectedMember.avatar}
                </div>
                <div>
                  <h2 style={{ fontSize: 18, fontWeight: 700, color: '#f0f0f0' }}>{selectedMember.name}</h2>
                  <p style={{ color: '#555', fontSize: 12 }}>{selectedMember.role}</p>
                </div>
              </div>
              <button onClick={() => setSelectedMember(null)} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: 20 }}>×</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
              {[
                { label: 'Work Share', value: `₹${(selectedMember.totalWork / 100000).toFixed(1)}L`, color: '#60a5fa' },
                { label: 'BD Bonus', value: `₹${(selectedMember.totalBD / 100000).toFixed(1)}L`, color: '#f59e0b' },
                { label: 'Sub Deductions', value: `-₹${(selectedMember.totalSub / 100000).toFixed(1)}L`, color: '#f87171' },
                { label: 'Total Earnings', value: `₹${(selectedMember.totalEarnings / 100000).toFixed(1)}L`, color: '#c9a84c' },
              ].map(s => (
                <div key={s.label} style={{ background: '#0e0e0e', borderRadius: 8, padding: 12 }}>
                  <p style={{ fontSize: 11, color: '#555', marginBottom: 4 }}>{s.label}</p>
                  <p style={{ fontSize: 16, fontWeight: 700, color: s.color }}>{s.value}</p>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 13, fontWeight: 600, color: '#f0f0f0', marginBottom: 12 }}>Project Breakdown</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 300, overflowY: 'auto' }}>
                {selectedMember.projectBreakdown.map((pb, i) => (
                  <div key={i} style={{ background: '#0e0e0e', borderRadius: 8, padding: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: '#f0f0f0' }}>{pb.projectName}</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: '#c9a84c' }}>₹{(pb.finalShare / 100000).toFixed(1)}L</span>
                    </div>
                    {pb.workShare > 0 && (
                      <div style={{ fontSize: 11, color: '#555', marginBottom: 4 }}>Work: ₹{(pb.workShare / 100000).toFixed(1)}L</div>
                    )}
                    {pb.bdBonus > 0 && (
                      <div style={{ fontSize: 11, color: '#f59e0b', marginBottom: 4 }}>BD Bonus: ₹{(pb.bdBonus / 100000).toFixed(1)}L</div>
                    )}
                    {pb.subDeductions > 0 && (
                      <div style={{ fontSize: 11, color: '#f87171' }}>Sub Deductions: -₹{(pb.subDeductions / 100000).toFixed(1)}L</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <button className="btn-gold" style={{ width: '100%' }} onClick={() => setSelectedMember(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
