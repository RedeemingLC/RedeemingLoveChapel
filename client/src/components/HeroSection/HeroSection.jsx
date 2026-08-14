import styles from "./HeroSection.module.css";
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleScroll = () => {
    if (window.location.pathname === "/") {
      document
        .getElementById("resources")
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/#resources");
    }
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
          In a world overwhelmed by darkness, confusion, and moral decay, the
          human heart still longs for true peace, purpose, and fulfillment. The
          good news is that God has not left humanity without hope. The glorious
          gospel of Jesus Christ shines as the answer—bringing light to the
          lost, hope to the broken, and salvation to everyone who believes.
          Discover the message that transforms lives and gives meaning beyond
          this world.
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
