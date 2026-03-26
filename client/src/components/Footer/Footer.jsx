import Container from "../../components/Container/Container";
import { IoLocationSharp } from "react-icons/io5";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { FaYoutube, FaInstagramSquare, FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import FooterLogo from "../../assets/images/rlc-logo-footer.png";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.widgets}>
          {/* Logo */}
          <div className={styles.logo}>
            <img src={FooterLogo} alt="Redeeming Love Chapel Logo" />
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={styles.heading}>Quick Links</h3>
            <ul className={styles.links}>
              <li>
                <NavLink to="/blog">Our Blog</NavLink>
              </li>
              <li>
                <NavLink to="/manuals">Bible Study Manual</NavLink>
              </li>
              <li>
                <NavLink to="/audio">Audio Sermons</NavLink>
              </li>
              <li>
                <NavLink to="/centers">Worship Centers</NavLink>
              </li>
              <li>
                <NavLink to="/my-studies">Daily Devotion Guide</NavLink>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className={styles.heading}>Get in Touch</h3>

            <div className={styles.contactItem}>
              <IoLocationSharp />
              <address>
                Site F Chima Bus stop off Alakija-Navy town road, Satellite
                town, Lagos, Nigeria.
              </address>
            </div>

            <div className={styles.contactItem}>
              <BsFillTelephoneFill />
              <a href="tel:+2348035773377">+234 803 577 3377</a>
            </div>

            <div className={styles.contactItem}>
              <MdEmail />
              <a href="mailto:info@redeeminglovechapel.org">
                info@redeeminglovechapel.org
              </a>
            </div>
          </div>

          {/* Socials */}
          <div>
            <h3 className={styles.heading}>Our Socials</h3>

            <div className={styles.socials}>
              <a
                href="https://www.youtube.com/@rlc-lagos"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube />
              </a>
              <a
                href="https://www.instagram.com/rlc_lagos/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagramSquare />
              </a>
              <a
                href="https://web.facebook.com/redeeminglovechapel"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook />
              </a>
              <a
                href="https://x.com/rlc_lagos"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaXTwitter />
              </a>
            </div>
          </div>
        </div>
      </Container>

      <div className={styles.copyright}>
        <Container>
          © {new Date().getFullYear()} Redeeming Love Chapel. All rights
          reserved.
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
