// 路由（基于 Hash 的单页面应用 SPA）
let currentPage = 'home';
let currentBlogId = null;

function navigateTo(page, blogId = null) {
  currentPage = page;
  currentBlogId = blogId;

  // 更新 URL 中的 Hash 值
  if (blogId) {
    window.location.hash = `#blog/${blogId}`;
  } else {
    window.location.hash = `#${page}`;
  }

  renderPage();
  updateNavLinks();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateNavLinks() {
  document.querySelectorAll('.nav-links a[data-page]').forEach(link => {
    link.classList.toggle('active', link.dataset.page === currentPage);
  });
}

function handleHashChange() {
  const hash = window.location.hash.slice(1) || 'home';

  if (hash.startsWith('blog/')) {
    const id = parseInt(hash.split('/')[1]);
    currentPage = 'blog';
    currentBlogId = id;
  } else {
    currentPage = hash;
    currentBlogId = null;
  }

  renderPage();
  updateNavLinks();
}
