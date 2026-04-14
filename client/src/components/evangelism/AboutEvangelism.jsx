import styles from "./AboutEvangelism.module.css";
import Section from "../../components/Section/Section";
import Container from "../Container/Container";

import evangelismGoal from "../../assets/images/Evangelism-our-goal.jpg";
import evangelismAbout from "../../assets/images/Evangelism-who-we-are.jpg";

const AboutEvangelism = () => {
  return (
    <>
      <Section>
        <div className={styles.aboutSection}>
          <Container>
            {/* WHO WE ARE */}
            <div className={styles.splitRow}>
              <article className={styles.textBlock}>
                <h2 className="gradientText">Who We Are</h2>
                <p>
                  As a spiritual family, we are committed to sharing the gospel
                  with the unsaved.
                </p>
                <p>
                  Our mission is to inspire and unite believers to spread the
                  light of Jesus Christ through our words, actions, character,
                  lifestyle, businesses, and every area of life.
                </p>
              </article>

              <aside className={styles.imageBlock}>
                <img
                  src={evangelismAbout}
                  alt="A diverse group of people standing in unity, each glowing with warm golden light that spreads into their surroundings, symbolizing spiritual influence across daily life, work, and community."
                  className={styles.imageBorder}
                />
              </aside>
            </div>

            {/* OUR OBJECTIVE */}
            <div className={`${styles.splitRow} ${styles.reverseRow}`}>
              <aside className={styles.imageGrid}>
                <img
                  src={evangelismGoal}
                  alt="A small group of people glowing with warm golden light, as others nearby gradually light up while being drawn closer, symbolizing the spread of influence and transformation."
                />
              </aside>

              <article className={styles.textBlock}>
                <h2 className="gradientText">Our Objective</h2>
                <p>
                  Our goal is to have the light of the Lord Jesus Christ shine
                  through us so that unbelievers are drawn to it, inspired by
                  it, and adopt it by taking on the nature of that light in the
                  world.
                </p>
              </article>
            </div>
          </Container>
        </div>
      </Section>
    </>
  );
};

export default AboutEvangelism;
