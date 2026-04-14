import styles from "./Card.module.css";

const Card = ({ children, className = "", variant, hover }) => {
  const variantClass = variant === "compact" ? styles.compact : "";
  const hoverClass = hover ? styles.hover : "";

  return (
    <div
      className={`${styles.card} ${variantClass} ${hoverClass} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
