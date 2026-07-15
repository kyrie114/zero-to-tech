// 数据模块：博客文章、分类、标签和项目
// （提取自原 script.js）

const blogPosts = [
  {
    id: 1,
    title: '用 AI 重新定义学习方式',
    author: 'Kyrie',
    category: '思考',
    tags: ['AI时代', '学习方法', '效率'],
    date: '2025-06-28',
    excerpt: '在 AI 时代，学习的方式正在发生根本性的变化。我们不再需要死记硬背每一个 API，而是需要建立技术直觉，理解事物运作的本质。这篇文章探讨了如何利用 AI 工具来加速学习过程，同时保持对技术的深度理解。',
    content: `<h2>为什么学习方式需要改变？</h2>
<p>传统的编程学习路径是：学语法 → 刷题 → 做项目。这条路径在过去十年非常有效，但在 AI 时代，它的效率已经大打折扣。</p>
<p>如今，AI 可以在几秒钟内生成你需要花几小时才能写出的代码。这并不意味着我们不需要学习编程了，而是说学习的重心应该从"怎么写代码"转向"如何理解和管理代码"。</p>
<h2>建立技术直觉</h2>
<p>技术直觉是什么？简单来说，就是当你看到一个问题时，能快速判断出大致的解决方向。你不需要记住每一个函数的参数，但你需要知道这个函数存在，以及它大概能做什么。</p>
<blockquote>学习的目标不是记忆，而是理解。理解了原理，实现只是时间问题。</blockquote>
<h2>实践中的方法论</h2>
<ul>
<li><strong>先做再学</strong> - 不要等到"准备好了"再开始，在做的过程中学习</li>
<li><strong>理解概念</strong> - 把精力放在理解"为什么"而不是"怎么做"</li>
<li><strong>善用 AI</strong> - 让 AI 处理机械性的编码工作，你专注于设计和决策</li>
<li><strong>持续迭代</strong> - 完成比完美更重要，先跑起来再优化</li>
</ul>`
  },
  {
    id: 2,
    title: '从零搭建全栈项目的完整路线图',
    author: 'Kyrie',
    category: '全栈开发',
    tags: ['React', 'Node.js', 'Full Stack', '教程'],
    date: '2025-06-15',
    excerpt: '很多初学者面对全栈开发时感到无从下手。这篇文章梳理了一条清晰的学习路径：从前端基础到后端 API，再到数据库和部署。每一步都有明确的目标和可验证的成果，让你始终知道自己走到了哪里。',
    content: `<h2>全栈开发的全景图</h2>
<p>全栈开发看起来很复杂，但如果你把它拆解成一个个小模块，就会发现每个部分其实都不难。难的是把它们串联起来。</p>
<h2>前端：用户看到的一切</h2>
<p>前端是用户直接交互的部分。你需要掌握 HTML（结构）、CSS（样式）、JavaScript（行为）这三驾马车。然后选择一个框架（推荐 React），用它来构建更复杂的界面。</p>
<h2>后端：看不见的引擎</h2>
<p>后端负责处理业务逻辑、存储数据、验证身份。Node.js + Express 是最容易上手的组合，因为你可以用同一种语言（JavaScript）搞定前后端。</p>
<h3>推荐的学习顺序</h3>
<ul>
<li>HTML & CSS 基础（1-2 周）</li>
<li>JavaScript 核心概念（2-3 周）</li>
<li>React 入门（2 周）</li>
<li>Node.js + Express（2 周）</li>
<li>数据库基础（1 周）</li>
<li>部署上线（1 周）</li>
</ul>
<blockquote>不要追求完美掌握每一步，而是先走通整个流程，然后再回头深入。</blockquote>`
  },
  {
    id: 3,
    title: '理解 Transformer：从注意力机制说起',
    author: 'Kyrie',
    category: '深度学习',
    tags: ['Transformer', 'NLP', '深度学习', 'LLM'],
    date: '2025-05-20',
    excerpt: 'Transformer 架构是现代大语言模型的基石。本文从最基础的注意力机制开始，一步步建立对 Transformer 的直觉理解。不需要深厚的数学基础，只需要好奇心和耐心。',
    content: `<h2>为什么是 Transformer？</h2>
<p>在 Transformer 出现之前，处理序列数据（如文本）主要靠 RNN 和 LSTM。它们有一个致命的缺点：必须按顺序处理，无法并行化。Transformer 用注意力机制彻底解决了这个问题。</p>
<h2>注意力机制的直觉</h2>
<p>想象你在读一本书。当你读到"它"这个字时，你的大脑会自动回顾前文，找到"它"指代的对象。这就是注意力机制在做的事情——让模型在处理每个词时，都能"关注"到输入中所有其他相关的词。</p>
<h3>Query、Key、Value</h3>
<p>注意力机制的核心是三个概念：Query（查询）、Key（键）、Value（值）。你可以把它想象成一个搜索引擎：Query 是你的搜索词，Key 是每个网页的标题，Value 是网页的内容。</p>
<blockquote>Attention(Q, K, V) = softmax(QK^T / √d_k)V</blockquote>
<h2>多头注意力</h2>
<p>一个注意力头可能只关注语法关系，另一个可能关注语义关系。多头注意力让模型同时从多个角度理解输入，就像你同时用多个视角观察同一件事物。</p>`
  },
  {
    id: 4,
    title: 'Claude Code 实战：让 AI 帮你写代码',
    author: 'Kyrie',
    category: 'AI 工具',
    tags: ['Claude Code', 'AI Agent', 'Prompt Engineering'],
    date: '2025-05-08',
    excerpt: 'Claude Code 不仅仅是一个代码补全工具，它更像是一个能理解你意图的编程伙伴。这篇文章分享了我使用 Claude Code 完成真实项目的经验，以及如何写出更好的 Prompt 来引导 AI 产出高质量代码。',
    content: `<h2>AI 编程助手的正确打开方式</h2>
<p>很多人把 AI 编程助手当作一个高级的自动补全工具，这大大低估了它的能力。正确的方式是把它当作一个初级开发者——你需要给它清晰的需求描述，review 它的代码，然后给出反馈。</p>
<h2>编写有效的 Prompt</h2>
<p>好的 Prompt 应该包含三个要素：</p>
<ul>
<li><strong>上下文</strong> - 你在做什么项目，用什么技术栈</li>
<li><strong>目标</strong> - 你希望实现什么功能</li>
<li><strong>约束</strong> - 有什么限制条件（性能、兼容性等）</li>
</ul>
<h2>实战案例</h2>
<p>在开发一个博客系统时，我用 Claude Code 完成了从数据库设计到前端渲染的全部代码。整个过程中，我的角色更像是一个产品经理+架构师，而不是一个逐行编码的程序员。</p>
<blockquote>未来的开发者不需要记住所有的 API，但需要具备清晰表达需求的能力和审查代码质量的眼光。</blockquote>`
  },
  {
    id: 5,
    title: 'Git 工作流：团队协作的艺术',
    author: 'Kyrie',
    category: '全栈开发',
    tags: ['Git', 'GitHub', '团队协作'],
    date: '2025-04-22',
    excerpt: 'Git 是每个开发者的必备技能，但很多人只会 add、commit、push。这篇文章介绍了几种常见的 Git 工作流模式，帮助你在团队中更高效地协作，避免合并冲突的痛苦。',
    content: `<h2>为什么需要工作流？</h2>
<p>当只有你一个人写代码时，Git 很简单。但当团队有 3 个人、5 个人、甚至 50 个人同时开发时，没有统一的工作流就会陷入混乱。</p>
<h2>常见的工作流模式</h2>
<h3>Git Flow</h3>
<p>最经典的工作流，适合有明确版本发布周期的项目。它定义了 main、develop、feature、release、hotfix 五种分支类型。</p>
<h3>GitHub Flow</h3>
<p>简化版本，只有 main 分支和 feature 分支。适合持续部署的项目。流程很简单：创建分支 → 提交代码 → 发起 PR → Code Review → 合并。</p>
<h3>Trunk-Based Development</h3>
<p>所有人直接在主干上开发，用 feature flag 来控制功能的开关。适合有完善 CI/CD 的团队。</p>
<blockquote>选择工作流的原则：越简单越好。复杂的工作流往往意味着更多的心智负担和更低的效率。</blockquote>`
  }
];

const categories = [
  { name: '全栈开发', count: 2 },
  { name: '深度学习', count: 1 },
  { name: '思考', count: 1 },
  { name: 'AI 工具', count: 1 },
];

const allTags = ['AI时代', '学习方法', '效率', 'React', 'Node.js', 'Full Stack', 'Transformer', 'NLP', '深度学习', 'LLM', 'Claude Code', 'AI Agent', 'Git', 'GitHub', 'Prompt Engineering'];

const projects = [
  {
    icon: '🚀',
    title: '全栈博客系统',
    desc: '使用 React + Node.js + MongoDB 构建的完整博客平台，支持 Markdown 编辑、标签分类、评论系统和暗色模式。',
    tags: ['React', 'Node.js', 'MongoDB', 'Express'],
    link: '#',
    primary: true
  },
  {
    icon: '🤖',
    title: 'AI 对话助手',
    desc: '基于大语言模型 API 构建的智能对话应用，支持上下文记忆、多轮对话和自定义 Prompt 模板。',
    tags: ['Python', 'LLM API', 'Prompt Engineering'],
    link: '#',
    primary: false
  },
  {
    icon: '📊',
    title: '数据可视化平台',
    desc: '将复杂数据集转化为直观的交互式图表和仪表盘，支持实时数据更新和导出功能。',
    tags: ['D3.js', 'Python', 'FastAPI', 'WebSocket'],
    link: '#',
    primary: false
  }
];

export { blogPosts, categories, allTags, projects };

