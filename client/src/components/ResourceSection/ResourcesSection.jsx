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
            caption="Go deeper into Scripture with theologically sound Bible Study Manuals designed to strengthen understanding, wisdom, faith, and spiritual growth."
            link="/manuals"
            buttonText="Explore Biblical Truths"
            variant="bibleStudy"
            className={styles.card2}
          />

          <ResourceCard
            title="Daily Devotional"
            caption="Begin each day with devotional guides filled with God’s wisdom, bringing spiritual growth, encouragement, purpose, and daily transformation."
            link="/my-studies"
            buttonText="Start Your Day With God"
            variant="devotional"
            className={styles.card3}
          />

          <ResourceCard
            title="Our Blog"
            caption="Be enriched through our Spirit-inspired blog articles, filled with godly wisdom, knowledge, understanding, and life-transforming truths for daily growth."
            link="/blog"
            buttonText="Explore the Blog"
            variant="blog"
            className={styles.card4}
          />

          <ResourceCard
            title="Audio Sermons"
            caption="Stay spiritually refreshed through God-inspired audio messages filled with biblical encouragement, wisdom, faith-building truths, and daily inspiration."
            link="/audio"
            buttonText="Start Listening Today"
            variant="audio"
            className={styles.card5}
          />
        </div>
      </Container>
    </section>
  );
};

export default ResourcesSection;
