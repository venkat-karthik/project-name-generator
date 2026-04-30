import { useState } from 'react';
import { AlertTriangle, Plus, X, MessageCircle, CheckCircle } from 'lucide-react';
import { useStore } from '../../store/useStore';

export default function Disputes() {
  const { projects, members, addDispute, addDisputeComment, resolveDispute, currentUser } = useStore();
  const [selectedDispute, setSelectedDispute] = useState(null);
  const [showNewDispute, setShowNewDispute] = useState(false);
  const [newDispute, setNewDispute] = useState({ projectId: '', reason: '', description: '' });
  const [commentText, setCommentText] = useState('');

  const allDisputes = projects.flatMap(p => (p.disputes || []).map(d => ({ ...d, projectId: p.id, projectName: p.name })));
  const activeDisputes = allDisputes.filter(d => !d.resolved);
  const resolvedDisputes = allDisputes.filter(d => d.resolved);

  const handleAddDispute = () => {
    if (newDispute.projectId && newDispute.reason) {
      addDispute(parseInt(newDispute.projectId), {
        reason: newDispute.reason,
        description: newDispute.description,
        raisedBy: currentUser.id,
      });
      setNewDispute({ projectId: '', reason: '', description: '' });
      setShowNewDispute(false);
    }
  };

  const handleAddComment = () => {
    if (commentText.trim() && selectedDispute) {
      addDisputeComment(selectedDispute.projectId, selectedDispute.id, {
        text: commentText,
        author: currentUser.id,
      });
      setCommentText('');
    }
  };

  const getMemberName = (memberId) => members.find(m => m.id === memberId)?.name || 'Unknown';

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#f0f0f0', letterSpacing: '-0.5px' }}>Disputes</h1>
          <p style={{ color: '#555', fontSize: 14, marginTop: 4 }}>Manage project disputes and resolutions</p>
        </div>
        <button className="btn-gold" onClick={() => setShowNewDispute(true)} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Plus size={16} /> Raise Dispute
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 24 }}>
        {[
          { label: 'Active Disputes', value: activeDisputes.length, color: '#f87171' },
          { label: 'Resolved', value: resolvedDisputes.length, color: '#4ade80' },
          { label: 'Total', value: allDisputes.length, color: '#c9a84c' },
        ].map(s => (
          <div key={s.label} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, padding: 16 }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: s.color, letterSpacing: '-1px', marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: 12, color: '#555' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Active Disputes */}
      <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, overflow: 'hidden', marginBottom: 24 }}>
        <div style={{ padding: 20, borderBottom: '1px solid #1a1a1a', background: '#0e0e0e' }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: '#f0f0f0' }}>Active Disputes ({activeDisputes.length})</h3>
        </div>

        {activeDisputes.length === 0 ? (
          <div style={{ padding: 40, textAlign: 'center', color: '#555' }}>
            <AlertTriangle size={32} style={{ margin: '0 auto 12px', opacity: 0.5 }} />
            <p>No active disputes. Great work!</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 16 }}>
            {activeDisputes.map(d => (
              <div key={d.id} onClick={() => setSelectedDispute(d)} style={{ background: '#0e0e0e', border: '1px solid #1a1a1a', borderRadius: 10, padding: 14, cursor: 'pointer', transition: 'all 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#c9a84c'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#1a1a1a'}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#f0f0f0' }}>{d.projectName}</div>
                    <div style={{ fontSize: 11, color: '#555', marginTop: 2 }}>Raised by {getMemberName(d.raisedBy)}</div>
                  </div>
                  <span className="badge" style={{ background: 'rgba(248,113,113,0.1)', color: '#f87171', border: '1px solid rgba(248,113,113,0.2)' }}>
                    {d.reason}
                  </span>
                </div>
                <p style={{ fontSize: 12, color: '#888', lineHeight: 1.4 }}>{d.description}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, fontSize: 11, color: '#444' }}>
                  <MessageCircle size={12} />
                  {d.comments?.length || 0} comments
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Resolved Disputes */}
      {resolvedDisputes.length > 0 && (
        <div style={{ background: '#111', border: '1px solid #1a1a1a', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ padding: 20, borderBottom: '1px solid #1a1a1a', background: '#0e0e0e' }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: '#666' }}>Resolved Disputes ({resolvedDisputes.length})</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 16, opacity: 0.6 }}>
            {resolvedDisputes.map(d => (
              <div key={d.id} style={{ background: '#0e0e0e', border: '1px solid #1a1a1a', borderRadius: 10, padding: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#666' }}>{d.projectName}</div>
                  <div style={{ fontSize: 11, color: '#444', marginTop: 2 }}>{d.reason}</div>
                </div>
                <CheckCircle size={16} color="#4ade80" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Dispute Detail Modal */}
      {selectedDispute && (
        <div className="modal-backdrop" onClick={() => setSelectedDispute(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 600 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: '#f0f0f0', marginBottom: 4 }}>{selectedDispute.projectName}</h2>
                <p style={{ color: '#555', fontSize: 12 }}>Raised by {getMemberName(selectedDispute.raisedBy)}</p>
              </div>
              <button onClick={() => setSelectedDispute(null)} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', padding: 4 }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ background: '#0e0e0e', borderRadius: 8, padding: 12, marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <AlertTriangle size={14} color="#f87171" />
                <span style={{ fontSize: 12, fontWeight: 600, color: '#f87171' }}>{selectedDispute.reason}</span>
              </div>
              <p style={{ fontSize: 12, color: '#888', lineHeight: 1.5 }}>{selectedDispute.description}</p>
            </div>

            {/* Comments */}
            <div style={{ marginBottom: 16 }}>
              <h3 style={{ fontSize: 12, fontWeight: 600, color: '#f0f0f0', marginBottom: 12 }}>Comments ({selectedDispute.comments?.length || 0})</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxHeight: 250, overflowY: 'auto', marginBottom: 12 }}>
                {(selectedDispute.comments || []).map(c => (
                  <div key={c.id} style={{ background: '#0e0e0e', borderRadius: 8, padding: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                      <span style={{ fontSize: 11, fontWeight: 600, color: '#f0f0f0' }}>{getMemberName(c.author)}</span>
                      <span style={{ fontSize: 10, color: '#444' }}>
                        {new Date(c.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p style={{ fontSize: 11, color: '#888', lineHeight: 1.4 }}>{c.text}</p>
                  </div>
                ))}
              </div>

              {/* Add Comment */}
              {!selectedDispute.resolved && (
                <div style={{ display: 'flex', gap: 8 }}>
                  <textarea
                    placeholder="Add a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="input"
                    style={{ fontSize: 12, minHeight: 60, flex: 1 }}
                  />
                  <button className="btn-sm" onClick={handleAddComment} style={{ background: '#1a1a1a', color: '#c9a84c', border: '1px solid #2a2a2a', alignSelf: 'flex-end' }}>
                    <MessageCircle size={12} />
                  </button>
                </div>
              )}
            </div>

            {/* Actions */}
            {!selectedDispute.resolved && (
              <div style={{ display: 'flex', gap: 12 }}>
                <button className="btn-gold" style={{ flex: 1 }} onClick={() => { resolveDispute(selectedDispute.projectId, selectedDispute.id); setSelectedDispute(null); }}>
                  <CheckCircle size={14} /> Mark Resolved
                </button>
                <button className="btn-outline" style={{ flex: 1 }} onClick={() => setSelectedDispute(null)}>Close</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* New Dispute Modal */}
      {showNewDispute && (
        <div className="modal-backdrop" onClick={() => setShowNewDispute(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#f0f0f0' }}>Raise a Dispute</h2>
              <button onClick={() => setShowNewDispute(false)} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label className="label">Project</label>
              <select
                value={newDispute.projectId}
                onChange={(e) => setNewDispute({ ...newDispute, projectId: e.target.value })}
                className="input"
              >
                <option value="">Select a project</option>
                {projects.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label className="label">Reason</label>
              <select
                value={newDispute.reason}
                onChange={(e) => setNewDispute({ ...newDispute, reason: e.target.value })}
                className="input"
              >
                <option value="">Select reason</option>
                <option value="Payment Issue">Payment Issue</option>
                <option value="Scope Mismatch">Scope Mismatch</option>
                <option value="Quality Concern">Quality Concern</option>
                <option value="Timeline Delay">Timeline Delay</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label className="label">Description</label>
              <textarea
                placeholder="Describe the dispute in detail..."
                value={newDispute.description}
                onChange={(e) => setNewDispute({ ...newDispute, description: e.target.value })}
                className="input"
              />
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button className="btn-gold" style={{ flex: 1 }} onClick={handleAddDispute}>Raise Dispute</button>
              <button className="btn-outline" style={{ flex: 1 }} onClick={() => setShowNewDispute(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
