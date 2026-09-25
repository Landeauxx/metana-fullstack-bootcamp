import { Link } from "react-router-dom";

import {
  FaInstagram,
  FaLinkedinIn,
  FaDribbble,
  FaBehance,
  FaEnvelope,
  FaPhoneAlt
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">

        <Link to="/" className="footer-logo">
          LP
        </Link>

        <nav className="footer-nav">
          <Link to="/">Home</Link>
          <Link to="/about">About Me</Link>
          <Link to="/projects">Portfolio</Link>
          <Link to="/blogs">Blogs</Link>
          <Link to="/contact">Contact Me</Link>
        </nav>

        <div className="footer-socials">
          <a
            href="#instagram"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>

          <a
            href="#linkedin"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </a>

          <a
            href="#dribbble"
            aria-label="Dribbble"
          >
            <FaDribbble />
          </a>

          <a
            href="#behance"
            aria-label="Behance"
          >
            <FaBehance />
          </a>
        </div>

        <div className="footer-contact">
          <a href="mailto:Landonpratt7043@gmail.com">
            <FaEnvelope />
            <span>Landonpratt7043@gmail.com</span>
          </a>

          <a href="tel:8327144372">
            <FaPhoneAlt />
            <span>832-714-4372</span>
          </a>
        </div>

        <div className="footer-bottom">
          <p>
            Designed by Landon Pratt · Full-Stack Developer
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;