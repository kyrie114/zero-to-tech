import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { lessonsApi } from '../api';

export default function CoursePost() {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    lessonsApi.getBySlug(id)
      .then(setLesson)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="page" style={{ paddingTop: '120px', textAlign: 'center', minHeight: '60vh' }}>加载中...</div>;
  }

  if (error || !lesson) {
    return (
      <div className="page" style={{ paddingTop: '120px', textAlign: 'center', minHeight: '60vh' }}>
        <h2>课程未找到</h2>
        <Link to="/courses" className="btn btn-primary" style={{ marginTop: '20px' }}>返回课程列表</Link>
      </div>
    );
  }

  return (
    <div className="page">
      <section className="section" style={{ paddingTop: 'calc(var(--nav-height) + 60px)', paddingBottom: '80px' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <Link to="/courses" className="blog-detail-back">
            ← 返回课程列表
          </Link>

          <h1 style={{ fontSize: '2.2rem', marginBottom: '16px', lineHeight: '1.3' }}>
            {lesson.title}
          </h1>

          <div className="blog-meta" style={{ marginBottom: '32px', paddingBottom: '24px', borderBottom: '1px solid var(--border-light)' }}>
            <span>👤 {lesson.author}</span>
            <span>📅 {new Date(lesson.created_at).toLocaleDateString('zh-CN')}</span>
            <span>📁 {lesson.category?.name || '未分类'}</span>
            <span>👁 {lesson.view_count}</span>
          </div>

          <div
            className="blog-detail-content"
            dangerouslySetInnerHTML={{ __html: lesson.content }}
          />

          <div className="tags-section">
            <h4>课程标签：</h4>
            <div className="tags-list">
              {lesson.tags.map(tag => (
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
