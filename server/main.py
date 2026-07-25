import json
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, SessionLocal, Base
from .models import User, Category, Tag, Post, Course, Lesson
from .auth import hash_password
from .routers import (
    auth_router, posts_router, categories_router, tags_router,
    courses_router, lessons_router, notes_router, search_router,
)

app = FastAPI(title="Kyrie's Blog API", version="1.0.0")

# CORS — 允许前端开发服务器跨域请求
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 注册路由
app.include_router(auth_router)
app.include_router(posts_router)
app.include_router(categories_router)
app.include_router(tags_router)
app.include_router(courses_router)
app.include_router(lessons_router)
app.include_router(notes_router)
app.include_router(search_router)


@app.on_event("startup")
def on_startup():
    """创建数据库表并写入种子数据"""
    Base.metadata.create_all(bind=engine)
    seed_data()


@app.get("/api/health")
def health_check():
    return {"status": "ok", "message": "Kyrie's Blog API is running"}


def seed_data():
    """首次启动时写入演示数据"""
    db = SessionLocal()
    try:
        # 如果已有数据则跳过
        if db.query(User).first():
            return

        # ===== 管理员 =====
        admin = User(
            username="admin",
            email="admin@example.com",
            hashed_password=hash_password("admin123"),
            is_admin=True,
        )
        db.add(admin)
        db.flush()

        # ===== 分类 =====
        categories_data = [
            ("零到全栈", "zero-to-fullstack"),
            ("思考", "thinking"),
            ("课程设计", "course-design"),
            ("AI 工具", "ai-tools"),
            ("深度学习", "deep-learning"),
        ]
        cat_map = {}
        for name, slug in categories_data:
            cat = Category(name=name, slug=slug)
            db.add(cat)
            db.flush()
            cat_map[slug] = cat

        # ===== 标签 =====
        tags_data = [
            ("AI时代", "ai-era"), ("全栈", "fullstack"), ("学习路线", "learning-path"),
            ("课程结构", "course-structure"), ("开发环境", "dev-env"), ("VS Code", "vs-code"),
            ("文件系统", "filesystem"), ("终端", "terminal"), ("Linux", "linux"),
            ("命令行", "cli"), ("互联网", "internet"), ("HTTP", "http"),
            ("DNS", "dns"), ("服务器", "server"), ("效率", "efficiency"),
            ("思考", "thinking"), ("课程设计", "course-design"), ("教学", "teaching"),
            ("React", "react"), ("Next.js", "nextjs"), ("Python", "python"),
            ("FastAPI", "fastapi"), ("Transformer", "transformer"), ("LLM", "llm"),
            ("Claude Code", "claude-code"), ("Git", "git"), ("GitHub", "github"),
        ]
        tag_map = {}
        for name, slug in tags_data:
            tag = Tag(name=name, slug=slug)
            db.add(tag)
            db.flush()
            tag_map[slug] = tag

        # ===== 课程 =====
        course_fullstack = Course(
            title="零到全栈", slug="zero-to-fullstack",
            description="从完全零基础出发，用 8 个模块、23 节课，带你把第一个全栈项目从本地跑到公网上线。",
            badge="active", badge_text="录制中",
            tech_stack=json.dumps(["React", "Next.js", "Python", "FastAPI", "Linux"]),
            sort_order=1,
        )
        course_agent = Course(
            title="玩转 Agent", slug="play-with-agent",
            description="学会驾驭 Claude Code、Cursor 等 AI 工具完成真实任务，理解 Agent 背后的工作机制与局限。",
            badge="soon", badge_text="筹备中",
            tech_stack=json.dumps(["Claude Code", "Cursor", "AI 工作流", "Prompt 工程"]),
            sort_order=2,
        )
        course_dl = Course(
            title="深度学习", slug="deep-learning",
            description="从神经网络的数学直觉出发，理解 LLM 的工作原理，用 PyTorch 亲手验证每一个核心概念。",
            badge="soon", badge_text="筹备中",
            tech_stack=json.dumps(["神经网络原理", "PyTorch", "LLM 原理", "Transformer"]),
            sort_order=3,
        )
        db.add_all([course_fullstack, course_agent, course_dl])
        db.flush()

        # ===== 课时（零到全栈前 6 节） =====
        lessons_data = [
            (1, 1, "模块 1.1：为什么在 AI 时代还要学全栈开发？", "module-1-1",
             "先回答一个问题：今天 AI 已经越来越会写代码了，人为什么还要学习全栈开发？",
             "<h2>为什么还需要学全栈开发？</h2><p>AI 已经可以在几秒钟内生成完整的代码。答案很简单：<strong>AI 能写代码，但不能替你理解代码。</strong></p><blockquote>学习成本降低，但理解深度不减。</blockquote>",
             ["ai-era", "fullstack", "learning-path"]),
            (1, 2, "模块 1.2：这门课是怎么安排的", "module-1-2",
             '你可能会有一个\u201c我接下来会怎么学，最后能做出来什么？\u201d的问题。',
             "<h2>课程结构</h2><p>这门课分为 8 个模块，每个模块包含 2-3 节课。</p>",
             ["learning-path", "course-structure", "fullstack"]),
            (1, 3, "模块 1.3：课前准备", "module-1-3",
             '出来混最重要的是\u201c出来\u201d，所有需要的准备就是胸前那一个\u201c勇\u201d字。',
             "<h2>你需要准备什么？</h2><ul><li><strong>一台电脑</strong></li><li><strong>稳定的网络</strong></li><li><strong>好奇心</strong></li></ul>",
             ["dev-env", "vs-code", "fullstack"]),
            (2, 1, "模块 2.1：认识你的电脑", "module-2-1",
             '你当然会用电脑，但\u201c会用软件\u201d和\u201c会在电脑里工作\u201d，不是一回事。',
             "<h2>文件系统</h2><p>你每天都在用电脑，但你真的了解文件是怎么组织的吗？</p>",
             ["filesystem", "terminal"]),
            (2, 2, "模块 2.2：终端与Linux直觉", "module-2-2",
             "终端本质上只是另一种和电脑交互的方式。",
             "<h2>什么是终端？</h2><p>终端是一个让你通过文字命令与电脑交互的工具。</p>",
             ["linux", "terminal", "cli"]),
            (2, 3, "模块 2.3：互联网是怎么工作的", "module-2-3",
             "网页不是凭空出现的。浏览器里看到的东西，总得先来自某个地方。",
             "<h2>当你输入一个网址后发生了什么？</h2><p>DNS 解析 → 找到服务器 → 返回网页内容 → 浏览器渲染。</p>",
             ["internet", "http", "dns", "server"]),
        ]
        for mod_num, les_num, title, slug, desc, content, t_slugs in lessons_data:
            lesson = Lesson(
                title=title, slug=slug,
                module_number=mod_num, lesson_number=les_num,
                description=desc, content=content,
                author="Li Bo", is_published=True,
                sort_order=(mod_num - 1) * 10 + les_num,
                course_id=course_fullstack.id,
                category_id=cat_map["zero-to-fullstack"].id,
                tags=[tag_map[s] for s in t_slugs if s in tag_map],
            )
            db.add(lesson)

        # ===== 博客文章 =====
        posts_data = [
            ("效率和用心", "efficiency-and-care", "thinking",
             '最近见到很多人或者组织，打着\u201c降本增效\u201d的幌子在摆烂，我觉得值得警惕。',
             "<h2>降本增效的误区</h2><p>效率是手段，用心是目的。没有用心的效率，只是更快地制造问题。</p>",
             ["efficiency", "thinking"]),
            ("如何做好一门技术课程", "how-to-design-a-good-tech-course", "course-design",
             '很多人以为，技术课程做得好，核心在\u201c老师懂得多\u201d。我以前也这么想。',
             "<h2>懂得多不等于教得好</h2><p>一门好的技术课程应该做到：明确目标、循序渐进、实践驱动、及时反馈。</p>",
             ["course-design", "teaching"]),
            ("AI 时代，学习编程的意义变了", "why-learn-programming-in-ai-era", "thinking",
             '当 AI 可以在几秒内生成代码，我们为什么还要学编程？答案可能和你想的不一样。',
             "<h2>编程的本质变了</h2><p>过去，编程的核心价值在于「写代码」——把想法翻译成机器能理解的语言。但在 AI 时代，这个过程被极大地加速了。</p><p>然而，<strong>理解代码</strong>的能力并没有被取代。你需要知道一个系统是如何工作的、数据是如何流动的、问题出在哪里。这些能力，AI 暂时还不能替你完成。</p><h2>新的学习范式</h2><p>在 AI 时代，学习编程的目标不再是「会写代码」，而是：</p><ul><li><strong>理解系统</strong> — 知道各个部分如何协作</li><li><strong>提出正确的问题</strong> — 能用清晰的语言描述需求</li><li><strong>验证结果</strong> — 能判断 AI 生成的代码是否正确</li><li><strong>管理复杂度</strong> — 在项目变大时保持清晰的思路</li></ul><blockquote>从「写代码的人」变成「理解和管理代码的人」——这是 AI 时代学习编程的核心转变。</blockquote>",
             ["ai-era", "thinking"]),
            ("2025年大模型最新动态：技术突破与产业变革", "llm-dynamics-2025", "ai-tools",
             '2025年7-8月，全球AI领域迎来密集进展。从谷歌Gemini问鼎数学奥赛到OpenAI开源gpt-oss系列，从欧盟AI法案生效到中国人工智能+行动意见出台，大模型正从技术研发加速迈向产业深水区。',
             '<h2>技术突破：多模态与推理能力再创新高</h2><p>2025年7-8月，全球人工智能领域在技术突破、产业落地、政策治理等方面迎来密集进展。</p><h3>谷歌Gemini问鼎国际数学奥赛</h3><p>7月21日，谷歌DeepMind宣布其高级版Gemini模型在"深度思考"模式下，成功解答2025年国际数学奥林匹克竞赛6道题目中的5道，以35分（满分42分）的成绩达到金牌水平，成为首个获官方认证的AI系统。</p><h3>阿里云Qwen-MT实现92种语言互译</h3><p>阿里云通义千问开源模型团队发布机器翻译大语言模型Qwen-MT最新升级版本，支持92种语言互译。截至7月，通义千问全球衍生模型已突破9万个，API调用量三天内突破1000亿Tokens。</p><h3>OpenAI推出开放权重模型gpt-oss系列</h3><p>8月5日，OpenAI宣布完成80亿美元融资，估值升至3000亿美元。同日发布首款开放权重语言模型gpt-oss系列（gpt-oss-120b和gpt-oss-20b），以Apache 2.0授权开源，推理性能接近闭源模型o4-mini。</p><h2>政策与治理：全球框架加速落地</h2><h3>欧盟《人工智能法案》正式生效</h3><p>8月2日，欧盟《人工智能法案》正式生效，谷歌成为第三家签署欧盟《通用人工智能实践准则》的主流AI开发商。</p><h3>中国国务院通过"人工智能+"行动意见</h3><p>7月31日，国务院常务会议审议通过《关于深入实施"人工智能+"行动的意见》，明确三大方向：AI基础设施建设、基础模型与原生应用、现有业务AI转型。</p><blockquote>2025年，AI领域呈现"技术跃迁-资本涌入-政策规范"三重共振，如何在创新速度与安全可控间找到平衡，将是全球AI竞争的关键。</blockquote>',
             ["ai-era", "thinking"]),
        ]
        for title, slug, cat_slug, excerpt, content, t_slugs in posts_data:
            post = Post(
                title=title, slug=slug, excerpt=excerpt, content=content,
                author="Li Bo", is_published=True,
                category_id=cat_map[cat_slug].id,
                tags=[tag_map[s] for s in t_slugs if s in tag_map],
            )
            db.add(post)

        db.commit()
        print("✅ Seed data inserted successfully")
    finally:
        db.close()
