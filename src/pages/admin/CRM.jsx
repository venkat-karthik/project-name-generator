import { useState } from 'react';
import { Plus, Search, Filter, X, Phone, Mail, MessageCircle, Tag, User, Clock, ChevronRight, Edit2, Trash2 } from 'lucide-react';
import { useStore } from '../../store/useStore';

const STAGES = [
  { key: 'new', label: 'New', color: '#60a5fa' },
  { key: 'contacted', label: 'Contacted', color: '#a78bfa' },
  { key: 'qualified', label: 'Qualified', color: '#c9a84c' },
  { key: 'proposal', label: 'Proposal', color: '#f59e0b' },
  { key: 'won', label: 'Won', color: '#4ade80' },
  { key: 'lost', label: 'Lost', color: '#f87171' },
];

const SOURCES = ['Website', 'WhatsApp', 'LinkedIn', 'Referral', 'Cold Email', 'Other'];

function LeadCard({ lead, members, onEdit, onDelete, onMove, canEdit }) {
  const assignee = members.find(m => m.id === lead.assigned);
  return (
    <div className="kanban-card" onClick={() => onEdit(lead)} style={{ marginBottom: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <div style={{ fontWeight: 600, fontSize: 13, color: '#f0f0f0', lineHeight: 1.3 }}>{lead.name}</div>
        {canEdit && (
          <button onClick={e => { e.stopPropagation(); onDelete(lead.id); }} style={{ background: 'none', border: 'none', color: '#333', cursor: 'pointer', padding: 2 }}>
            <Trash2 size={12} />
          </button>
        )}
      </div>
      {lead.value && <div style={{ fontSize: 12, color: '#c9a84c', marginBottom: 6 }}>₹{lead.value?.toLocaleString()}</div>}
      <div style={{ fontSize: 11, color: '#555', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
        <Tag size={10} /> {lead.source}
      </div>
      {lead.tags?.length > 0 && (
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 8 }}>
          {lead.tags.map(t => <span key={t} style={{ fontSize: 10, background: '#1a1a1a', color: '#666', padding: '2px 6px', borderRadius: 4 }}>{t}</span>)}
        </div>
      )}
      {assignee && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#222', fontSize: 8, fontWeight: 700, color: '#c9a84c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{assignee.avatar}</div>
          <span style={{ fontSize: 11, color: '#444' }}>{assignee.name}</span>
        </div>
      )}
      {canEdit && (
        <div style={{ display: 'flex', gap: 4, marginTop: 8, flexWrap: 'wrap' }}>
          {STAGES.filter(s => s.key !== lead.status).slice(0, 2).map(s => (
            <button key={s.key} onClick={e => { e.stopPropagation(); onMove(lead.id, s.key); }} style={{ fontSize: 10, background: '#1a1a1a', border: `1px solid #222`, borderRadius: 4, padding: '2px 6px', color: s.color, cursor: 'pointer' }}>
              → {s.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function LeadModal({ lead, members, onClose, onSave, isNew }) {
  const [form, setForm] = useState(lead || { name: '', contact: '', email: '', source: 'Website', status: 'new', assigned: '', notes: '', tags: [], value: '' });
  const [tagInput, setTagInput] = useState('');

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 600 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#f0f0f0' }}>{isNew ? 'Add New Lead' : 'Edit Lead'}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer' }}><X size={18} /></button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div><label className="label">Company/Name *</label><input className="input" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Company name" /></div>
          <div><label className="label">Contact</label><input className="input" value={form.contact} onChange={e => setForm({...form, contact: e.target.value})} placeholder="+91..." /></div>
          <div><label className="label">Email</label><input className="input" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="email@company.com" /></div>
          <div><label className="label">Deal Value (₹)</label><input className="input" type="number" value={form.value} onChange={e => setForm({...form, value: Number(e.target.value)})} placeholder="50000" /></div>
          <div>
            <label className="label">Source</label>
            <select className="input" value={form.source} onChange={e => setForm({...form, source: e.target.value})}>
              {SOURCES.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Status</label>
            <select className="input" value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
              {STAGES.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Assigned To</label>
            <select className="input" value={form.assigned} onChange={e => setForm({...form, assigned: Number(e.target.value)})}>
              <option value="">Unassigned</option>
              {members.filter(m => m.active).map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Tags (press Enter)</label>
            <input className="input" value={tagInput} onChange={e => setTagInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && tagInput.trim()) { setForm({...form, tags: [...(form.tags || []), tagInput.trim()]}); setTagInput(''); e.preventDefault(); }}}
              placeholder="Add tag..." />
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 6 }}>
              {form.tags?.map(t => <span key={t} style={{ fontSize: 11, background: '#1a1a1a', color: '#888', padding: '2px 8px', borderRadius: 4, display: 'flex', alignItems: 'center', gap: 4 }}>{t}<button onClick={() => setForm({...form, tags: form.tags.filter(x => x !== t)})} style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', padding: 0 }}>×</button></span>)}
            </div>
          </div>
        </div>

        <div style={{ marginTop: 16 }}>
          <label className="label">Notes</label>
          <textarea className="input" value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} placeholder="Add notes about this lead..." style={{ minHeight: 80 }} />
        </div>

        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 24 }}>
          <button className="btn-outline btn-sm" onClick={onClose}>Cancel</button>
          <button className="btn-gold btn-sm" onClick={() => { onSave(form); onClose(); }}>
            {isNew ? 'Add Lead' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CRM() {
  const { leads, members, addLead, updateLead, deleteLead, moveLead, currentUser } = useStore();
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(null); // null | { lead, isNew }
  const canEdit = currentUser?.accessLevel !== 'viewer';

  const filtered = leads.filter(l => l.name.toLowerCase().includes(search.toLowerCase()) || l.tags?.some(t => t.toLowerCase().includes(search.toLowerCase())));

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#f0f0f0' }}>CRM — Lead Pipeline</h1>
          <p style={{ color: '#555', fontSize: 13, marginTop: 2 }}>{leads.length} total leads · {leads.filter(l => l.status === 'won').length} won</p>
        </div>
        {canEdit && (
          <button className="btn-gold btn-sm" onClick={() => setModal({ lead: null, isNew: true })}>
            <Plus size={14} /> Add Lead
          </button>
        )}
      </div>

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: 20, maxWidth: 360 }}>
        <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#444' }} />
        <input className="input" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search leads, tags..." style={{ paddingLeft: 36 }} />
      </div>

      {/* Kanban */}
      <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 16 }}>
        {STAGES.map(stage => {
          const stageLeads = filtered.filter(l => l.status === stage.key);
          const stageValue = stageLeads.reduce((s, l) => s + (l.value || 0), 0);
          return (
            <div key={stage.key} className="kanban-col" style={{ width: 240, flexShrink: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: stage.color }} />
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#f0f0f0' }}>{stage.label}</span>
                  <span style={{ fontSize: 11, color: '#444', background: '#1a1a1a', padding: '1px 6px', borderRadius: 4 }}>{stageLeads.length}</span>
                </div>
              </div>
              {stageValue > 0 && <div style={{ fontSize: 11, color: '#555', marginBottom: 10 }}>₹{stageValue.toLocaleString()}</div>}

              {stageLeads.length === 0 && (
                <div style={{ fontSize: 12, color: '#333', textAlign: 'center', padding: '24px 0' }}>No leads</div>
              )}
              {stageLeads.map(lead => (
                <LeadCard key={lead.id} lead={lead} members={members} canEdit={canEdit}
                  onEdit={l => setModal({ lead: l, isNew: false })}
                  onDelete={id => deleteLead(id)}
                  onMove={(id, st) => moveLead(id, st)} />
              ))}

              {canEdit && (
                <button onClick={() => setModal({ lead: { status: stage.key }, isNew: true })} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: '1px dashed #1a1a1a', borderRadius: 8, padding: '8px 12px', width: '100%', color: '#444', fontSize: 12, cursor: 'pointer', marginTop: 4 }}>
                  <Plus size={12} /> Add
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {modal && (
        <LeadModal
          lead={modal.lead}
          isNew={modal.isNew}
          members={members}
          onClose={() => setModal(null)}
          onSave={(data) => { modal.isNew ? addLead(data) : updateLead(data.id, data); }}
        />
      )}
    </div>
  );
}
