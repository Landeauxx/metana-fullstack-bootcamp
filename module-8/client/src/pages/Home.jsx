import { Link } from "react-router-dom";
import ProjectsSection from "../components/ProjectsSection";
import {
  FaInstagram,
  FaLinkedinIn,
  FaDribbble,
  FaBehance,
  FaCode,
  FaServer,
  FaMobileAlt,
  FaDatabase,
  FaPaintBrush,
  FaLaptopCode
} from "react-icons/fa";

import ServiceCard from "../components/ServiceCard";
import AboutSection from "../components/AboutSection";
function Home() {
  const services = [
    {
      icon: <FaCode />,
      title: "Frontend Development",
      description:
        "Building responsive and interactive user interfaces with React, JavaScript, HTML, and CSS."
    },
    {
      icon: <FaServer />,
      title: "Backend Development",
      description:
        "Creating REST APIs and server-side applications using Node.js and Express."
    },
    {
      icon: <FaMobileAlt />,
      title: "Responsive Design",
      description:
        "Developing layouts that adapt smoothly across desktop, tablet, and mobile devices."
    },
    {
      icon: <FaDatabase />,
      title: "Database Integration",
      description:
        "Connecting applications to PostgreSQL and building reliable data-driven experiences."
    },
    {
      icon: <FaPaintBrush />,
      title: "UI/UX Implementation",
      description:
        "Turning Figma designs into functional interfaces while preserving the intended user experience."
    },
    {
      icon: <FaLaptopCode />,
      title: "Full-Stack Applications",
      description:
        "Connecting frontend interfaces, backend APIs, and databases into complete web applications."
    }
  ];

  return (
    <>
      <section className="hero">
        <div className="hero-container">
          <div className="hero-intro">
            <p className="hero-greeting">
              Hi I am
            </p>

            <h2 className="hero-name">
              Landon Pratt
            </h2>
          </div>

          <h1 className="hero-title">
            Full-Stack Developer
          </h1>

          <div className="hero-socials">
            <a
              href="#instagram"
              className="social-link"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>

            <a
              href="#linkedin"
              className="social-link"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>

            <a
              href="#dribbble"
              className="social-link"
              aria-label="Dribbble"
            >
              <FaDribbble />
            </a>

            <a
              href="#behance"
              className="social-link"
              aria-label="Behance"
            >
              <FaBehance />
            </a>
          </div>

          <div className="hero-actions">
            <Link
              to="/contact"
              className="hero-primary-button"
            >
              Hire Me
            </Link>

            <a
              href="/resume.pdf"
              className="hero-secondary-button"
              download
            >
              Download Resume
            </a>
          </div>
        </div>
      </section>

      <section className="services-section">
        <div className="services-container">
          <div className="section-heading">
            <p className="section-eyebrow">
              What I Do
            </p>

            <h2>
              My Services
            </h2>
          </div>

          <div className="services-grid">
            {services.map((service) => (
              <ServiceCard
                key={service.title}
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>
      </section>
      <AboutSection />
      <ProjectsSection />
    </>
  );
}

export default Home;