import styles from "./PastorCard.module.css";

function PastorCard({ name, title, image, link }) {
  return (
    <article className={styles.card}>
      <figure className={styles.image}>
        <img src={image} alt={name} />
      </figure>

      <div className={styles.content}>
        <h3>{name}</h3>
        <p className={styles.title}>{title}</p>

        <a href={link} className="bttn bttn--primary">
          Read More
        </a>
      </div>
    </article>
  );
}

export default PastorCard;
