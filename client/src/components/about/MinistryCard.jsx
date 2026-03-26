import styles from "./OurMinistries.module.css";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import Button from "../Button/Button";

const MinistryCard = ({ title, link, bgClass }) => {
  return (
    <div className={`gbl3c-card ${styles.ministryCard} ${bgClass}`}>
      <article>
        <h3 className="fs-600">{title}</h3>

        <Button>
          <Link to={link} className="bttn bttn--primary">
            <span>More Info</span>
            <FaArrowRight className="bttn-no-border__icon" />
          </Link>
        </Button>
      </article>
    </div>
  );
};

export default MinistryCard;
