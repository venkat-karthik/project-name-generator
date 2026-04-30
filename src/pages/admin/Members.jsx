import { useState } from 'react';
import { Plus, X, Edit2, Trash2, Shield, Lock } from 'lucide-react';
import { useStore } from '../../store/useStore';

const accessLevels = { founder: 'Founder', core: 'Core Member', viewer: 'Viewer' };
const accessColors = { founder: '#c9a84c', core: '#60a5fa', viewer: '#888' };

export default function Members() {
  const { members, addMember, updateMember, removeMember, currentUser } = useStore();
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newMember, setNewMember] = useState({
    name: '',
    role: '',
    equity: 0,
    skills: [],
    accessLevel: 'core',
    avatar: ''
  });
  const [skillInput, setSkillInput] = useState('');

  const isFounder = currentUser?.accessLevel === 'founder';

  if (!isFounder) {
    return (
      <div style={{ padding: 40, textAlign: 'center' }}>
        <Shield size={48} color="#f87171" style={{ margin: '0 auto 16px' }} />
        <h2 style={{ fontSize: 18, fontWeight: 700, color: '#f0f0f0', marginBottom: 8 }}>Access Denied</h2>
        <p style={{ color: '#555', fontSize: 14 }}>Only founders can manage team members.</p>
      </div>
    );
  }

  const activeMembers = members.filter(m => m.active);
  const inactiveMembers = members.filter(m => !m.active);

  const handleAddMember = () => {
    if (newMember.name && newMember.role) {
      if (editingId) {
        updateMember(editingId, newMember);
        setEditingId(null);
      } else {
        const avatar = newMember.name.split(' ').map(n => n[0]).join('').toUpperCase();
        addMember({ ...newMember, avatar });
      }
      setNewMember({ name: '', role: '', equity: 0, skills: [], accessLevel: 'core', avatar: '' });
      setShowModal(false);
    }
  };

  const handleEdit = (member) => {
    setNewMember(member);
    setEditingId(member.id);
    setShowModal(true);
  };

  const handleAddSkill = () => {
    if (skillInput.trim()) {
      setNewMember({
        ...newMember,
        skills: [...newMember.skills, skillInput.trim()]
      });
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skill) => {
    setNewMember({
      ...newMember,
      skills: newMember.skills.filter(s => s !== skill)
    });
  };

  const totalEquity = activeMembers.reduce((sum, m) => sum + m.equity, 0);

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#f0f0f0', letterSpacing: '-0.5px' }}>Team Members</h1>
          <p style={{ color: '#555', fontSize: 14, marginTop: 4 }}>Manage team members, roles, and equity</p>
        </div>
        <button className="btn-gold" onClick={() => { setEditingId(null); setNewMember({ name: '', role: '', equity: 0, skills: [], accessLevel: 'core', avatar: '' }); setShowModal(true); }} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Plus size={16} /> Add Member
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 24 }}>
        {[
          { label: 'Active Members', value: activeMembers.length, color: '#4ade80' },
          { label: 'Total Equity', value: `${totalEquity}%`, color: '#c9a84c' },
          { label: 'Founders', value: activeMembers.filter(m => m.accessLevel === 'founder').length, color: '#c9a84c' },
          { label: 'Core Members', value: activeMembers.filter(m => m.accessLevel === 'core').length, color: '#60a5fa' },
        ].map(s => (
          <div key={s.label} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, padding: 16 }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: s.color, letterSpacing: '-1px', marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: 12, color: '#555' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Active Members */}
      <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, overflow: 'hidden', marginBottom: 24 }}>
        <div style={{ padding: 20, borderBottom: '1px solid #1a1a1a', background: '#0e0e0e' }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: '#f0f0f0' }}>Active Members ({activeMembers.length})</h3>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1a1a1a', background: '#0e0e0e' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Member</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Role</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Equity</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Access Level</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Skills</th>
                <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: 12, fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {activeMembers.map(m => (
                <tr key={m.id} className="table-row">
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#c9a84c,#e4c677)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#0a0a0a' }}>
                        {m.avatar}
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: '#f0f0f0' }}>{m.name}</div>
                        <div style={{ fontSize: 11, color: '#444', marginTop: 2 }}>ID: {m.id}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: 13, color: '#888' }}>{m.role}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span className="badge" style={{ background: 'rgba(201,168,76,0.1)', color: '#c9a84c', border: '1px solid rgba(201,168,76,0.2)' }}>
                      {m.equity}%
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span className="badge" style={{ background: `${accessColors[m.accessLevel]}15`, color: accessColors[m.accessLevel], border: `1px solid ${accessColors[m.accessLevel]}30` }}>
                      {accessLevels[m.accessLevel]}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                      {m.skills.slice(0, 2).map(s => (
                        <span key={s} className="badge" style={{ background: '#1a1a1a', color: '#888', fontSize: 10 }}>
                          {s}
                        </span>
                      ))}
                      {m.skills.length > 2 && (
                        <span className="badge" style={{ background: '#1a1a1a', color: '#666', fontSize: 10 }}>
                          +{m.skills.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                      <button onClick={() => handleEdit(m)} style={{ background: 'none', border: 'none', color: '#c9a84c', cursor: 'pointer', padding: 4 }}>
                        <Edit2 size={14} />
                      </button>
                      <button onClick={() => removeMember(m.id)} style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', padding: 4 }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inactive Members */}
      {inactiveMembers.length > 0 && (
        <div style={{ background: '#111', border: '1px solid #1a1a1a', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ padding: 20, borderBottom: '1px solid #1a1a1a', background: '#0e0e0e' }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: '#666' }}>Inactive Members ({inactiveMembers.length})</h3>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', opacity: 0.6 }}>
              <tbody>
                {inactiveMembers.map(m => (
                  <tr key={m.id} className="table-row">
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#444' }}>
                          {m.avatar}
                        </div>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: '#666' }}>{m.name}</div>
                          <div style={{ fontSize: 11, color: '#333', marginTop: 2 }}>Removed</div>
                        </div>
                      </div>
                    </td>
                    <td colSpan="5" style={{ padding: '14px 16px', textAlign: 'right' }}>
                      <button onClick={() => updateMember(m.id, { active: true })} style={{ background: 'none', border: 'none', color: '#c9a84c', cursor: 'pointer', fontSize: 12, fontWeight: 500 }}>
                        Restore
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add/Edit Member Modal */}
      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#f0f0f0' }}>
                {editingId ? 'Edit Member' : 'Add New Member'}
              </h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', padding: 4 }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div>
                <label className="label">Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g., Arjun Sharma"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  className="input"
                />
              </div>
              <div>
                <label className="label">Role *</label>
                <input
                  type="text"
                  placeholder="e.g., Lead Developer"
                  value={newMember.role}
                  onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                  className="input"
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div>
                <label className="label">Equity %</label>
                <input
                  type="number"
                  placeholder="20"
                  min="0"
                  max="100"
                  value={newMember.equity}
                  onChange={(e) => setNewMember({ ...newMember, equity: parseInt(e.target.value) })}
                  className="input"
                />
              </div>
              <div>
                <label className="label">Access Level</label>
                <select
                  value={newMember.accessLevel}
                  onChange={(e) => setNewMember({ ...newMember, accessLevel: e.target.value })}
                  className="input"
                >
                  {Object.entries(accessLevels).map(([k, v]) => (
                    <option key={k} value={k}>{v}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label className="label">Skills</label>
              <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                <input
                  type="text"
                  placeholder="e.g., React, Node.js"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                  className="input"
                  style={{ flex: 1 }}
                />
                <button onClick={handleAddSkill} className="btn-sm" style={{ background: '#1a1a1a', color: '#c9a84c', border: '1px solid #2a2a2a' }}>
                  Add
                </button>
              </div>
              {newMember.skills.length > 0 && (
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {newMember.skills.map(s => (
                    <span key={s} className="badge" style={{ background: 'rgba(201,168,76,0.1)', color: '#c9a84c', border: '1px solid rgba(201,168,76,0.2)', display: 'flex', alignItems: 'center', gap: 6 }}>
                      {s}
                      <button onClick={() => handleRemoveSkill(s)} style={{ background: 'none', border: 'none', color: '#c9a84c', cursor: 'pointer', padding: 0 }}>
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button className="btn-gold" style={{ flex: 1 }} onClick={handleAddMember}>
                {editingId ? 'Update Member' : 'Add Member'}
              </button>
              <button className="btn-outline" style={{ flex: 1 }} onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
