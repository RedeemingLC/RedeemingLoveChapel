import styles from "./OurMinistries.module.css";
import Container from "../Container/Container";
import MinistryCard from "./MinistryCard";

import evangelismImg from "../../assets/images/evangelism.jpg";
import homeChurchImg from "../../assets/images/home-church.jpg";
import lafImg from "../../assets/images/laf.jpg";

const ministries = [
  {
    title: "Evangelism",
    link: "/evangelism",
    image: evangelismImg,
  },
  {
    title: "Home Church",
    link: "/home-church",
    image: homeChurchImg,
  },
  {
    title: "LAF Outreach",
    link: "/lafoutreach",
    image: lafImg,
  },
];

const OurMinistries = () => {
  return (
    <section className={styles.ourMinistries}>
      <Container>
        <div className={styles.gridLayout}>
          <div className={`gbl3c-card ${styles.headerCard}`}>
            <h2 className="gradientText center">Our Ministries</h2>
          </div>

          {ministries.map((ministry, index) => (
            <MinistryCard
              key={index}
              title={ministry.title}
              link={ministry.link}
              image={ministry.image}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default OurMinistries;
