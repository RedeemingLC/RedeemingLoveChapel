import React from "react";


import styles from "./CommunityCard.module.css";

const CommunityCard = ({
  title,
  description,
  buttonText = "Join",
  onClick,
}) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>

      <button className="btnText" onClick={onClick}>
        {buttonText}
      </button>
    </div>
  );
};

export default CommunityCard;
