import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-logo">
            <span className="logo-icon">🐲</span>
            <span>Kyrie's <span className="logo-accent">Blog</span></span>
          </div>
          <div className="footer-links">
            <Link to="/projects">项目</Link>
            <Link to="/blog">博客</Link>
            <Link to="/about">关于</Link>
          </div>
          <div className="footer-social">
            <a href="https://github.com" target="_blank" rel="noreferrer" title="GitHub">🐙</a>
            <a href="mailto:hello@example.com" title="Email">✉️</a>
            <a href="#" title="RSS">📡</a>
          </div>
        </div>
        <div className="footer-bottom">
          © 2025 Kyrie's Blog · 从零开始，建立技术直觉
        </div>
      </div>
    </footer>
  );
}
