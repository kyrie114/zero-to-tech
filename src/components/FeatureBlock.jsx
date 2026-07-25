export default function FeatureBlock({ feature, reverse }) {
  return (
    <div className="feature-block">
      <div className="feature-content" style={reverse ? { flexDirection: 'row-reverse' } : {}}>
        <div className="feature-image">
          <div style={{
            width: '100%',
            height: '240px',
            background: `linear-gradient(135deg, var(--accent-light), var(--bg-card))`,
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '4rem'
          }}>
            {feature.icon}
          </div>
        </div>
        <div className="feature-text">
          <h2>{feature.title}</h2>
          <p>{feature.desc}</p>
          <ul className="feature-list">
            {feature.items.map((item, idx) => (
              <li key={idx}>
                <strong>{item.strong}</strong> - {item.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
