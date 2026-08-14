import styles from "./MinistryCTA.module.css";
import Section from "../Section/Section";
import Container from "../Container/Container";

const MinistryCTA = () => {
  const phoneNumber = "+2347049315493";
  const whatsappNumber = "2347049315493";

  return (
    <Section>
      <Container>
        <div className={styles.ctaCard}>
          <div className={styles.content}>
            <h3>Partner with us</h3>

            <p>
              Join us in caring for the poor and needy. Your support helps us
              reach more lives and spread the love of Christ.
            </p>
          </div>

          <div className={styles.action}>
            <a href={`tel:${phoneNumber}`} className={styles.primaryLink}>
              Call Now
            </a>

            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.outlineLink}
            >
              WhatsApp
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default MinistryCTA;
