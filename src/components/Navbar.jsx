import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar" id="navbar">
      <div className="container">
        <div className="nav-logo" data-page="home">
          <span className="logo-icon">🐲</span>
          <span>Kyrie's <span className="logo-accent">Blog</span></span>
        </div>

        <div className="nav-links" id="nav-links">
          <Link to="/">首页</Link>
          <Link to="/projects">项目</Link>
          <Link to="/blog">博客</Link>
          <Link to="/about">关于</Link>
        </div>

        <div className="nav-actions">
          <div className="theme-toggle" id="theme-toggle" title="切换主题">
            <div className="toggle-thumb">☀️</div>
          </div>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="nav-social-btn">
            <span>⭐</span> GitHub
          </a>
          <button className="menu-toggle" id="menu-toggle" aria-label="菜单">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
}
