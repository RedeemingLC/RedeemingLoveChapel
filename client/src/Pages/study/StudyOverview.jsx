import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api";

import Section from "../../components/Section/Section";
import Container from "../../components/Container/Container";
import Button from "../../components/Button/Button";
import styles from "./StudyOverview.module.css";

export default function StudyOverview() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [days, setDays] = useState([]);
  const [study, setStudy] = useState(null);
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const { data } = await api.get(`/public/studies/${slug}/overview`);
        setDays(data.days);
        setStudy(data);

        const userToken = localStorage.getItem("userToken");
        if (userToken) {
          try {
            const progressRes = await api.get(`/progress/${data.studyId}`);
            setProgress(progressRes.data);
          } catch {
            // no progress yet — ignore
          }
        }
      } catch (err) {
        console.error("Failed to load overview", err);
      }
    };

    fetchOverview();
  }, [slug]);

  const completed = progress?.completedDays || [];
  const maxCompleted = completed.length ? Math.max(...completed) : 0;

  return (
    <Section>
      <Container>
        <div className={styles.page}>
          {/* HERO */}
          {study && (
            <div className={styles.hero}>
              {study.coverImage && (
                <img
                  src={study.coverImage}
                  alt={study.title}
                  className={styles.cover}
                />
              )}

              <div className={styles.heroContent}>
                <h1 className={styles.title}>{study.title}</h1>

                {study.description && (
                  <p className={styles.description}>{study.description}</p>
                )}

                <Button
                  onClick={() =>
                    navigate(`/study/${slug}/day/${maxCompleted + 1 || 1}`)
                  }
                >
                  {maxCompleted > 0 ? "Continue Study" : "Start Study"}
                </Button>
              </div>
            </div>
          )}

          {/* DAYS */}
          <div className={styles.days}>
            <h2 className={styles.sectionTitle}>Study Days</h2>

            {days.map((day) => {
              const isCompleted = completed.includes(day.dayNumber);
              const isUnlocked = day.dayNumber <= maxCompleted + 1;

              return (
                <div
                  key={day.dayNumber}
                  className={`${styles.dayCard} ${
                    !isUnlocked ? styles.locked : ""
                  }`}
                >
                  <div>
                    <p className={styles.dayTitle}>Day {day.dayNumber}</p>
                    <h3>{day.title}</h3>
                  </div>

                  <div>
                    {isCompleted ? (
                      <span className={styles.completed}>✓ Completed</span>
                    ) : isUnlocked ? (
                      <Button
                        size="sm"
                        onClick={() =>
                          navigate(`/study/${slug}/day/${day.dayNumber}`)
                        }
                      >
                        Start
                      </Button>
                    ) : (
                      <span className={styles.lockedText}>🔒 Locked</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
