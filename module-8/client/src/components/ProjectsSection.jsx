import { useState } from "react";
import ProjectCard from "./ProjectCard";

const projects = [
  {
    title: "Mood To-Do App",
    category: "Frontend",
    description:
      "A task management application with task editing, completion tracking, local storage, and weather integration.",
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "Node.js"
    ],
    link: ""
  },

  {
    title: "Portfolio Website",
    category: "Design",
    description:
      "A responsive personal portfolio designed in Figma and developed into a modern frontend experience.",
    technologies: [
      "Figma",
      "HTML",
      "Tailwind CSS",
      "JavaScript"
    ],
    link: ""
  },

  {
    title: "Full-Stack Portfolio",
    category: "Full-Stack",
    description:
      "A React application connected to an Express API and PostgreSQL database with dynamic blog content.",
    technologies: [
      "React",
      "Express",
      "PostgreSQL",
      "Axios"
    ],
    link: ""
  }
];

const filters = [
  "All",
  "Frontend",
  "Design",
  "Full-Stack"
];

function ProjectsSection() {
  const [activeFilter, setActiveFilter] =
    useState("All");

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter(
          (project) =>
            project.category === activeFilter
        );

  return (
    <section className="projects-section">
      <div className="projects-container">

        <div className="section-heading">
          <p className="section-eyebrow">
            My Work
          </p>

          <h2>Portfolio</h2>

          <p className="projects-heading-text">
            A selection of projects demonstrating
            frontend, backend, and full-stack development.
          </p>
        </div>

        <div className="project-filters">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              className={
                activeFilter === filter
                  ? "project-filter active"
                  : "project-filter"
              }
              onClick={() =>
                setActiveFilter(filter)
              }
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.title}
              {...project}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default ProjectsSection;