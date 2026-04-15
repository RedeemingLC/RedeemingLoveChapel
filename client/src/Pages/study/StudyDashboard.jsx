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

  const topics = [
    "All",
    ...new Set(
      (Array.isArray(allStudies) ? allStudies : []).map(
        (s) => s.topic || "General",
      ),
    ),
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studiesRes = await api.get("/public/studies");

        setAllStudies(Array.isArray(studiesRes.data) ? studiesRes.data : []); // ✅ SAFE

        try {
          const progressRes = await api.get("/progress");

          setProgressStudies(
            Array.isArray(progressRes.data) ? progressRes.data : [],
          ); // ✅ SAFE
        } catch (err) {
          if (err.response?.status !== 404) {
            console.error("Progress error:", err);
          }
          setProgressStudies([]); // ✅ SAFE
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

  const filteredStudies = safeStudies
    .filter((study) => {
      const title = study.title || "";
      const description = study.description || "";

      const matchesSearch =
        title.toLowerCase().includes(search.toLowerCase()) ||
        description.toLowerCase().includes(search.toLowerCase());

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
    <>
      <div className="divOffset">
        <Section variant="alt">
          <Container>
            {/* HERO */}
            <div className={styles.hero}>
              <h1>Devotional Guides</h1>
              <p>
                Grow in your knowledge of God through structured, Spirit-filled
                studies designed to guide your walk daily.
              </p>
            </div>
          </Container>
        </Section>

        <Section>
          <Container>
            <div className={styles.page}>
              {/* MOBILE FILTERS */}
              <div className={styles.mobileFilters}>
                <select
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                >
                  {topics.map((topic) => (
                    <option key={topic} value={topic}>
                      {topic}
                    </option>
                  ))}
                </select>

                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                </select>
              </div>

              <div className={styles.content}>
                {/* SIDEBAR */}
                <div className={styles.sidebar}>
                  <div className={styles.searchBox}>
                    <input
                      placeholder="Search"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>

                  <div>
                    <h3>Topics</h3>
                    <ul className={styles.filterList}>
                      {topics.map((topic) => (
                        <li
                          key={topic}
                          className={
                            selectedTopic === topic ? styles.active : ""
                          }
                          onClick={() => setSelectedTopic(topic)}
                        >
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3>Sort by</h3>
                    <ul className={styles.filterList}>
                      <li
                        className={sort === "newest" ? styles.active : ""}
                        onClick={() => setSort("newest")}
                      >
                        Newest
                      </li>

                      <li
                        className={sort === "oldest" ? styles.active : ""}
                        onClick={() => setSort("oldest")}
                      >
                        Oldest
                      </li>
                    </ul>
                  </div>
                </div>

                {/* RIGHT SIDE */}
                <div>
                  {/* CONTINUE STUDIES */}
                  {safeProgress.length > 0 && (
                    <>
                      <h2 className={styles.sectionTitle}>
                        Continue Your Studies
                      </h2>

                      <div className={styles.grid}>
                        {safeProgress.map((item) => {
                          const totalDays = item.totalDays || 1;

                          const completed = Array.isArray(item.completedDays)
                            ? item.completedDays.length
                            : 0;

                          const percent = Math.round(
                            (completed / totalDays) * 100,
                          );

                          return (
                            <div
                              key={item.study._id}
                              className={styles.card}
                              onClick={() =>
                                navigate(
                                  `/study/${item.study.slug}/day/${
                                    item.lastDayRead || 1
                                  }`,
                                )
                              }
                            >
                              <img
                                src={item.study.coverImage}
                                alt={item.study.title}
                              />

                              <div className={styles.overlay}>
                                <span className={styles.badge}>Continue</span>

                                <h3>{item.study.title}</h3>

                                <div className={styles.progressBar}>
                                  <div
                                    className={styles.progressFill}
                                    style={{ width: `${percent}%` }}
                                  />
                                </div>

                                <p className={styles.progressText}>
                                  {completed} of {totalDays} days
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}

                  {/* ALL STUDIES */}
                  <h2 className={styles.sectionTitle}>Available Studies</h2>

                  {safeStudies.length === 0 ? (
                    <p className={styles.empty}>No studies available yet.</p>
                  ) : (
                    <div className={styles.grid}>
                      {filteredStudies.map((study) => (
                        <div
                          key={study._id}
                          className={styles.card}
                          onClick={() => navigate(`/study/${study.slug}`)}
                        >
                          <img src={study.coverImage} alt={study.title} />

                          <div className={styles.overlay}>
                            <span className="badge">
                              {(study.topic || "General").toUpperCase()}
                            </span>
                            <h3>{study.title}</h3>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </div>
    </>
  );
}
