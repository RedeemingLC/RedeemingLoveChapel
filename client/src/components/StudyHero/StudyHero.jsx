import styles from "./StudyHero.module.css";

export default function StudyHero({
  title,
  description,
  image,
  primaryAction,
  secondaryAction,
}) {
  return (
    <div className={styles.hero}>
      {/* LEFT */}
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>

        {description && <p className={styles.description}>{description}</p>}

        <div className={styles.actions}>
          {primaryAction}
          {secondaryAction}
        </div>
      </div>

      {/* RIGHT */}
      {image && (
        <div className={styles.imageWrapper}>
          <img src={image} alt={title} />
        </div>
      )}
    </div>
  );
}
