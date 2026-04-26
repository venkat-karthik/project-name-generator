import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Lock, CheckCircle, AlertTriangle, Plus, X, MessageSquare, History, ChevronLeft, Send } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Legend } from 'recharts';
import { useStore } from '../../store/useStore';

const EFFORT_LABELS = { none: 'Not Involved (0)', helped: 'Helped a little (0.5)', contributed: 'Contributed (1)', core: 'Core Worker (2)', led: 'Led the Build (3)' };

const COLORS = ['#c9a84c', '#e4c677', '#a07c35', '#6b521e', '#f0e0a0', '#60a5fa', '#a78bfa'];

const fmt = (n) => `₹${Math.round(n || 0).toLocaleString()}`;

export default function ProjectDetail() {
  const { id } = useParams();
  const { projects, leads, members, updateProject, approveProject, currentUser, addDispute, resolveDispute, addDisputeComment, addAuditLog, calculateProject } = useStore();
  const project = projects.find(p => p.id === Number(id));

  const [activeTab, setActiveTab] = useState('finance');
  const [disputeText, setDisputeText] = useState('');
  const [commentInputs, setCommentInputs] = useState({});

  if (!project) return <div style={{ color: '#555', padding: 40 }}>Project not found</div>;

  const isFounder = currentUser?.accessLevel === 'founder';
  const isLocked = project.status === 'approved';
  const canEdit = !isLocked && currentUser?.accessLevel !== 'viewer';

  const calc = calculateProject(project);
  const client = leads.find(l => l.id === project.clientId);

  const getMember = (id) => members.find(m => m.id === id);

  const updateTeamMember = (i, data) => {
    if (!canEdit) return;
    const updated = project.teamMembers.map((m, idx) => idx === i ? { ...m, ...data } : m);
    updateProject(project.id, { teamMembers: updated });
  };

  const addTeamMember = () => {
    if (!canEdit) return;
    updateProject(project.id, { teamMembers: [...project.teamMembers, { memberId: '', effort: 'contributed', subEmployees: [] }] });
  };

  const removeTeamMember = (i) => {
    if (!canEdit) return;
    updateProject(project.id, { teamMembers: project.teamMembers.filter((_, idx) => idx !== i) });
  };

  const addSubEmployee = (memberIdx) => {
    if (!canEdit) return;
    const updated = project.teamMembers.map((m, i) => i === memberIdx ? {
      ...m, subEmployees: [...(m.subEmployees || []), { id: `s${Date.now()}`, name: '', percent: 10 }]
    } : m);
    updateProject(project.id, { teamMembers: updated });
  };

  const updateSubEmployee = (memberIdx, subIdx, data) => {
    if (!canEdit) return;
    const updated = project.teamMembers.map((m, i) => i === memberIdx ? {
      ...m, subEmployees: m.subEmployees.map((se, si) => si === subIdx ? { ...se, ...data } : se)
    } : m);
    updateProject(project.id, { teamMembers: updated });
  };

  const removeSubEmployee = (memberIdx, subIdx) => {
    if (!canEdit) return;
    const updated = project.teamMembers.map((m, i) => i === memberIdx ? {
      ...m, subEmployees: m.subEmployees.filter((_, si) => si !== subIdx)
    } : m);
    updateProject(project.id, { teamMembers: updated });
  };

  const handleApprove = () => {
    approveProject(project.id);
    addAuditLog({ userId: currentUser.id, action: `Approved project: ${project.name}` });
  };

  const generateWhatsApp = () => {
    if (!calc || calc.error) return;
    let msg = `*Velfound — Finance Summary*\n*Project:* ${project.name}\n\n`;
    msg += `*Total Value:* ${fmt(calc.totalValue)}\n`;
    msg += `*Company Reserve (${project.companyReserve}%):* ${fmt(calc.reserve)}\n`;
    if (calc.bdAmount > 0) msg += `*BD Bonus:* ${fmt(calc.bdAmount)} → ${getMember(calc.bdMemberId)?.name}\n`;
    msg += `*Work Pool:* ${fmt(calc.workPool)}\n\n`;
    msg += `*Payouts:*\n`;
    calc.payouts.forEach(p => {
      const m = getMember(p.memberId);
      msg += `• ${m?.name}: ${fmt(p.finalShare)}\n`;
    });
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
  };

  // Chart data
  const pieData = calc && !calc.error ? [
    { name: `Reserve (${project.companyReserve}%)`, value: calc.reserve },
    ...(calc.bdAmount > 0 ? [{ name: `BD Bonus`, value: calc.bdAmount }] : []),
    ...calc.payouts.map(p => ({ name: getMember(p.memberId)?.name || 'Unknown', value: p.finalShare })),
  ] : [];

  const waterfallData = calc && !calc.error ? [
    { name: 'Total', total: calc.totalValue, fill: '#c9a84c' },
    { name: 'Reserve', total: calc.reserve, fill: '#555' },
    { name: 'BD Bonus', total: calc.bdAmount, fill: '#60a5fa' },
    { name: 'Work Pool', total: calc.workPool, fill: '#4ade80' },
  ] : [];

  const tabs = ['finance', 'team', 'disputes', 'history'];

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <Link to="/admin/projects" style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#555', fontSize: 12, textDecoration: 'none', marginBottom: 8 }}>
            <ChevronLeft size={14} /> Projects
          </Link>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#f0f0f0', display: 'flex', alignItems: 'center', gap: 10 }}>
            {project.name}
            {isLocked && <Lock size={16} color="#c9a84c" />}
          </h1>
          {client && <p style={{ color: '#555', fontSize: 13, marginTop: 4 }}>Client: {client.name}</p>}
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {isFounder && !isLocked && (
            <button className="btn-gold btn-sm" onClick={handleApprove}>
              <CheckCircle size={13} /> Approve & Lock
            </button>
          )}
          <span className={`badge status-${project.status}`} style={{ alignSelf: 'center', fontSize: 11 }}>
            {project.status === 'approved' ? '🔒 Approved' : project.status === 'review' ? '⏳ Under Review' : '📝 Draft'}
          </span>
        </div>
      </div>

      {/* Quick Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 12, marginBottom: 24 }}>
        {[
          { label: 'Total Value', value: fmt(project.totalValue), color: '#c9a84c' },
          { label: 'Company Reserve', value: fmt(calc?.reserve || 0), color: '#555' },
          { label: 'BD Bonus', value: fmt(calc?.bdAmount || 0), color: '#60a5fa' },
          { label: 'Work Pool', value: fmt(calc?.workPool || 0), color: '#4ade80' },
          { label: 'Payment', value: project.paymentStatus.replace('_', ' ').toUpperCase(), color: project.paymentStatus === 'fully_paid' ? '#4ade80' : project.paymentStatus === 'partial' ? '#f59e0b' : '#f87171' },
        ].map(s => (
          <div key={s.label} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ fontSize: 11, color: '#444', marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 2, marginBottom: 20, borderBottom: '1px solid #1a1a1a', paddingBottom: 0 }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setActiveTab(t)} style={{
            background: 'none', border: 'none', padding: '8px 16px', borderRadius: '8px 8px 0 0',
            fontSize: 13, fontWeight: 500, cursor: 'pointer',
            color: activeTab === t ? '#f0f0f0' : '#555',
            borderBottom: activeTab === t ? '2px solid #c9a84c' : '2px solid transparent',
          }}>{t.charAt(0).toUpperCase() + t.slice(1)}</button>
        ))}
      </div>

      {/* FINANCE TAB */}
      {activeTab === 'finance' && (
        <div>
          {isLocked && <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 8, marginBottom: 20 }}>
            <Lock size={14} color="#c9a84c" /> <span style={{ fontSize: 13, color: '#c9a84c' }}>This project is approved and locked. No further edits allowed.</span>
          </div>}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            {/* Project Settings */}
            <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, padding: 24 }}>
              <h3 style={{ fontSize: 14, fontWeight: 600, color: '#f0f0f0', marginBottom: 16 }}>Project Settings</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label className="label">Total Value (₹)</label>
                  <input className="input" type="number" value={project.totalValue} disabled={!canEdit}
                    onChange={e => updateProject(project.id, { totalValue: Number(e.target.value) })} />
                </div>
                <div>
                  <label className="label">Payment Status</label>
                  <select className="input" value={project.paymentStatus} disabled={!canEdit}
                    onChange={e => updateProject(project.id, { paymentStatus: e.target.value })}>
                    <option value="not_paid">Not Paid</option>
                    <option value="partial">Partial</option>
                    <option value="fully_paid">Fully Paid</option>
                  </select>
                </div>
                <div>
                  <label className="label">Company Reserve ({project.companyReserve}%)</label>
                  <input className="input" type="range" min="10" max="40" value={project.companyReserve} disabled={!canEdit}
                    onChange={e => updateProject(project.id, { companyReserve: Number(e.target.value) })} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#444' }}><span>10%</span><span style={{ color: '#c9a84c', fontWeight: 600 }}>{project.companyReserve}%</span><span>40%</span></div>
                </div>
                <div>
                  <label className="label">Project Status</label>
                  <select className="input" value={project.status} disabled={!canEdit || !isFounder}
                    onChange={e => updateProject(project.id, { status: e.target.value })}>
                    <option value="draft">Draft</option>
                    <option value="review">Under Review</option>
                  </select>
                </div>
              </div>

              {/* BD Bonus */}
              <div style={{ marginTop: 16, padding: 12, background: '#0e0e0e', border: '1px solid #1a1a1a', borderRadius: 8 }}>
                <label className="label">BD Bonus</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  <select className="input" value={project.bdBonus?.memberId || ''} disabled={!canEdit}
                    onChange={e => updateProject(project.id, { bdBonus: { ...project.bdBonus, memberId: Number(e.target.value) } })}>
                    <option value="">No BD Bonus</option>
                    {members.filter(m => m.active).map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                  </select>
                  <input className="input" type="number" min="0" max="30" placeholder="% of total"
                    value={project.bdBonus?.percent || 0} disabled={!canEdit}
                    onChange={e => updateProject(project.id, { bdBonus: { ...project.bdBonus, percent: Number(e.target.value) } })} />
                </div>
                {project.bdBonus?.memberId && calc?.bdAmount > 0 && (
                  <p style={{ fontSize: 12, color: '#c9a84c', marginTop: 6 }}>
                    {getMember(project.bdBonus.memberId)?.name} receives {fmt(calc.bdAmount)} as BD bonus
                  </p>
                )}
              </div>
            </div>

            {/* Calculation Result */}
            <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, padding: 24 }}>
              <h3 style={{ fontSize: 14, fontWeight: 600, color: '#f0f0f0', marginBottom: 16 }}>Payout Breakdown</h3>

              {calc?.error ? (
                <div style={{ display: 'flex', gap: 8, padding: 12, background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: 8 }}>
                  <AlertTriangle size={14} color="#f87171" />
                  <span style={{ color: '#f87171', fontSize: 13 }}>{calc.error}</span>
                </div>
              ) : calc ? (
                <div>
                  {/* Money Flow */}
                  <div style={{ marginBottom: 16 }}>
                    {[
                      { label: 'Total Value', value: calc.totalValue, indent: 0, color: '#f0f0f0' },
                      { label: `→ Reserve (${project.companyReserve}%)`, value: calc.reserve, indent: 1, color: '#666' },
                      { label: '→ BD Bonus', value: calc.bdAmount, indent: 1, color: '#60a5fa', hide: !calc.bdAmount },
                      { label: '= Work Pool', value: calc.workPool, indent: 0, color: '#4ade80' },
                    ].filter(i => !i.hide).map(item => (
                      <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #141414', paddingLeft: item.indent * 16 }}>
                        <span style={{ fontSize: 12, color: item.color }}>{item.label}</span>
                        <span style={{ fontSize: 12, fontWeight: 600, color: item.color }}>{fmt(item.value)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Individual Payouts */}
                  <p style={{ fontSize: 11, color: '#444', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Member Payouts</p>
                  {calc.payouts.map(p => {
                    const m = getMember(p.memberId);
                    return (
                      <div key={p.memberId} style={{ marginBottom: 8 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'linear-gradient(135deg,#c9a84c,#e4c677)', fontSize: 9, fontWeight: 700, color: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{m?.avatar}</div>
                            <span style={{ fontSize: 13, color: '#f0f0f0' }}>{m?.name}</span>
                          </div>
                          <span style={{ fontSize: 14, fontWeight: 700, color: '#c9a84c' }}>{fmt(p.finalShare)}</span>
                        </div>
                        {p.subDeductions > 0 && <div style={{ fontSize: 11, color: '#555', paddingLeft: 32 }}>Work share: {fmt(p.share)} — Sub deductions: {fmt(p.subDeductions)}</div>}
                        {p.subEmployees?.map(se => (
                          <div key={se.id} style={{ fontSize: 11, color: '#444', paddingLeft: 32, marginTop: 2 }}>{se.name}: {fmt(se.amount)} ({se.percent}%)</div>
                        ))}
                      </div>
                    );
                  })}

                  {/* BD */}
                  {calc.bdAmount > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, padding: '8px 12px', background: 'rgba(96,165,250,0.08)', border: '1px solid rgba(96,165,250,0.15)', borderRadius: 8 }}>
                      <span style={{ fontSize: 12, color: '#60a5fa' }}>BD Bonus → {getMember(calc.bdMemberId)?.name}</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: '#60a5fa' }}>{fmt(calc.bdAmount)}</span>
                    </div>
                  )}

                  <button className="btn-gold btn-sm" onClick={generateWhatsApp} style={{ width: '100%', justifyContent: 'center', marginTop: 16 }}>
                    <MessageSquare size={13} /> Generate WhatsApp Summary
                  </button>
                </div>
              ) : <div style={{ color: '#444', fontSize: 13 }}>Set total value to see calculations</div>}
            </div>
          </div>

          {/* Charts */}
          {calc && !calc.error && pieData.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, padding: 24 }}>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: '#f0f0f0', marginBottom: 16 }}>Payout Distribution</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={2} dataKey="value">
                      {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#111', border: '1px solid #222', borderRadius: 8, fontSize: 12 }} formatter={(v) => fmt(v)} />
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
                  {pieData.map((d, i) => (
                    <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: COLORS[i % COLORS.length] }} />
                      <span style={{ fontSize: 11, color: '#666' }}>{d.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, padding: 24 }}>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: '#f0f0f0', marginBottom: 16 }}>Money Flow</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={waterfallData}>
                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#555' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: '#444' }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v/1000).toFixed(0)}K`} />
                    <Tooltip contentStyle={{ background: '#111', border: '1px solid #222', borderRadius: 8, fontSize: 12 }} formatter={(v) => fmt(v)} />
                    <Bar dataKey="total" radius={[4,4,0,0]}>
                      {waterfallData.map((d, i) => <Cell key={i} fill={d.fill} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TEAM TAB */}
      {activeTab === 'team' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: '#f0f0f0' }}>Team Assignment</h3>
            {canEdit && <button className="btn-sm" onClick={addTeamMember} style={{ background: '#1a1a1a', color: '#c9a84c', border: '1px solid #222' }}><Plus size={12} /> Add Member</button>}
          </div>

          {project.teamMembers.map((tm, i) => {
            const m = getMember(tm.memberId);
            const subTotal = tm.subEmployees?.reduce((s, se) => s + se.percent, 0) || 0;
            return (
              <div key={i} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, padding: 20, marginBottom: 12 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 12, alignItems: 'end', marginBottom: tm.subEmployees?.length > 0 ? 16 : 0 }}>
                  <div>
                    <label className="label">Member</label>
                    <select className="input" value={tm.memberId} disabled={!canEdit}
                      onChange={e => updateTeamMember(i, { memberId: Number(e.target.value) })}>
                      <option value="">Select member</option>
                      {members.filter(m => m.active).map(m => <option key={m.id} value={m.id}>{m.name} ({m.role})</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="label">Effort Level</label>
                    <select className="input" value={tm.effort} disabled={!canEdit}
                      onChange={e => updateTeamMember(i, { effort: e.target.value })}>
                      {Object.entries(EFFORT_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                    </select>
                  </div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
                    {canEdit && <button onClick={() => addSubEmployee(i)} style={{ background: '#1a1a1a', border: '1px solid #222', borderRadius: 8, padding: '8px 10px', color: '#c9a84c', cursor: 'pointer', whiteSpace: 'nowrap', fontSize: 12 }}><Plus size={12} /> Sub</button>}
                    {canEdit && <button onClick={() => removeTeamMember(i)} style={{ background: '#1a1a1a', border: '1px solid rgba(248,113,113,0.3)', borderRadius: 8, padding: '8px 10px', color: '#f87171', cursor: 'pointer' }}><X size={12} /></button>}
                  </div>
                </div>

                {/* Sub-employees */}
                {tm.subEmployees?.length > 0 && (
                  <div style={{ borderTop: '1px solid #1a1a1a', paddingTop: 12 }}>
                    <p style={{ fontSize: 11, color: '#555', marginBottom: 10 }}>Sub-employees (max 30% from {m?.name || 'member'}'s share)</p>
                    {tm.subEmployees.map((se, si) => (
                      <div key={se.id} style={{ display: 'grid', gridTemplateColumns: '1fr 100px auto', gap: 8, marginBottom: 8, alignItems: 'center' }}>
                        <input className="input" value={se.name} disabled={!canEdit} onChange={e => updateSubEmployee(i, si, { name: e.target.value })} placeholder="Sub-employee name" style={{ fontSize: 12 }} />
                        <div style={{ position: 'relative' }}>
                          <input className="input" type="number" min="1" max="30" value={se.percent} disabled={!canEdit}
                            onChange={e => { const val = Math.min(30, Number(e.target.value)); updateSubEmployee(i, si, { percent: val }); }} style={{ fontSize: 12 }} />
                          <span style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', color: '#444', fontSize: 11 }}>%</span>
                        </div>
                        {canEdit && <button onClick={() => removeSubEmployee(i, si)} style={{ background: '#1a1a1a', border: '1px solid #222', borderRadius: 6, padding: '6px', color: '#555', cursor: 'pointer', display: 'flex' }}><X size={12} /></button>}
                      </div>
                    ))}
                    {subTotal > 30 && <p style={{ fontSize: 12, color: '#f87171' }}>⚠️ Total sub-employee % ({subTotal}%) exceeds 30% cap!</p>}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* DISPUTES TAB */}
      {activeTab === 'disputes' && (
        <div>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: '#f0f0f0', marginBottom: 16 }}>Disputes</h3>

          {/* Raise dispute */}
          <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, padding: 20, marginBottom: 16 }}>
            <label className="label">Raise a Dispute</label>
            <textarea className="input" value={disputeText} onChange={e => setDisputeText(e.target.value)} placeholder="Describe the dispute or concern..." style={{ marginBottom: 8 }} />
            <button className="btn-sm" onClick={() => { if (disputeText.trim()) { addDispute(project.id, { text: disputeText, raisedBy: currentUser.id }); setDisputeText(''); } }} style={{ background: '#1a1a1a', color: '#c9a84c', border: '1px solid #222' }}>
              <AlertTriangle size={12} /> Raise Dispute
            </button>
          </div>

          {project.disputes?.length === 0 && <div style={{ color: '#444', fontSize: 13 }}>No disputes raised.</div>}

          {project.disputes?.map(d => (
            <div key={d.id} style={{ background: '#111', border: `1px solid ${d.resolved ? '#1a3a1a' : '#2a1a1a'}`, borderRadius: 12, padding: 20, marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div>
                  <p style={{ fontSize: 13, color: '#f0f0f0', lineHeight: 1.5 }}>{d.text}</p>
                  <p style={{ fontSize: 11, color: '#444', marginTop: 4 }}>Raised by {getMember(d.raisedBy)?.name} · {d.date?.split('T')[0]}</p>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ fontSize: 11, color: d.resolved ? '#4ade80' : '#f87171', background: d.resolved ? 'rgba(74,222,128,0.1)' : 'rgba(248,113,113,0.1)', padding: '3px 8px', borderRadius: 999 }}>
                    {d.resolved ? 'Resolved' : 'Open'}
                  </span>
                  {isFounder && !d.resolved && <button className="btn-sm" onClick={() => resolveDispute(project.id, d.id)} style={{ background: 'rgba(74,222,128,0.1)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.2)' }}>Resolve</button>}
                </div>
              </div>

              {/* Comments */}
              {d.comments?.map(c => (
                <div key={c.id} style={{ padding: '8px 12px', background: '#0e0e0e', border: '1px solid #1a1a1a', borderRadius: 8, marginBottom: 6 }}>
                  <div style={{ fontSize: 11, color: '#666', marginBottom: 4 }}>{getMember(c.userId)?.name} · {c.date?.split('T')[0]}</div>
                  <p style={{ fontSize: 12, color: '#aaa' }}>{c.text}</p>
                </div>
              ))}
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                <input className="input" value={commentInputs[d.id] || ''} onChange={e => setCommentInputs({...commentInputs, [d.id]: e.target.value})} placeholder="Add comment..." style={{ fontSize: 12 }} />
                <button className="btn-sm" onClick={() => { if (commentInputs[d.id]?.trim()) { addDisputeComment(project.id, d.id, { userId: currentUser.id, text: commentInputs[d.id] }); setCommentInputs({...commentInputs, [d.id]: ''}); } }} style={{ background: '#1a1a1a', color: '#c9a84c', border: '1px solid #222', flexShrink: 0 }}>
                  <Send size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* HISTORY TAB */}
      {activeTab === 'history' && (
        <div>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: '#f0f0f0', marginBottom: 16 }}>Version History <span style={{ fontSize: 12, color: '#555' }}>v{project.version}</span></h3>
          {project.history?.length === 0 ? (
            <div style={{ color: '#444', fontSize: 13 }}>No previous versions. Changes create new snapshots.</div>
          ) : (
            project.history.map((v, i) => (
              <div key={i} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 10, padding: 16, marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#f0f0f0' }}>Version {v.version}</span>
                  <span style={{ fontSize: 11, color: '#444' }}>{v.updatedAt?.split('T')[0]}</span>
                </div>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 12, color: '#666' }}>Value: ₹{v.totalValue?.toLocaleString()}</span>
                  <span style={{ fontSize: 12, color: '#666' }}>Reserve: {v.companyReserve}%</span>
                  <span style={{ fontSize: 12, color: '#666' }}>Status: {v.status}</span>
                  <span style={{ fontSize: 12, color: '#666' }}>Team: {v.teamMembers?.length} members</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
