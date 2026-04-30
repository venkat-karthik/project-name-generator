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

// NEW: Initial portfolio projects for homepage
const initialPortfolioProjects = [
  {
    id: 1704067200000,
    title: "EduPrime Academy - AI LMS",
    description: "Built a full learning management system with AI-powered lead qualification that increased enrollment by 340% in just 3 months.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop",
    github_link: "https://github.com/velfound/eduprime-lms",
    technologies: ["React", "Node.js", "AI", "PostgreSQL", "Stripe"],
    metrics: [
      { label: "Conversion Rate", value: "340%", icon: "TrendingUp" },
      { label: "Manual Hours Saved", value: "40h/wk", icon: "Clock" }
    ],
    status: "published",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T10:30:00Z"
  },
  {
    id: 1704153600000,
    title: "RetailX Corp - WhatsApp AI Agent",
    description: "Deployed an AI WhatsApp agent handling 500+ customer queries daily with 96% resolution rate, reducing support costs by 60%.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop",
    github_link: "https://github.com/velfound/retailx-whatsapp-ai",
    technologies: ["Python", "WhatsApp API", "AI", "FastAPI", "Redis"],
    metrics: [
      { label: "Daily Queries Handled", value: "500+", icon: "MessageCircle" },
      { label: "Resolution Rate", value: "96%", icon: "CheckCircle" }
    ],
    status: "published",
    createdAt: "2024-01-05T00:00:00Z",
    updatedAt: "2024-01-20T14:20:00Z"
  },
  {
    id: 1704240000000,
    title: "MedCare Hospitals - AI Voice Booking",
    description: "Replaced their IVR system with an AI voice agent that books 200+ appointments daily without human staff intervention.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&h=300&fit=crop",
    github_link: "https://github.com/velfound/medcare-voice-ai",
    technologies: ["Python", "Twilio", "AI", "PostgreSQL", "Docker"],
    metrics: [
      { label: "Appointments/Day", value: "200+", icon: "Calendar" },
      { label: "Staff Cost Reduction", value: "60%", icon: "DollarSign" }
    ],
    status: "published",
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-01-22T09:15:00Z"
  }
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
  auditLogs: [],
  addAuditLog: (log) => set(s => ({ auditLogs: [{ ...log, id: Date.now(), timestamp: new Date().toISOString() }, ...s.auditLogs] })),

  // Notifications
  notifications: [],
  markNotificationRead: (id) => set(s => ({ notifications: s.notifications.map(n => n.id === id ? { ...n, read: true } : n) })),

  // NEW: Portfolio Projects (for homepage)
  portfolioProjects: initialPortfolioProjects,
  
  addPortfolioProject: (project) => set(s => ({
    portfolioProjects: [...s.portfolioProjects, {
      ...project,
      id: Date.now(),
      status: project.status || 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }]
  })),

  updatePortfolioProject: (id, data) => set(s => ({
    portfolioProjects: s.portfolioProjects.map(p => p.id === id ? {
      ...p,
      ...data,
      updatedAt: new Date().toISOString()
    } : p)
  })),

  deletePortfolioProject: (id) => set(s => ({
    portfolioProjects: s.portfolioProjects.filter(p => p.id !== id)
  })),

  publishPortfolioProject: (id) => set(s => ({
    portfolioProjects: s.portfolioProjects.map(p => p.id === id ? {
      ...p,
      status: 'published',
      updatedAt: new Date().toISOString()
    } : p)
  })),

  unpublishPortfolioProject: (id) => set(s => ({
    portfolioProjects: s.portfolioProjects.map(p => p.id === id ? {
      ...p,
      status: 'draft',
      updatedAt: new Date().toISOString()
    } : p)
  })),

  getPublishedProjects: () => {
    const state = get();
    return state.portfolioProjects.filter(p => p.status === 'published');
  },

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
