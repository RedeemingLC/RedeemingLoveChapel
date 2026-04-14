import styles from "./OurPastorsSection.module.css";
import PastorCard from "../../PastorCard/PastorCard";

import Cyril from "../../../assets/images/pastors-pix/cy.jpg";
import Duke from "../../../assets/images/pastors-pix/do.jpg";
import Tayo from "../../../assets/images/pastors-pix/tb.jpg";
import Omo from "../../../assets/images/pastors-pix/oi.jpg";
import Martins from "../../../assets/images/pastors-pix/mi.jpg";

function OurPastorsSection() {
  return (
     <div className={styles.ourPastors}>
        <h2 className="center gradientText">Our Pastors</h2>

        <div className={styles.pastorsGrid}>
          <PastorCard
            name={"Pastor Cyril Yerifor"}
            title={"Senior Pastor"}
            image={Cyril}
          />
          <PastorCard
            name={"Pastor Duke Okosun"}
            title={"Pastor Ijanikin Worship Center"}
            image={Duke}
          />
          <PastorCard
            name={"Pastor Tayo Bamgbose"}
            title={"Pastor Lekki Worship Center"}
            image={Tayo}
          />
          <PastorCard
            name={"Pastor Omo Gbinigie"}
            title={"Pastor Satellite Town Worship Center"}
            image={Omo}
          />
          <PastorCard
            name={"Pastor Martins Idudhe"}
            title={"Pastor Lekki Worship Center"}
            image={Martins}
          />
        </div>
      </div>
  );
}

export default OurPastorsSection;
