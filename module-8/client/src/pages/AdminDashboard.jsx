import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <section className="admin-section">
      <div className="admin-container">

        <div className="section-heading">
          <p className="section-eyebrow">
            Dashboard
          </p>

          <h1>Admin Dashboard</h1>

          <p className="admin-heading-text">
            Manage portfolio content and blog posts from one place.
          </p>
        </div>

        <div className="admin-grid">

          <article className="admin-card">
            <h2>Blog Posts</h2>

            <p>
              View and manage blog content stored in PostgreSQL.
            </p>

            <Link
              to="/blogs"
              className="admin-link"
            >
              View Blogs
            </Link>
          </article>

          <article className="admin-card">
            <h2>Projects</h2>

            <p>
              Review the projects currently displayed in your portfolio.
            </p>

            <Link
              to="/projects"
              className="admin-link"
            >
              View Projects
            </Link>
          </article>

          <article className="admin-card">
            <h2>Contact</h2>

            <p>
              Preview the contact experience visitors use to reach you.
            </p>

            <Link
              to="/contact"
              className="admin-link"
            >
              View Contact Page
            </Link>
          </article>

        </div>

      </div>
    </section>
  );
}

export default AdminDashboard;