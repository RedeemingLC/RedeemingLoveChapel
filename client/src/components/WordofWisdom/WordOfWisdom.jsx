import Container from "../Container/Container";
import styles from "./WordOfWisdom.module.css";

const WordOfWisdom = () => {
  return (
    <section className={styles.wow}>
      <div className="container">
        <Container>
          <article className={styles.content}>
            <h2 className="fs-800">Word of Wisdom</h2>

            <p className="fs-400">
              Any spirituality that does not deal with the sin question in our
              lives is not good enough because what Jesus Christ came to do is
              to take away sins from our lives.
            </p>

            <small className="fs-400">- Pastor Cyril Yerifor</small>
          </article>
        </Container>
      </div>
    </section>
  );
};

export default WordOfWisdom;
