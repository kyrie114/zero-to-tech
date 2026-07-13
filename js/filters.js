import { blogPosts } from './data.js';

// 小型辅助过滤函数
function filterByCategory(category) {
  const cards = document.querySelectorAll('.blog-card');
  const post = blogPosts.filter(p => p.category === category);

  // 为简化起见，这里仅通过改变视觉样式（透明度、缩放）来示意筛选结果
  // 完整的实现应当重新渲染文章列表
  cards.forEach(card => {
    const title = card.querySelector('h3').textContent;
    const match = post.some(p => p.title === title);
    card.style.opacity = match ? '1' : '0.3';
    card.style.transform = match ? 'scale(1)' : 'scale(0.97)';
    card.style.transition = 'all 0.3s ease';
  });

  // 3秒后重置样式
  setTimeout(() => {
    cards.forEach(card => {
      card.style.opacity = '1';
      card.style.transform = 'scale(1)';
    });
  }, 3000);
}

export { filterByCategory };
window.filterByCategory = filterByCategory;

