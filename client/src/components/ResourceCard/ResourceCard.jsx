import { useNavigate } from "react-router-dom";
import { MdArrowForward } from "react-icons/md";
import styles from "./ResourceCard.module.css";

import bibleImg from "../../assets/images/Bible-Manual-bg.jpg";
import devotionalImg from "../../assets/images/devotional-2.jpg";
import blogImg from "../../assets/images/Blog-bg.jpg";
import audioImg from "../../assets/images/audio-2.jpg";

const ResourceCard = ({
  title,
  description,
  caption,
  link,
  buttonText = "Explore",
  variant,
  className = "",
}) => {
  const navigate = useNavigate();

  const backgrounds = {
    bibleStudy: bibleImg,
    devotional: devotionalImg,
    blog: blogImg,
    audio: audioImg,
  };

  return (
    <div
      className={`${styles.card} ${styles[variant]} ${className}`}
      style={
        variant !== "intro"
          ? { backgroundImage: `url(${backgrounds[variant]})` }
          : {}
      }
    >
      <div>
        {variant === "intro" ? (
          <h2 className={styles.introTitle}>{title}</h2>
        ) : (
          <h3 className={styles.title}>{title}</h3>
        )}

        {description && <p className={styles.description}>{description}</p>}

        {caption && <p className={styles.caption}>{caption}</p>}
      </div>

      {link && (
        <button className={styles.outlineBtn} onClick={() => navigate(link)}>
          {buttonText}
          <MdArrowForward />
        </button>
      )}
    </div>
  );
};

export default ResourceCard;
