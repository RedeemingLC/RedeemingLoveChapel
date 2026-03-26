import styles from "./HeroImageSection.module.css";
import HeroImage from "../../assets/images/hp-hero-1296x500.png";

const HeroImageSection = () => {
  return (
    <figure className={styles.heroFigure}>
      <img
        src={HeroImage}
        alt="Welcome picture of Redeeming Love Chapel's members"
        className={styles.heroImg}
      />
      <figcaption className="sr-only">
        Group picture of the Redeeming Love Chapel members
      </figcaption>
    </figure>
  );
};

export default HeroImageSection;
