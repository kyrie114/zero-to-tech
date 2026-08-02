// ============================================================
// PageHeading.jsx —— 页面顶部的大标题 + 副标题
//
// 个人主页和文字实验室都用它——同一个组件，靠 props（title / subtitle）显示不同内容。
// 这就是"复用"：结构写一次，两页共享，只是喂进去的字不一样。
//
// 用法示例：
//   <PageHeading title="关于我" subtitle="项目，创意，灵感，心得，我的作品" />
//   <PageHeading title="文字实验室" subtitle="拼音和情绪，挖掘中文里的细节" />
// 同一个组件，传不同的字，就长成不同的标题。
// ============================================================

export default function PageHeading({ title, subtitle }) {
  return (
    <div className="hero-copy">
      {/* 大标题：显示 props 里传进来的 title */}
      <h1 className="hero-display">{title}</h1>
      {/* 副标题：显示 props 里传进来的 subtitle */}
      <p className="hero-subtitle">{subtitle}</p>
    </div>
  );
}
