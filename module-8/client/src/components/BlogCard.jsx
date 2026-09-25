import { Link } from "react-router-dom";

function BlogCard({ blog }) {
  const excerpt =
    blog.body?.length > 160
      ? `${blog.body.slice(0, 160)}...`
      : blog.body;

  return (
    <article className="blog-card">
      <div className="blog-card-content">

        <p className="blog-author">
          By {blog.author?.name || "Unknown Author"}
        </p>

        <h2 className="blog-card-title">
          {blog.title}
        </h2>

        <p className="blog-excerpt">
          {excerpt}
        </p>

        <Link
          to={`/blogs/${blog.id}`}
          className="blog-read-more"
        >
          Read More
        </Link>

      </div>
    </article>
  );
}

export default BlogCard;