import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Target, Users2, Heart } from 'lucide-react';
import WebsiteNav from '../../components/WebsiteNav';
import WebsiteFooter from '../../components/WebsiteFooter';

const team = [
  { name: 'Kodeboyina Venkat Karthik', role: 'Founder & Lead', skills: 'Strategy, AI, Business Development', avatar: 'KV', desc: 'Student founder who started Velfound to learn and build real solutions. Passionate about AI and entrepreneurship.' },
  { name: 'Akshath Tumkur', role: 'Full-Stack Developer', skills: 'React, Node.js, System Architecture', avatar: 'AT', desc: 'Student developer obsessed with building scalable systems. Loves clean code and solving complex problems.' },
  { name: 'Sahil Ranakoti', role: 'AI & ML Engineer', skills: 'Python, ML, Voice AI', avatar: 'SR', desc: 'Passionate about AI and machine learning. Specializes in building intelligent systems that solve real business problems.' },
  { name: 'Jayanth Karthik Enaganti', role: 'Product & Strategy', skills: 'Product Strategy, UX, Client Success', avatar: 'JE', desc: 'Focused on understanding client needs and ensuring every project delivers real value and measurable results.' },
  { name: 'Vikas Reddy Kalamalla', role: 'Infrastructure Engineer', skills: 'Cloud Infrastructure, Deployment', avatar: 'VK', desc: 'Ensures our systems are reliable, scalable, and always running. Passionate about DevOps and cloud technologies.' },
  { name: 'Nishanth Konakondu', role: 'Backend Engineer', skills: 'APIs, Databases, Integrations', avatar: 'NK', desc: 'Builds robust backend systems that power our automation platform. Detail-oriented and quality-focused.' },
  { name: 'Varshith', role: 'Frontend Engineer', skills: 'React, UI/UX, Performance', avatar: 'V', desc: 'Creates beautiful, responsive interfaces that users love. Passionate about great user experiences.' },
  { name: 'Gudipati Srinadh', role: 'QA & Testing', skills: 'Testing, Quality Assurance, Automation', avatar: 'GS', desc: 'Ensures every system meets high quality standards. Meticulous about testing and quality assurance.' },
];

const values = [
  { icon: Target, title: 'Learning First', desc: 'Every project is a chance to learn something new. We grow with every client we work with.' },
  { icon: Zap, title: 'Speed & Quality', desc: 'We move fast because we\'re hungry to prove ourselves. But we never compromise on quality.' },
  { icon: Users2, title: 'Transparency', desc: 'We\'re honest about what we can do and what we\'re learning. No BS, just real talk.' },
  { icon: Heart, title: 'Genuine Care', desc: 'We\'re not just building for money. We genuinely care about our clients\' success.' },
];

export default function AboutPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a' }}>
      <WebsiteNav />

      {/* Hero */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px 60px', textAlign: 'center' }}>
        <p className="section-tag" style={{ marginBottom: 16 }}>About Velfound</p>
        <h1 style={{ fontSize: 'clamp(36px,5vw,64px)', fontWeight: 700, letterSpacing: '-2px', color: '#f0f0f0', marginBottom: 20 }}>
          Built By Students,<br /><span className="gold-text">For Real Business Impact</span>
        </h1>
        <p style={{ color: '#555', fontSize: 18, maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}>
          A group of friends united by a shared vision: to learn, build, and grow together while creating real value for businesses.
        </p>
      </section>

      {/* Story */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px 80px' }}>
        <div className="card" style={{ padding: '48px 56px' }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#f0f0f0', marginBottom: 20 }}>Our Story</h2>
          <div style={{ color: '#666', fontSize: 15, lineHeight: 1.8 }}>
            <p style={{ marginBottom: 16 }}>Velfound started in 2023 as a student project. A group of friends with a shared passion for technology and entrepreneurship came together with one goal: <span style={{ color: '#c9a84c' }}>to build real solutions while learning and earning together.</span></p>
            <p style={{ marginBottom: 16 }}>We noticed businesses struggling with repetitive tasks, manual workflows, and inefficient processes. We saw an opportunity to help them automate these tasks using AI and modern technology. What started as a learning project quickly turned into something real — we were actually solving problems for real clients.</p>
            <p style={{ marginBottom: 16 }}>Our approach is simple: we're not a corporate agency with fancy offices. We're a tight-knit team of students and young professionals who are hungry to learn, build, and deliver results. We work directly with our clients, understand their pain points, and build custom solutions that actually work.</p>
            <p>Today, we've delivered projects across India and Southeast Asia. Every project we build is a learning opportunity and a chance to prove that age and experience don't matter — what matters is passion, dedication, and the willingness to solve real problems. We're here to grow together with our clients, one project at a time.</p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <p className="section-tag" style={{ marginBottom: 12 }}>Our Values</p>
          <h2 style={{ fontSize: 'clamp(28px,4vw,40px)', fontWeight: 700, color: '#f0f0f0', letterSpacing: '-1px' }}>How We Work</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 16 }}>
          {values.map(v => (
            <div key={v.title} className="card" style={{ padding: 28 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                <v.icon size={20} color="#c9a84c" />
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 600, color: '#f0f0f0', marginBottom: 8 }}>{v.title}</h3>
              <p style={{ color: '#555', fontSize: 13, lineHeight: 1.6 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <p className="section-tag" style={{ marginBottom: 12 }}>The Team</p>
          <h2 style={{ fontSize: 'clamp(28px,4vw,40px)', fontWeight: 700, color: '#f0f0f0', letterSpacing: '-1px' }}>Built By Builders</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 16 }}>
          {team.map(m => (
            <div key={m.name} className="card" style={{ padding: 28, textAlign: 'center' }}>
              <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'linear-gradient(135deg,#c9a84c,#e4c677)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: 18, fontWeight: 700, color: '#0a0a0a' }}>{m.avatar}</div>
              <h3 style={{ fontSize: 15, fontWeight: 600, color: '#f0f0f0', marginBottom: 4 }}>{m.name}</h3>
              <p style={{ color: '#c9a84c', fontSize: 12, marginBottom: 12 }}>{m.role}</p>
              <p style={{ color: '#555', fontSize: 13, lineHeight: 1.6, marginBottom: 12 }}>{m.desc}</p>
              <p style={{ color: '#333', fontSize: 11 }}>{m.skills}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 80px', textAlign: 'center' }}>
        <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 20, padding: 56 }}>
          <h2 style={{ fontSize: 36, fontWeight: 700, color: '#f0f0f0', letterSpacing: '-1px', marginBottom: 12 }}>Join the Companies We've Helped</h2>
          <p style={{ color: '#555', fontSize: 16, marginBottom: 32 }}>Let's build your automation system together.</p>
          <Link to="/contact"><button className="btn-gold" style={{ fontSize: 15, padding: '14px 32px' }}>Get in Touch <ArrowRight size={16} /></button></Link>
        </div>
      </section>

      <WebsiteFooter />
    </div>
  );
}
