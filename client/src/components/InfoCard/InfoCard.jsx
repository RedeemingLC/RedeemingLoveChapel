import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import styles from "./InfoCard.module.css";

const InfoCard = ({ title, link, buttonText, variant }) => {
  const navigate = useNavigate();

  return (
    <div className={`${styles.card} ${styles[variant]}`}>
      <div className={styles.overlay}></div>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>

        <Button variant="outline-light" onClick={() => navigate(link)}>
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default InfoCard;