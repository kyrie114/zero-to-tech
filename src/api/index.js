const API_BASE = '/api';

function getToken() {
  return localStorage.getItem('token');
}

async function request(url, options = {}) {
  const token = getToken();
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${url}`, { ...options, headers });
  if (res.status === 204) return null;
  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || '请求失败');
  return data;
}

// Auth
export const auth = {
  login: (username, password) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify({ username, password }) }),
  me: () => request('/auth/me'),
};

// Posts
export const posts = {
  list: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/posts${qs ? '?' + qs : ''}`);
  },
  listAll: () => request('/posts/all'),
  get: (id) => request(`/posts/${id}`),
  getBySlug: (slug) => request(`/posts/slug/${slug}`),
  create: (data) => request('/posts', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`/posts/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => request(`/posts/${id}`, { method: 'DELETE' }),
};

// Categories
export const categories = {
  list: () => request('/categories'),
  create: (data) => request('/categories', { method: 'POST', body: JSON.stringify(data) }),
  delete: (id) => request(`/categories/${id}`, { method: 'DELETE' }),
};

// Tags
export const tags = {
  list: () => request('/tags'),
  create: (data) => request('/tags', { method: 'POST', body: JSON.stringify(data) }),
  delete: (id) => request(`/tags/${id}`, { method: 'DELETE' }),
};

// Courses
export const coursesApi = {
  list: () => request('/courses'),
  get: (id) => request(`/courses/${id}`),
};

// Lessons
export const lessonsApi = {
  list: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/lessons${qs ? '?' + qs : ''}`);
  },
  get: (id) => request(`/lessons/${id}`),
  getBySlug: (slug) => request(`/lessons/slug/${slug}`),
};

// Search
export const search = {
  query: (q) => request(`/search?q=${encodeURIComponent(q)}`),
};

// Notes
export const notes = {
  list: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/notes${qs ? '?' + qs : ''}`);
  },
  listAll: () => request('/notes/all'),
  get: (id) => request(`/notes/${id}`),
  create: (data) => request('/notes', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`/notes/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => request(`/notes/${id}`, { method: 'DELETE' }),
};
