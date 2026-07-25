import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { notes as notesApi } from '../api';

export default function NoteDetail() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    notesApi.get(id)
      .then(setNote)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="page" style={{ paddingTop: '120px', textAlign: 'center', minHeight: '60vh' }}>加载中...</div>;
  }

  if (error || !note) {
    return (
      <div className="page" style={{ paddingTop: '120px', textAlign: 'center', minHeight: '60vh' }}>
        <h2>笔记未找到</h2>
        <Link to="/notes" className="btn btn-primary" style={{ marginTop: '20px' }}>返回笔记列表</Link>
      </div>
    );
  }

  return (
    <div className="page">
      <section className="section" style={{ paddingTop: 'calc(var(--nav-height) + 60px)', paddingBottom: '80px' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <Link to="/notes" className="blog-detail-back">
            ← 返回笔记列表
          </Link>

          <h1 style={{ fontSize: '2.2rem', marginBottom: '16px', lineHeight: '1.3' }}>
            {note.title}
          </h1>

          <div className="blog-meta" style={{ marginBottom: '32px', paddingBottom: '24px', borderBottom: '1px solid var(--border-light)' }}>
            <span>👤 {note.author}</span>
            <span>📅 {new Date(note.created_at).toLocaleDateString('zh-CN')}</span>
            <span>👁 {note.view_count}</span>
          </div>

          <div
            className="blog-detail-content"
            dangerouslySetInnerHTML={{ __html: note.content }}
          />

          <div className="tags-section">
            <h4>标签：</h4>
            <div className="tags-list">
              {note.tags.map(tag => (
                <span key={tag.id} style={{
                  padding: '6px 16px',
                  backgroundColor: 'var(--bg-tag)',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: '0.9rem',
                  color: 'var(--text-secondary)'
                }}>
                  #{tag.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
