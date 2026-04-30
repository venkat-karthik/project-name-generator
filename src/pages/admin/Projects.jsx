import { useState } from 'react';
import { Plus, Search, Filter, X, DollarSign, Users, Calendar, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore } from '../../store/useStore';

const paymentStatuses = { not_paid: 'Not Paid', partial: 'Partial', fully_paid: 'Fully Paid' };
const paymentColors = { not_paid: '#f87171', partial: '#f59e0b', fully_paid: '#4ade80' };
const projectStatuses = { draft: 'Draft', review: 'Under Review', approved: 'Approved' };
const projectColors = { draft: '#666', review: '#e4c677', approved: '#4ade80' };

export default function Projects() {
  const { projects, leads, members, addProject } = useStore();
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    clientId: '',
    totalValue: 100000,
    paymentStatus: 'not_paid',
    status: 'draft',
    companyReserve: 20,
    bdBonus: { memberId: null, percent: 5 },
    teamMembers: [],
  });

  const filteredProjects = projects.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const getClientName = (clientId) => {
    const lead = leads.find(l => l.id === clientId);
    return lead?.name || 'Unknown Client';
  };

  const getMemberName = (memberId) => {
    const member = members.find(m => m.id === memberId);
    return member?.name || 'Unknown';
  };

  const handleAddProject = () => {
    if (newProject.name && newProject.clientId) {
      addProject(newProject);
      setNewProject({
        name: '',
        clientId: '',
        totalValue: 100000,
        paymentStatus: 'not_paid',
        status: 'draft',
        companyReserve: 20,
        bdBonus: { memberId: null, percent: 5 },
        teamMembers: [],
      });
      setShowModal(false);
    }
  };

  const totalRevenue = projects.reduce((sum, p) => sum + p.totalValue, 0);
  const approvedCount = projects.filter(p => p.status === 'approved').length;
  const paidCount = projects.filter(p => p.paymentStatus === 'fully_paid').length;

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#f0f0f0', letterSpacing: '-0.5px' }}>Projects</h1>
          <p style={{ color: '#555', fontSize: 14, marginTop: 4 }}>Manage all projects and their financials</p>
        </div>
        <button className="btn-gold" onClick={() => setShowModal(true)} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Plus size={16} /> New Project
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 24 }}>
        {[
          { label: 'Total Revenue', value: `₹${(totalRevenue / 100000).toFixed(1)}L`, color: '#c9a84c' },
          { label: 'Projects', value: projects.length, color: '#60a5fa' },
          { label: 'Approved', value: approvedCount, color: '#4ade80' },
          { label: 'Fully Paid', value: paidCount, color: '#a78bfa' },
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
            placeholder="Search projects..."
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

      {/* Projects Table */}
      <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1a1a1a', background: '#0e0e0e' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Project</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Client</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Value</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Payment</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Team</th>
                <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: 12, fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map(p => (
                <tr key={p.id} className="table-row">
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#f0f0f0' }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: '#444', marginTop: 2 }}>Created {new Date(p.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</div>
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: 13, color: '#888' }}>{getClientName(p.clientId)}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#c9a84c' }}>₹{(p.totalValue / 100000).toFixed(1)}L</div>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span className="badge" style={{ background: `${paymentColors[p.paymentStatus]}15`, color: paymentColors[p.paymentStatus], border: `1px solid ${paymentColors[p.paymentStatus]}30` }}>
                      {paymentStatuses[p.paymentStatus]}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span className="badge" style={{ background: `${projectColors[p.status]}15`, color: projectColors[p.status], border: `1px solid ${projectColors[p.status]}30` }}>
                      {projectStatuses[p.status]}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Users size={14} color="#666" />
                      <span style={{ fontSize: 12, color: '#888' }}>{p.teamMembers?.length || 0}</span>
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                    <Link to={`/admin/projects/${p.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: '#c9a84c', textDecoration: 'none', fontSize: 12, fontWeight: 500 }}>
                      View <ChevronRight size={14} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProjects.length === 0 && (
          <div style={{ padding: '40px 20px', textAlign: 'center' }}>
            <p style={{ color: '#555', fontSize: 14 }}>No projects found. Create one to get started.</p>
          </div>
        )}
      </div>

      {/* Add Project Modal */}
      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#f0f0f0' }}>Create New Project</h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', padding: 4 }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div>
                <label className="label">Project Name *</label>
                <input
                  type="text"
                  placeholder="e.g., EduPrime LMS"
                  value={newProject.name}
                  onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                  className="input"
                />
              </div>
              <div>
                <label className="label">Client *</label>
                <select
                  value={newProject.clientId}
                  onChange={(e) => setNewProject({ ...newProject, clientId: parseInt(e.target.value) })}
                  className="input"
                >
                  <option value="">Select a client</option>
                  {leads.filter(l => l.status === 'won').map(l => (
                    <option key={l.id} value={l.id}>{l.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div>
                <label className="label">Total Value (₹)</label>
                <input
                  type="number"
                  placeholder="100000"
                  value={newProject.totalValue}
                  onChange={(e) => setNewProject({ ...newProject, totalValue: parseInt(e.target.value) })}
                  className="input"
                />
              </div>
              <div>
                <label className="label">Company Reserve (%)</label>
                <input
                  type="number"
                  placeholder="20"
                  min="10"
                  max="40"
                  value={newProject.companyReserve}
                  onChange={(e) => setNewProject({ ...newProject, companyReserve: parseInt(e.target.value) })}
                  className="input"
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div>
                <label className="label">Payment Status</label>
                <select
                  value={newProject.paymentStatus}
                  onChange={(e) => setNewProject({ ...newProject, paymentStatus: e.target.value })}
                  className="input"
                >
                  <option value="not_paid">Not Paid</option>
                  <option value="partial">Partial</option>
                  <option value="fully_paid">Fully Paid</option>
                </select>
              </div>
              <div>
                <label className="label">BD Bonus Member</label>
                <select
                  value={newProject.bdBonus.memberId || ''}
                  onChange={(e) => setNewProject({ ...newProject, bdBonus: { ...newProject.bdBonus, memberId: e.target.value ? parseInt(e.target.value) : null } })}
                  className="input"
                >
                  <option value="">None</option>
                  {members.filter(m => m.active).map(m => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {newProject.bdBonus.memberId && (
              <div style={{ marginBottom: 16 }}>
                <label className="label">BD Bonus %</label>
                <input
                  type="number"
                  placeholder="5"
                  min="1"
                  max="20"
                  value={newProject.bdBonus.percent}
                  onChange={(e) => setNewProject({ ...newProject, bdBonus: { ...newProject.bdBonus, percent: parseInt(e.target.value) } })}
                  className="input"
                />
              </div>
            )}

            <div style={{ display: 'flex', gap: 12 }}>
              <button className="btn-gold" style={{ flex: 1 }} onClick={handleAddProject}>Create Project</button>
              <button className="btn-outline" style={{ flex: 1 }} onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
