import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Container from "../Container/Container";

import rlclogo from "../../assets/images/rlc-logo_200x51.png";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, loading, logout } = useAuth();

  const scrollToSection = (id) => {
    navigate(`/#${id}`);
    setMenuOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  // Prevent background scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.inner}>
          {/* Logo */}
          <a
            href="/"
            onClick={(event) => {
              event.preventDefault();
              navigate("/");
              setMenuOpen(false);
            }}
            aria-label="Redeeming Love Chapel home"
          >
            <img
              src={rlclogo}
              className={styles.logo}
              alt="Redeeming Love Chapel logo"
            />
          </a>

          {/* Hamburger */}
          <button
            type="button"
            className={`${styles.hamburger} ${menuOpen ? styles.active : ""}`}
            onClick={() => setMenuOpen((current) => !current)}
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>

          {/* Navigation Links */}
          <ul className={`${styles.navLinks} ${menuOpen ? styles.show : ""}`}>
            <li>
              <button onClick={() => navigate("/")}>Home</button>
            </li>

            <li>
              <button onClick={() => scrollToSection("resources")}>
                Resources
              </button>
            </li>

            <li>
              <button onClick={() => navigate("/about")}>About</button>
            </li>

            <li>
              <button onClick={() => navigate("/worship-centers")}>
                Our Worship Centers
              </button>
            </li>

            {/* {!loading && user && (
              <li>
                <button onClick={() => navigate("/my-studies")}>
                  My Studies
                </button>
              </li>
            )} */}

            {!loading && user?.role === "admin" && (
              <li>
                <button
                  onClick={() =>
                    window.open("/admin", "_blank", "noopener,noreferrer")
                  }
                >
                  Dashboard
                </button>
              </li>
            )}
          </ul>

          {/* Auth Section */}
          <div
            className={`${styles.authSection} ${menuOpen ? styles.show : ""}`}
          >
            {!loading &&
              (user ? (
                <button onClick={handleLogout} className={styles.logout}>
                  Logout
                </button>
              ) : (
                <>
                  <button onClick={() => navigate("/login")}>Login</button>

                  <button
                    onClick={() => navigate("/register")}
                    className="bttn bttn--primary"
                  >
                    Register
                  </button>
                </>
              ))}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
