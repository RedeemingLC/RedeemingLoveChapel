import styles from "./AboutEvangelism.module.css";
import Container from "../Container/Container";

const AboutEvangelism = () => {
  return (
    <section className={styles.aboutSection}>
      <Container>
        {/* WHO WE ARE */}
        <div className={styles.splitRow}>
          <article className={styles.textBlock}>
            <h2 className="fs-700 text-grad">Who We Are</h2>
            <p className="fs-400">
              We are the Redeeming Love Chapel Evangelism Ministry, a group of
              individuals who propagate the gospel to the unsaved. Our mission
              is to inspire and unite our members spiritually to spread the
              light of Jesus Christ through our words, deeds, character,
              lifestyle, business, and other areas of endeavour.
            </p>
          </article>

          <aside className={styles.imageBlock}>
            <img
              src="https://placehold.jp/600x400.png"
              alt="Members of the Evangelism group"
              className={styles.imageBorder}
            />
          </aside>
        </div>

        {/* OUR OBJECTIVE */}
        <div className={`${styles.splitRow} ${styles.reverseRow}`}>
          <aside className={styles.imageGrid}>
            <img src="https://placehold.jp/300x200.png" alt="" />
            <img src="https://placehold.jp/300x200.png" alt="" />
            <img src="https://placehold.jp/600x200.png" alt="" />
          </aside>

          <article className={styles.textBlock}>
            <h2 className="fs-700 text-grad">Our Objective</h2>
            <p className="fs-400">
              Our goal is to have the light of the Lord Jesus Christ shine
              through us so that unbelievers are drawn to it, inspired by it,
              and adapt to it by taking on the nature of the light in the world.
            </p>
          </article>
        </div>
      </Container>
    </section>
  );
};

export default AboutEvangelism;
