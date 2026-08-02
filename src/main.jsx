// ============================================================
// main.jsx —— 整个程序的"入口文件"
//
// 浏览器打开 index.html 时，html 里只有一行：
//   <script type="module" src="/src/main.jsx"></script>
// 于是浏览器就运行本文件，一切从这儿开始。
// ============================================================

// StrictMode：React 提供的"开发模式检查器"。
// 它会故意让组件多跑一遍，帮你提前发现隐患（只在开发时生效，打包后不影响）。
import { StrictMode } from "react";

// createRoot：React 的"挂载工具"。
// 它负责把 React 画出来的界面，放进真实的 HTML 页面里。
import { createRoot } from "react-dom/client";

// 引入总管组件 App（真正的页面在 App 里）。
import App from "./App.jsx";

// 4.1 那 8 个 CSS 原样搬过来——React 不管 CSS 内部细节。
// 顺序和 4.1 的 html <link> 一致。
import "./css/reset.css";
import "./css/variables.css";
import "./css/layout.css";
import "./css/hero.css";
import "./css/nav.css";
import "./css/cards.css";
import "./css/lab.css";
import "./css/responsive.css";

// 这句是核心动作：
//   1. 在真实 HTML 里找到 id="root" 的那个空 div（它写在 index.html 里）
//   2. 把 <App /> 这个组件"画"进去
// 画好之后，页面里所有内容都是 React 在管理了。
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
