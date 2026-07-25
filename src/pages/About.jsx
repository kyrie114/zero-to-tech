import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="page">
      <section className="section-sm" style={{ paddingTop: 'calc(var(--nav-height) + 24px)' }}>
        <div className="container">
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <div style={{
              textAlign: 'center',
              background: 'linear-gradient(to bottom, var(--bg-secondary), var(--bg-primary))',
              borderRadius: 'var(--radius-xl)',
              padding: '56px 32px',
              marginBottom: '40px'
            }}>
              <h1>关于</h1>
              <div className="about-breadcrumb">
                <Link to="/">Home</Link>
                <span>/</span>
                <span style={{ color: 'var(--accent)' }}>关于</span>
              </div>
            </div>

            <div style={{
              width: '100%',
              height: '300px',
              background: 'linear-gradient(135deg, var(--accent-light), var(--bg-secondary))',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '5rem',
              marginBottom: '40px'
            }}>
              👋
            </div>

            <div className="about-article">
              <h2>关于这个站点</h2>
              <p>这个站点服务于一类很明确的学习者:</p>
              <ul>
                <li>0 基础但想认真理解技术的人</li>
                <li>希望在 AI 时代建立工程直觉的人</li>
                <li>不想只停留在"会用工具"，而是想做出可运行产品的人</li>
              </ul>
              <p>我们的核心判断是:</p>
              <blockquote>
                学习成本降低，但理解深度不减。
              </blockquote>
              <p>
                AI 可以生成代码，但产品仍然需要被理解、组织、运行和维护。
                所以课程关注的不是"和 AI 比谁写得快"，而是帮助学习者建立从想法到产品的完整路径感。
              </p>

              <h3>课程理念</h3>
              <p>我们的教学思路围绕三条主线推进:</p>
              <ul>
                <li>在"做"中理解，触摸知识</li>
                <li>克制而完整的路线和脉络</li>
                <li>不写代码，管理它</li>
              </ul>
              <p>
                我们关心的不是"写了多少代码"，而是你是否建立了对系统的理解，是否能把一个想法稳定地做成产品。
              </p>

              <h3>你在这里会得到什么</h3>
              <ul>
                <li>对前端、后端、部署和运行环境的整体认识</li>
                <li>把 AI 产出接入真实项目的能力</li>
                <li>面对问题时的分层排查思路</li>
                <li>可以持续迭代的工程习惯</li>
              </ul>

              <h3>我们如何组织内容</h3>
              <p>我们把内容分成两个模块:</p>
              <ol style={{ listStyle: 'decimal', paddingLeft: '24px' }}>
                <li>课程模块</li>
                <li>博客模块</li>
              </ol>
              <p>
                课程模块是按章节稳步推进的学习路径。
                每一个课程系列都会有自己的独立板块。当前我们先从「零到全栈」这个系列开始。
              </p>
              <p>
                博客模块会更自由和灵活。
                它用于补充课程之外的思考、案例、实践复盘和阶段性说明，方便学习者从不同角度建立理解。
              </p>
              <p>
                这个网站是课程体系的一部分，重点承载文字说明、结构化笔记、代码与资源索引，帮助你把内容真正转化为可复用的学习资产。
              </p>
              <p>如果你愿意，也欢迎从博客首页开始，先看第一篇文章：</p>
              <p>
                <Link to="/blog/1" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
                  效率和用心
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
