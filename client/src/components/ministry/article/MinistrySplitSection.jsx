import styles from "./MinistrySplitSection.module.css";
import Container from "../../Container/Container";

const MinistrySplitSection = ({
  title,
  image,
  imageAlt,
  imagePosition = "left",
  children,
}) => {
  return (
    <section className={styles.section}>
      <Container>
        <div
          className={`${styles.grid} ${
            imagePosition === "right" ? styles.reverse : ""
          }`}
        >
          {/* Left Column (Title + Image) */}
          <div className={styles.mediaColumn}>
            {title && (
              <h2 className="fs-800 text-grad">
                {title}
              </h2>
            )}

            <img
              src={image}
              alt={imageAlt}
              className={styles.image}
            />
          </div>

          {/* Right Column (Text Content) */}
          <div className={styles.contentColumn}>
            {children}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default MinistrySplitSection;