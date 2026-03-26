import styles from "./OurPastorsSection.module.css";
import PastorCard from "../../PastorCard/PastorCard";

import Cyril from "../../../assets/images/pastors-pix/cy.jpg";
import Duke from "../../../assets/images/pastors-pix/do.jpg";
import Tayo from "../../../assets/images/pastors-pix/tb.jpg";

function OurPastorsSection() {
  return (
    <section className={styles.ourPastors}>
      <div className="container">
        <h2 className="center fs-700 text-grad">Our Pastors</h2>

        <div className={styles.pastorsGrid}>
          <PastorCard
            name={"Pastor Cyril Yerifor"}
            title={"Senior Pastor"}
            image={Cyril}
            link={"#"}
          />
          <PastorCard
            name={"Pastor Duke Okosun"}
            title={"Pastor Ijanikin Worship Center"}
            image={Duke}
            link={"#"}
          />
          <PastorCard
            name={"Pastor Tayo Bamgbose"}
            title={"Pastor Lekki Worship Center"}
            image={Tayo}
            link={"#"}
          />
        </div>
      </div>
    </section>
  );
}

export default OurPastorsSection;
