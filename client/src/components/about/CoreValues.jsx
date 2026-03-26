import styles from "./CoreValues.module.css";
import Container from "../Container/Container";

const values = [
  "Honesty, Loyalty, and Integrity",
  "Commitment and Accountability",
  "Christlikeness and Compassion.",
  "Sincerity, Transparency, and Diligence.",
  "Dignity, Respect, and Truthfulness.",
  "Avoiding Strife and Quarrels (Genesis 13:6–12; Timothy 2:20–26).",
  "Long-suffering and Perseverance.",
  "The Word of God, our final authority on all matters.",
];

const CoreValues = () => {
  return (
    <section className={styles.coreValues}>
      <Container>
        <div className={styles.gridLayout}>
          <h2 className={`fs-700 text-grad ${styles.heading}`}>Our Culture and Values</h2>

          {values.map((text, index) => (
            <div key={index} className={styles.valueCard}>
              <span className={styles.number}>{index + 1}</span>
              <p className="fs-400">{text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default CoreValues;
