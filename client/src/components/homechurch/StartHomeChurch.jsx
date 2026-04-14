import styles from "./StartHomeChurch.module.css";
import Container from "../Container/Container";
import Section from "../Section/Section";

const StartHomeChurch = () => {
  return (
    <>
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
                <span>4:30PM – 6:00PM</span>
                <span>6:00PM – 7:30PM</span>
                <span>5:00PM – 6:30PM</span>
                <span>8:30PM – 9:30PM</span>
                <span>5:30PM – 7:00PM</span>
                <span>9:00PM – 10:00PM</span>
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
                href="https://t.me/yourTelegramGroup"
                target="_blank"
                rel="noopener noreferrer"
              >
                Join
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default StartHomeChurch;
