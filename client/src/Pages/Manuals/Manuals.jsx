import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../utils/api"; // ✅ FIXED

import styles from "./Manuals.module.css";
import Section from "../../components/Section/Section";
import Container from "../../components/Container/Container";
import Button from "../../components/Button/Button";
import ShareButtons from "../../components/ShareButtons/ShareButtons";
import BlockRenderer from "../../components/BlockRenderer/BlockRenderer";
import StudyHero from "../../components/StudyHero/StudyHero";

const Manuals = () => {
  const { slug } = useParams();

  const [manuals, setManuals] = useState([]);
  const [singleManual, setSingleManual] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sections, setSections] = useState([]);
  const [subsections, setSubsections] = useState({});

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

      const safeSections = Array.isArray(data?.data) ? data.data : [];

      setSections(safeSections);

      safeSections.forEach((section) => {
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

  // ✅ Prevent crash
  if (!Array.isArray(manuals)) {
    return <p>Loading manuals...</p>;
  }

  return (
    <Section>
      <Container>
        {!slug ? (
          <>
            {loading ? (
              <p>Loading manuals...</p>
            ) : manuals.length === 0 ? (
              <p>No manuals available.</p>
            ) : (
              <div className={styles.grid}>
                {manuals.map((manual) => (
                  <Link
                    to={`/manuals/${manual.slug}`}
                    key={manual._id}
                    className={styles.cardLink}
                  >
                    <div className={styles.card}>
                      {manual.coverImage && (
                        <img
                          src={manual.coverImage} // ✅ FIXED (no localhost)
                          alt={manual.title}
                          className={styles.cardImage}
                        />
                      )}

                      <div className={styles.cardOverlay}>
                        <h3 className={styles.cardTitle}>{manual.title}</h3>
                      </div>
                    </div>
                  </Link>
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
                <StudyHero
                  title={singleManual.title}
                  description={singleManual.description}
                  image={singleManual.coverImage} // ✅ FIXED
                />

                {sections.map((section) => (
                  <section key={section._id}>
                    <h2>{section.title}</h2>

                    {subsections[section._id]?.map((lesson) => (
                      <div key={lesson._id}>
                        <h3>{lesson.title}</h3>

                        {lesson.blocks?.map((block, index) => (
                          <BlockRenderer key={index} block={block} />
                        ))}
                      </div>
                    ))}
                  </section>
                ))}
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
