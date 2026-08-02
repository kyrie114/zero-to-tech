// ============================================================
// Nav.jsx —— 顶部导航条（品牌 + 两个链接）
//
// 顶部这一条（品牌 + 导航）——4.2 里它在 index.html 和 text-lab.html 各抄了一遍。
// 现在它是一个组件，整个项目只有这一份。
// 想加链接、改样式？只改这一处，两个页面自动一起跟着变。
//
// 它接收两个 props（由 App 传进来）：
//   current    —— 当前是哪个页面（"home" 或 "textlab"），用来高亮
//   onNavigate —— 一个"切页函数"，点击链接时调用它通知 App 换页
// ============================================================

export default function Nav({ current, onNavigate }) {
  // 导航项都写在一个数组里，下面用 .map 循环生成
  const items = [
    { key: "home",    label: "个人主页" },
    { key: "textlab", label: "文字实验室" },
  ];

  return (
    <div className="hero-topline">
      <p className="brand-eyebrow">zero to tech</p>

      <nav className="inline-links hero-nav">
        {/* .map：把 items 数组里的每一项，都"翻译"成一个 <a> 链接。
            每项一个 key（React 用它区分列表里的每一项） */}
        {items.map((it) => (
          <a
            key={it.key}
            href="#"
            // current 和这一项相同 → 加 "active" 类名 → 高亮
            className={"nav-link" + (current === it.key ? " active" : "")}
            onClick={(e) => {
              // 阻止 <a href="#"> 的默认跳转行为（我们不需要真的跳转）
              e.preventDefault();
              // 通知 App："把页面换成 it.key 那页"
              onNavigate(it.key);
            }}
          >
            {it.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
