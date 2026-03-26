import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api";

import styles from "./StudyCompletion.module.css";

export default function StudyCompletion() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [screen, setScreen] = useState(null);

  useEffect(() => {
    const fetchCompletion = async () => {
      try {
        const { data } = await api.get(`/public/studies/${slug}/completion`);
        setScreen(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCompletion();
  }, [slug]);

  if (!screen) return <div>Loading...</div>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        {/* 🎉 Icon */}
        <div className={styles.icon}>🎉</div>

        {/* Title */}
        <h2 className={styles.title}>{screen.title || "Congratulations!"}</h2>

        {/* Content */}
        <div className={styles.content}>
          {screen.blocks?.map((block, i) => (
            <p key={i} className={styles.paragraph}>
              {block.value}
            </p>
          ))}
        </div>

        {/* Buttons */}
        <div className={styles.buttons}>
          <button
            className={styles.primaryBtn}
            onClick={() => navigate("/my-studies")}
          >
            Back to Library
          </button>

          <button
            className={styles.secondaryBtn}
            onClick={() => navigate(`/study/${slug}`)}
          >
            Review Study
          </button>
        </div>
      </div>
    </div>
  );
}
