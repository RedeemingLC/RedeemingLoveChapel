import styles from "./WhatWeBelieve.module.css";
import Container from "../Container/Container";

const WhatWeBelieve = () => {
  return (
    <section className={styles.believeSection}>
      <Container>
        <div className={`grid grid-layout-2-col ${styles.believeGrid}`}>
          <h2 className="gradientText gl2c-1">What We Believe</h2>

          <div className={`grid gl2c-2 ${styles.believeContent}`}>
            <p>
              We believe in Jesus Christ, the Son of God, who was crucified,
              died, and rose again for our salvation (1 Corinthians 15:3, 4).
              Through Him, we are transformed, and Christ is being formed in us
              (Galatians 4:19).
            </p>

            <p>
              We believe that everybody is somebody, and Jesus Christ alone is
              Lord.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default WhatWeBelieve;
