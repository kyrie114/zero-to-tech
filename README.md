# zero-to-tech-4-5 · Next.js 版（模块 4.5 + 练习扩展）

在 4.5 终点成品上继续练习：文件夹路由、导航入口、状态提升、真拼音分析。

网站有三页：个人主页 `/`、文字实验室 `/text-lab`、博客练习页 `/blog`（目前复用实验室视图当占位）。

## 跑起来

```bash
npm install
npm run dev          # http://localhost:3000
```

常用命令：

```bash
npm run build        # 生产构建检查
npm run start        # 跑构建产物（需先 build）
```

> Windows PowerShell 若拦截 `npm.ps1`，改用 `npm.cmd run dev`。

## 项目结构

```
app/                     ← 文件夹 = 路由
  layout.jsx             ← 全站外壳（html/body + import 8 个 css + metadata）
  page.jsx               ← /         → <HomeView />
  text-lab/page.jsx      ← /text-lab → <TextLabView />
  blog/page.jsx          ← /blog     → 练习路由（暂复用 TextLabView）
components/
  Nav.jsx                ← <Link> + usePathname 高亮（"use client"）
  HomeView.jsx           ← 个人主页：作品卡 + 身份卡（含兴趣爱好）
  TextLabView.jsx        ← 实验室拼装页：提升 text/result（"use client"）
  PageHeading.jsx        ← 大标题 + 副标题（props）
  InputCard.jsx          ← 受控输入 + 「开始分析」（"use client"）
  ResultCard.jsx         ← 原文 / 真拼音 / 演示用情感分（"use client"）
  AnimatedCardGrid.jsx   ← 卡片错峰飞入（"use client"）
css/                     ← 8 个全局样式（variables.css 是主题总开关）
data/site.js             ← 文案数据集中地（数据与界面分离）
next.config.mjs          ← Next 配置（目前空 {}）
REACT-NOTES.md           ← 配套学习笔记（概念 + 可改点）
```

## 核心机制（读代码时按这个顺序）

1. **路由**：`app/` 下文件夹路径 = URL；`page.jsx` 只负责挂上对应 View。
2. **导航**：路由通了 ≠ 页面上有入口。`Nav.jsx` 的 `items` 数组才是可点链接。
3. **数据**：改标题/座右铭/兴趣爱好，优先动 `data/site.js`。
4. **状态提升（文字实验室）**：
   - `TextLabView` 持有 `text`（输入实时值）和 `result`（点分析后的快照）
   - `InputCard` 用 props 显示/修改 `text`，按钮调用 `onAnalyze`
   - `ResultCard` 读 `result` 显示原文，并用 `pinyin-pro` 现场算拼音
5. **客户端组件**：用了 `useState` / `useEffect` / `usePathname` / animejs 的文件，第一行必须 `"use client"`。

## 本地练习过的改动

| 改动 | 位置 |
|---|---|
| 首页兴趣爱好 | `data/site.js` + `HomeView.jsx` |
| 身份卡 3 列 | `css/cards.css`（`.identity-panel`） |
| 导航加「博客」 | `Nav.jsx` 的 `items` |
| `/blog` 路由 | `app/blog/page.jsx` |
| 入场动画缓动 | `AnimatedCardGrid.jsx`（`outElastic`） |
| 输入联动 + 真拼音 | `TextLabView` / `InputCard` / `ResultCard` + `pinyin-pro` |

## 还可以继续练

- 给 `/blog` 写真正的 `BlogView`（别再复用实验室）
- 把情感分数/判断也做成跟 `result` 联动的简易版
- `app/not-found.jsx` 自定义 404
- `css/variables.css` 换全站主题色（`--brand` / `--grad`）

更细的概念讲解见 `REACT-NOTES.md`（部分行号仍是 4.3/4.4 时代，以当前文件为准）。
