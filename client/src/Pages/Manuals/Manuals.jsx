import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import styles from "./Manuals.module.css";
import Section from "../../components/Section/Section";
import Container from "../../components/Container/Container";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import BlockRenderer from "../../components/BlockRenderer/BlockRenderer";
import StudyHero from "../../components/StudyHero/StudyHero";

const Manuals = () => {
  const { slug } = useParams();

  const [manuals, setManuals] = useState([]);
  const [singleManual, setSingleManual] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sections, setSections] = useState([]);
  const [subsections, setSubsections] = useState({});
  const [activeSection, setActiveSection] = useState(null);
  const [showMobileNav, setShowMobileNav] = useState(false);

  const fetchManuals = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/manuals/published");
      setManuals(data);
    } catch (error) {
      console.log("FETCH MANUALS ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSections = async (manualId) => {
    try {
      const { data } = await axios.get(`/api/sections/manual/${manualId}`);
      const loadedSections = data.data;

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
      const { data } = await axios.get(`/api/subsections/${sectionId}`);

      setSubsections((prev) => ({
        ...prev,
        [sectionId]: data.data,
      }));
    } catch (error) {
      console.log("FETCH SUBSECTIONS ERROR:", error);
    }
  };

  const fetchSingleManual = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(`/api/manuals/slug/${slug}`);
      setSingleManual(data);

      fetchSections(data._id);
    } catch (error) {
      console.log("FETCH SINGLE MANUAL ERROR:", error);
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

  return (
    <Section>
      <Container>
        {!slug ? (
          <>
            <h1 className={styles.pageTitle}>Manuals</h1>

            {loading ? (
              <p>Loading manuals...</p>
            ) : manuals.length === 0 ? (
              <p>No manuals available.</p>
            ) : (
              <div className={styles.grid}>
                {manuals.map((manual) => (
                  <Card key={manual._id}>
                    {manual.coverImage && (
                      <img
                        src={`http://localhost:5000${manual.coverImage}`}
                        alt={manual.title}
                        className={styles.cardImage}
                      />
                    )}

                    <div className={styles.cardContent}>
                      <h3 className={styles.cardTitle}>{manual.title}</h3>

                      <p className={styles.cardDescription}>
                        {manual.description}
                      </p>
                    </div>

                    <div className={styles.cardFooter}>
                      <Link to={`/manuals/${manual.slug}`}>
                        <Button>Read Manual</Button>
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            {loading ? (
              <p>Loading manual...</p>
            ) : singleManual ? (
              <>
                {/* ✅ HERO SECTION */}
                <div className={styles.heroSpacing}>
                  <StudyHero
                    title={singleManual.title}
                    description={singleManual.description}
                    image={
                      singleManual.coverImage
                        ? `http://localhost:5000${singleManual.coverImage}`
                        : null
                    }
                    primaryAction={
                      <Button
                        onClick={() => {
                          document
                            .getElementById("manual-content")
                            ?.scrollIntoView({ behavior: "smooth" });
                        }}
                      >
                        Read More ↓
                      </Button>
                    }
                    secondaryAction={
                      <Button
                        variant="outline"
                        onClick={() => {
                          if (singleManual.pdfUrl) {
                            window.open(
                              `http://localhost:5000${singleManual.pdfUrl}`,
                              "_blank",
                            );
                          } else {
                            alert("No PDF available for this manual.");
                          }
                        }}
                      >
                        Download
                      </Button>
                    }
                  />
                </div>

                {/* MOBILE NAV BUTTON */}
                {!showMobileNav && (
                  <button
                    className={styles.mobileNavButton}
                    onClick={() => setShowMobileNav(true)}
                  >
                    ☰ Table of Contents
                  </button>
                )}

                {showMobileNav && (
                  <div
                    className={styles.overlay}
                    onClick={() => setShowMobileNav(false)}
                  ></div>
                )}

                <div className={styles.readerLayout}>
                  {/* SIDEBAR */}
                  <aside
                    className={`${styles.sidebar} ${
                      showMobileNav ? styles.sidebarOpen : ""
                    }`}
                  >
                    <button
                      className={styles.closeSidebar}
                      onClick={() => setShowMobileNav(false)}
                    >
                      ✕
                    </button>

                    <h3>Table of Contents</h3>

                    {sections.map((section) => (
                      <a
                        key={section._id}
                        href={`#section-${section._id}`}
                        className={`${styles.sidebarItem} ${
                          activeSection === section._id
                            ? styles.activeSection
                            : ""
                        }`}
                        onClick={() => setShowMobileNav(false)}
                      >
                        {section.title}
                      </a>
                    ))}
                  </aside>

                  {/* MAIN CONTENT */}
                  <main id="manual-content" className={styles.readerContent}>
                    {sections.map((section) => (
                      <section
                        key={section._id}
                        id={`section-${section._id}`}
                        className={styles.sectionBlock}
                      >
                        <h2 className={styles.sectionTitle}>{section.title}</h2>

                        {subsections[section._id]?.map((lesson) => (
                          <div key={lesson._id} className={styles.lessonBlock}>
                            <h3>{lesson.title}</h3>

                            {lesson.blocks?.map((block, index) => {
                              if (!block) return null;

                              return (
                                <BlockRenderer
                                  key={
                                    block.id ||
                                    block._id ||
                                    `${lesson._id}-${index}`
                                  }
                                  block={block}
                                />
                              );
                            })}
                          </div>
                        ))}
                      </section>
                    ))}
                  </main>

                  {/* SHARE COLUMN */}
                  <aside className={styles.shareColumn}>
                    <div className={styles.shareSticky}>
                      <h4>Share</h4>

                      <div className={styles.shareIcons}>
                        <a href="#">Telegram</a>
                        <a href="#">WhatsApp</a>
                        <a href="#">Twitter</a>
                        <a href="#">Facebook</a>
                      </div>
                    </div>
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
  );
};

export default Manuals;
