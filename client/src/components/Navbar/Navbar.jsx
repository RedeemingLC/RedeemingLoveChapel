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

  const userToken = localStorage.getItem("userToken");

  const scrollToSection = (id) => {
    navigate(`/#${id}`);
    setMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/");
    setMenuOpen(false);
  };

  // Prevent background scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
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
            onClick={() => {
              navigate("/");
              setMenuOpen(false);
            }}
          >
            <img src={rlclogo} className={styles.logo} alt="Redeeming Love Chapel logo" />
          </a>

          {/* Hamburger */}
          <div
            className={`${styles.hamburger} ${menuOpen ? styles.active : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
            <span />
          </div>

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

            {/* <li>
              <button onClick={() => navigate("/live")}>Live Stream</button>
            </li> */}

            {userToken ? (
              <>
                <li>
                  <button onClick={() => navigate("/my-studies")}>
                    My Studies
                  </button>
                </li>

                <li>
                  <button onClick={handleLogout} className={styles.logout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button onClick={() => navigate("/login")}>Login</button>
                </li>

                <li>
                  <button
                    onClick={() => navigate("/register")}
                    className={`bttn bttn--primary`}
                  >
                    Register
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
