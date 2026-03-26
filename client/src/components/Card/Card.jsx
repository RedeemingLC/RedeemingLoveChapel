import classes from "./Card.module.css";

const Card = ({ children, hover = true }) => {
  return (
    <div className={`${classes.card} ${hover ? classes.hover : ""}`}>
      {children}
    </div>
  );
};

export default Card;
