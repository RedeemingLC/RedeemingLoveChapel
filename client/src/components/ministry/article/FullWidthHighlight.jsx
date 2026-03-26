import styles from "./FullWidthHighlight.module.css";

const FullWidthHighlight = ({ children }) => {
  return (
    <section className={styles.highlight}>
      <div className={styles.inner}>{children}</div>
    </section>
  );
};

export default FullWidthHighlight;
