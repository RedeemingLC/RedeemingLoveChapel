import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../utils/api"; // ✅ FIXED

import styles from "./Manuals.module.css";
import Section from "../../components/Section/Section";
import Container from "../../components/Container/Container";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import ShareButtons from "../../components/ShareButtons/ShareButtons";
import BlockRenderer from "../../components/BlockRenderer/BlockRenderer";
import StudyHero from "../../components/StudyHero/StudyHero";

// ✅ FIXED: base URL helper
const BASE_URL = import.meta.env.VITE_API_URL?.replace("/api", "");

const getFileUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${BASE_URL}${path}`;
};

const Manuals = () => {
  const { slug } = useParams();

  const [manuals, setManuals] = useState([]);
  const [singleManual, setSingleManual] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sections, setSections] = useState([]);
  const [subsections, setSubsections] = useState({});
  const [activeSection, setActiveSection] = useState(null);
  const [showMobileNav, setShowMobileNav] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");

  const fetchManuals = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/manuals/published"); // ✅ FIXED
      setManuals(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log("FETCH MANUALS ERROR:", error);
      setManuals([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchSections = async (manualId) => {
    try {
      const { data } = await api.get(`/sections/manual/${manualId}`); // ✅ FIXED
      const loadedSections = Array.isArray(data?.data) ? data.data : [];

      setSections(loadedSections);

      loadedSections.forEach((section) => {
        fetchSubsections(section._id);
      });
    } catch (error) {
      console.log("FETCH SECTIONS ERROR:", error);
    }
  };

  const fetchSubsections = async (sectionId) => {
    try {
      const { data } = await api.get(`/subsections/${sectionId}`); // ✅ FIXED

      setSubsections((prev) => ({
        ...prev,
        [sectionId]: Array.isArray(data?.data) ? data.data : [],
      }));
    } catch (error) {
      console.log("FETCH SUBSECTIONS ERROR:", error);
    }
  };

  const fetchSingleManual = async () => {
    try {
      setLoading(true);

      const { data } = await api.get(`/manuals/slug/${slug}`); // ✅ FIXED
      setSingleManual(data || null);

      if (data?._id) {
        fetchSections(data._id);
      }
    } catch (error) {
      console.log("FETCH SINGLE MANUAL ERROR:", error);
      setSingleManual(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) {
      fetchSingleManual();
    } else {
      fetchManuals();
    }
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map((section) =>
        document.getElementById(`section-${section._id}`),
      );

      const scrollPosition = window.scrollY + 150;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i];

        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]._id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sections]);

  const topics = [
    "All",
    ...new Set(manuals.map((manual) => manual.category?.name).filter(Boolean)),
  ];

  const filteredManuals = manuals
    .filter((manual) => {
      const matchesSearch = manual.title
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesTopic =
        selectedTopic === "All" || manual.category?.name === selectedTopic;

      return matchesSearch && matchesTopic;
    })
    .sort((a, b) => {
      if (sortOrder === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
    });

  return (
    <>
      <div className="divOffsetfix">
        {/* HERO */}
        {!slug && (
          <Section variant="alt">
            <Container>
              <div className={styles.hero}>
                <h1 className={`gradientText ${styles.heroTitle}`}>
                  Bible Study Manuals
                </h1>
                <p className={styles.heroText}>
                  Explore our collection of Bible study manuals designed to
                  deepen your understanding of God's word.
                </p>
              </div>
            </Container>
          </Section>
        )}

        <Section>
          <Container>
            {!slug ? (
              <>
                {loading ? (
                  <p>Loading manuals...</p>
                ) : manuals.length === 0 ? (
                  <p>No manuals available.</p>
                ) : (
                  <div className={styles.layout}>
                    {/* FILTERS */}
                    <aside className={styles.filters}>
                      <input
                        type="text"
                        placeholder="Search"
                        className={styles.searchInput}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />

                      <div className={styles.mobileControls}>
                        <select
                          value={selectedTopic}
                          onChange={(e) => setSelectedTopic(e.target.value)}
                          className={styles.select}
                        >
                          {topics.map((topic) => (
                            <option key={topic} value={topic}>
                              {topic}
                            </option>
                          ))}
                        </select>

                        <select
                          value={sortOrder}
                          onChange={(e) => setSortOrder(e.target.value)}
                          className={styles.select}
                        >
                          <option value="newest">Newest</option>
                          <option value="oldest">Oldest</option>
                        </select>
                      </div>

                      <div className={styles.desktopFilters}>
                        <h4 className={styles.filterTitle}>Topics</h4>

                        {topics.map((topic) => (
                          <div
                            key={topic}
                            className={
                              selectedTopic === topic
                                ? styles.filterItemActive
                                : styles.filterItem
                            }
                            onClick={() => setSelectedTopic(topic)}
                          >
                            {topic}
                          </div>
                        ))}
                      </div>
                    </aside>

                    {/* GRID */}
                    <div className={styles.grid}>
                      {filteredManuals.map((manual) => (
                        <Link
                          to={`/manuals/${manual.slug}`}
                          key={manual._id}
                          className={styles.cardLink}
                        >
                          <div className={styles.card}>
                            {manual.coverImage && (
                              <img
                                src={getFileUrl(manual.coverImage)} // ✅ FIXED
                                alt={manual.title}
                                className={styles.cardImage}
                              />
                            )}

                            <div className={styles.cardOverlay}>
                              <span className={`badge ${styles.cardTag}`}>
                                {manual.category?.name || "General"}
                              </span>

                              <h3 className={styles.cardTitle}>
                                {manual.title}
                              </h3>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                {loading ? (
                  <p>Loading manual...</p>
                ) : singleManual ? (
                  <>
                    <div className={styles.heroSpacing}>
                      <div className={styles.breadcrumb}>
                        <Link to="/manuals">Bible Study Manuals</Link>
                        <span> | </span>
                        <span>{singleManual.title}</span>
                      </div>

                      <StudyHero
                        title={singleManual.title}
                        description={singleManual.description}
                        image={getFileUrl(singleManual.coverImage)} // ✅ FIXED
                      />
                    </div>

                    <div className={styles.readerLayout}>
                      <aside className={styles.sidebar}>
                        <h3>Table of Contents</h3>

                        {sections.map((section) => (
                          <a key={section._id} href={`#section-${section._id}`}>
                            {section.title}
                          </a>
                        ))}
                      </aside>

                      <div className={styles.readerContent}>
                        {sections.map((section) => (
                          <section key={section._id}>
                            <h2>{section.title}</h2>

                            {(subsections[section._id] || []).map((lesson) => (
                              <div key={lesson._id}>
                                <h3>{lesson.title}</h3>

                                {(Array.isArray(lesson.blocks)
                                  ? lesson.blocks
                                  : []
                                ).map((block, index) => (
                                  <BlockRenderer key={index} block={block} />
                                ))}
                              </div>
                            ))}
                          </section>
                        ))}
                      </div>

                      <aside className={styles.shareColumn}>
                        <ShareButtons />
                      </aside>
                    </div>
                  </>
                ) : (
                  <p>Manual not found.</p>
                )}
              </>
            )}
          </Container>
        </Section>
      </div>
    </>
  );
};

export default Manuals;
