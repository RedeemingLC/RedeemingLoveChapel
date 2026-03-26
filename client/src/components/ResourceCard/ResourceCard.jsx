import { useNavigate } from "react-router-dom";
import { MdArrowForward } from "react-icons/md";
import styles from "./ResourceCard.module.css";

const ResourceCard = ({
  title,
  description,
  link,
  buttonText = "Explore",
  variant,
  className = "", // ✅ accept external className
}) => {
  const navigate = useNavigate();

  return (
    <div
      className={`
        ${styles.card}
        ${variant ? styles[variant] : ""}
        ${className}
      `}
    >
      <div>
        {variant === "intro" ? (
          <h2 className="fs-700 text-grad">{title}</h2>
        ) : (
          <h3 className="fs-600">{title}</h3>
        )}

        {description && <p className={styles.description}>{description}</p>}
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
