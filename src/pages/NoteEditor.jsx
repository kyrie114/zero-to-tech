import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { notes as notesApi, tags as tagsApi } from '../api';

export default function NoteEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const isEdit = !!id;

  const [form, setForm] = useState({
    title: '', content: '', author: 'Kyrie', is_pinned: false, is_published: true, tag_ids: [],
  });
  const [allTags, setAllTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;
    Promise.all([
      tagsApi.list(),
      isEdit ? notesApi.get(id) : Promise.resolve(null),
    ]).then(([t, note]) => {
      setAllTags(t);
      if (note) {
        setForm({
          title: note.title,
          content: note.content || '',
          author: note.author,
          is_pinned: note.is_pinned,
          is_published: note.is_published,
          tag_ids: note.tags.map(t => t.id),
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

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.title || !form.content) {
      setError('标题和内容为必填项');
      return;
    }
    setSaving(true);
    setError('');
    try {
      if (isEdit) {
        await notesApi.update(id, form);
      } else {
        await notesApi.create(form);
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
            <h1>{isEdit ? '编辑笔记' : '新建笔记'}</h1>
            <div className="about-breadcrumb">
              <Link to="/admin">管理后台</Link>
              <span>/</span>
              <span style={{ color: 'var(--accent)' }}>{isEdit ? '编辑' : '新建'}笔记</span>
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

            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>标题 *</label>
              <input name="title" value={form.title} onChange={handleChange} style={inputStyle} required />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>内容 *</label>
              <textarea name="content" value={form.content} onChange={handleChange} rows={15} style={{ ...inputStyle, resize: 'vertical', fontFamily: 'monospace' }} required />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>作者</label>
              <input name="author" value={form.author} onChange={handleChange} style={inputStyle} />
            </div>

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

            <div style={{ marginBottom: '20px', display: 'flex', gap: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input type="checkbox" name="is_pinned" checked={form.is_pinned} onChange={handleChange} id="pinned" />
                <label htmlFor="pinned" style={{ cursor: 'pointer', fontSize: '0.9rem' }}>置顶</label>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input type="checkbox" name="is_published" checked={form.is_published} onChange={handleChange} id="published" />
                <label htmlFor="published" style={{ cursor: 'pointer', fontSize: '0.9rem' }}>发布</label>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button type="submit" disabled={saving} className="btn btn-primary">
                {saving ? '保存中...' : (isEdit ? '保存修改' : '创建笔记')}
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
