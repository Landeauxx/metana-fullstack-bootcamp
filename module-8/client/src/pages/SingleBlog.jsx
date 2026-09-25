import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getBlogById } from "../api/blogs";

function SingleBlog() {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadBlog() {
      try {
        const data = await getBlogById(id);
        setBlog(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load this blog.");
      } finally {
        setLoading(false);
      }
    }

    loadBlog();
  }, [id]);

  if (loading) {
    return (
      <p className="single-blog-status">
        Loading blog...
      </p>
    );
  }

  if (error) {
    return (
      <p className="single-blog-status">
        {error}
      </p>
    );
  }

  if (!blog) {
    return (
      <p className="single-blog-status">
        Blog not found.
      </p>
    );
  }

  return (
    <section className="single-blog-section">
      <div className="single-blog-container">

        <Link
          to="/blogs"
          className="single-blog-back"
        >
          ← Back to Blogs
        </Link>

        <article className="single-blog-article">

          <p className="single-blog-author">
            By {blog.author?.name || "Unknown Author"}
          </p>

          <h1 className="single-blog-title">
            {blog.title}
          </h1>

          <div className="single-blog-divider" />

          <p className="single-blog-body">
            {blog.body}
          </p>

        </article>

      </div>
    </section>
  );
}

export default SingleBlog;