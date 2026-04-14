import styles from "./MinistryCTA.module.css";
import Section from "../Section/Section";
import Container from "../Container/Container";
import Button from "../Button/Button";

const MinistryCTA = () => {
  const phoneNumber = "+2347049315493";
  const whatsappNumber = "+2347049315493";
  return (
    <Section>
      <Container>
        <div className={styles.ctaCard}>
          {/* Text */}
          <div className={styles.content}>
            <h3>Partner with us</h3>
            <p>
              Join us in caring for the poor and needy. Your support helps us
              reach more lives and spread the love of Christ.
            </p>
          </div>

          {/* CTA Button */}
          <div className={styles.action}>
            <a href={`tel:${phoneNumber}`}>
              <Button variant="primary">Call Now</Button>
            </a>

            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline">WhatsApp</Button>
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default MinistryCTA;
