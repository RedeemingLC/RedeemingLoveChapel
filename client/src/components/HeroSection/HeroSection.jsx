import styles from "./HeroSection.module.css";
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleScroll = () => {
    navigate("/#resources");
  };

  return (
    <article className={styles.heroGrid}>
      {/* LEFT */}
      <div>
        <h1 className={`gradientText ${styles.heading}`}>
          Beaming the light of the gospel revealed in us
        </h1>
      </div>

      {/* RIGHT */}
      <div className={styles.right}>
        <p className={styles.text}>
          In a world that is dark and morally depraved, we all long for a life
          that is prosperous and fulfilled. Fortunately, the solution that meets
          this need is the light of the glorious gospel of Jesus Christ. This
          powerful message holds the key to salvation for everyone who believes.
        </p>

        <button
          onClick={handleScroll}
          className={styles.button}
          aria-label="Scroll to resources section"
        >
          <MdKeyboardArrowDown />
        </button>
      </div>
    </article>
  );
};

export default HeroSection;
