import { useState, useEffect } from "react";
import Container from "../Container/Container";
import DOMPurify from "dompurify";
import api from "../../utils/api";
import styles from "./WordOfWisdom.module.css";

import wowBg from "../../assets/images/wow-bg.jpg";

const WordOfWisdom = () => {
  const [wisdom, setWisdom] = useState(null);

  useEffect(() => {
    const fetchWisdom = async () => {
      try {
        const res = await api.get("/wisdom/active");
        setWisdom(res.data);
      } catch (err) {
        console.error("Failed to fetch wisdom");
      }
    };

    fetchWisdom();
  }, []);
  return (
    <section
      className={styles.wow}
      style={{ backgroundImage: `url(${wowBg})` }}
    >
      <Container>
        <div className={styles.content}>
          <h2 className={styles.heading}>Word of Wisdom</h2>

          {/* <p className={styles.quote}>
            “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.”
          </p>

          <p className={styles.author}>— Pastor Cyril Yelfor</p> */}

          <p
            className={styles.quote}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(wisdom?.text || ""),
            }}
          />
          <p className={styles.author}>— {wisdom?.author || ""}</p>
        </div>
      </Container>
    </section>
  );
};

export default WordOfWisdom;
