import styles from "./AboutHero.module.css";
import aboutImageBanner from "../../assets/images/About-Us-Banner.jpg";

const AboutHero = () => {
  return (
    <div className={styles.aboutUsInner}>
      <h1 className="gradientText">We are a light to the nations</h1>

      <div className={styles.aboutUsImage}>
        <figure>
          <img
            src={aboutImageBanner}
            alt="About Us Banner"
            className={styles.aboutImage}
          />
          <figcaption className="sr-only">
            Picture of Redeeming Love Chapel Members Worshipping
          </figcaption>
        </figure>
      </div>
    </div>
  );
};

export default AboutHero;
