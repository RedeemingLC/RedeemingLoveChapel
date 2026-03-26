import { NavLink } from "react-router-dom";
import styles from "./AboutPreview.module.css";
import AboutBanner from "../../assets/images/About-Us-Banner.jpg";
import { MdArrowForward } from "react-icons/md";
import Container from "../Container/Container";

const AboutPreview = () => {
  return (
    <section className={styles.aboutSection}>
      <Container>
        <h2 id="about" className="fs-700 text-grad center">
          About Redeeming Love Chapel
        </h2>

        {/* Image */}
        <div className={styles.imageWrapper}>
          <figure>
            <img
              src={AboutBanner}
              alt="About Us Banner"
              className={styles.aboutImage}
            />
            <figcaption className="sr-only">
              Picture of Redeeming Love Chapel Members Worshipping
            </figcaption>
          </figure>
        </div>

        {/* Two Column Text */}
        <div className={styles.textGrid}>
          <p className="fs-400">
            Colours, contrast, direction, and shape are the fundamental
            characteristics of light, and they serve as universal values for
            anyone drawn to beauty, order, and balance. Similarly, God's word
            illuminates our perception of the world and guides our actions at
            Redeeming Love Chapel. Therefore, our focus is on the teachings of
            Jesus Christ, and our message emphasizes the doctrine of His gospel.
          </p>

          <div className={styles.rightColumn}>
            <p className="fs-400">
              Redeeming Love Chapel is a community of believers who worship God
              sincerely and truthfully. We dedicate our lives to spreading the
              message of Jesus Christ across the globe by radiating the
              brilliance of His glorious gospel through us.
            </p>

            <NavLink to="/about" className={styles.primaryBtn}>
              Learn More <MdArrowForward />
            </NavLink>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AboutPreview;
