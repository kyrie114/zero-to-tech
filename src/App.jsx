// ============================================================
// App.jsx —— 整个应用的"总管"组件
//
// 它负责两件事：
//   1. 记住"现在显示哪一页"（用 useState 存一个状态）
//   2. 根据状态，决定把 HomePage 还是 TextLabPage 画出来
// 导航栏点了"文字实验室"，状态一变，页面就自动切换。
// ============================================================

// useState：React 的"状态"工具。
// 它是 React 最核心的概念：组件里"会变的数据"都交给它管。
import { useState } from "react";

import HomePage from "./components/HomePage.jsx";
import TextLabPage from "./components/TextLabPage.jsx";

export default function App() {
  // 这里创建了一个状态：
  //   page     —— 当前的值（现在是 "home"）
  //   setPage  —— 修改它的"遥控器"（调用 setPage("textlab") 值就变了）
  // page 是个"状态"——它一变，下面的界面就跟着重新渲染。
  // 这一节先把它当"框架的规则"用、不展开；"状态到底替你管什么"，留到 4.4。
  const [page, setPage] = useState("home");

  return (
    // 三层壳：只负责给页面撑出布局，不含业务逻辑
    <div className="app-shell">
      <div className="page-shell">
        <main className="page-content">
          {/* 三元表达式：page 是 "home" 就画首页，否则画文字实验室 */}
          {/* 两个页面来回切——靠的是组件，不再是两个独立的 html 文件 */}
          {page === "home"
            ? <HomePage current={page} onNavigate={setPage} />
            : <TextLabPage current={page} onNavigate={setPage} />}

          {/* 给子组件传的两个 props（属性）：
              current   —— 告诉子组件"现在是哪页"，用于高亮导航
              onNavigate—— 把"改页面"的遥控器 setPage 交给子组件，
                            子组件一调用 onNavigate("textlab")，这里就切页 */}
        </main>
      </div>
    </div>
  );
}
