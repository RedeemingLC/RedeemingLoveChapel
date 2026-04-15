import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

import Section from "../../components/Section/Section";
import Container from "../../components/Container/Container";

import styles from "./StudyDashboard.module.css";

export default function StudyDashboard() {
  const navigate = useNavigate();

  const [progressStudies, setProgressStudies] = useState([]);
  const [allStudies, setAllStudies] = useState([]);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studiesRes = await api.get("/public/studies");

        setAllStudies(Array.isArray(studiesRes.data) ? studiesRes.data : []);

        try {
          const progressRes = await api.get("/progress");

          setProgressStudies(
            Array.isArray(progressRes.data) ? progressRes.data : [],
          );
        } catch (err) {
          if (err.response?.status !== 404) {
            console.error("Progress error:", err);
          }
          setProgressStudies([]);
        }
      } catch (err) {
        console.error("Failed to load studies", err);
        setError("Failed to load studies.");
      }
    };

    fetchData();
  }, []);

  const safeStudies = Array.isArray(allStudies) ? allStudies : [];
  const safeProgress = Array.isArray(progressStudies) ? progressStudies : [];

  const topics = [
    "All",
    ...new Set(safeStudies.map((s) => s.topic || "General")),
  ];

  const filteredStudies = safeStudies
    .filter((study) => {
      const matchesSearch =
        study.title?.toLowerCase().includes(search.toLowerCase()) ||
        study.description?.toLowerCase().includes(search.toLowerCase());

      const matchesTopic =
        selectedTopic === "All" || (study.topic || "General") === selectedTopic;

      return matchesSearch && matchesTopic;
    })
    .sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();

      return sort === "newest" ? dateB - dateA : dateA - dateB;
    });

  if (error) return <div>{error}</div>;

  return (
    <Section>
      <Container>
        {safeProgress.length > 0 && (
          <>
            <h2>Continue Your Studies</h2>

            <div className={styles.grid}>
              {safeProgress.map((item) => (
                <div
                  key={item.study._id}
                  className={styles.card}
                  onClick={() => navigate(`/study/${item.study.slug}`)}
                >
                  <img src={item.study.coverImage} alt={item.study.title} />

                  <h3>{item.study.title}</h3>
                </div>
              ))}
            </div>
          </>
        )}

        <h2>Available Studies</h2>

        {filteredStudies.length === 0 ? (
          <p>No studies available yet.</p>
        ) : (
          <div className={styles.grid}>
            {filteredStudies.map((study) => (
              <div
                key={study._id}
                className={styles.card}
                onClick={() => navigate(`/study/${study.slug}`)}
              >
                <img src={study.coverImage} alt={study.title} />
                <h3>{study.title}</h3>
              </div>
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
