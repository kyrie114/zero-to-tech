import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { notes as notesApi } from '../api';

export default function Notes() {
  const [notesList, setNotesList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    notesApi.list().then(setNotesList).finally(() => setLoading(false));
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
            <h1>笔记</h1>
            <div className="about-breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <span style={{ color: 'var(--accent)' }}>笔记</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          {notesList.map((note) => (
            <article key={note.id} style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-md)',
              padding: '24px',
              marginBottom: '16px',
              transition: 'all var(--transition)',
              position: 'relative',
            }}>
              {note.is_pinned && (
                <span style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  padding: '2px 8px',
                  background: 'var(--accent-light)',
                  color: 'var(--accent)',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: '0.75rem',
                }}>
                  置顶
                </span>
              )}
              <h3 style={{ marginBottom: '8px' }}>
                <Link to={`/notes/${note.id}`} style={{ color: 'var(--text-primary)' }}>
                  {note.title}
                </Link>
              </h3>
              <div style={{ 
                display: 'flex', gap: '12px', fontSize: '0.85rem', color: 'var(--text-muted)',
                marginBottom: '12px' 
              }}>
                <span>👤 {note.author}</span>
                <span>📅 {new Date(note.created_at).toLocaleDateString('zh-CN')}</span>
                <span>👁 {note.view_count}</span>
              </div>
              <p style={{ 
                color: 'var(--text-secondary)', 
                lineHeight: '1.7',
                marginBottom: '12px',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}>
                {note.content.replace(/<[^>]+>/g, '').substring(0, 200)}
              </p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {note.tags.map(tag => (
                  <span key={tag.id} style={{
                    padding: '3px 10px',
                    background: 'var(--bg-tag)',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: '0.78rem',
                    color: 'var(--text-secondary)'
                  }}>
                    #{tag.name}
                  </span>
                ))}
              </div>
            </article>
          ))}
          {notesList.length === 0 && (
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '48px 0' }}>暂无笔记</p>
          )}
        </div>
      </section>
    </div>
  );
}
