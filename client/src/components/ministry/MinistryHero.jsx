import styles from "./MinistryHero.module.css";
import Container from "../Container/Container";

const MinistryHero = ({ label, title, description, image, alt }) => {
  return (
    <section className={styles.heroSection}>
      <Container>
        <div className={styles.heroContent}>
          {label && <span className={styles.label}>{label}</span>}

          <h1 className="gradientText center">{title}</h1>

          {description && (
            <p className={`fs-400 ${styles.description}`}>{description}</p>
          )}

          <figure className={styles.imageWrapper}>
            <img src={image} alt={alt} className={styles.heroImage} />
          </figure>
        </div>
      </Container>
    </section>
  );
};

export default MinistryHero;
