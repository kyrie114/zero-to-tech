import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-logo">
            <span style={{ fontSize: '1.4rem' }}>📚</span>
            <span>Kyrie's Blog</span>
          </div>
          <div className="footer-links">
            <Link to="/courses">课程</Link>
            <Link to="/blog">博客</Link>
            <Link to="/about">关于</Link>
          </div>
          <div className="footer-social">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" title="GitHub">
              ⭐
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© Kyrie's Blog · 从零开始，建立技术直觉</p>
        </div>
      </div>
    </footer>
  );
}
