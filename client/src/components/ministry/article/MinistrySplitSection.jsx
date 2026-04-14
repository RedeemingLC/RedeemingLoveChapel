import styles from "./MinistrySplitSection.module.css";
import Container from "../../Container/Container";
import Section from "../../Section/Section";

const MinistrySplitSection = ({
  title,
  image,
  imageAlt,
  imagePosition = "left",
  children,
}) => {
  return (
    <>
      <Section>
        <Container>
          <div
            className={`${styles.grid} ${
              imagePosition === "right" ? styles.reverse : ""
            }`}
          >
            {/* Left Column (Title + Image) */}
            <div className={styles.mediaColumn}>
              {title && <h2 className="gradientText">{title}</h2>}

              <img src={image} alt={imageAlt} className={styles.image} />
            </div>

            {/* Right Column (Text Content) */}
            <div className={styles.contentColumn}>{children}</div>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default MinistrySplitSection;
