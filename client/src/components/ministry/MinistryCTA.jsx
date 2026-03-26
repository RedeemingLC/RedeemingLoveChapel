import styles from "./MinistryCTA.module.css";
import Container from "../Container/Container";
import { FaPhoneAlt } from "react-icons/fa";

const MinistryCTA = () => {
  return (
    <section className={styles.ctaSection}>
      <Container>
        <div className={styles.ctaGrid}>

          {/* Column 1 — Icon */}
          <div className={styles.iconWrapper}>
            <FaPhoneAlt />
          </div>

          {/* Column 2 — Text */}
          <div className={styles.textBlock}>
            <p className="fs-400">
              If you are moved in your spirit to partner with us in caring
              for the poor and needy, you can give us a call
            </p>
          </div>

          {/* Column 3 — Numbers */}
          <div className={styles.phoneBlock}>
            <a href="tel:+2348096783456">+234 809 6783 456</a>
            <a href="tel:+2348035678345">+234 803 5678 345</a>
          </div>

        </div>
      </Container>
    </section>
  );
};

export default MinistryCTA;