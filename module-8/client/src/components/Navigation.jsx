import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <nav className="main-nav">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/about"
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
      >
        About Me
      </NavLink>

      <NavLink
        to="/projects"
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
      >
        Portfolio
      </NavLink>

      <NavLink
        to="/blogs"
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
      >
        Blogs
      </NavLink>

      <NavLink
        to="/contact"
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
      >
        Contact Me
      </NavLink>
    </nav>
  );
}

export default Navigation;