// ============================================================
// HomePage.jsx —— "个人主页"这一整页
//
// 一个页面 = 一个大组件。
// HomePage 把几块积木（Nav、PageHeading、AnimatedCardGrid）拼起来，
// 再加上首页自己专属的两张卡，组成完整一页。
// ============================================================

import Nav from "./Nav.jsx";
import PageHeading from "./PageHeading.jsx";
import AnimatedCardGrid from "./AnimatedCardGrid.jsx";

// 接收两个 props（App 传进来的）：
//   current    —— 当前页，传给 Nav 用于高亮
//   onNavigate —— 切页函数，传给 Nav；卡片链接也用它跳去文字实验室
export default function HomePage({ current, onNavigate }) {
  return (
    // 外面套 AnimatedCardGrid：里面所有 .card 都会自动获得飞入动画
    <AnimatedCardGrid className="dashboard-grid">

      {/* 顶部 hero 区：导航 + 大标题（两块都是两页共用的组件） */}
      <article className="hero-stage panel-full">
        <Nav current={current} onNavigate={onNavigate} />
        {/* 同一个 PageHeading，传不同的字就是不同页的标题 */}
        <PageHeading title="关于我" subtitle="项目，创意，灵感，心得，我的作品" />
      </article>

      {/* 下面这两张卡只在首页用、也不复杂，就直接写在这儿——不必为了拆而拆 */}
      <article className="panel panel-full featured-work-panel card">
        <p className="section-kicker">作品</p>
        <p className="featured-title">文字实验室</p>
        <p className="featured-copy">拼音和情绪，挖掘中文里的细节</p>
        {/* 点这个链接 → 阻止默认跳转 → 调用 onNavigate("textlab") 切到实验室页 */}
        <a
          className="featured-link"
          href="#"
          onClick={(e) => { e.preventDefault(); onNavigate("textlab"); }}
        >
          <span className="featured-link-label">打开作品</span>
          <span className="arrow">›</span>
        </a>
      </article>

      <article className="panel panel-full identity-panel card">
        <div className="identity-item">
          <p className="section-kicker">座右铭</p>
          <p className="identity-value identity-quote">已识乾坤大，尤怜草木青</p>
        </div>
        <div className="identity-item">
          <p className="section-kicker">正在学习</p>
          <p className="identity-value">零到全栈</p>
        </div>
      </article>
    </AnimatedCardGrid>
  );
}
