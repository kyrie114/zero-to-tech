import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { posts as postsApi, categories as categoriesApi, tags as tagsApi } from '../api';

export default function Admin() {
  const { user, loading: authLoading, login, logout } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const [postsList, setPostsList] = useState([]);
  const [cats, setCats] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);

  const [newCatName, setNewCatName] = useState('');
  const [newCatSlug, setNewCatSlug] = useState('');
  const [newTagName, setNewTagName] = useState('');
  const [newTagSlug, setNewTagSlug] = useState('');

  useEffect(() => {
    if (user?.is_admin) loadData();
  }, [user]);

  function loadData() {
    setDataLoading(true);
    Promise.all([
      postsApi.listAll(),
      categoriesApi.list(),
      tagsApi.list(),
    ]).then(([p, c, t]) => {
      setPostsList(p);
      setCats(c);
      setAllTags(t);
    }).finally(() => setDataLoading(false));
  }

  async function handleLogin(e) {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);
    try {
      await login(username, password);
    } catch (err) {
      setLoginError(err.message);
    } finally {
      setLoginLoading(false);
    }
  }

  async function handleDeletePost(id) {
    if (!confirm('确定删除这篇文章？')) return;
    await postsApi.delete(id);
    setPostsList(postsList.filter(p => p.id !== id));
  }

  async function handleTogglePublish(post) {
    const updated = await postsApi.update(post.id, { is_published: !post.is_published });
    setPostsList(postsList.map(p => p.id === post.id ? updated : p));
  }

  async function handleAddCategory(e) {
    e.preventDefault();
    if (!newCatName || !newCatSlug) return;
    const cat = await categoriesApi.create({ name: newCatName, slug: newCatSlug });
    setCats([...cats, { ...cat, post_count: 0, lesson_count: 0 }]);
    setNewCatName('');
    setNewCatSlug('');
  }

  async function handleDeleteCategory(id) {
    if (!confirm('确定删除此分类？')) return;
    await categoriesApi.delete(id);
    setCats(cats.filter(c => c.id !== id));
  }

  async function handleAddTag(e) {
    e.preventDefault();
    if (!newTagName || !newTagSlug) return;
    const tag = await tagsApi.create({ name: newTagName, slug: newTagSlug });
    setAllTags([...allTags, tag]);
    setNewTagName('');
    setNewTagSlug('');
  }

  async function handleDeleteTag(id) {
    if (!confirm('确定删除此标签？')) return;
    await tagsApi.delete(id);
    setAllTags(allTags.filter(t => t.id !== id));
  }

  if (authLoading) {
    return <div className="page" style={{ paddingTop: '120px', textAlign: 'center' }}>加载中...</div>;
  }

  if (!user) {
    return (
      <div className="page">
        <section style={{ paddingTop: 'calc(var(--nav-height) + 60px)', paddingBottom: '80px' }}>
          <div className="container" style={{ maxWidth: '400px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '32px' }}>管理员登录</h2>
            <form onSubmit={handleLogin} style={{
              background: 'var(--bg-card)',
              padding: '32px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-light)',
            }}>
              {loginError && (
                <div style={{ color: '#e74c3c', marginBottom: '16px', fontSize: '0.9rem' }}>{loginError}</div>
              )}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>用户名</label>
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  style={{
                    width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border)', background: 'var(--bg-primary)', color: 'var(--text-primary)',
                  }}
                  required
                />
              </div>
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>密码</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  style={{
                    width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border)', background: 'var(--bg-primary)', color: 'var(--text-primary)',
                  }}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loginLoading}
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                {loginLoading ? '登录中...' : '登录'}
              </button>
            </form>
          </div>
        </section>
      </div>
    );
  }

  if (!user.is_admin) {
    return (
      <div className="page" style={{ paddingTop: '120px', textAlign: 'center', minHeight: '60vh' }}>
        <h2>权限不足</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px' }}>当前账号不是管理员</p>
        <button onClick={logout} className="btn btn-outline-primary" style={{ marginTop: '20px' }}>退出登录</button>
      </div>
    );
  }

  return (
    <div className="page">
      <section style={{ paddingTop: 'calc(var(--nav-height) + 24px)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{
            background: 'linear-gradient(to bottom, var(--bg-secondary), var(--bg-primary))',
            borderRadius: 'var(--radius-xl)',
            padding: '40px 32px'
          }}>
            <h1>管理后台</h1>
            <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>欢迎，{user.username}</p>
            <button onClick={logout} className="btn btn-outline-primary btn-sm" style={{ marginTop: '12px' }}>退出登录</button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* 文章管理 */}
          <div style={{ marginBottom: '48px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2>文章管理</h2>
              <Link to="/admin/posts/new" className="btn btn-primary">+ 新建文章</Link>
            </div>
            {dataLoading ? <p>加载中...</p> : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{
                  width: '100%', borderCollapse: 'collapse',
                  background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', overflow: 'hidden',
                  border: '1px solid var(--border-light)',
                }}>
                  <thead>
                    <tr style={{ background: 'var(--bg-secondary)' }}>
                      <th style={thStyle}>标题</th>
                      <th style={thStyle}>分类</th>
                      <th style={thStyle}>状态</th>
                      <th style={thStyle}>浏览</th>
                      <th style={thStyle}>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {postsList.map(post => (
                      <tr key={post.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                        <td style={tdStyle}>
                          <Link to={`/blog/${post.id}`} style={{ color: 'var(--text-primary)' }}>{post.title}</Link>
                        </td>
                        <td style={tdStyle}>{post.category?.name || '-'}</td>
                        <td style={tdStyle}>
                          <span
                            onClick={() => handleTogglePublish(post)}
                            style={{
                              cursor: 'pointer',
                              padding: '3px 10px',
                              borderRadius: 'var(--radius-pill)',
                              fontSize: '0.78rem',
                              background: post.is_published ? 'var(--accent-light)' : 'var(--bg-tag)',
                              color: post.is_published ? 'var(--accent)' : 'var(--text-muted)',
                            }}
                          >
                            {post.is_published ? '已发布' : '草稿'}
                          </span>
                        </td>
                        <td style={tdStyle}>{post.view_count}</td>
                        <td style={tdStyle}>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <Link to={`/admin/posts/${post.id}/edit`} className="btn btn-outline-primary btn-sm">编辑</Link>
                            <button onClick={() => handleDeletePost(post.id)} className="btn btn-outline-primary btn-sm" style={{ color: '#e74c3c', borderColor: '#e74c3c' }}>删除</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {postsList.length === 0 && <p style={{ textAlign: 'center', padding: '24px', color: 'var(--text-muted)' }}>暂无文章</p>}
              </div>
            )}
          </div>

          {/* 分类管理 */}
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ marginBottom: '24px' }}>分类管理</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div style={{
                background: 'var(--bg-card)', padding: '24px', borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-light)',
              }}>
                <h4 style={{ marginBottom: '16px' }}>现有分类</h4>
                {cats.map(cat => (
                  <div key={cat.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border-light)' }}>
                    <span>{cat.name} <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>({cat.post_count} 篇文章)</span></span>
                    <button onClick={() => handleDeleteCategory(cat.id)} style={{ background: 'none', border: 'none', color: '#e74c3c', cursor: 'pointer', fontSize: '0.85rem' }}>删除</button>
                  </div>
                ))}
              </div>
              <div style={{
                background: 'var(--bg-card)', padding: '24px', borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-light)',
              }}>
                <h4 style={{ marginBottom: '16px' }}>添加分类</h4>
                <form onSubmit={handleAddCategory}>
                  <div style={{ marginBottom: '12px' }}>
                    <input placeholder="分类名称" value={newCatName} onChange={e => setNewCatName(e.target.value)} style={inputStyle} required />
                  </div>
                  <div style={{ marginBottom: '12px' }}>
                    <input placeholder="slug (英文)" value={newCatSlug} onChange={e => setNewCatSlug(e.target.value)} style={inputStyle} required />
                  </div>
                  <button type="submit" className="btn btn-primary btn-sm">添加</button>
                </form>
              </div>
            </div>
          </div>

          {/* 标签管理 */}
          <div>
            <h2 style={{ marginBottom: '24px' }}>标签管理</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div style={{
                background: 'var(--bg-card)', padding: '24px', borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-light)',
              }}>
                <h4 style={{ marginBottom: '16px' }}>现有标签</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {allTags.map(tag => (
                    <span key={tag.id} style={{
                      padding: '4px 12px', background: 'var(--bg-tag)', borderRadius: 'var(--radius-pill)',
                      fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px',
                    }}>
                      {tag.name}
                      <button onClick={() => handleDeleteTag(tag.id)} style={{ background: 'none', border: 'none', color: '#e74c3c', cursor: 'pointer', padding: 0, fontSize: '0.8rem' }}>×</button>
                    </span>
                  ))}
                </div>
              </div>
              <div style={{
                background: 'var(--bg-card)', padding: '24px', borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-light)',
              }}>
                <h4 style={{ marginBottom: '16px' }}>添加标签</h4>
                <form onSubmit={handleAddTag}>
                  <div style={{ marginBottom: '12px' }}>
                    <input placeholder="标签名称" value={newTagName} onChange={e => setNewTagName(e.target.value)} style={inputStyle} required />
                  </div>
                  <div style={{ marginBottom: '12px' }}>
                    <input placeholder="slug (英文)" value={newTagSlug} onChange={e => setNewTagSlug(e.target.value)} style={inputStyle} required />
                  </div>
                  <button type="submit" className="btn btn-primary btn-sm">添加</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const thStyle = {
  padding: '12px 16px', textAlign: 'left', fontWeight: '600', fontSize: '0.9rem',
};

const tdStyle = {
  padding: '12px 16px', fontSize: '0.9rem',
};

const inputStyle = {
  width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-sm)',
  border: '1px solid var(--border)', background: 'var(--bg-primary)', color: 'var(--text-primary)',
};
