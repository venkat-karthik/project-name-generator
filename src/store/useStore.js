import { create } from 'zustand';

const EFFORT_WEIGHTS = { none: 0, helped: 0.5, contributed: 1, core: 2, led: 3 };

const initialMembers = [
  { id: 1, name: 'Arjun Sharma', role: 'Founder', equity: 40, skills: ['Strategy', 'AI', 'BD'], accessLevel: 'founder', active: true, avatar: 'AS' },
  { id: 2, name: 'Priya Mehta', role: 'Lead Dev', equity: 20, skills: ['React', 'Node.js', 'APIs'], accessLevel: 'core', active: true, avatar: 'PM' },
  { id: 3, name: 'Rohan Das', role: 'AI Engineer', equity: 15, skills: ['Python', 'ML', 'Voice AI'], accessLevel: 'core', active: true, avatar: 'RD' },
  { id: 4, name: 'Sneha Patel', role: 'BD Manager', equity: 10, skills: ['Sales', 'CRM', 'Outreach'], accessLevel: 'core', active: true, avatar: 'SP' },
  { id: 5, name: 'Viewer User', role: 'Intern', equity: 0, skills: [], accessLevel: 'viewer', active: true, avatar: 'VU' },
];

const initialLeads = [
  { id: 1, name: 'TechStart Solutions', contact: '+91 9876543210', email: 'ceo@techstart.in', source: 'Website', status: 'qualified', assigned: 2, notes: 'Needs AI automation for HR', tags: ['AI', 'HR'], createdAt: '2025-04-10', value: 85000 },
  { id: 2, name: 'RetailX Corp', contact: '+91 8765432109', email: 'ops@retailx.com', source: 'WhatsApp', status: 'proposal', assigned: 4, notes: 'WhatsApp bot for customer support', tags: ['Voice', 'Support'], createdAt: '2025-04-12', value: 120000 },
  { id: 3, name: 'FinServe Ltd', contact: '+91 7654321098', email: 'cto@finserve.in', source: 'Referral', status: 'contacted', assigned: 2, notes: 'Web platform rebuild', tags: ['Web'], createdAt: '2025-04-14', value: 200000 },
  { id: 4, name: 'MedCare Hospitals', contact: '+91 6543210987', email: 'admin@medcare.in', source: 'LinkedIn', status: 'new', assigned: 3, notes: 'AI voice for appointment booking', tags: ['Voice', 'AI'], createdAt: '2025-04-15', value: 150000 },
  { id: 5, name: 'EduPrime Academy', contact: '+91 5432109876', email: 'info@eduprime.in', source: 'Website', status: 'won', assigned: 4, notes: 'LMS + automation', tags: ['Web', 'Automation'], createdAt: '2025-04-08', value: 95000 },
  { id: 6, name: 'LogiTrack Inc', contact: '+91 4321098765', email: 'ops@logitrack.in', source: 'Cold Email', status: 'lost', assigned: 2, notes: 'Budget constraints', tags: ['Web'], createdAt: '2025-04-05', value: 60000 },
];

const initialProjects = [
  {
    id: 1,
    name: 'EduPrime LMS',
    clientId: 5,
    totalValue: 95000,
    paymentStatus: 'fully_paid',
    status: 'approved',
    companyReserve: 20,
    bdBonus: { memberId: 4, percent: 5 },
    teamMembers: [
      { memberId: 2, effort: 'led', subEmployees: [] },
      { memberId: 3, effort: 'core', subEmployees: [{ id: 's1', name: 'Dev Intern', percent: 15 }] },
      { memberId: 4, effort: 'helped', subEmployees: [] },
    ],
    version: 1,
    history: [],
    createdAt: '2025-04-10',
    disputes: [],
  },
  {
    id: 2,
    name: 'RetailX WhatsApp Bot',
    clientId: 2,
    totalValue: 120000,
    paymentStatus: 'partial',
    status: 'review',
    companyReserve: 15,
    bdBonus: { memberId: 4, percent: 8 },
    teamMembers: [
      { memberId: 3, effort: 'led', subEmployees: [] },
      { memberId: 2, effort: 'contributed', subEmployees: [] },
    ],
    version: 1,
    history: [],
    createdAt: '2025-04-14',
    disputes: [],
  },
];

const initialBlogPosts = [
  { id: 1, title: 'How AI Automation Can Save 20+ Hours/Week for Small Businesses', slug: 'ai-automation-small-businesses', excerpt: 'Discover practical AI automations that eliminate repetitive tasks and free your team to focus on growth.', category: 'AI Automation', readTime: 5, date: '2025-04-20', published: true },
  { id: 2, title: 'The Rise of AI Voice Agents: Replacing IVR Forever', slug: 'ai-voice-agents-ivr', excerpt: 'AI voice systems are transforming how businesses handle inbound calls — 24/7, no wait times, perfect accuracy.', category: 'AI Voice', readTime: 4, date: '2025-04-15', published: true },
  { id: 3, title: 'Why Most Business Websites Fail to Convert (And How to Fix It)', slug: 'website-conversion-optimization', excerpt: 'A high-traffic site means nothing without conversions. Learn the design patterns that turn visitors into leads.', category: 'Web Solutions', readTime: 6, date: '2025-04-10', published: true },
];

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
  auditLogs: [
    { id: 1, userId: 1, action: 'Approved project EduPrime LMS', timestamp: '2025-04-20T10:30:00' },
    { id: 2, userId: 4, action: 'Moved lead RetailX to Proposal', timestamp: '2025-04-19T14:20:00' },
    { id: 3, userId: 2, action: 'Created project RetailX WhatsApp Bot', timestamp: '2025-04-18T09:15:00' },
  ],
  addAuditLog: (log) => set(s => ({ auditLogs: [{ ...log, id: Date.now(), timestamp: new Date().toISOString() }, ...s.auditLogs] })),

  // Notifications
  notifications: [
    { id: 1, text: 'New lead: MedCare Hospitals', time: '2h ago', read: false },
    { id: 2, text: 'Project EduPrime LMS approved', time: '1d ago', read: false },
    { id: 3, text: 'Follow-up due: FinServe Ltd', time: '2d ago', read: true },
  ],
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
