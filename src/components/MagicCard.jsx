export default function MagicCard({ name, role, skills, avatar }) {
  return (
    <div className="magic-card">
      <div className="magic-card-after"></div>
      <div className="magic-card-info">
        <div style={{ textAlign: 'center', width: '100%' }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #7cff67, #B497CF)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px',
            fontSize: '24px',
            fontWeight: 700,
            color: '#fff'
          }}>
            {avatar}
          </div>
          <p className="magic-card-title">{name}</p>
          <p style={{ fontSize: '12px', color: '#888', marginBottom: '8px' }}>{role}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', justifyContent: 'center' }}>
            {skills.map((skill, i) => (
              <span key={i} style={{
                fontSize: '10px',
                background: 'rgba(124, 255, 103, 0.1)',
                color: '#7cff67',
                padding: '2px 8px',
                borderRadius: '999px',
                border: '1px solid rgba(124, 255, 103, 0.2)'
              }}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
