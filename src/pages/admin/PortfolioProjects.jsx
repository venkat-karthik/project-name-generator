import { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Eye, EyeOff, GitBranch, X } from 'lucide-react';
import { useStore } from '../../store/useStore';

export default function PortfolioProjects() {
  const {
    portfolioProjects,
    addPortfolioProject,
    updatePortfolioProject,
    deletePortfolioProject,
    publishPortfolioProject,
    unpublishPortfolioProject,
  } = useStore();

  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    github_link: '',
    technologies: [],
    metrics: [],
    status: 'draft',
  });
  const [techInput, setTechInput] = useState('');
  const [metricInput, setMetricInput] = useState({ label: '', value: '', icon: 'TrendingUp' });

  const filteredProjects = portfolioProjects.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenModal = (project = null) => {
    if (project) {
      setEditingId(project.id);
      setFormData(project);
    } else {
      setEditingId(null);
      setFormData({
        title: '',
        description: '',
        image: '',
        github_link: '',
        technologies: [],
        metrics: [],
        status: 'draft',
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
    setTechInput('');
    setMetricInput({ label: '', value: '', icon: 'TrendingUp' });
  };

  const handleAddTechnology = () => {
    if (techInput.trim()) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()],
      }));
      setTechInput('');
    }
  };

  const handleRemoveTechnology = (index) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== index),
    }));
  };

  const handleAddMetric = () => {
    if (metricInput.label && metricInput.value) {
      setFormData(prev => ({
        ...prev,
        metrics: [...prev.metrics, { ...metricInput }],
      }));
      setMetricInput({ label: '', value: '', icon: 'TrendingUp' });
    }
  };

  const handleRemoveMetric = (index) => {
    setFormData(prev => ({
      ...prev,
      metrics: prev.metrics.filter((_, i) => i !== index),
    }));
  };

  const handleSaveProject = () => {
    if (!formData.title || !formData.description || !formData.image) {
      alert('Please fill in all required fields');
      return;
    }

    if (editingId) {
      updatePortfolioProject(editingId, formData);
    } else {
      addPortfolioProject(formData);
    }

    handleCloseModal();
  };

  const handleDeleteProject = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      deletePortfolioProject(id);
    }
  };

  const handleTogglePublish = (id, currentStatus) => {
    if (currentStatus === 'published') {
      unpublishPortfolioProject(id);
    } else {
      publishPortfolioProject(id);
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 32,
        flexWrap: 'wrap',
        gap: 16,
      }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#f0f0f0', marginBottom: 8 }}>
            Portfolio Projects
          </h1>
          <p style={{ color: '#888', fontSize: 14 }}>
            Manage projects displayed on your homepage
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: 8,
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: 14,
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(59, 130, 246, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <Plus size={18} />
          Add Project
        </button>
      </div>

      {/* Search */}
      <div style={{
        marginBottom: 24,
        position: 'relative',
      }}>
        <Search size={16} style={{
          position: 'absolute',
          left: 12,
          top: '50%',
          transform: 'translateY(-50%)',
          color: '#666',
        }} />
        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input"
          style={{
            paddingLeft: 40,
          }}
        />
      </div>

      {/* Projects Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: 16,
      }}>
        {filteredProjects.map(project => (
          <div
            key={project.id}
            style={{
              background: '#111',
              border: '1px solid #1a1a1a',
              borderRadius: 12,
              overflow: 'hidden',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#2a2a2a';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#1a1a1a';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* Image */}
            <div style={{
              width: '100%',
              height: 160,
              background: `url(${project.image}) center/cover`,
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute',
                top: 8,
                right: 8,
                display: 'flex',
                gap: 6,
              }}>
                <button
                  onClick={() => handleTogglePublish(project.id, project.status)}
                  style={{
                    background: project.status === 'published' ? 'rgba(74, 222, 128, 0.2)' : 'rgba(107, 114, 128, 0.2)',
                    border: `1px solid ${project.status === 'published' ? 'rgba(74, 222, 128, 0.4)' : 'rgba(107, 114, 128, 0.4)'}`,
                    color: project.status === 'published' ? '#4ade80' : '#888',
                    padding: '6px 10px',
                    borderRadius: 6,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    fontSize: 12,
                    fontWeight: 600,
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = project.status === 'published' ? 'rgba(74, 222, 128, 0.3)' : 'rgba(107, 114, 128, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = project.status === 'published' ? 'rgba(74, 222, 128, 0.2)' : 'rgba(107, 114, 128, 0.2)';
                  }}
                >
                  {project.status === 'published' ? <Eye size={14} /> : <EyeOff size={14} />}
                </button>
              </div>
            </div>

            {/* Content */}
            <div style={{ padding: 16 }}>
              <h3 style={{
                fontSize: 16,
                fontWeight: 600,
                color: '#f0f0f0',
                marginBottom: 8,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>
                {project.title}
              </h3>

              <p style={{
                fontSize: 12,
                color: '#888',
                marginBottom: 12,
                lineHeight: 1.5,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}>
                {project.description}
              </p>

              {/* Technologies */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 4,
                marginBottom: 12,
              }}>
                {project.technologies?.slice(0, 2).map((tech, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: 10,
                      padding: '2px 8px',
                      borderRadius: 4,
                      background: 'rgba(59, 130, 246, 0.1)',
                      color: '#3b82f6',
                      border: '1px solid rgba(59, 130, 246, 0.2)',
                    }}
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies?.length > 2 && (
                  <span style={{
                    fontSize: 10,
                    padding: '2px 8px',
                    borderRadius: 4,
                    background: 'rgba(124, 255, 103, 0.1)',
                    color: '#7cff67',
                    border: '1px solid rgba(124, 255, 103, 0.2)',
                  }}>
                    +{project.technologies.length - 2}
                  </span>
                )}
              </div>

              {/* GitHub Link */}
              {project.github_link && (
                <a
                  href={project.github_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    color: '#3b82f6',
                    fontSize: 11,
                    textDecoration: 'none',
                    marginBottom: 12,
                  }}
                >
                  <GitBranch size={12} />
                  GitHub
                </a>
              )}

              {/* Actions */}
              <div style={{
                display: 'flex',
                gap: 8,
              }}>
                <button
                  onClick={() => handleOpenModal(project)}
                  style={{
                    flex: 1,
                    background: 'rgba(59, 130, 246, 0.1)',
                    border: '1px solid rgba(59, 130, 246, 0.2)',
                    color: '#3b82f6',
                    padding: '8px 12px',
                    borderRadius: 6,
                    cursor: 'pointer',
                    fontSize: 12,
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 4,
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(59, 130, 246, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                  }}
                >
                  <Edit2 size={12} />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteProject(project.id)}
                  style={{
                    flex: 1,
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                    color: '#ef4444',
                    padding: '8px 12px',
                    borderRadius: 6,
                    cursor: 'pointer',
                    fontSize: 12,
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 4,
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                  }}
                >
                  <Trash2 size={12} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-backdrop" onClick={handleCloseModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{
            maxWidth: 600,
            maxHeight: '90vh',
            overflowY: 'auto',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 24,
            }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#f0f0f0' }}>
                {editingId ? 'Edit Project' : 'Add New Project'}
              </h2>
              <button
                onClick={handleCloseModal}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#888',
                  cursor: 'pointer',
                  padding: 8,
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Title */}
              <div>
                <label className="label">Project Title *</label>
                <input
                  type="text"
                  className="input"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., EduPrime Academy - AI LMS"
                />
              </div>

              {/* Description */}
              <div>
                <label className="label">Description *</label>
                <textarea
                  className="input"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the project and its impact..."
                  style={{ minHeight: 100 }}
                />
              </div>

              {/* Image URL */}
              <div>
                <label className="label">Image URL *</label>
                <input
                  type="url"
                  className="input"
                  value={formData.image}
                  onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                  placeholder="https://..."
                />
              </div>

              {/* GitHub Link */}
              <div>
                <label className="label">GitHub Link (Optional)</label>
                <input
                  type="url"
                  className="input"
                  value={formData.github_link}
                  onChange={(e) => setFormData(prev => ({ ...prev, github_link: e.target.value }))}
                  placeholder="https://github.com/..."
                />
              </div>

              {/* Technologies */}
              <div>
                <label className="label">Technologies</label>
                <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                  <input
                    type="text"
                    className="input"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTechnology()}
                    placeholder="e.g., React"
                    style={{ flex: 1 }}
                  />
                  <button
                    onClick={handleAddTechnology}
                    style={{
                      background: 'rgba(59, 130, 246, 0.1)',
                      border: '1px solid rgba(59, 130, 246, 0.2)',
                      color: '#3b82f6',
                      padding: '10px 16px',
                      borderRadius: 6,
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontSize: 12,
                    }}
                  >
                    Add
                  </button>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {formData.technologies.map((tech, i) => (
                    <span
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        background: 'rgba(59, 130, 246, 0.1)',
                        color: '#3b82f6',
                        padding: '6px 12px',
                        borderRadius: 6,
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      {tech}
                      <button
                        onClick={() => handleRemoveTechnology(i)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#3b82f6',
                          cursor: 'pointer',
                          padding: 0,
                          display: 'flex',
                        }}
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Metrics */}
              <div>
                <label className="label">Metrics</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 8 }}>
                  <input
                    type="text"
                    className="input"
                    value={metricInput.label}
                    onChange={(e) => setMetricInput(prev => ({ ...prev, label: e.target.value }))}
                    placeholder="e.g., Conversion Rate"
                  />
                  <input
                    type="text"
                    className="input"
                    value={metricInput.value}
                    onChange={(e) => setMetricInput(prev => ({ ...prev, value: e.target.value }))}
                    placeholder="e.g., 340%"
                  />
                  <button
                    onClick={handleAddMetric}
                    style={{
                      background: 'rgba(59, 130, 246, 0.1)',
                      border: '1px solid rgba(59, 130, 246, 0.2)',
                      color: '#3b82f6',
                      padding: '10px 16px',
                      borderRadius: 6,
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontSize: 12,
                    }}
                  >
                    Add Metric
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {formData.metrics.map((metric, i) => (
                    <div
                      key={i}
                      style={{
                        background: '#0e0e0e',
                        border: '1px solid #1a1a1a',
                        padding: 12,
                        borderRadius: 6,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 600, color: '#f0f0f0' }}>
                          {metric.label}
                        </div>
                        <div style={{ fontSize: 11, color: '#888' }}>
                          {metric.value}
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveMetric(i)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#ef4444',
                          cursor: 'pointer',
                          padding: 0,
                        }}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="label">Status</label>
                <select
                  className="input"
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                >
                  <option value="draft">Draft (Hidden)</option>
                  <option value="published">Published (Visible)</option>
                </select>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                <button
                  onClick={handleCloseModal}
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: '1px solid #2a2a2a',
                    color: '#f0f0f0',
                    padding: '12px 16px',
                    borderRadius: 8,
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: 14,
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProject}
                  style={{
                    flex: 1,
                    background: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
                    color: '#fff',
                    border: 'none',
                    padding: '12px 16px',
                    borderRadius: 8,
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: 14,
                  }}
                >
                  {editingId ? 'Update Project' : 'Add Project'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
