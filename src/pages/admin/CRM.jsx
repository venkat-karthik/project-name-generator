import { useState } from 'react';
import { Plus, Search, Filter, X, Phone, Mail, Tag, Calendar, DollarSign, User } from 'lucide-react';
import { useStore } from '../../store/useStore';

const statuses = ['new', 'contacted', 'qualified', 'proposal', 'won', 'lost'];
const statusLabels = { new: 'New', contacted: 'Contacted', qualified: 'Qualified', proposal: 'Proposal', won: 'Won', lost: 'Lost' };
const statusColors = {
  new: '#60a5fa', contacted: '#a78bfa', qualified: '#c9a84c',
  proposal: '#f59e0b', won: '#4ade80', lost: '#f87171'
};

export default function CRM() {
  const { leads, members, updateLead, addLead, deleteLead, moveLead } = useStore();
  const [search, setSearch] = useState('');
  const [selectedLead, setSelectedLead] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newLead, setNewLead] = useState({ name: '', contact: '', email: '', source: 'Website', status: 'new', assigned: null, notes: '', tags: [], value: 50000 });
  const [draggedLead, setDraggedLead] = useState(null);

  const filteredLeads = leads.filter(l => l.name.toLowerCase().includes(search.toLowerCase()));

  const handleAddLead = () => {
    if (newLead.name && newLead.contact) {
      addLead(newLead);
      setNewLead({ name: '', contact: '', email: '', source: 'Website', status: 'new', assigned: null, notes: '', tags: [], value: 50000 });
      setShowModal(false);
    }
  };

  const handleDragStart = (lead) => {
    setDraggedLead(lead);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (status) => {
    if (draggedLead) {
      moveLead(draggedLead.id, status);
      setDraggedLead(null);
    }
  };

  const getAssignedMember = (memberId) => members.find(m => m.id === memberId);

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#f0f0f0', letterSpacing: '-0.5px' }}>CRM / Lead Pipeline</h1>
          <p style={{ color: '#555', fontSize: 14, marginTop: 4 }}>Manage leads through the sales pipeline</p>
        </div>
        <button className="btn-gold" onClick={() => setShowModal(true)} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Plus size={16} /> Add Lead
        </button>
      </div>

      {/* Search & Filter */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#444' }} />
          <input
            type="text"
            placeholder="Search leads..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input"
            style={{ paddingLeft: 40 }}
          />
        </div>
        <button style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 8, padding: '10px 14px', color: '#666', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
          <Filter size={16} /> Filter
        </button>
      </div>

      {/* Kanban Board */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, overflowX: 'auto', paddingBottom: 16 }}>
        {statuses.map(status => {
          const statusLeads = filteredLeads.filter(l => l.status === status);
          return (
            <div
              key={status}
              className="kanban-col"
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(status)}
              style={{ minHeight: 400 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: statusColors[status] }} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#f0f0f0' }}>{statusLabels[status]}</span>
                  <span style={{ fontSize: 12, color: '#444', background: '#1a1a1a', padding: '2px 8px', borderRadius: 999 }}>{statusLeads.length}</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {statusLeads.map(lead => (
                  <div
                    key={lead.id}
                    className="kanban-card"
                    draggable
                    onDragStart={() => handleDragStart(lead)}
                    onClick={() => setSelectedLead(lead)}
                    style={{ cursor: 'grab' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: 13, fontWeight: 600, color: '#f0f0f0', marginBottom: 4 }}>{lead.name}</h4>
                        <p style={{ fontSize: 11, color: '#555' }}>{lead.source}</p>
                      </div>
                      <span className="badge" style={{ background: `${statusColors[status]}15`, color: statusColors[status], border: `1px solid ${statusColors[status]}30`, fontSize: 10 }}>
                        ₹{(lead.value / 1000).toFixed(0)}K
                      </span>
                    </div>

                    {lead.assigned && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10, padding: '8px', background: '#0e0e0e', borderRadius: 6 }}>
                        <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 700, color: '#c9a84c' }}>
                          {getAssignedMember(lead.assigned)?.avatar}
                        </div>
                        <span style={{ fontSize: 11, color: '#888' }}>{getAssignedMember(lead.assigned)?.name}</span>
                      </div>
                    )}

                    {lead.tags && lead.tags.length > 0 && (
                      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                        {lead.tags.map(tag => (
                          <span key={tag} className="badge" style={{ background: '#1a1a1a', color: '#888', fontSize: 10 }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div style={{ fontSize: 11, color: '#444', marginTop: 8 }}>
                      {new Date(lead.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="modal-backdrop" onClick={() => setSelectedLead(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: '#f0f0f0', marginBottom: 4 }}>{selectedLead.name}</h2>
                <p style={{ color: '#555', fontSize: 13 }}>{selectedLead.source}</p>
              </div>
              <button onClick={() => setSelectedLead(null)} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', padding: 4 }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
              <div>
                <label className="label">Contact</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', background: '#0e0e0e', borderRadius: 8 }}>
                  <Phone size={14} color="#c9a84c" />
                  <span style={{ fontSize: 13, color: '#f0f0f0' }}>{selectedLead.contact}</span>
                </div>
              </div>
              <div>
                <label className="label">Email</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', background: '#0e0e0e', borderRadius: 8 }}>
                  <Mail size={14} color="#c9a84c" />
                  <span style={{ fontSize: 13, color: '#f0f0f0' }}>{selectedLead.email}</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
              <div>
                <label className="label">Assigned To</label>
                <select
                  value={selectedLead.assigned || ''}
                  onChange={(e) => updateLead(selectedLead.id, { assigned: e.target.value ? parseInt(e.target.value) : null })}
                  className="input"
                  style={{ fontSize: 13 }}
                >
                  <option value="">Unassigned</option>
                  {members.filter(m => m.active).map(m => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label">Status</label>
                <select
                  value={selectedLead.status}
                  onChange={(e) => updateLead(selectedLead.id, { status: e.target.value })}
                  className="input"
                  style={{ fontSize: 13 }}
                >
                  {statuses.map(s => (
                    <option key={s} value={s}>{statusLabels[s]}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
              <div>
                <label className="label">Deal Value</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', background: '#0e0e0e', borderRadius: 8 }}>
                  <DollarSign size={14} color="#c9a84c" />
                  <span style={{ fontSize: 13, color: '#f0f0f0' }}>₹{selectedLead.value?.toLocaleString()}</span>
                </div>
              </div>
              <div>
                <label className="label">Created</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', background: '#0e0e0e', borderRadius: 8 }}>
                  <Calendar size={14} color="#c9a84c" />
                  <span style={{ fontSize: 13, color: '#f0f0f0' }}>{new Date(selectedLead.createdAt).toLocaleDateString('en-IN')}</span>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label className="label">Notes</label>
              <textarea
                value={selectedLead.notes}
                onChange={(e) => updateLead(selectedLead.id, { notes: e.target.value })}
                className="input"
                style={{ fontSize: 13 }}
              />
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button className="btn-gold" style={{ flex: 1 }} onClick={() => setSelectedLead(null)}>Save Changes</button>
              <button className="btn-outline" style={{ flex: 1 }} onClick={() => { deleteLead(selectedLead.id); setSelectedLead(null); }}>Delete Lead</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Lead Modal */}
      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#f0f0f0' }}>Add New Lead</h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', padding: 4 }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div>
                <label className="label">Company Name *</label>
                <input
                  type="text"
                  placeholder="e.g., TechStart Solutions"
                  value={newLead.name}
                  onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                  className="input"
                />
              </div>
              <div>
                <label className="label">Contact *</label>
                <input
                  type="tel"
                  placeholder="+91 9876543210"
                  value={newLead.contact}
                  onChange={(e) => setNewLead({ ...newLead, contact: e.target.value })}
                  className="input"
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div>
                <label className="label">Email</label>
                <input
                  type="email"
                  placeholder="contact@company.com"
                  value={newLead.email}
                  onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                  className="input"
                />
              </div>
              <div>
                <label className="label">Source</label>
                <select
                  value={newLead.source}
                  onChange={(e) => setNewLead({ ...newLead, source: e.target.value })}
                  className="input"
                >
                  {['Website', 'WhatsApp', 'Referral', 'LinkedIn', 'Cold Email', 'Other'].map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div>
                <label className="label">Deal Value (₹)</label>
                <input
                  type="number"
                  placeholder="50000"
                  value={newLead.value}
                  onChange={(e) => setNewLead({ ...newLead, value: parseInt(e.target.value) })}
                  className="input"
                />
              </div>
              <div>
                <label className="label">Assign To</label>
                <select
                  value={newLead.assigned || ''}
                  onChange={(e) => setNewLead({ ...newLead, assigned: e.target.value ? parseInt(e.target.value) : null })}
                  className="input"
                >
                  <option value="">Unassigned</option>
                  {members.filter(m => m.active).map(m => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label className="label">Notes</label>
              <textarea
                placeholder="Add any notes about this lead..."
                value={newLead.notes}
                onChange={(e) => setNewLead({ ...newLead, notes: e.target.value })}
                className="input"
              />
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button className="btn-gold" style={{ flex: 1 }} onClick={handleAddLead}>Add Lead</button>
              <button className="btn-outline" style={{ flex: 1 }} onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
