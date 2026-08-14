import Section from "../../components/Section/Section";
import Container from "../../components/Container/Container";
import { Link } from "react-router-dom";

import styles from "./ComingSoon.module.css";

const ComingSoon = () => {
  return (
    <Section>
      <Container>
        <div className={styles.wrapper}>
          <h1 className="gradientText">Study Plans are Coming Soon</h1>

          <p className={styles.description}>
            We are currently improving this section to provide a better study
            experience. Please check back soon.
          </p>

          <Link to="/" className={styles.button}>
            Return Home
          </Link>
        </div>
      </Container>
    </Section>
  );
};

export default ComingSoon;
