import styles from "./VisionStatement.module.css";
import Container from "../Container/Container";

const VisionStatement = () => {
  return (
    <section className={styles.visionSection}>
      <Container>
        <div className={`grid grid-layout-2-col`}>
          <h2 className="fs-700 gl2c-1 vs-h2 text-grad">
            Our Vision and Mission Statement
          </h2>

          <div className={`grid gl2c-2 ${styles.visionContent}`}>
            <h3 className="fs-600 text-grad">Our Vision</h3>

            <p className="fs-400">
              “To shine the light of the glorious gospel of Christ that has been
              shone in our hearts, wherever we are and wherever we go.”
            </p>

            <p className="fs-400">This vision is inspired by:</p>

            <ul className="list fs-400">
              <li>2 Corinthians 4:6</li>
              <li>Matthew 5:14–16</li>
              <li>Psalm 36:9</li>
              <li>Isaiah 42:6</li>
            </ul>

            <h3 className="fs-600 text-grad">Our Mission Statement</h3>

            <p className="fs-400">
              As a local assembly, we are committed to being a people who love
              holiness and righteousness, living lives that reflect God’s glory.
              Our ultimate aim is to grow in Christlikeness in every area of our
              lives (1 Peter 1:13–16; Ephesians 4:13).
            </p>

            <p className="fs-400">To achieve this, we:</p>

            <ul className="list fs-400">
              <li>
                Gather for Sunday worship service at 9:00 am, where we exalt God
                and strengthen our faith together.
              </li>
              <li>
                Participate in Bible studies on Wednesdays in our individual
                homes, choosing any 1 hour and 30 minutes between 4:30pm and
                10:00pm, and connect collectively for virtual Bible studies on
                Telegram from 7:30pm to 8:30pm.
              </li>
              <li>
                Dedicate ourselves to prayer week, starting from the first
                Sunday of every month and running daily through the week on
                Telegram from 6:00am to 7:00am.
              </li>
              <li>
                Home church gatherings on Fridays from 6:30pm to 7:30pm, where
                families come together in their different homes to reflect on
                Sunday sermons and engage in discussions arising from Bible
                studies.
              </li>
            </ul>

            <p className="fs-400">
              Through these practices, we remain steadfast in our commitment to
              becoming more like Christ and making His glory known.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default VisionStatement;
