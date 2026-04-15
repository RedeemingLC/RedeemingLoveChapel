import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import DOMPurify from "dompurify";
import StudyBlocksRenderer from "./components/StudyBlocksRenderer";

import Section from "../../components/Section/Section";
import Container from "../../components/Container/Container";
import Button from "../../components/Button/Button";
import styles from "./StudyDayReader.module.css";

export default function StudyDayReader() {
  const { slug, dayNumber } = useParams();
  const navigate = useNavigate();

  const [studyId, setStudyId] = useState(null);
  const [totalDays, setTotalDays] = useState(1);
  const [day, setDay] = useState(null);
  const [progress, setProgress] = useState(null);
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const dayNum = Number(dayNumber);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get(
          `/public/studies/${slug}/day/${dayNumber}`,
        );
        setDay(data || null);

        const overviewRes = await api.get(`/public/studies/${slug}/overview`);

        const studyId = overviewRes.data?.studyId;
        setStudyId(studyId);
        setTotalDays(overviewRes.data?.totalDays || 1);

        let maxCompleted = 0;
        const token = localStorage.getItem("userToken");

        if (token && studyId) {
          try {
            const progressRes = await api.get(`/progress/${studyId}`);
            const progressData = progressRes.data || {};
            setProgress(progressData);

            const completed = Array.isArray(progressData.completedDays)
              ? progressData.completedDays
              : [];

            maxCompleted = completed.length ? Math.max(...completed) : 0;
          } catch {
            console.log("Progress fetch failed");
          }
        }

        if (dayNum > maxCompleted + 1) {
          navigate(`/study/${slug}/day/${maxCompleted + 1}`, {
            replace: true,
          });
          return;
        }

        if (token && studyId && data?.dayNumber) {
          try {
            const noteRes = await api.get(
              `/notes/${studyId}/day/${data.dayNumber}`,
            );
            setNote(noteRes.data?.content || "");
          } catch {
            console.log("Note fetch failed");
          }
        }
      } catch (err) {
        if (err.response?.status === 404) {
          navigate(`/study/${slug}/completion`);
        } else {
          console.error(err);
          setError("Failed to load study day.");
        }
      }
    };

    fetchData();
  }, [slug, dayNumber, navigate]);

  if (error) return <div>{error}</div>;
  if (!day) return <div>Loading day...</div>;

  const blocks = Array.isArray(day.blocks) ? day.blocks : [];

  const completedDays = Array.isArray(progress?.completedDays)
    ? progress.completedDays
    : [];

  const isCompleted = completedDays.includes(dayNum);

  const currentProgress = completedDays.length ? Math.max(...completedDays) : 0;

  const progressPercent = Math.min((currentProgress / totalDays) * 100, 100);

  const handleComplete = async () => {
    const token = localStorage.getItem("userToken");

    if (!token) {
      navigate("/login", {
        state: {
          message: "Please log in to mark this day as complete.",
          from: `/study/${slug}/day/${dayNum}`,
        },
      });
      return;
    }

    try {
      await api.post(`/progress/${studyId}/day/${day.dayNumber}`);

      setProgress((prev) => ({
        ...prev,
        completedDays: [...(prev?.completedDays || []), dayNum],
      }));

      navigate(`/study/${slug}/day/${dayNum + 1}`);
    } catch {
      console.log("Progress save failed");
    }
  };

  const saveNote = async () => {
    try {
      setSaving(true);
      await api.post(`/notes/${studyId}/day/${day.dayNumber}`, {
        content: note,
      });
    } catch {
      console.log("Note save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Section>
      <Container>
        <div className={styles.reader}>
          {progress && (
            <div className={styles.progressWrapper}>
              <p>
                Day {dayNum} of {totalDays}
              </p>

              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          <h1>{day.title}</h1>

          <div>
            {blocks.length > 0 ? (
              <StudyBlocksRenderer blocks={blocks} />
            ) : day.content ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(day.content),
                }}
              />
            ) : (
              <p>No content available.</p>
            )}
          </div>

          {progress && (
            <>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />

              <Button onClick={saveNote}>
                {saving ? "Saving..." : "Save Note"}
              </Button>

              <Button onClick={handleComplete}>
                {isCompleted ? "Completed ✓" : "Mark as Complete"}
              </Button>
            </>
          )}
        </div>
      </Container>
    </Section>
  );
}
