import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="navbar" id="navbar">
      <nav className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
        <div className="nav-logo">
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-primary)' }}>
            <span style={{ fontSize: '1.6rem' }}>📚</span>
            <span className="logo-text">Kyrie's Blog</span>
          </Link>
        </div>

        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <Link to="/" className={isActive('/') ? 'active' : ''}>首页</Link>
          <Link to="/courses" className={isActive('/courses') ? 'active' : ''}>课程</Link>
          <Link to="/blog" className={isActive('/blog') ? 'active' : ''}>博客</Link>
          <Link to="/about" className={isActive('/about') ? 'active' : ''}>关于</Link>
          {user?.is_admin && <Link to="/admin" className={isActive('/admin') ? 'active' : ''}>管理</Link>}
        </div>

        <div className="nav-actions">
          <div
            className="theme-toggle"
            title="切换主题"
            onClick={toggleTheme}
            style={{ cursor: 'pointer' }}
          >
            <div
              className="toggle-thumb"
              style={{ transform: isDarkMode ? 'translateX(22px)' : 'translateX(0)' }}
            >
              {isDarkMode ? '🌙' : '☀️'}
            </div>
          </div>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-bilibili-btn"
          >
            GitHub
          </a>

          <button
            className={`menu-toggle ${menuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="菜单"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
    </header>
  );
}
