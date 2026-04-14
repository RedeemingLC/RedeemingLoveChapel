import styles from "./PastorCard.module.css";

function PastorCard({ name, title, image}) {
  return (
    <article className={styles.card}>
      <figure className={styles.image}>
        <img src={image} alt={name} />
      </figure>

      <div className={styles.content}>
        <h3>{name}</h3>
        <p className={styles.title}>{title}</p>
      </div>
    </article>
  );
}

export default PastorCard;
