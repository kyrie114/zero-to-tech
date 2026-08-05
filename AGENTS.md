# AGENTS.md

"Zero to Tech" 课程模块 4.5 的配套 React 项目（TextLab 文字实验室）：React 19 + Next.js 15（App Router）。这是一个**学习用项目**，用户跟着 `README.md` 把 4.4 的 Vite 项目整体搬到了 Next.js：路由层（手搓 `useRoute` → 文件夹路由）和入口（`index.html` + `main.jsx` + `App.jsx` → `app/`）都换了，网站长相不变。代码注释、UI 文案均为中文，新增代码请保持一致。

## 运行命令

- 开发：`npm run dev`（Next.js，默认端口 3000）
- 构建：`npm run build` → `.next/`（被 .gitignore 忽略）
- **没有测试、lint、格式化配置**：改代码后自检：跑 `npm run build`。

## 架构要点

- **路由 = 文件夹**（App Router）：
  - `app/layout.jsx` —— 全站外壳：提供 `<html>/<body>`、app-shell 包裹层，并 import 8 个 CSS、导出 `metadata`。
  - `app/page.jsx` —— `/` 渲染 `<HomeView />`。
  - `app/text-lab/page.jsx` —— `/text-lab` 渲染 `<TextLabView />`。
- 组件在根目录 `components/`：`Nav`（`<Link>` + `usePathname` 高亮当前页）、`HomeView`、`TextLabView`、`PageHeading`（靠 props 换标题）、`AnimatedCardGrid`（网格+飞入动画）、`InputCard`、`ResultCard`。
- CSS 全部在 `css/`（reset/variables/layout/hero/nav/cards/lab/responsive），由 `layout.jsx` 按序引入，无 CSS Modules。
- 数据在 `data/site.js`（4.4 的数据分离原样保留），页面组件从里面读内容。

## 非显而易见的坑

- 用了交互（useState/useEffect/useRef/usePathname/animejs）的组件必须在文件第一行写 `"use client"`：`Nav`、`InputCard`、`ResultCard`、`AnimatedCardGrid`。纯展示的 `HomeView`、`TextLabView`、`PageHeading` 是服务端组件，不写。
- 4.4 的手搓路由已被删除：`src/router/useRoute.js`、`App.jsx` 的 `useState` 切页三元、`onNavigate` 回调——现在靠 `app/` 文件夹路由 + `<Link href="/...">` 跳页。
- 这是学习 demo，改动前先读 `README.md` 的四拍说明（当前为 4.5 的"整包替换"说明），理解"终点答案册"的定位，不要照抄式改动。
