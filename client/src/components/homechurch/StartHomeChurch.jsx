import styles from "./StartHomeChurch.module.css";
import Container from "../Container/Container";
import Section from "../Section/Section";

const StartHomeChurch = () => {
  return (
    <Section variant="alt">
      <Container>
        <h2 className={`center gradientText ${styles.heading}`}>
          Start your Home Church
        </h2>

        <div className={styles.grid}>
          {/* Step 1 */}
          <div className={styles.stepBlock}>
            <h3 className="gradientText">Step 1</h3>

            <p>
              The head of the family should select a convenient time for Bible
              Study from the recommended options.
            </p>

            <div className={styles.timeGrid}>
              <span>4:30 PM – 6:00 PM</span>
              <span>6:00 PM – 7:30 PM</span>
              <span>5:00 PM – 6:30 PM</span>
              <span>8:30 PM – 9:30 PM</span>
              <span>5:30 PM – 7:00 PM</span>
              <span>9:00 PM – 10:00 PM</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className={styles.stepBlock}>
            <h3 className="gradientText">Step 2</h3>

            <p>
              Join our Home Church Telegram group and be part of our
              question-and-answer session.
            </p>

            <a
              href="https://t.me/+3Vp_z412vj8yNDE0"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Join the Home Church Telegram group"
            >
              Join Telegram Group
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default StartHomeChurch;
