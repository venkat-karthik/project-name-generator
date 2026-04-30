import { create } from 'zustand';

const EFFORT_WEIGHTS = { none: 0, helped: 0.5, contributed: 1, core: 2, led: 3 };

const initialMembers = [
  { id: 1, name: 'Kodeboyina Venkat Karthik', role: 'Founder & Lead', equity: 25, skills: ['Strategy', 'AI', 'Business Development'], accessLevel: 'founder', active: true, avatar: 'KV' },
  { id: 2, name: 'Akshath Tumkur', role: 'Full-Stack Developer', equity: 15, skills: ['React', 'Node.js', 'System Architecture'], accessLevel: 'core', active: true, avatar: 'AT' },
  { id: 3, name: 'Sahil Ranakoti', role: 'AI & ML Engineer', equity: 15, skills: ['Python', 'ML', 'Voice AI'], accessLevel: 'core', active: true, avatar: 'SR' },
  { id: 4, name: 'Jayanth Karthik Enaganti', role: 'Product & Strategy', equity: 12, skills: ['Product Strategy', 'UX', 'Client Success'], accessLevel: 'core', active: true, avatar: 'JE' },
  { id: 5, name: 'Vikas Reddy Kalamalla', role: 'Infrastructure Engineer', equity: 10, skills: ['Cloud', 'DevOps', 'Deployment'], accessLevel: 'core', active: true, avatar: 'VK' },
  { id: 6, name: 'Nishanth Konakondu', role: 'Backend Engineer', equity: 10, skills: ['APIs', 'Databases', 'Integrations'], accessLevel: 'core', active: true, avatar: 'NK' },
  { id: 7, name: 'Varshith', role: 'Frontend Engineer', equity: 8, skills: ['React', 'UI/UX', 'Performance'], accessLevel: 'core', active: true, avatar: 'V' },
  { id: 8, name: 'Gudipati Srinadh', role: 'QA & Testing', equity: 5, skills: ['Testing', 'Quality Assurance', 'Automation'], accessLevel: 'core', active: true, avatar: 'GS' },
];

const initialLeads = [];

const initialProjects = [];

const initialBlogPosts = [];

export const useStore = create((set, get) => ({
  // Auth
  currentUser: initialMembers[0],
  setCurrentUser: (user) => set({ currentUser: user }),

  // Members
  members: initialMembers,
  addMember: (member) => set(s => ({ members: [...s.members, { ...member, id: Date.now(), active: true }] })),
  updateMember: (id, data) => set(s => ({ members: s.members.map(m => m.id === id ? { ...m, ...data } : m) })),
  removeMember: (id) => set(s => ({ members: s.members.map(m => m.id === id ? { ...m, active: false } : m) })),

  // Leads / CRM
  leads: initialLeads,
  addLead: (lead) => set(s => ({ leads: [...s.leads, { ...lead, id: Date.now(), createdAt: new Date().toISOString().split('T')[0] }] })),
  updateLead: (id, data) => set(s => ({ leads: s.leads.map(l => l.id === id ? { ...l, ...data } : l) })),
  deleteLead: (id) => set(s => ({ leads: s.leads.filter(l => l.id !== id) })),
  moveLead: (id, status) => set(s => ({ leads: s.leads.map(l => l.id === id ? { ...l, status } : l) })),

  // Projects
  projects: initialProjects,
  addProject: (project) => set(s => ({ projects: [...s.projects, { ...project, id: Date.now(), createdAt: new Date().toISOString().split('T')[0], version: 1, history: [], disputes: [] }] })),
  updateProject: (id, data) => set(s => ({
    projects: s.projects.map(p => {
      if (p.id !== id) return p;
      if (p.status === 'approved') return p; // locked
      const snapshot = { ...p, updatedAt: new Date().toISOString() };
      return { ...p, ...data, version: (p.version || 1) + 1, history: [...(p.history || []), snapshot] };
    })
  })),
  approveProject: (id) => set(s => ({
    projects: s.projects.map(p => p.id === id ? { ...p, status: 'approved' } : p)
  })),
  addDispute: (projectId, dispute) => set(s => ({
    projects: s.projects.map(p => p.id === projectId ? { ...p, disputes: [...(p.disputes || []), { ...dispute, id: Date.now(), date: new Date().toISOString(), resolved: false, comments: [] }] } : p)
  })),
  resolveDispute: (projectId, disputeId) => set(s => ({
    projects: s.projects.map(p => p.id === projectId ? { ...p, disputes: p.disputes.map(d => d.id === disputeId ? { ...d, resolved: true } : d) } : p)
  })),
  addDisputeComment: (projectId, disputeId, comment) => set(s => ({
    projects: s.projects.map(p => p.id === projectId ? {
      ...p, disputes: p.disputes.map(d => d.id === disputeId ? { ...d, comments: [...(d.comments || []), { ...comment, id: Date.now(), date: new Date().toISOString() }] } : d)
    } : p)
  })),

  // Blog
  blogPosts: initialBlogPosts,
  addBlogPost: (post) => set(s => ({ blogPosts: [...s.blogPosts, { ...post, id: Date.now(), date: new Date().toISOString().split('T')[0] }] })),
  updateBlogPost: (id, data) => set(s => ({ blogPosts: s.blogPosts.map(p => p.id === id ? { ...p, ...data } : p) })),

  // Audit logs
  auditLogs: [],
  addAuditLog: (log) => set(s => ({ auditLogs: [{ ...log, id: Date.now(), timestamp: new Date().toISOString() }, ...s.auditLogs] })),

  // Notifications
  notifications: [],
  markNotificationRead: (id) => set(s => ({ notifications: s.notifications.map(n => n.id === id ? { ...n, read: true } : n) })),

  // Finance calculations
  calculateProject: (project) => {
    const { totalValue, companyReserve, bdBonus, teamMembers } = project;
    if (!totalValue || totalValue <= 0) return null;

    const reserve = (totalValue * companyReserve) / 100;
    const bdAmount = bdBonus?.percent ? (totalValue * bdBonus.percent) / 100 : 0;
    const workPool = totalValue - reserve - bdAmount;

    const totalWeight = teamMembers.reduce((sum, m) => sum + (EFFORT_WEIGHTS[m.effort] || 0), 0);
    if (totalWeight === 0) return { error: 'Total weight is 0. Assign effort levels.' };

    const payouts = teamMembers.map(m => {
      const weight = EFFORT_WEIGHTS[m.effort] || 0;
      const share = (weight / totalWeight) * workPool;
      const subTotal = m.subEmployees.reduce((sum, se) => sum + (share * se.percent / 100), 0);
      const finalShare = share - subTotal;
      return {
        memberId: m.memberId,
        weight,
        share,
        subDeductions: subTotal,
        finalShare,
        subEmployees: m.subEmployees.map(se => ({ ...se, amount: share * se.percent / 100 })),
      };
    });

    return {
      totalValue,
      reserve,
      bdAmount,
      bdMemberId: bdBonus?.memberId,
      workPool,
      totalWeight,
      payouts: payouts.sort((a, b) => b.finalShare - a.finalShare),
    };
  },

  EFFORT_WEIGHTS,
}));
