import Container from "../Container/Container";
import ResourceCard from "../ResourceCard/ResourceCard";
import styles from "./ResourcesSection.module.css";

const ResourcesSection = () => {
  return (
    <section className={styles.resources} id="resources">
      <Container>
        <div className={`${styles.grid}`}>
          <ResourceCard
            title="Study, Learn and Grow with Our Resources"
            description="God has blessed Redeeming Love Chapel with profound insights from the Scriptures that have transformed our lives. It is our privilege to share them with you."
            variant="intro"
            className={styles.intro}
          />

          <ResourceCard
            title="Bible Study Guides"
            link="/manuals"
            buttonText="Explore"
            variant="bibleStudy"
            className={styles.card2}
          />

          <ResourceCard
            title="Daily Devotional"
            link="/my-studies"
            buttonText="Study"
            variant="devotional"
            className={styles.card3}
          />

          <ResourceCard
            title="Our Blog"
            link="/blog"
            buttonText="Read"
            variant="blog"
            className={styles.card4}
          />

          <ResourceCard
            title="Audio Sermons"
            link="/audio"
            buttonText="Listen"
            variant="audio"
            className={styles.card5}
          />
        </div>
      </Container>
    </section>
  );
};

export default ResourcesSection;
