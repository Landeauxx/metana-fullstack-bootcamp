import { Link } from "react-router-dom";
import Navigation from "./Navigation";

function Header() {
  return (
    <header className="site-header">
      <div className="header-container">
        <Link to="/" className="logo">
          LP
        </Link>

        <Navigation />

        <Link to="/contact" className="hire-button">
          Hire Me
        </Link>
      </div>
    </header>
  );
}

export default Header;