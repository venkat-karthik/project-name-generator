import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, FolderKanban, ChevronRight, Lock, Clock, CheckCircle, AlertCircle, X } from 'lucide-react';
import { useStore } from '../../store/useStore';

const statusConfig = {
  draft: { label: 'Draft', color: '#666', bg: '#1a1a1a' },
  review: { label: 'Under Review', color: '#e4c677', bg: 'rgba(228,198,119,0.1)' },
  approved: { label: 'Approved', color: '#4ade80', bg: 'rgba(74,222,128,0.1)' },
};

const paymentConfig = {
  not_paid: { label: 'Not Paid', color: '#f87171' },
  partial: { label: 'Partial', color: '#f59e0b' },
  fully_paid: { label: 'Fully Paid', color: '#4ade80' },
};

function AddProjectModal({ onClose, onSave, leads, members }) {
  const [form, setForm] = useState({ name: '', clientId: '', totalValue: '', paymentStatus: 'not_paid', companyReserve: 20, status: 'draft', bdBonus: { memberId: '', percent: 0 }, teamMembers: [] });

  const addTeamMember = () => setForm(f => ({ ...f, teamMembers: [...f.teamMembers, { memberId: '', effort: 'contributed', subEmployees: [] }] }));
  const updateMember = (i, data) => setForm(f => ({ ...f, teamMembers: f.teamMembers.map((m, idx) => idx === i ? { ...m, ...data } : m) }));
  const removeMember = (i) => setForm(f => ({ ...f, teamMembers: f.teamMembers.filter((_, idx) => idx !== i) }));

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 640 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#f0f0f0' }}>New Project</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer' }}><X size={18} /></button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div><label className="label">Project Name *</label><input className="input" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Project name" /></div>
          <div>
            <label className="label">Linked Client</label>
            <select className="input" value={form.clientId} onChange={e => setForm({...form, clientId: Number(e.target.value)})}>
              <option value="">Select client</option>
              {leads.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
            </select>
          </div>
          <div><label className="label">Total Value (₹)</label><input className="input" type="number" value={form.totalValue} onChange={e => setForm({...form, totalValue: Number(e.target.value)})} placeholder="e.g. 150000" /></div>
          <div>
            <label className="label">Payment Status</label>
            <select className="input" value={form.paymentStatus} onChange={e => setForm({...form, paymentStatus: e.target.value})}>
              <option value="not_paid">Not Paid</option>
              <option value="partial">Partial</option>
              <option value="fully_paid">Fully Paid</option>
            </select>
          </div>
          <div>
            <label className="label">Company Reserve (%)</label>
            <input className="input" type="number" min="10" max="40" value={form.companyReserve} onChange={e => setForm({...form, companyReserve: Number(e.target.value)})} />
          </div>
          <div>
            <label className="label">BD Bonus Member</label>
            <select className="input" value={form.bdBonus.memberId} onChange={e => setForm({...form, bdBonus: { ...form.bdBonus, memberId: Number(e.target.value) }})}>
              <option value="">None</option>
              {members.filter(m => m.active).map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
            </select>
          </div>
          {form.bdBonus.memberId && (
            <div><label className="label">BD Bonus %</label><input className="input" type="number" min="0" max="20" value={form.bdBonus.percent} onChange={e => setForm({...form, bdBonus: { ...form.bdBonus, percent: Number(e.target.value) }})} /></div>
          )}
        </div>

        <div style={{ marginTop: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <label className="label" style={{ margin: 0 }}>Team Members</label>
            <button onClick={addTeamMember} className="btn-sm" style={{ background: '#1a1a1a', color: '#c9a84c', border: '1px solid #222' }}><Plus size={12} /> Add Member</button>
          </div>
          {form.teamMembers.map((tm, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 8, marginBottom: 8 }}>
              <select className="input" value={tm.memberId} onChange={e => updateMember(i, { memberId: Number(e.target.value) })}>
                <option value="">Select member</option>
                {members.filter(m => m.active).map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
              </select>
              <select className="input" value={tm.effort} onChange={e => updateMember(i, { effort: e.target.value })}>
                <option value="none">Not involved (0)</option>
                <option value="helped">Helped a little (0.5)</option>
                <option value="contributed">Contributed (1)</option>
                <option value="core">Core worker (2)</option>
                <option value="led">Led the build (3)</option>
              </select>
              <button onClick={() => removeMember(i)} style={{ background: '#1a1a1a', border: '1px solid #222', borderRadius: 8, padding: '0 10px', color: '#f87171', cursor: 'pointer' }}><X size={14} /></button>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 24 }}>
          <button className="btn-outline btn-sm" onClick={onClose}>Cancel</button>
          <button className="btn-gold btn-sm" onClick={() => { onSave(form); onClose(); }}>Create Project</button>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const { projects, leads, members, addProject, currentUser } = useStore();
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const canCreate = currentUser?.accessLevel !== 'viewer';

  const filtered = projects.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#f0f0f0' }}>Projects</h1>
          <p style={{ color: '#555', fontSize: 13, marginTop: 2 }}>{projects.length} projects · {projects.filter(p => p.status === 'approved').length} approved</p>
        </div>
        {canCreate && <button className="btn-gold btn-sm" onClick={() => setShowModal(true)}><Plus size={14} /> New Project</button>}
      </div>

      <div style={{ position: 'relative', marginBottom: 20, maxWidth: 360 }}>
        <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#444' }} />
        <input className="input" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search projects..." style={{ paddingLeft: 36 }} />
      </div>

      <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px 120px 100px 100px 40px', gap: 0, padding: '12px 20px', borderBottom: '1px solid #1a1a1a' }}>
          {['Project', 'Value', 'Payment', 'Status', 'Team', ''].map(h => (
            <div key={h} style={{ fontSize: 11, fontWeight: 600, color: '#444', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h}</div>
          ))}
        </div>
        {filtered.length === 0 && <div style={{ padding: '40px 20px', textAlign: 'center', color: '#333', fontSize: 14 }}>No projects found</div>}
        {filtered.map(p => {
          const client = leads.find(l => l.id === p.clientId);
          const st = statusConfig[p.status] || statusConfig.draft;
          const py = paymentConfig[p.paymentStatus] || paymentConfig.not_paid;
          return (
            <Link key={p.id} to={`/admin/projects/${p.id}`} style={{ display: 'grid', gridTemplateColumns: '1fr 120px 120px 100px 100px 40px', gap: 0, padding: '14px 20px', borderBottom: '1px solid #141414', textDecoration: 'none', transition: 'background 0.1s' }}
              onMouseEnter={e => e.currentTarget.style.background = '#0e0e0e'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: '#f0f0f0', display: 'flex', alignItems: 'center', gap: 8 }}>
                  {p.name}
                  {p.status === 'approved' && <Lock size={11} color="#c9a84c" />}
                </div>
                {client && <div style={{ fontSize: 11, color: '#444', marginTop: 2 }}>{client.name}</div>}
              </div>
              <div style={{ fontSize: 13, color: '#c9a84c', fontWeight: 600 }}>₹{p.totalValue?.toLocaleString()}</div>
              <div><span style={{ fontSize: 11, color: py.color }}>{py.label}</span></div>
              <div><span className="badge" style={{ background: st.bg, color: st.color, fontSize: 10 }}>{st.label}</span></div>
              <div style={{ fontSize: 12, color: '#555' }}>{p.teamMembers?.length} members</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <ChevronRight size={14} color="#333" />
              </div>
            </Link>
          );
        })}
      </div>

      {showModal && <AddProjectModal onClose={() => setShowModal(false)} onSave={addProject} leads={leads} members={members} />}
    </div>
  );
}
