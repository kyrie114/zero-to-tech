export default function ProjectCard({ project }) {
  return (
    <a href={project.link} className={`project-card ${project.primary ? 'primary' : ''}`}>
      <div className="project-icon">{project.icon}</div>
      <h3>{project.title}</h3>
      <p>{project.desc}</p>
      <div className="project-tags">
        {project.tags.map((tag, idx) => (
          <span key={idx}>{tag}</span>
        ))}
      </div>
    </a>
  );
}
