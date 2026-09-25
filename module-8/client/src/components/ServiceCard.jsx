function ServiceCard({ icon, title, description }) {
  return (
    <article className="service-card">
      <div className="service-icon">
        {icon}
      </div>

      <h3 className="service-title">
        {title}
      </h3>

      <p className="service-description">
        {description}
      </p>
    </article>
  );
}

export default ServiceCard;