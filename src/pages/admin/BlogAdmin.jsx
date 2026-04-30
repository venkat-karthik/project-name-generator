import { useState } from 'react';
import { Plus, X, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';
import { useStore } from '../../store/useStore';

export default function BlogAdmin() {
  const { blogPosts, addBlogPost, updateBlogPost } = useStore();
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newPost, setNewPost] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'AI Automation',
    readTime: 5,
    published: false,
  });

  const handleAddPost = () => {
    if (newPost.title && newPost.slug) {
      if (editingId) {
        updateBlogPost(editingId, newPost);
        setEditingId(null);
      } else {
        addBlogPost(newPost);
      }
      setNewPost({ title: '', slug: '', excerpt: '', content: '', category: 'AI Automation', readTime: 5, published: false });
      setShowModal(false);
    }
  };

  const handleEdit = (post) => {
    setNewPost(post);
    setEditingId(post.id);
    setShowModal(true);
  };

  const handleTogglePublish = (post) => {
    updateBlogPost(post.id, { ...post, published: !post.published });
  };

  const publishedPosts = blogPosts.filter(p => p.published);
  const draftPosts = blogPosts.filter(p => !p.published);

  const categories = ['AI Automation', 'AI Voice', 'Web Solutions', 'Case Studies', 'Tips & Tricks'];

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#f0f0f0', letterSpacing: '-0.5px' }}>Blog Manager</h1>
          <p style={{ color: '#555', fontSize: 14, marginTop: 4 }}>Create and manage blog posts</p>
        </div>
        <button className="btn-gold" onClick={() => { setEditingId(null); setNewPost({ title: '', slug: '', excerpt: '', content: '', category: 'AI Automation', readTime: 5, published: false }); setShowModal(true); }} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Plus size={16} /> New Post
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 24 }}>
        {[
          { label: 'Total Posts', value: blogPosts.length, color: '#c9a84c' },
          { label: 'Published', value: publishedPosts.length, color: '#4ade80' },
          { label: 'Drafts', value: draftPosts.length, color: '#f59e0b' },
        ].map(s => (
          <div key={s.label} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, padding: 16 }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: s.color, letterSpacing: '-1px', marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: 12, color: '#555' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Published Posts */}
      <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, overflow: 'hidden', marginBottom: 24 }}>
        <div style={{ padding: 20, borderBottom: '1px solid #1a1a1a', background: '#0e0e0e' }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: '#f0f0f0' }}>Published Posts ({publishedPosts.length})</h3>
        </div>

        {publishedPosts.length === 0 ? (
          <div style={{ padding: 40, textAlign: 'center', color: '#555' }}>
            <p>No published posts yet.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 16 }}>
            {publishedPosts.map(post => (
              <div key={post.id} style={{ background: '#0e0e0e', border: '1px solid #1a1a1a', borderRadius: 10, padding: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: 13, fontWeight: 600, color: '#f0f0f0', marginBottom: 4 }}>{post.title}</h4>
                    <p style={{ fontSize: 12, color: '#555', lineHeight: 1.4, marginBottom: 8 }}>{post.excerpt}</p>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <span className="badge" style={{ background: 'rgba(74,222,128,0.1)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.2)', fontSize: 10 }}>
                        {post.category}
                      </span>
                      <span style={{ fontSize: 11, color: '#444' }}>{post.readTime} min read</span>
                      <span style={{ fontSize: 11, color: '#444' }}>
                        {new Date(post.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => handleEdit(post)} style={{ background: 'none', border: 'none', color: '#c9a84c', cursor: 'pointer', padding: 4 }}>
                      <Edit2 size={14} />
                    </button>
                    <button onClick={() => handleTogglePublish(post)} style={{ background: 'none', border: 'none', color: '#4ade80', cursor: 'pointer', padding: 4 }}>
                      <Eye size={14} />
                    </button>
                    <button style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', padding: 4 }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Draft Posts */}
      {draftPosts.length > 0 && (
        <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ padding: 20, borderBottom: '1px solid #1a1a1a', background: '#0e0e0e' }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: '#f0f0f0' }}>Drafts ({draftPosts.length})</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 16 }}>
            {draftPosts.map(post => (
              <div key={post.id} style={{ background: '#0e0e0e', border: '1px solid #1a1a1a', borderRadius: 10, padding: 14, opacity: 0.7 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: 13, fontWeight: 600, color: '#888', marginBottom: 4 }}>{post.title}</h4>
                    <p style={{ fontSize: 12, color: '#555', lineHeight: 1.4, marginBottom: 8 }}>{post.excerpt}</p>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <span className="badge" style={{ background: 'rgba(245,158,11,0.1)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.2)', fontSize: 10 }}>
                        Draft
                      </span>
                      <span style={{ fontSize: 11, color: '#444' }}>{post.readTime} min read</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => handleEdit(post)} style={{ background: 'none', border: 'none', color: '#c9a84c', cursor: 'pointer', padding: 4 }}>
                      <Edit2 size={14} />
                    </button>
                    <button onClick={() => handleTogglePublish(post)} style={{ background: 'none', border: 'none', color: '#f59e0b', cursor: 'pointer', padding: 4 }}>
                      <EyeOff size={14} />
                    </button>
                    <button style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', padding: 4 }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Blog Post Modal */}
      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 700 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#f0f0f0' }}>
                {editingId ? 'Edit Post' : 'New Blog Post'}
              </h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', padding: 4 }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div>
                <label className="label">Title *</label>
                <input
                  type="text"
                  placeholder="Post title"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  className="input"
                />
              </div>
              <div>
                <label className="label">Slug *</label>
                <input
                  type="text"
                  placeholder="post-slug"
                  value={newPost.slug}
                  onChange={(e) => setNewPost({ ...newPost, slug: e.target.value })}
                  className="input"
                />
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label className="label">Excerpt</label>
              <textarea
                placeholder="Brief summary of the post..."
                value={newPost.excerpt}
                onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })}
                className="input"
                style={{ minHeight: 60 }}
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label className="label">Content</label>
              <textarea
                placeholder="Full post content..."
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                className="input"
                style={{ minHeight: 150 }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div>
                <label className="label">Category</label>
                <select
                  value={newPost.category}
                  onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                  className="input"
                >
                  {categories.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label">Read Time (min)</label>
                <input
                  type="number"
                  placeholder="5"
                  min="1"
                  value={newPost.readTime}
                  onChange={(e) => setNewPost({ ...newPost, readTime: parseInt(e.target.value) })}
                  className="input"
                />
              </div>
              <div>
                <label className="label">Status</label>
                <select
                  value={newPost.published ? 'published' : 'draft'}
                  onChange={(e) => setNewPost({ ...newPost, published: e.target.value === 'published' })}
                  className="input"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button className="btn-gold" style={{ flex: 1 }} onClick={handleAddPost}>
                {editingId ? 'Update Post' : 'Create Post'}
              </button>
              <button className="btn-outline" style={{ flex: 1 }} onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
