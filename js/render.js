// 渲染函数：页面、博客列表/详情、项目展示
function renderPage() {
  const pages = document.querySelectorAll('.page');
  pages.forEach(p => p.classList.remove('active'));

  const target = document.getElementById(`page-${currentPage}`);
  if (target) {
    target.classList.add('active');
  }

  // 博客详情页的特殊处理
  if (currentPage === 'blog' && currentBlogId) {
    renderBlogDetail(currentBlogId);
  } else if (currentPage === 'blog') {
    renderBlogList();
  }

  // 重新初始化新页面的滚动动画
  setTimeout(initScrollAnimations, 100);
}

function renderBlogList() {
  const container = document.getElementById('blog-list-container');
  if (!container) return;

  container.innerHTML = `
    <div class="blog-layout">
      <div class="blog-list">
        ${blogPosts.map(post => `
          <article class="blog-card fade-in">
            <h3 onclick="navigateTo('blog', ${post.id})">${post.title}</h3>
            <div class="blog-meta">
              <span class="meta-item">👤 ${post.author}</span>
              <span class="meta-item">📁 ${post.category}</span>
              <span class="meta-item">📅 ${post.date}</span>
            </div>
            <p class="excerpt">${post.excerpt}</p>
            <div class="card-tags" style="margin-bottom: 16px;">
              ${post.tags.map(t => `<span class="tag">${t}</span>`).join('')}
            </div>
            <button class="btn btn-outline" onclick="navigateTo('blog', ${post.id})">阅读全文 →</button>
          </article>
        `).join('')}
      </div>
      <aside class="blog-sidebar">
        <div class="sidebar-block">
          <h3>📂 分类</h3>
          <div class="category-list">
            ${categories.map(c => `
              <div class="category-item" onclick="filterByCategory('${c.name}')">
                <span>${c.name}</span>
                <span class="count">( ${c.count} )</span>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="sidebar-block">
          <h3>🏷️ 标签</h3>
          <div class="tag-cloud">
            ${allTags.map(t => `<span class="tag">${t}</span>`).join('')}
          </div>
        </div>
      </aside>
    </div>
  `;

  setTimeout(initScrollAnimations, 100);
}

function renderBlogDetail(id) {
  const post = blogPosts.find(p => p.id === id);
  if (!post) return;

  const container = document.getElementById('blog-list-container');
  if (!container) return;

  container.innerHTML = `
    <div class="blog-detail">
      <a class="blog-detail-back" onclick="navigateTo('blog')">← 返回博客列表</a>
      <h1>${post.title}</h1>
      <div class="blog-meta">
        <span class="meta-item">👤 ${post.author}</span>
        <span class="meta-item">📁 ${post.category}</span>
        <span class="meta-item">📅 ${post.date}</span>
      </div>
      <div class="card-tags" style="margin-bottom: 32px;">
        ${post.tags.map(t => `<span class="tag">${t}</span>`).join('')}
      </div>
      <div class="blog-detail-content">
        ${post.content}
      </div>
    </div>
  `;
}

function renderProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  grid.innerHTML = projects.map(proj => `
    <div class="project-card fade-in">
      <div class="card-icon">${proj.icon}</div>
      <h3>${proj.title}</h3>
      <p>${proj.desc}</p>
      <div class="card-tags">
        ${proj.tags.map(t => `<span class="tag">${t}</span>`).join('')}
      </div>
      <a href="${proj.link}" class="btn ${proj.primary ? 'btn-primary' : 'btn-outline'} btn-block">
        ${proj.primary ? '查看项目' : '了解更多'}
      </a>
    </div>
  `).join('');
}
