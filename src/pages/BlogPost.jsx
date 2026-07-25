import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { posts as postsApi } from '../api';

export default function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    postsApi.get(id)
      .then(setPost)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="page" style={{ paddingTop: '120px', textAlign: 'center', minHeight: '60vh' }}>加载中...</div>;
  }

  if (error || !post) {
    return (
      <div className="page" style={{ paddingTop: '120px', textAlign: 'center', minHeight: '60vh' }}>
        <h2>文章未找到</h2>
        <Link to="/blog" className="btn btn-primary" style={{ marginTop: '20px' }}>返回博客列表</Link>
      </div>
    );
  }

  return (
    <div className="page">
      <section className="section" style={{ paddingTop: 'calc(var(--nav-height) + 60px)', paddingBottom: '80px' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <Link to="/blog" className="blog-detail-back">
            ← 返回文章列表
          </Link>

          <h1 style={{ fontSize: '2.2rem', marginBottom: '16px', lineHeight: '1.3' }}>
            {post.title}
          </h1>

          <div className="blog-meta" style={{ marginBottom: '32px', paddingBottom: '24px', borderBottom: '1px solid var(--border-light)' }}>
            <span>👤 {post.author}</span>
            <span>📅 {new Date(post.created_at).toLocaleDateString('zh-CN')}</span>
            <span>📁 {post.category?.name || '未分类'}</span>
            <span>👁 {post.view_count}</span>
          </div>

          <div
            className="blog-detail-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="tags-section">
            <h4>文章标签：</h4>
            <div className="tags-list">
              {post.tags.map(tag => (
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
