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
    const fetchDayAndProgress = async () => {
      try {
        // 🔥 Fetch day
        const { data } = await api.get(
          `/public/studies/${slug}/day/${dayNumber}`,
        );

        setDay(data);

        // 🔥 Fetch overview (for studyId)
        const overviewRes = await api.get(`/public/studies/${slug}/overview`);

        const studyId = overviewRes.data.studyId;
        setStudyId(studyId);

        // ✅ FIX: store total days correctly
        setTotalDays(overviewRes.data.totalDays || 1);

        let maxCompleted = 0;
        const token = localStorage.getItem("userToken");

        if (token) {
          try {
            const progressRes = await api.get(`/progress/${studyId}`);
            const progressData = progressRes.data;

            setProgress(progressData);

            const completed = progressData.completedDays || [];
            maxCompleted = completed.length ? Math.max(...completed) : 0;
          } catch {
            console.log("Progress fetch failed");
          }
        }

        // 🔒 Lock future days
        if (dayNum > maxCompleted + 1) {
          navigate(`/study/${slug}/day/${maxCompleted + 1}`, {
            replace: true,
          });
          return;
        }

        // 📝 Fetch notes (ONLY if studyId exists)
        if (token && studyId) {
          try {
            const noteRes = await api.get(
              `/notes/${studyId}/day/${data.dayNumber}`,
            );
            setNote(noteRes.data.content || "");
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

    fetchDayAndProgress();
  }, [slug, dayNumber, navigate]);

  if (error) return <div>{error}</div>;
  if (!day) return <div>Loading day...</div>;

  const isCompleted = progress?.completedDays?.includes(dayNum);

  const completedDays = progress?.completedDays || [];

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

      // ✅ Update UI immediately (no stale state)
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
          {/* Progress Bar */}
          {progress && (
            <div className={styles.progressWrapper}>
              <p className={styles.progressText}>
                Day {dayNum} of {totalDays}
              </p>

              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{
                    width: `${progressPercent}%`,
                  }}
                />
              </div>
            </div>
          )}

          {/* Title */}
          <h1 className={styles.title}>{day.title}</h1>

          {/* Content */}
          <div className={styles.content}>
            {day.blocks && day.blocks.length > 0 ? (
              <StudyBlocksRenderer blocks={day.blocks} />
            ) : day.content ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(day.content),
                }}
              />
            ) : (
              <p>No content available for this day.</p>
            )}
          </div>

          {/* Pause Divider */}
          {day.hasPauseDivider && (
            <div className={styles.pause}>
              <strong>{day.pauseText}</strong>
            </div>
          )}

          {/* Reflection Prompt */}
          {day.reflectionPrompt && (
            <p className={styles.reflectionPrompt}>{day.reflectionPrompt}</p>
          )}

          <hr style={{ margin: "40px 0", opacity: 0.2 }} />

          {/* Notes */}
          {progress && (
            <div className={styles.notesSection}>
              <h3>Your Reflection Notes</h3>

              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows="5"
                className={styles.textarea}
                placeholder="Write what God is teaching you today..."
              />

              <Button onClick={saveNote} disabled={saving}>
                {saving ? "Saving..." : "Save Note"}
              </Button>
            </div>
          )}

          {/* Complete Button */}
          {progress && (
            <div className={styles.completeSection}>
              <Button onClick={handleComplete}>
                {isCompleted ? "Completed ✓" : "Mark as Complete"}
              </Button>
            </div>
          )}

          {/* Navigation */}
          <div className={styles.navButtons}>
            {dayNum > 1 ? (
              <Button
                variant="outline"
                onClick={() => navigate(`/study/${slug}/day/${dayNum - 1}`)}
              >
                ← Previous Day
              </Button>
            ) : (
              <div />
            )}

            <Button
              onClick={() => {
                const token = localStorage.getItem("userToken");

                if (!token) {
                  navigate("/login", {
                    state: {
                      message: "Please log in to continue this study.",
                      from: `/study/${slug}/day/${dayNum}`,
                    },
                  });
                  return;
                }

                navigate(`/study/${slug}/day/${dayNum + 1}`);
              }}
              disabled={!isCompleted && !!progress}
            >
              Next Day →
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
