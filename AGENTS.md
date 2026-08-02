# AGENTS.md

"Zero to Tech" 课程模块 4.3 的配套 React 项目（TextLab 文字实验室）：React 19 + Vite 8。这是一个**学习用项目**，用户跟着 `README.md` 的四拍教程学习如何把 vanilla 网站改造成 React 应用。代码注释、UI 文案均为中文，新增代码请保持一致。

## 运行命令

- 开发：`npm run dev`（Vite，端口 5173）
- 构建：`npm run build` → `dist/`
- **没有测试、lint、格式化配置**：改代码后自检：跑 `npm run build`。

## 架构要点

- 入口 `index.html` 只有 `<div id="root">`，`src/main.jsx` 把 `App` 挂进 `#root` 并 import 8 个 CSS。
- `src/App.jsx` 用 `useState` 的 `page` 状态在 `HomePage` 和 `TextLabPage` 之间切换（无 react-router）。
- 页面组件在 `src/components/`：`Nav`（两页共用导航）、`PageHeading`（靠 props 换标题）、`AnimatedCardGrid`（网格+飞入动画）、`InputCard`、`ResultCard`、`TextLabPage`、`HomePage`。
- CSS 全部在 `src/css/`（reset/variables/layout/hero/nav/cards/lab/responsive），组件用 className 引用，无 CSS Modules。

## 非显而易见的坑

- `App.jsx` 里 `page === "home"` 用三元表达式切换两个页面组件；`onNavigate` 传的是 `setPage` 本身。
- 文本实验逻辑在 `TextLabPage.jsx`（分析输入文字、显示拼音/情感分数结果），`ResultCard` 有淡入和分数滚动动画（animejs）。
- 这是学习 demo，改动前先读 `README.md` 的四拍说明，理解"终点答案册"的定位，不要照抄式改动。
