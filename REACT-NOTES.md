# React 学习笔记 · TextLab（模块 4.3 配套）

> 这份笔记陪你把本项目的代码从头读到懂。每个知识点都标了**代码位置**（文件:行号），照着打开就能找到。
> 建议配合 `npm run dev` 开着页面边看边玩。

---

## 一、React 到底是啥？

React 是一个 **JavaScript 库**，干一件事：**"用 JS 函数来画网页"**。

```
传统方式：  index.html 里写死全部内容（改哪都要去改文件）
React 方式：index.html 只剩空壳 → main.jsx 启动 → 一堆函数（组件）把页面"画"出来
```

所以 React 代码里到处都是 `function 某某() { return (<div>...</div>) }` —— **一个组件 = 一个函数，函数返回它要画的内容**。

---

## 二、项目文件地图（先认识每个文件）

| 文件 | 角色 | 一句话 |
|---|---|---|
| `index.html` | 空壳 | 只有一个 `<div id="root">`，其余全靠 JS 画 |
| `src/main.jsx` | 入口 | 找到 `#root`，把 `<App />` 挂进去，import 8 个 CSS |
| `src/App.jsx` | 总管 | `useState` 记住当前页，决定画首页还是实验室 |
| `src/components/HomePage.jsx` | 页面 | "个人主页"整页 = 导航+标题+两张卡 |
| `src/components/TextLabPage.jsx` | 页面 | "文字实验室"整页 = 导航+标题+输入卡+结果卡 |
| `src/components/Nav.jsx` | 小组件 | 顶部导航条（两页共用） |
| `src/components/PageHeading.jsx` | 小组件 | 大标题+副标题（两页共用，靠 props 换字） |
| `src/components/AnimatedCardGrid.jsx` | 小组件 | 网格容器，自带"卡片飞入"动画 |
| `src/components/InputCard.jsx` | 小组件 | 文字输入区卡片 |
| `src/components/ResultCard.jsx` | 小组件 | 结果显示卡片，自带淡入+分数滚动动画 |
| `src/css/*.css` | 样式 | 8 个 CSS，由 main.jsx 按序引入 |

**组件树（谁包含谁）：**

```
main.jsx
  └─ App.jsx（总管）
       ├─ HomePage（个人主页）
       │    ├─ AnimatedCardGrid（动画容器）
       │    │    ├─ Nav
       │    │    ├─ PageHeading
       │    │    ├─ 作品卡（直接写在 HomePage 里）
       │    │    └─ 座右铭卡（直接写在 HomePage 里）
       └─ TextLabPage（文字实验室）
            ├─ AnimatedCardGrid
            │    ├─ Nav
            │    ├─ PageHeading
            │    ├─ InputCard
            │    └─ ResultCard
```

---

## 三、核心概念逐个讲

### 1. JSX —— "在 JS 代码里写 HTML"

- **是什么**：组件 `return` 里那堆 `<div>`、`<h1>` 叫 **JSX**，本质是 JS，由 Vite 翻译成浏览器认识的代码。
- **代码在哪**：任何组件的 return 里，比如 `Nav.jsx:20-45`。
- **和 HTML 的三个不同**（看到别懵）：

| HTML | JSX | 原因 |
|---|---|---|
| `class="xxx"` | `className="xxx"` | `class` 是 JS 保留字 |
| `onclick="..."` | `onClick={...}` | 驼峰命名，值是 JS |
| `style="color:red"` | `style={{color:'red'}}` | 值是对象 |

- **注意**：`{变量}` 花括号 = "在这里插入 JS 值"，比如 `PageHeading.jsx:17` 的 `{title}`。

### 2. 组件 —— 会画东西的函数

- **是什么**："函数 + 返回的 JSX"。**组件名必须大写开头**（小写会被当成普通 HTML 标签）。
- **代码在哪**：`Nav.jsx:13`、`ResultCard.jsx:13` 都是组件定义；`HomePage.jsx:23` 的 `<Nav current={...} />` 是使用组件（把组件当标签写）。
- **比喻**：组件 = 乐高积木。`Nav` 是导航积木，`PageHeading` 是标题积木，`HomePage` 是把积木拼起来的底板。

### 3. import / export —— 文件之间互相借用

- **是什么**：
  - `export`：我这个文件提供什么给别人（`export default function Nav`）
  - `import`：我要用别人的什么（`import Nav from "./Nav.jsx"`）
- **代码在哪**：`HomePage.jsx:9-11` 一次 import 三个组件；`main.jsx:18` import App。
- **细节**：
  - `import Nav from "./Nav.jsx"` —— 不带大括号，名字可随便改（因为是默认导出，一个文件只有一个）
  - `import { useState } from "react"` —— 带大括号，必须叫这名字（React 库导出很多，点名要哪个）

### 4. props —— 给组件传"参数"（**本项目最重要**）

- **是什么**：函数有参数，组件也有——叫 **props**。父组件往标签里写 `title="xxx"`，子组件在函数参数里 `{ title }` 接住。
- **代码在哪（四步走，多看两遍）**：
  1. **传**：`App.jsx:33` `<HomePage current={page} onNavigate={setPage} />` —— 塞两个值
  2. **接**：`HomePage.jsx:16` `export default function HomePage({ current, onNavigate })` —— 接住
  3. **转手**：`HomePage.jsx:23` `<Nav current={current} onNavigate={onNavigate} />` —— 原样再传
  4. **使用**：`Nav.jsx:32` `current === it.key` —— 判断该不该高亮
- **一句话**：props 是"父 → 子"的单向传话。`PageHeading title="关于我"` = 告诉它"显示'关于我'这三个字"。

### 5. 事件 onClick —— 用户点了怎么办

- **是什么**：JSX 里写 `onClick={函数}`，用户一点，函数就执行。
- **代码在哪**：`Nav.jsx:33-38`：
  ```jsx
  onClick={(e) => {
    e.preventDefault();      // 拦住 <a href="#"> 的默认跳转
    onNavigate(it.key);      // 呼叫"切页遥控器"
  }}
  ```
- **两个坑**：
  - `onClick={onNavigate}` 是传函数；`onClick={onNavigate()}` 是**立刻执行**（别加括号）
  - 用箭头函数包一层，是为了能顺带做两件事（拦跳转 + 切页）

### 6. 列表渲染 .map —— 重复的东西循环生成

- **是什么**：HTML 里写 2 个链接就手写 2 个 `<a>`；React 里把数据放数组，用 `.map` 循环生成。
- **代码在哪**：`Nav.jsx:15-18` 定义数组，`Nav.jsx:27-42` 用 `.map` 把每项变成 `<a>`。
- **要点**：每个循环项要写 `key`（`Nav.jsx:29`），React 用它区分"谁是第几个"。
- **自己玩**：在 `Nav.jsx:16-17` 中间加一行 `{ key: "blog", label: "博客" }`，导航立刻多个"博客"链接（点了没反应，因为 App 只认两个页——这正是后面要补的活儿）。

### 7. 条件渲染 —— 三元表达式切换

- **是什么**：`条件 ? 画A : 画B`。
- **代码在哪**：`App.jsx:32-34`：
  ```jsx
  {page === "home"
    ? <HomePage ... />
    : <TextLabPage ... />}
  ```
- **这就是"换页"的全部秘密**：`page` 是 `"home"` 就画首页，否则画实验室。没有路由库，全靠这个三元。

### 8. useState —— 组件的"记忆"（React 的灵魂）

- **是什么**：函数每次执行完就忘事。`useState` 让组件**记住**一个会变的值，值一变 React 自动重画界面。
- **代码在哪**：`App.jsx:23`：
  ```jsx
  const [page, setPage] = useState("home");
  //   ↑当前值      ↑改它的遥控器        ↑初始值
  ```
- **理解它**：
  - `page` = 现在是哪页（初始 `"home"`）
  - `setPage("textlab")` 一调用 → `page` 变 `"textlab"` → App 重新执行 → 三元变画实验室 → **界面自己换了**
  - 这就是导航不用刷新就能切页的原因
- **关键**：改值**必须**用 `setPage`，直接 `page = "textlab"` 无效（React 不知道）。
- **自己玩**：把 `App.jsx:23` 改成 `useState("textlab")`，刷新后默认停在文字实验室页。

### 9. useEffect —— "挂载后干点事"

- **是什么**：组件**第一次出现在屏幕上之后**执行一段代码。常用于：请求数据、启动动画、监听事件。
- **代码在哪**：`AnimatedCardGrid.jsx:23-35`（卡片飞入）、`ResultCard.jsx:19-33`（淡入+分数滚动）。
- **那个 `[]` 是啥**：第二个参数是"依赖列表"。空数组 = 只在第一次挂载时执行一次。不写 `[]` 的话，每次界面重画都会执行（动画会反复触发）。

### 10. useRef —— 给真实元素"贴标签"

- **是什么**：JSX 里的 `<div>` 对 JS 来说只是"描述"。要用 JS 直接操作它（比如让 animejs 对它做动画），得先找到它。`useRef` 就是"标签"：贴上去，之后 `xxx.current` 拿到那个真实元素。
- **代码在哪**（三步）：
  1. **建标签**：`ResultCard.jsx:15-16`（`cardRef`、`scoreRef`）
  2. **贴标签**：`ResultCard.jsx:37` `ref={cardRef}`、`:59` `ref={scoreRef}`
  3. **用标签**：`ResultCard.jsx:21` `animate(cardRef.current, ...)` —— `cardRef.current` 就是那张真实卡片

---

## 四、整条线串起来（数据怎么流动）

```
浏览器打开 index.html（只有 <div id="root">）
   ↓ main.jsx:35  createRoot(...).render(<App />)    ← 启动
   ↓ App.jsx 执行
   ↓ App.jsx:23  useState 记住 page = "home"
   ↓ App.jsx:32  三元 → 画 HomePage，props 传 (current, onNavigate)
   ↓ HomePage.jsx 接住 props → 再传给 Nav / PageHeading
   ↓ Nav.jsx 用 current 高亮；用户点击 → onNavigate("textlab") → setPage
   ↓ page 变 "textlab" → App 重画 → TextLabPage 出现
```

**记住一句话**：**数据从上往下流（props 传参），事件从下往上喊（onNavigate 回调）**。

---

## 五、推荐阅读顺序

1. `index.html`（空壳）
2. `src/main.jsx`（启动）
3. `src/App.jsx`（总管：useState + 三元）
4. `src/components/HomePage.jsx` / `TextLabPage.jsx`（页面怎么拼积木）
5. `src/components/Nav.jsx` / `PageHeading.jsx`（props 怎么传）
6. `src/components/AnimatedCardGrid.jsx` / `ResultCard.jsx`（useEffect/useRef + 动画）

---

## 六、可以动手改的点（由易到难）

### 改文字（零风险，立刻见效）
| 位置 | 改成什么 |
|---|---|
| `HomePage.jsx:25` | 首页大标题/副标题 |
| `HomePage.jsx:47` | 改座右铭（"已识乾坤大，尤怜草木青"） |
| `HomePage.jsx:51` | 改"正在学习"内容 |
| `Nav.jsx:16-17` | 数组里加一项 = 加一个导航链接 |
| `InputCard.jsx:30` | 改输入框默认文字 |
| `ResultCard.jsx:47,52` | 改结果区示例原文/拼音 |
| `ResultCard.jsx:59,63` | 改情感分数（0.86）和判断（"偏积极"） |

### 改样式（打开 `src/css/` 找类名）
- `variables.css` — 全站配色/圆角/间距"总开关"，改一个变量全站变
- `cards.css` — 卡片长相（圆角、阴影、背景）
- `lab.css` — 实验室布局（输入/结果卡宽度）
- 试试：把 `variables.css` 里 `--accent`（主色调）改成别的色值

### 改动画（`AnimatedCardGrid.jsx` / `ResultCard.jsx`）
- `AnimatedCardGrid.jsx:31` `stagger(120)` 改 `stagger(300)` → 卡片依次入场更慢
- `AnimatedCardGrid.jsx:33` `ease: "outBack"` 换 `"easeOutElastic"` → 弹跳感更强
- `ResultCard.jsx:31` `duration: 1500` 改小 → 分数滚动更快

### 加内容（中等难度，练手好题）
- 首页再加一张卡：复制 `HomePage.jsx:44-53` 那段 `<article className="panel panel-full card">`，改里面的字
- 给导航加第三页：`Nav.jsx` 加一项 → `App.jsx:32` 三元改三分支 → 新建 `src/components/新页面.jsx`

---

## 七、常见报错自查

| 报错/现象 | 原因 |
|---|---|
| "Warning: Each child in a list should have a unique key" | `.map` 里忘了写 `key`（`Nav.jsx:29`） |
| 点了导航没反应 | 看看是不是忘了 `e.preventDefault()`，或 `onNavigate` 没传下来 |
| 改了 `page` 变量界面不动 | 直接用 `page = "..."` 赋值了，必须用 `setPage(...)` |
| 页面刷新后才生效、点按钮不生效 | 逻辑写在普通变量里了，应该用 `useState` |
