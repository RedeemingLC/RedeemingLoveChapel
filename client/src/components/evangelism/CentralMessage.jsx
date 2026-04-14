import styles from "./CentralMessage.module.css";
import Section from "../../components/Section/Section";
import Container from "../Container/Container";

const CentralMessage = () => {
  return (
    <>
      <Section className={styles.centralMessage}>
        <Container>
          <h2 className="gradientText">Our Central Message</h2>

          <div className={`grid grid-layout-2-col ${styles.messageGrid}`}>
            <p className="gl2c-1">
              The central message of our ministry is "CHRIST-GOD'S RIGHTEOUSNESS
              REVEALED IN MAN". We aim to deliver this message to the church as
              the body of Christ, to worshippers of the Redeeming Love Chapel
              family, and to the lost in our society and the world.
            </p>

            <p className="gl2c-2">
              Our message to the church is the need to press towards
              Christ-likeness. To the worshippers, it's about hope, comfort, and
              love. For the lost, we emphasize repentance and reconciliation
              through Jesus Christ.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default CentralMessage;
