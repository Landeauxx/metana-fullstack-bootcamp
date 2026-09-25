import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="not-found-section">
      <div className="not-found-container">

        <p className="not-found-code">
          404
        </p>

        <h1>Page Not Found</h1>

        <p className="not-found-text">
          The page you're looking for doesn't exist
          or may have been moved.
        </p>

        <Link
          to="/"
          className="not-found-button"
        >
          Back Home
        </Link>

      </div>
    </section>
  );
}

export default NotFound;