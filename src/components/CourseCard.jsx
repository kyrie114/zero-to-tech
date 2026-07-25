import { Link } from 'react-router-dom';

export default function CourseCard({ course }) {
  return (
    <div className="course-card">
      <span className={`course-badge course-badge--${course.badge}`}>
        {course.badgeText}
      </span>
      <h3 className="course-card__title">{course.title}</h3>
      <p className="course-card__desc">{course.desc}</p>
      <div className="course-card__tech">
        {course.tech.map((t, idx) => (
          <span key={idx} className="tech-tag">{t}</span>
        ))}
      </div>
      <div className="course-card__footer">
        {course.primary ? (
          <Link to={course.link} className="btn btn-primary btn-sm">
            进入课程
          </Link>
        ) : (
          <button className="btn btn-outline btn-sm" disabled style={{ opacity: 0.6, cursor: 'not-allowed' }}>
            加入等待
          </button>
        )}
      </div>
    </div>
  );
}
