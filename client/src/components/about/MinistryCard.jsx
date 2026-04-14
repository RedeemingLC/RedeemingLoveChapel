import styles from "./OurMinistries.module.css";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import Button from "../Button/Button";

const MinistryCard = ({ title, link, image }) => {
  return (
    <div
      className={`gbl3c-card ${styles.ministryCard}`}
      style={{ backgroundImage: `url(${image})` }}
    >
      <article>
        <h3>{title}</h3>

        <Link to={link}>
          <Button className="btn btn-primary">
            <span>More Info</span>
            <FaArrowRight />
          </Button>
        </Link>
      </article>
    </div>
  );
};

export default MinistryCard;
