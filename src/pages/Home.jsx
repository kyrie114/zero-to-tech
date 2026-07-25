import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { coursesApi } from '../api';

export default function Home() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    coursesApi.list().then(data => {
      setCourses(data.map(c => ({
        id: c.slug,
        title: c.title,
        badge: c.badge,
        badgeText: c.badge_text,
        desc: c.description,
        tech: c.tech_stack ? JSON.parse(c.tech_stack) : [],
        link: `/courses/${c.slug}`,
        primary: c.sort_order === 1,
      })));
    }).catch(() => {});
  }, []);

  return (
    <div className="page">
      {/* Hero Banner */}
      <section className="hero-section">
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 className="hero-title">从零开始，建立技术直觉</h1>
          <p className="hero-subtitle">
            传授 <span className="hero-keyword">在AI时代</span> 把想法做成产品的能力
          </p>
          <Link to="/courses" className="btn btn-primary btn-lg">开始学习</Link>
        </div>
      </section>

      {/* 课程系列 */}
      <section className="courses-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '0' }}>
            <p className="courses-eyebrow">课程系列</p>
            <h2 className="courses-subtitle">若你也是0基础，那你可能来对了</h2>
          </div>
          <div className="courses-grid">
            {courses.map((course) => (
              <div key={course.id} className="course-card">
                <span className={`course-badge course-badge--${course.badge}`}>
                  {course.badgeText}
                </span>
                <h3 className="course-card__title">{course.title}</h3>
                <p className="course-card__desc">{course.desc}</p>
                <div className="course-card__tech">
                  {course.tech.map(t => (
                    <span key={t} className="tech-tag">{t}</span>
                  ))}
                </div>
                <div className="course-card__footer">
                  <Link to={course.link} className={course.primary ? 'btn btn-primary' : 'btn btn-outline-primary'}>
                    {course.primary ? '进入课程' : '加入等待'}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 课程理念标题 */}
      <section className="features-intro">
        <div className="container" style={{ textAlign: 'center' }}>
          <p className="courses-eyebrow">课程理念</p>
          <h2 className="courses-subtitle">学习成本降低，但理解深度不减</h2>
        </div>
      </section>

      {/* 课程理念详情 */}
      <section className="features-section">
        <div className="container">
          {/* 特性 1 */}
          <div className="feature-block">
            <div className="feature-content">
              <h2 className="feature-title">在"做"中理解，触摸知识</h2>
              <p className="feature-desc">
                每一个技术概念的诞生，都源于人们要解决的某个具体问题。学习者会在课程中真实地面对、思考和解决这些问题，逐步理解和掌握技术概念和理论知识。
              </p>
              <ul className="feature-list">
                <li><strong>先触摸，再理解</strong> - 在动手做的过程中积累直觉，然后理解背后的原理</li>
                <li><strong>上手体验每个概念</strong> - 保持所有知识点可体验，可上手</li>
                <li><strong>感受比讲解更重要</strong> - 不仅知道"它怎么工作"，还需"让它工作"</li>
                <li><strong>理解会自然浮现</strong> - 反复实践，原理和规律会慢慢显现</li>
              </ul>
            </div>
          </div>

          {/* 特性 2 */}
          <div className="feature-block feature-block--reverse">
            <div className="feature-content">
              <h2 className="feature-title">克制而完整的路线和脉络</h2>
              <p className="feature-desc">
                面向 0 基础学习者设计的学习路径，课程中克制而完整地传递必要的技术概念。学习者可以在俯瞰整体技术脉络的体验下，清晰感受自己的进度和所处的位置。
              </p>
              <ul className="feature-list">
                <li><strong>明确且负责任的取舍</strong> - 有勇气说"现在不讲"，为学习者省去不必要的复杂度</li>
                <li><strong>设置步骤级核心目标</strong> - 每一步都会拿到对应的结果，进一寸有一寸的喜悦</li>
                <li><strong>关注"是什么"而非"怎么做"</strong> - 理解概念的本质，避免被实现细节淹没</li>
                <li><strong>完整的技术脉络</strong> - 每个环节都相连且呼应，让学习者看清整个流程如何运作</li>
              </ul>
            </div>
          </div>

          {/* 特性 3 */}
          <div className="feature-block">
            <div className="feature-content">
              <h2 className="feature-title">不写代码，管理它</h2>
              <p className="feature-desc">
                AI 已经改变了学习的前提。编码不再是最稀缺的能力，组织和管理代码才是。我们的课程假设：代码由 AI 生成，学习者的职责是理解其中的原理，并使用和运行这些代码。
              </p>
              <ul className="feature-list">
                <li><strong>从实现者转向管理者</strong> - 不要上手编程，而是做代码的组织者和管理者</li>
                <li><strong>理解优先于编写</strong> - 专注于技术的原理和决策，不花时间去记语法和细节</li>
                <li><strong>掌握概念与术语</strong> - 学会用清晰的需求来指导 AI，理解项目进展与处境</li>
                <li><strong>更快地到达目标</strong> - 不被编程的复杂性阻挡，直接理解和应用核心概念</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 区域 */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <div className="cta-text">
              <h2>在 GitHub 找到我</h2>
              <p>课程代码与资源全部开源在 GitHub，每节课都有配套的文字版课件和示例代码。</p>
              <a
                href="https://github.com/kyrie114"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                前往 GitHub 频道
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
