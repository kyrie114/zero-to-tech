import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="home-banner">
      <div className="container">
        <h1>从零开始，建立技术直觉</h1>
        <p className="banner-subtitle">
          传授 <span className="banner-keyword">在AI时代</span> 把想法做成产品的能力
        </p>
        <div style={{ marginBottom: '40px' }}>
          <Link to="/courses" className="btn btn-primary">
            开始学习
          </Link>
        </div>
        <div className="banner-image">
          <div style={{
            width: '100%',
            height: '280px',
            background: 'linear-gradient(135deg, var(--accent-light) 0%, var(--bg-secondary) 50%, var(--accent-light) 100%)',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '4rem'
          }}>
            🚀
          </div>
        </div>
      </div>
    </section>
  );
}
