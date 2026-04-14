import styles from "./Section.module.css";

const Section = ({ children, variant = "default", className = "" }) => {
  return (
    <section className={`${styles.section} ${styles[variant]} ${className}`}>
      {children}
    </section>
  );
};

export default Section;
