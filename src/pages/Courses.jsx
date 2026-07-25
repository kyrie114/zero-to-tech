import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { lessonsApi } from '../api';

export default function Courses() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    lessonsApi.list().then(setLessons).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="page" style={{ paddingTop: '120px', textAlign: 'center', minHeight: '60vh' }}>加载中...</div>;
  }

  return (
    <div className="page">
      <section style={{ paddingTop: 'calc(var(--nav-height) + 24px)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{
            background: 'linear-gradient(to bottom, var(--bg-secondary), var(--bg-primary))',
            borderRadius: 'var(--radius-xl)',
            padding: '56px 32px'
          }}>
            <h1>零到全栈</h1>
            <div className="about-breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <span style={{ color: 'var(--accent)' }}>零到全栈</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '24px'
          }}>
            {lessons.map((lesson) => (
              <div key={lesson.id} style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                transition: 'all var(--transition)'
              }}>
                <div style={{
                  width: '100%',
                  height: '180px',
                  background: `linear-gradient(135deg, var(--accent-light), var(--bg-secondary))`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2.5rem'
                }}>
                  📖
                </div>
                <div style={{ padding: '24px' }}>
                  <h4 style={{ marginBottom: '10px' }}>
                    <Link to={`/courses/${lesson.slug}`} style={{ color: 'var(--text-primary)' }}>
                      {lesson.title}
                    </Link>
                  </h4>
                  <ul style={{ marginBottom: '12px', display: 'flex', gap: '14px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <li>
                      <span style={{ marginRight: '6px' }}>👤</span>{lesson.author}
                    </li>
                    <li>
                      <span style={{ marginRight: '4px' }}>📁</span>
                      <span>{lesson.category?.name || '未分类'}</span>
                    </li>
                  </ul>
                  <p className="excerpt" style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.95rem',
                    lineHeight: '1.7',
                    marginBottom: '16px'
                  }}>
                    {lesson.description}
                  </p>
                  <Link to={`/courses/${lesson.slug}`} className="btn btn-outline-primary btn-sm">
                    Read More
                  </Link>
                </div>
              </div>
            ))}
            {lessons.length === 0 && <p style={{ textAlign: 'center', color: 'var(--text-muted)', gridColumn: '1 / -1' }}>暂无课程</p>}
          </div>
        </div>
      </section>
    </div>
  );
}
