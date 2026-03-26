import Container from "../Container/Container";
// import Button from "../../components/Button/Button";
import { MdOutlineJoinInner } from "react-icons/md";
import Image from "../../assets/images/Join-Telegram-side-image-553x757.png";
import styles from "./CommunitySections.module.css";

const CommunitySections = () => {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.grid}>
          {/* Left Image */}
          <div className={styles.imageWrapper}>
            <figure>
              <img
                src={Image}
                alt="Phone showing Telegram group"
                className={styles.phoneImage}
              />
              <figcaption className="sr-only">
                Picture of phone with a screenshot of our Telegram group page
              </figcaption>
            </figure>
          </div>

          {/* Right Content */}
          <article className={styles.content}>
            {/* Intro Block */}
            <div className={styles.intro}>
              <h2 className="fs-700 text-grad">Join our Telegram Group</h2>

              <p className="fs-400">
                Explore the wonders of spiritual development by sharing
                fellowship with like-minded individuals in God's words. We urge
                you to join our community and continue your journey toward
                positive transformation today.
              </p>
            </div>

            {/* Feature Grid */}
            <div className={styles.featureGrid}>
              <div className={styles.featureBlock}>
                <h3 className="fs-500 text-grad">Bible Study</h3>
                <p>
                  Join us every Wednesday at 7:30 PM WAT on our Telegram
                  platform for our Bible Study Q&A session. Let's delve into the
                  Scriptures and gain practical wisdom to inspire us to live our
                  best lives.
                </p>
              </div>

              <div className={styles.featureBlock}>
                <h3 className="fs-500 text-grad">Prayer Week</h3>
                <p>
                  Join us every second week of every month on our Telegram group
                  at 6:00 AM WAT for a powerful prayer experience that aligns
                  our desires with God's will and transforms our lives.
                </p>
              </div>

              <div className={styles.featureBlock}>
                <h3 className="fs-500 text-grad">Business Community Prayers</h3>
                <p>
                  The Redeeming Love Chapel Business Community meets every
                  Wednesday (except prayer week) at 6:00 AM CAT to seek divine
                  guidance from Almighty God for our various businesses.
                </p>
              </div>

              <div className={styles.joinWrapper}>
                <a
                  href="https://t.me/+3Vp_z412vj8yNDE0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.primaryBtn}
                >
                  Join
                </a>
              </div>
            </div>
          </article>
        </div>
      </Container>
    </section>
  );
};

export default CommunitySections;
