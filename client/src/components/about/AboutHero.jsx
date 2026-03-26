import styles from "./AboutHero.module.css";
import aboutImageBanner from "../../assets/images/About-Us-Banner.jpg";
import Container from "../Container/Container";

const AboutHero = () => {
  return (
    <section className={styles.aboutUs}>
      <Container className={styles.aboutUsInner}>
        <h1 className="fs-800 text-grad center">
          We are a light to the nations
        </h1>

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
      </Container>
    </section>
  );
};

export default AboutHero;
