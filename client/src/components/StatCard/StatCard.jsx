import Card from "../Card/Card";
import styles from "./StatCard.module.css";

const StatCard = ({ title, value }) => {
  return (
    <Card className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.value}>{value}</p>
    </Card>
  );
};

export default StatCard;
