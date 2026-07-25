import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import CourseCard from '../components/CourseCard';
import FeatureBlock from '../components/FeatureBlock';
import { coursesApi } from '../api';
import { features } from '../data/index.js';

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
      <Hero />

      <section className="courses-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '0' }}>
            <p className="courses-eyebrow">课程系列</p>
            <h2 className="courses-subtitle">若你也是0基础，那你可能来对了</h2>
          </div>
          <div className="courses-grid">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      <section className="features-intro">
        <div className="container" style={{ textAlign: 'center' }}>
          <p className="courses-eyebrow">课程理念</p>
          <h2 className="courses-subtitle">学习成本降低，但理解深度不减</h2>
        </div>
      </section>

      <section style={{ padding: '48px 0 80px' }}>
        <div className="container">
          {features.map((feature, idx) => (
            <FeatureBlock key={idx} feature={feature} reverse={idx % 2 !== 0} />
          ))}
        </div>
      </section>

      <section style={{ padding: '0 0 112px' }}>
        <div className="container">
          <div className="cta-section">
            <div className="cta-content">
              <div className="cta-image">
                <div style={{
                  width: '100%',
                  height: '200px',
                  background: 'linear-gradient(135deg, var(--accent-light), var(--bg-card))',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '3.5rem'
                }}>
                  📺
                </div>
              </div>
              <div className="cta-text">
                <h2>在 GitHub 找到我</h2>
                <p>课程代码与资源全部开源在 GitHub，每节课都有配套的文字版课件和示例代码。</p>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  前往 GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
