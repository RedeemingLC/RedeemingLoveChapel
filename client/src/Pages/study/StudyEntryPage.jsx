import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import api from "../../utils/api";

import Section from "../../components/Section/Section";
import Container from "../../components/Container/Container";
import Button from "../../components/Button/Button";
import StudyHero from "../../components/StudyHero/StudyHero";
import styles from "./StudyEntryPage.module.css";

export default function StudyEntryPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [study, setStudy] = useState(null);
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState("");
  const [navigating, setNavigating] = useState(false);

  useEffect(() => {
    const fetchStudy = async () => {
      try {
        const { data } = await api.get(`/public/studies/${slug}`);
        setStudy(data || null);

        const token = localStorage.getItem("userToken");

        if (token && data?._id) {
          try {
            const progressRes = await api.get(`/progress/${data._id}`);
            setProgress(progressRes.data || null);
          } catch {
            console.log("No progress yet");
          }
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load study.");
      }
    };

    fetchStudy();
  }, [slug]);

  if (error) return <div>{error}</div>;
  if (!study) return <div>Loading study...</div>;

  const safeDays = Array.isArray(study.days) ? study.days : [];
  const totalDays = safeDays.length;

  const completedCount = Array.isArray(progress?.completedDays)
    ? progress.completedDays.length
    : 0;

  const lastDay = progress?.lastDayRead;
  const isCompleted = completedCount >= totalDays && totalDays > 0;

  return (
    <Section>
      <Container>
        <StudyHero
          title={study.entryTitle || study.title}
          description={study.entrySubtitle || study.description}
          image={study.coverImage}
          primaryAction={
            isCompleted ? (
              <Button onClick={() => navigate(`/study/${slug}/completion`)}>
                View Completion →
              </Button>
            ) : lastDay ? (
              <Button
                disabled={navigating}
                onClick={() => {
                  setNavigating(true);
                  navigate(`/study/${slug}/day/${lastDay}`);
                }}
              >
                Resume Study →
              </Button>
            ) : (
              <Button
                disabled={navigating}
                onClick={() => {
                  setNavigating(true);
                  navigate(`/study/${slug}/day/1`);
                }}
              >
                Start Study →
              </Button>
            )
          }
          secondaryAction={
            <Button
              variant="outline"
              onClick={() => navigate(`/study/${slug}/overview`)}
            >
              View Full Study Plan
            </Button>
          }
        />

        <div className={styles.contentWrapper}>
          <div className={styles.content}>
            {study.entryContent ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(study.entryContent),
                }}
              />
            ) : (
              <p>No introduction content available.</p>
            )}
          </div>
        </div>

        {progress && (
          <p>
            You have completed {completedCount} day
            {completedCount !== 1 && "s"} so far.
          </p>
        )}
      </Container>
    </Section>
  );
}
