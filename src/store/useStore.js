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

const initialBlogPosts = [
  {
    id: 1704067200000,
    title: "How AI Automation Increased Our Client's Revenue by 340% in 3 Months",
    excerpt: "A deep dive into how we implemented AI-powered lead qualification for an EdTech company, resulting in massive revenue growth.",
    content: "Learn how strategic AI automation can transform your business operations and revenue streams. We share the exact framework we used.",
    category: "AI Automation",
    date: "Jan 15, 2024",
    readTime: 8,
    image: "https://images.unsplash.com/photo-1677442d019cecf8d5a32b9c94d39be4924ac1e38?w=800&h=400&fit=crop",
    published: true,
    author: "Kodeboyina Venkat Karthik",
    fullContent: `When EduPrime Academy approached us, they were struggling with a common problem: too many leads, not enough conversions. Their sales team was manually qualifying hundreds of leads every week, spending hours on calls that went nowhere.

We implemented an AI-powered lead qualification system that changed everything. Here's exactly what we did:

First, we analyzed their historical data to understand what made a qualified lead. We looked at conversion rates, course completion, and customer lifetime value. This gave us the patterns we needed.

Then, we built an AI system that could score leads in real-time. When a new lead came in, the system would analyze their behavior, engagement patterns, and fit with the course offerings. High-quality leads were automatically routed to the sales team, while others were nurtured through automated email sequences.

The results were staggering. Within the first month, their sales team was spending 60% less time on unqualified leads. By month three, they had increased their conversion rate from 8% to 35%. That's a 340% improvement in qualified leads.

But here's the real magic: they didn't need to hire more salespeople. The same team was now closing more deals because they were spending time on the right prospects. Their revenue increased by 340% without proportional increases in headcount.

The key insight? AI isn't about replacing humans. It's about making humans more effective. By automating the tedious parts of lead qualification, we freed up the sales team to do what they do best: build relationships and close deals.

This is just one example of how AI automation can transform your business. The framework we used is applicable to almost any business with a sales process.`,
    keyTakeaways: [
      "AI lead qualification can reduce manual work by 60% or more",
      "Conversion rates can improve by 300%+ with proper implementation",
      "You don't need to hire more staff to handle more business",
      "The key is analyzing historical data to find patterns",
      "Automation frees humans to focus on high-value activities"
    ]
  },
  {
    id: 1704153600000,
    title: "Building AI Voice Agents That Actually Understand Your Customers",
    excerpt: "Voice AI is revolutionizing customer service. Here's how to build agents that sound natural and solve real problems.",
    content: "Discover the technology behind conversational AI and how to implement it for your business without breaking the bank.",
    category: "AI Voice",
    date: "Jan 12, 2024",
    readTime: 10,
    image: "https://images.unsplash.com/photo-1677442d019cecf8d5a32b9c94d39be4924ac1e38?w=800&h=400&fit=crop",
    published: true,
    author: "Sahil Ranakoti",
    fullContent: `Voice AI has come a long way from the robotic IVR systems of the past. Today's voice agents can understand context, handle complex conversations, and even detect emotion in a customer's voice.

But building a good voice agent isn't just about the technology. It's about understanding your customers and designing conversations that feel natural.

The first step is data collection. You need to understand how your customers actually talk to your business. What are their common questions? What frustrates them? What language do they use? This data becomes the foundation for training your voice agent.

Next comes the conversation design. This is where most voice AI projects fail. Companies try to make the agent handle every possible scenario, resulting in a system that's rigid and frustrating. Instead, you should design for the 80/20 rule: handle the 80% of common scenarios really well, and gracefully hand off the 20% edge cases to humans.

The technology stack matters too. You need:
- A speech-to-text engine that understands your industry's terminology
- A natural language understanding system that can extract intent and entities
- A dialogue management system that keeps track of context
- A text-to-speech engine that sounds natural and can convey emotion

But here's the secret: you don't need to build all of this from scratch. There are excellent APIs and platforms available. The real work is in the conversation design and training.

One of our clients, RetailX Corp, implemented a voice agent for their customer support. Within three months, they were handling 500+ customer queries daily with a 96% resolution rate. The agent could handle everything from order status to returns to product recommendations.

The key to their success? They spent time understanding their customers' language and pain points. They designed conversations that felt natural. And they continuously improved the system based on customer feedback.

Voice AI is no longer a futuristic technology. It's here, it's practical, and it can transform your customer service operations.`,
    keyTakeaways: [
      "Voice AI can handle 80% of customer queries automatically",
      "Conversation design is more important than the technology",
      "Understanding customer language patterns is critical",
      "Natural-sounding responses improve customer satisfaction",
      "Continuous improvement based on feedback is essential"
    ]
  },
  {
    id: 1704240000000,
    title: "The Complete Guide to WhatsApp Automation for Businesses",
    excerpt: "WhatsApp is where your customers are. Learn how to automate customer interactions without losing the personal touch.",
    content: "Step-by-step guide to implementing WhatsApp automation that increases response rates and reduces support costs by 60%.",
    category: "AI Automation",
    date: "Jan 10, 2024",
    readTime: 7,
    image: "https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=800&h=400&fit=crop",
    published: true,
    author: "Akshath Tumkur",
    fullContent: `WhatsApp has become the primary communication channel for millions of businesses and customers. With over 100 million business messages sent daily, WhatsApp is where your customers expect to reach you.

But manually responding to every message is impossible. That's where WhatsApp automation comes in.

The key to successful WhatsApp automation is balance. You want to automate routine interactions while maintaining the personal touch that customers expect.

Here's how to get started:

Step 1: Set up WhatsApp Business API. This gives you access to automation capabilities that the regular WhatsApp Business app doesn't have.

Step 2: Design your conversation flows. Map out the common customer journeys. What questions do customers ask? What problems do they need solved? Create flows for each scenario.

Step 3: Implement automated responses. For common questions like "What are your hours?" or "How do I track my order?", set up instant automated responses. This immediately satisfies the customer and reduces the load on your team.

Step 4: Use AI for complex queries. For more complex questions, use AI to understand intent and provide relevant information. If the AI can't handle it, smoothly hand off to a human.

Step 5: Personalize at scale. Use customer data to personalize messages. Instead of generic responses, reference their order history, preferences, or previous interactions.

One of our clients implemented WhatsApp automation and saw immediate results:
- Response time dropped from 2 hours to 30 seconds
- Customer satisfaction increased by 40%
- Support costs decreased by 60%
- They could handle 3x more customer inquiries with the same team

The secret? They didn't try to automate everything. They automated the routine stuff and made it easy for customers to reach a human when needed.

WhatsApp automation isn't about replacing humans. It's about making your team more efficient so they can focus on customers who need real help.`,
    keyTakeaways: [
      "WhatsApp is where 80% of your customers want to communicate",
      "Automation can reduce response time from hours to seconds",
      "Balance automation with human touch for best results",
      "Personalization at scale increases customer satisfaction",
      "Support costs can decrease by 60% with proper automation"
    ]
  },
  {
    id: 1704326400000,
    title: "Why Your Business Needs AI Automation (And It's Cheaper Than You Think)",
    excerpt: "Automation isn't just for big corporations. Here's why small businesses are winning with AI and how you can too.",
    content: "Explore the ROI of AI automation for businesses of all sizes. Real numbers, real results, real impact.",
    category: "Strategy",
    date: "Jan 8, 2024",
    readTime: 6,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
    published: true,
    author: "Jayanth Karthik Enaganti",
    fullContent: `There's a common misconception that AI automation is expensive and only for big tech companies. The truth? It's more affordable than ever, and small businesses are seeing the biggest returns.

Let's talk numbers. The average cost of hiring a full-time employee in India is ₹8-12 lakhs per year. An AI automation system that can do the work of 2-3 employees costs ₹2-5 lakhs to build and ₹50,000-1,00,000 per year to maintain.

That's a 70-80% cost reduction.

But the real ROI comes from what your team can do with the freed-up time. Instead of spending 40 hours a week on manual data entry, they can focus on strategy, customer relationships, and growth.

Here are some real examples:

A logistics company automated their order processing. They saved 30 hours per week and reduced errors by 95%. The system paid for itself in 3 months.

A healthcare clinic automated appointment scheduling and reminders. They reduced no-shows by 40% and freed up 20 hours per week for their staff. Revenue increased by 25% without hiring anyone new.

An e-commerce store automated their customer support. They reduced response time from 4 hours to 5 minutes. Customer satisfaction increased by 35%, and repeat purchase rate went up by 20%.

The pattern is clear: automation doesn't just save money. It improves quality, increases customer satisfaction, and frees your team to focus on growth.

The best time to implement AI automation was 5 years ago. The second best time is now.`,
    keyTakeaways: [
      "AI automation costs 70-80% less than hiring new employees",
      "ROI typically achieved within 3-6 months",
      "Automation improves quality and reduces errors",
      "Freed-up time can be redirected to growth activities",
      "Small businesses see the biggest percentage gains"
    ]
  },
  {
    id: 1704412800000,
    title: "From Manual to Automated: A Case Study in Business Transformation",
    excerpt: "How a retail company eliminated 40 hours of manual work per week using AI automation. The results will surprise you.",
    content: "Real case study showing the transformation journey from manual processes to fully automated workflows.",
    category: "AI Automation",
    date: "Jan 5, 2024",
    readTime: 9,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
    published: true,
    author: "Kodeboyina Venkat Karthik",
    fullContent: `When we first met with RetailX Corp, they were drowning in manual processes. Every order had to be manually entered into their system. Every customer inquiry required a human to search through their database. Every report had to be compiled by hand.

They had 15 people doing work that could be done by 3 with the right automation.

Here's how we transformed their business:

Week 1-2: Discovery and Analysis
We spent time understanding their current processes. We mapped out every workflow, identified bottlenecks, and calculated the time spent on each task. The results were eye-opening: 40 hours per week on data entry alone.

Week 3-4: Design and Planning
We designed an automation strategy. We identified which processes could be fully automated, which needed human oversight, and which needed a hybrid approach. We prioritized based on impact and feasibility.

Week 5-8: Implementation
We built the automation systems. We integrated their e-commerce platform with their inventory system. We created automated workflows for order processing, customer inquiries, and reporting.

Week 9-10: Testing and Refinement
We tested everything thoroughly. We found edge cases and fixed them. We trained the team on the new systems.

Week 11: Launch
We went live. The first week was chaotic. There were bugs. There were processes we hadn't anticipated. But we were there to support them.

Week 12 and Beyond: Optimization
We continuously monitored the system and made improvements. We gathered feedback from the team and refined the workflows.

The Results:
- 40 hours per week of manual work eliminated
- Order processing time reduced from 2 hours to 5 minutes
- Customer response time reduced from 4 hours to 30 minutes
- Error rate reduced from 5% to 0.1%
- 3 employees could now do the work of 15
- Revenue increased by 30% without hiring anyone new

But here's the most important result: the team was happier. They were no longer doing repetitive, mind-numbing work. They were solving problems, helping customers, and contributing to the business strategy.

That's the real power of automation.`,
    keyTakeaways: [
      "Proper analysis is the foundation of successful automation",
      "Hybrid approaches often work better than full automation",
      "Implementation takes time and requires support",
      "Continuous optimization is essential",
      "Automation improves employee satisfaction and retention"
    ]
  },
  {
    id: 1704499200000,
    title: "The Future of Customer Service: AI Agents That Never Sleep",
    excerpt: "24/7 customer support without hiring 24/7 staff. Discover how AI agents are changing the customer service game.",
    content: "Explore the latest in AI customer service technology and how it's transforming customer satisfaction metrics.",
    category: "AI Voice",
    date: "Jan 2, 2024",
    readTime: 8,
    image: "https://images.unsplash.com/photo-1677442d019cecf8d5a32b9c94d39be4924ac1e38?w=800&h=400&fit=crop",
    published: true,
    author: "Sahil Ranakoti",
    fullContent: `Customer expectations have changed. They expect support 24/7. They expect instant responses. They expect personalized service.

But hiring a 24/7 support team is expensive and logistically challenging. That's where AI agents come in.

Modern AI agents can:
- Handle customer inquiries instantly, any time of day
- Understand context and provide personalized responses
- Learn from every interaction and improve over time
- Seamlessly hand off to humans when needed
- Provide support in multiple languages

The technology has reached a point where customers often can't tell if they're talking to a human or an AI. And honestly, they don't care. They just want their problem solved.

Here's what's changing in customer service:

1. Instant Response
AI agents respond immediately. No waiting in queues. No "your call is important to us" messages. Just instant help.

2. Proactive Support
Instead of waiting for customers to contact you, AI agents can proactively reach out. "We noticed you haven't used feature X. Here's how it can help you..."

3. Predictive Support
AI can predict problems before they happen. "Based on your usage pattern, you might run out of credits soon. Would you like to top up?"

4. Omnichannel Support
Customers can reach you via WhatsApp, email, chat, voice, or social media. The AI agent provides consistent support across all channels.

5. Continuous Learning
Every interaction teaches the AI agent something new. The system gets smarter every day.

One of our clients implemented an AI customer service system and saw:
- 95% of inquiries resolved without human intervention
- Customer satisfaction increased from 72% to 92%
- Support costs decreased by 70%
- Customer lifetime value increased by 40%

The future of customer service isn't about hiring more people. It's about building smarter systems that can handle more customers with fewer resources.

And the best part? Your customers will be happier.`,
    keyTakeaways: [
      "AI agents can provide 24/7 support without 24/7 staff",
      "95% of customer inquiries can be resolved by AI",
      "Proactive and predictive support improve satisfaction",
      "Omnichannel support is now expected by customers",
      "AI systems improve continuously with every interaction"
    ]
  },
  {
    id: 1704585600000,
    title: "Scaling Your Business Without Scaling Your Team: The AI Way",
    excerpt: "Learn how to grow your business exponentially while keeping your team size constant. The secret? Strategic automation.",
    content: "Practical strategies for using AI to scale operations without proportional increases in headcount.",
    category: "Strategy",
    date: "Dec 30, 2023",
    readTime: 7,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
    published: true,
    author: "Vikas Reddy Kalamalla",
    fullContent: `The traditional growth model is broken. You hire more people to handle more business. But this leads to:
- Higher payroll costs
- Management overhead
- Quality inconsistency
- Slower decision-making

There's a better way: scale with AI.

Here's the principle: every time you hire a new employee, you're adding a fixed cost. But when you implement AI automation, you're adding a scalable solution.

Let's say you have a customer support team of 5 people. They can handle 100 customer inquiries per day. To handle 200 inquiries, you'd normally hire 5 more people. That's a 100% increase in payroll.

With AI, you can handle 200 inquiries with the same 5 people plus an AI system. The AI handles 80% of inquiries, and your team handles the complex ones. Your payroll increases by 0%, but your capacity doubles.

This is the power of strategic automation.

Here's how to scale without scaling your team:

1. Identify Repetitive Tasks
What tasks do your team do repeatedly? Data entry? Customer inquiries? Report generation? These are prime candidates for automation.

2. Measure Current Capacity
How much time does each task take? How many people are involved? What's the cost?

3. Implement Automation
Build or buy solutions to automate these tasks. Start with the highest-impact tasks.

4. Redeploy Your Team
Don't lay people off. Redeploy them to higher-value work. Customer success. Product development. Strategy.

5. Measure Results
Track the impact. How much time was saved? How much did quality improve? What's the ROI?

One of our clients, a SaaS company, scaled from 100 customers to 1000 customers without increasing their team size. How?

- Automated onboarding: new customers could get started without human intervention
- Automated support: 80% of support tickets were resolved by AI
- Automated billing: invoicing and payment processing was fully automated
- Automated reporting: customers could access real-time analytics without requesting reports

Their team went from being a bottleneck to being a strategic asset. Instead of handling routine tasks, they focused on customer success and product improvement.

The result? 10x growth with the same team size.

This is the future of business. Not hiring more people. Building smarter systems.`,
    keyTakeaways: [
      "Scale capacity without scaling payroll using AI",
      "Identify and automate repetitive tasks first",
      "Redeploy freed-up team members to higher-value work",
      "10x growth is possible with the same team size",
      "Strategic automation is the key to sustainable growth"
    ]
  },
  {
    id: 1704672000000,
    title: "AI Automation ROI: How to Calculate and Maximize Your Returns",
    excerpt: "Not sure if AI automation is worth it? Here's exactly how to measure ROI and make data-driven decisions.",
    content: "Complete framework for calculating the ROI of AI automation projects and optimizing for maximum returns.",
    category: "Strategy",
    date: "Dec 28, 2023",
    readTime: 6,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
    published: true,
    author: "Jayanth Karthik Enaganti",
    fullContent: `Before implementing any AI automation project, you need to understand the ROI. Here's the framework we use:

Step 1: Calculate Current Costs
- How many people are involved in this process?
- How much time does each person spend?
- What's the fully loaded cost per person per hour? (salary + benefits + overhead)
- What's the total annual cost of this process?

Step 2: Identify Inefficiencies
- How many errors occur? What's the cost of each error?
- How much time is wasted on rework?
- What opportunities are missed due to slow processing?
- What's the customer impact of delays?

Step 3: Estimate Automation Costs
- Development cost
- Implementation cost
- Training cost
- Ongoing maintenance cost

Step 4: Calculate Savings
- Time saved × hourly rate = labor savings
- Errors reduced × cost per error = quality savings
- Faster processing × value per transaction = revenue impact
- Improved customer satisfaction × customer lifetime value = retention savings

Step 5: Calculate ROI
ROI = (Total Savings - Total Costs) / Total Costs × 100

Let's work through an example:

Current State:
- 3 people spend 40 hours/week on order processing
- Average salary: ₹6 lakhs/year = ₹300/hour
- Annual cost: 3 × 40 × 52 × 300 = ₹18.72 lakhs
- Error rate: 5%, costing ₹50,000 per error
- Annual error cost: 1000 orders × 5% × ₹50,000 = ₹25 lakhs
- Total annual cost: ₹43.72 lakhs

Automation Solution:
- Development: ₹3 lakhs
- Implementation: ₹1 lakh
- Annual maintenance: ₹50,000
- Total first-year cost: ₹4.5 lakhs

Expected Results:
- 90% of orders processed automatically
- Error rate reduced to 0.5%
- Labor savings: ₹18.72 × 90% = ₹16.85 lakhs
- Error savings: ₹25 × 90% = ₹22.5 lakhs
- Total annual savings: ₹39.35 lakhs

ROI = (39.35 - 4.5) / 4.5 × 100 = 774%

Payback period: 4.5 / 39.35 = 1.4 months

This is a no-brainer investment.

But here's the key: these numbers are specific to this company. Your numbers will be different. That's why you need to do this analysis for your own business.

The framework is the same:
1. Calculate current costs
2. Identify inefficiencies
3. Estimate automation costs
4. Calculate savings
5. Calculate ROI

Most AI automation projects have ROI of 200-500% in the first year. Some have ROI of 1000%+.

The question isn't whether you can afford to automate. The question is whether you can afford not to.`,
    keyTakeaways: [
      "Calculate current costs including labor, errors, and inefficiencies",
      "Most AI automation projects have 200-500% ROI in year 1",
      "Payback period is typically 2-6 months",
      "Include indirect benefits like improved customer satisfaction",
      "Do the analysis for your specific business, not generic numbers"
    ]
  },
];

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

  // Portfolio Projects
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
