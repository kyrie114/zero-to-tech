import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { posts as postsApi, categories as categoriesApi, tags as tagsApi } from '../api';

export default function AdminPostEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const isEdit = !!id;

  const [form, setForm] = useState({
    title: '', slug: '', excerpt: '', content: '', author: 'Li Bo',
    cover_image: '', is_published: false, category_id: '', tag_ids: [],
  });
  const [cats, setCats] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;
    Promise.all([
      categoriesApi.list(),
      tagsApi.list(),
      isEdit ? postsApi.get(id) : Promise.resolve(null),
    ]).then(([c, t, post]) => {
      setCats(c);
      setAllTags(t);
      if (post) {
        setForm({
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt || '',
          content: post.content || '',
          author: post.author,
          cover_image: post.cover_image || '',
          is_published: post.is_published,
          category_id: post.category?.id || '',
          tag_ids: post.tags.map(t => t.id),
        });
      }
    }).finally(() => setLoading(false));
  }, [user, id]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  }

  function handleTagToggle(tagId) {
    setForm(prev => ({
      ...prev,
      tag_ids: prev.tag_ids.includes(tagId)
        ? prev.tag_ids.filter(id => id !== tagId)
        : [...prev.tag_ids, tagId],
    }));
  }

  function generateSlug() {
    const slug = form.title
      .toLowerCase()
      .replace(/[^\w\u4e00-\u9fff]+/g, '-')
      .replace(/^-|-$/g, '');
    setForm(prev => ({ ...prev, slug }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.title || !form.slug || !form.content) {
      setError('标题、slug 和内容为必填项');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const data = {
        ...form,
        category_id: form.category_id ? Number(form.category_id) : null,
      };
      if (isEdit) {
        await postsApi.update(id, data);
      } else {
        await postsApi.create(data);
      }
      navigate('/admin');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (authLoading || loading) {
    return <div className="page" style={{ paddingTop: '120px', textAlign: 'center' }}>加载中...</div>;
  }

  if (!user?.is_admin) {
    return (
      <div className="page" style={{ paddingTop: '120px', textAlign: 'center', minHeight: '60vh' }}>
        <h2>权限不足</h2>
        <Link to="/admin" className="btn btn-primary" style={{ marginTop: '20px' }}>前往登录</Link>
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
            <h1>{isEdit ? '编辑文章' : '新建文章'}</h1>
            <div className="about-breadcrumb">
              <Link to="/admin">管理后台</Link>
              <span>/</span>
              <span style={{ color: 'var(--accent)' }}>{isEdit ? '编辑' : '新建'}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '900px' }}>
          <form onSubmit={handleSubmit} style={{
            background: 'var(--bg-card)', padding: '32px', borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-light)',
          }}>
            {error && <div style={{ color: '#e74c3c', marginBottom: '16px', padding: '10px', background: 'rgba(231,76,60,0.1)', borderRadius: 'var(--radius-sm)' }}>{error}</div>}

            {/* 标题 */}
            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>标题 *</label>
              <input name="title" value={form.title} onChange={handleChange} style={inputStyle} required />
            </div>

            {/* Slug */}
            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>Slug * <button type="button" onClick={generateSlug} style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontSize: '0.8rem' }}>自动生成</button></label>
              <input name="slug" value={form.slug} onChange={handleChange} style={inputStyle} required />
            </div>

            {/* 摘要 */}
            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>摘要</label>
              <textarea name="excerpt" value={form.excerpt} onChange={handleChange} rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
            </div>

            {/* 内容 */}
            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>内容 (HTML) *</label>
              <textarea name="content" value={form.content} onChange={handleChange} rows={15} style={{ ...inputStyle, resize: 'vertical', fontFamily: 'monospace' }} required />
            </div>

            {/* 作者 */}
            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>作者</label>
              <input name="author" value={form.author} onChange={handleChange} style={inputStyle} />
            </div>

            {/* 封面图 */}
            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>封面图片 URL</label>
              <input name="cover_image" value={form.cover_image} onChange={handleChange} style={inputStyle} />
            </div>

            {/* 分类 */}
            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>分类</label>
              <select name="category_id" value={form.category_id} onChange={handleChange} style={inputStyle}>
                <option value="">无分类</option>
                {cats.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* 标签 */}
            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>标签</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {allTags.map(tag => (
                  <span
                    key={tag.id}
                    onClick={() => handleTagToggle(tag.id)}
                    style={{
                      padding: '5px 14px', borderRadius: 'var(--radius-pill)', fontSize: '0.85rem',
                      cursor: 'pointer', transition: 'var(--transition-fast)',
                      background: form.tag_ids.includes(tag.id) ? 'var(--accent)' : 'var(--bg-tag)',
                      color: form.tag_ids.includes(tag.id) ? 'var(--text-on-accent)' : 'var(--text-secondary)',
                      border: `1px solid ${form.tag_ids.includes(tag.id) ? 'var(--accent)' : 'var(--border)'}`,
                    }}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>

            {/* 发布状态 */}
            <div style={{ marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input type="checkbox" name="is_published" checked={form.is_published} onChange={handleChange} id="publish" />
              <label htmlFor="publish" style={{ cursor: 'pointer', fontSize: '0.9rem' }}>立即发布</label>
            </div>

            {/* 操作按钮 */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button type="submit" disabled={saving} className="btn btn-primary">
                {saving ? '保存中...' : (isEdit ? '保存修改' : '创建文章')}
              </button>
              <Link to="/admin" className="btn btn-outline-primary">取消</Link>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

const labelStyle = {
  display: 'block', marginBottom: '6px', fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: '500',
};

const inputStyle = {
  width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)',
  border: '1px solid var(--border)', background: 'var(--bg-primary)', color: 'var(--text-primary)',
};
