import { useEffect, useState } from "react";
import { getBlogs } from "../api/blogs";
import BlogCard from "../components/BlogCard";

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadBlogs() {
      try {
        const data = await getBlogs();
        setBlogs(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load blogs.");
      } finally {
        setLoading(false);
      }
    }

    loadBlogs();
  }, []);

  return (
    <section className="blogs-section">
      <div className="blogs-container">

        <div className="section-heading">
          <p className="section-eyebrow">
            Latest Posts
          </p>

          <h1>Blogs</h1>

          <p className="blogs-heading-text">
            Thoughts, projects, and lessons from my
            development journey.
          </p>
        </div>

        {loading && (
          <p className="blogs-status">
            Loading blogs...
          </p>
        )}

        {error && (
          <p className="blogs-status">
            {error}
          </p>
        )}

        {!loading && !error && (
          <div className="blogs-grid">
            {blogs.map((blog) => (
              <BlogCard
                key={blog.id}
                blog={blog}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

export default Blogs;