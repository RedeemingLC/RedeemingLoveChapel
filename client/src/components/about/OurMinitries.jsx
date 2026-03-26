import styles from "./OurMinistries.module.css";
import Container from "../Container/Container";
import MinistryCard from "./MinistryCard";

const ministries = [
  {
    title: "Evangelism",
    link: "/evangelism",
    bgClass: styles.evangelism,
  },
  {
    title: "Home Church",
    link: "/home-church",
    bgClass: styles.homeChurch,
  },
  {
    title: "LAF Outreach",
    link: "/lafoutreach",
    bgClass: styles.lafOutreach,
  },
];

const OurMinistries = () => {
  return (
    <section className={styles.ourMinistries}>
      <Container>
        <div className={styles.gridLayout}>
          <div className={`gbl3c-card ${styles.headerCard}`}>
            <h2 className="fs-700 text-grad center">Our Ministries</h2>
          </div>

          {ministries.map((ministry, index) => (
            <MinistryCard
              key={index}
              title={ministry.title}
              link={ministry.link}
              bgClass={ministry.bgClass}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default OurMinistries;
