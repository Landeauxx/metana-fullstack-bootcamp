const skills = [
  {
    name: "HTML / CSS",
    level: 95
  },
  {
    name: "JavaScript",
    level: 90
  },
  {
    name: "React",
    level: 85
  },
  {
    name: "Node.js",
    level: 80
  },
  {
    name: "PostgreSQL",
    level: 80
  }
];

function AboutSection() {
  return (
    <section className="about-section">
      <div className="about-container">

        <div className="section-heading">
          <p className="section-eyebrow">
            Get To Know Me
          </p>

          <h2>About Me</h2>

          <p className="about-heading-text">
            Full-stack development, responsive design,
            and user-focused web experiences.
          </p>
        </div>

        <div className="about-content">

          <div className="about-copy">
            <p>
              I&apos;m a full-stack developer focused on
              building modern web applications from the
              interface through the backend.
            </p>

            <p>
              I enjoy turning designs into responsive React
              interfaces, building APIs with Node.js and
              Express, and connecting applications to
              databases such as PostgreSQL.
            </p>

            <p>
              My goal is to create applications that are
              functional, easy to use, and thoughtfully
              designed from the user experience down to the
              underlying data.
            </p>

            <a
              href="/resume.pdf"
              className="about-resume-button"
              download
            >
              Download Resume
            </a>
          </div>

          <div className="about-image-wrapper">
            <div className="about-image-frame">
              <img
                src="/assets/images/profile.png"
                alt="Landon Pratt"
                className="about-image"
              />
            </div>
          </div>

        </div>

        <div className="skills-grid">
          {skills.map((skill) => (
            <div
              className="skill-item"
              key={skill.name}
            >
              <div
                className="skill-ring"
                style={{
                  "--progress": `${skill.level * 3.6}deg`
                }}
              >
                <div className="skill-ring-center">
                  <span>{skill.level}%</span>
                </div>
              </div>

              <h3>{skill.name}</h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default AboutSection;