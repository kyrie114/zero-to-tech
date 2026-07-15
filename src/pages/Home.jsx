import Hero from '../components/Hero';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/index.js';

export default function Home() {
  return (
    <div className="page active">
      <Hero />
      
      {/* Projects Preview */}
      <section className="section">
        <div className="container">
          <div className="fade-in">
            <p className="section-label">项目展示</p>
            <h2 className="section-title">把想法变成产品</h2>
            <p className="section-desc">以下是我在学习和实践过程中完成的一些项目，它们涵盖了从前端到后端、从传统开发到 AI 应用的不同领域。</p>
          </div>
          <div className="projects-grid">
            {projects.map((item) => (
              <ProjectCard key={item.title} project={item} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
