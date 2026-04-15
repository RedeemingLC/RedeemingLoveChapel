import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api";

import Section from "../../components/Section/Section";
import Container from "../../components/Container/Container";
import Button from "../../components/Button/Button";

import styles from "./StudyCompletion.module.css";

export default function StudyCompletion() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [screen, setScreen] = useState(null);

  useEffect(() => {
    const fetchCompletion = async () => {
      try {
        const { data } = await api.get(`/public/studies/${slug}/completion`);

        setScreen(data || null); // ✅ SAFE
      } catch (err) {
        console.error(err);
        setScreen(null); // ✅ prevent crash
      }
    };

    fetchCompletion();
  }, [slug]);

  if (!screen) return <div>Loading...</div>;

  // ✅ SAFE blocks
  const blocks = Array.isArray(screen.blocks) ? screen.blocks : [];

  return (
    <Section>
      <Container>
        <div className={styles.wrapper}>
          <div className={styles.card}>
            {/* Icon */}
            <div className={styles.icon}>🎉</div>

            {/* Title */}
            <h1 className={`gradientText ${styles.title}`}>
              {screen.title || "Congratulations!"}
            </h1>

            {/* Content */}
            <div className={styles.content}>
              {blocks.map((block, i) => (
                <p key={i}>{block?.value}</p>
              ))}
            </div>

            {/* Buttons */}
            <div className={styles.buttons}>
              <Button onClick={() => navigate("/my-studies")}>
                Back to Library
              </Button>

              <Button
                variant="outline"
                onClick={() => navigate(`/study/${slug}`)}
              >
                Review Study
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
