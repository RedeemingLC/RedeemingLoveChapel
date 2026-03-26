import Container from "../Container/Container";
import styles from "./BeInspiredSection.module.css";

const BeInspiredSection = () => {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.grid}>
          {/* Left Column — SoundCloud */}
          <div className={styles.media}>
            <iframe
              width="100%"
              height="500"
              scrolling="no"
              frameBorder="no"
              src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1226858449&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
              title="SoundCloud Audio"
            />

            <div className={styles.credit}>
              <a
                href="https://soundcloud.com/redeeminglovechapel"
                target="_blank"
                rel="noopener noreferrer"
              >
                Redeeming Love Chapel
              </a>{" "}
              ·{" "}
              <a
                href="https://soundcloud.com/redeeminglovechapel/humility-just-like-christ"
                target="_blank"
                rel="noopener noreferrer"
              >
                Humility Just Like Christ
              </a>
            </div>
          </div>

          {/* Right Column — Text */}
          <article className={styles.content}>
            <header>
              <small className="fs-300">Be Inspired</small>

              <h2 className="fs-700 text-grad">
                Encouraging Prayer in the time of difficulties
              </h2>
            </header>

            <p className="fs-400">
              Jesus Christ encouraged us to remain steadfast in prayer and not
              lose heart. Ezekiel's vision of God during difficult times reminds
              us that God can reveal Himself amid adversity. Our true home is
              not in this world, so let us focus on God, seek His guidance,
              devote ourselves to prayer, and enjoy His presence, visions, and
              revelation.
            </p>
          </article>
        </div>
      </Container>
    </section>
  );
};

export default BeInspiredSection;
