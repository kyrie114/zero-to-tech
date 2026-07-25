import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { posts as postsApi, categories as categoriesApi, tags as tagsApi } from '../api';

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [cats, setCats] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      postsApi.list(),
      categoriesApi.list(),
      tagsApi.list(),
    ]).then(([p, c, t]) => {
      setBlogPosts(p);
      setCats(c);
      setAllTags(t);
    }).finally(() => setLoading(false));
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
            <h1>博客</h1>
            <div className="about-breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <span style={{ color: 'var(--accent)' }}>博客</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="blog-layout">
            <div className="blog-list">
              {blogPosts.map((post) => (
                <article key={post.id} className="blog-card">
                  <div style={{
                    width: '100%',
                    height: '180px',
                    background: `linear-gradient(135deg, var(--accent-light), var(--bg-secondary))`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2.5rem'
                  }}>
                    📝
                  </div>
                  <div className="blog-card-body">
                    <div className="blog-meta">
                      <span>👤 {post.author}</span>
                      <span>📁 {post.category?.name || '未分类'}</span>
                    </div>
                    <h4>
                      <Link to={`/blog/${post.id}`}>{post.title}</Link>
                    </h4>
                    <p className="excerpt">{post.excerpt}</p>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                      {post.tags.map(tag => (
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
                    <Link to={`/blog/${post.id}`} className="btn btn-outline-primary btn-sm">
                      Read More
                    </Link>
                  </div>
                </article>
              ))}
              {blogPosts.length === 0 && <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>暂无文章</p>}
            </div>

            <aside className="blog-sidebar">
              <div className="sidebar-block">
                <h5>分类</h5>
                <div className="category-list">
                  {cats.map((cat) => (
                    <div key={cat.id} className="category-item">
                      <span>{cat.name}</span>
                      <span className="count">({cat.post_count})</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="sidebar-block">
                <h5>标签</h5>
                <div className="tag-cloud">
                  {allTags.map((tag) => (
                    <span key={tag.id} className="tag">{tag.name}</span>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
