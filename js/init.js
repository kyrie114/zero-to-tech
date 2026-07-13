import { initTheme, toggleTheme } from './theme.js';
import { renderProjects } from './render.js';
import { initNavigation, initMobileMenu, initNavbarScroll, initScrollAnimations } from './ui.js';
import { handleHashChange } from './router.js';

// 初始化：在 DOMContentLoaded 事件触发时绑定并初始化所有模块
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderProjects();
  initNavigation();
  initMobileMenu();
  initNavbarScroll();
  handleHashChange();
  initScrollAnimations();

  // 监听 URL Hash 变化
  window.addEventListener('hashchange', handleHashChange);

  // 主题切换按钮事件绑定
  const themeBtn = document.querySelector('.theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', toggleTheme);
  }

  // 同时在项目页面渲染项目（如果存在独立的项目网格元素）
  const grid2 = document.getElementById('projects-grid-page');
  if (grid2) {
    const grid1 = document.getElementById('projects-grid');
    if (grid1) {
      grid2.innerHTML = grid1.innerHTML;
    } else {
      // 如果由于某种原因主网格不存在，则直接渲染
      renderProjects();
      const srcGrid = document.getElementById('projects-grid');
      if (srcGrid) grid2.innerHTML = srcGrid.innerHTML;
    }
  }
});
