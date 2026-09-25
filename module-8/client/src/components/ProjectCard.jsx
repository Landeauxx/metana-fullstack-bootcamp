function ProjectCard({
  title,
  category,
  description,
  technologies,
  link
}) {
  return (
    <article className="project-card">

      <div className="project-image-placeholder">
        <span>{title}</span>
      </div>

      <div className="project-card-content">

        <div className="project-card-heading">
          <h3>{title}</h3>

          <span className="project-category">
            {category}
          </span>
        </div>

        <p className="project-description">
          {description}
        </p>

        <div className="project-technologies">
          {technologies.map((technology) => (
            <span key={technology}>
              {technology}
            </span>
          ))}
        </div>

        {link && (
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="project-link"
          >
            View Project
          </a>
        )}

      </div>

    </article>
  );
}

export default ProjectCard;