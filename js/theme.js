// 主题管理（初始化、切换以及更新开关图标）
function initTheme() {
  const saved = localStorage.getItem('theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
  } else {
    // 遵循系统主题偏好设置
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }
  updateToggleIcon();
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateToggleIcon();
}

function updateToggleIcon() {
  const thumb = document.querySelector('.toggle-thumb');
  if (!thumb) return;
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  thumb.textContent = isDark ? '🌙' : '☀️';
}

export { initTheme, toggleTheme, updateToggleIcon };

