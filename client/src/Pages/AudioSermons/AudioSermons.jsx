import { useEffect, useState } from "react";
import axios from "axios";

import Section from "../../components/Section/Section";
import Container from "../../components/Container/Container";
import Card from "../../components/Card/Card";

import styles from "./AudioSermons.module.css";

const AudioSermons = () => {
  const [audioList, setAudioList] = useState([]);
  const [featuredAudio, setFeaturedAudio] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchAudio = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/audio");
      setAudioList(data);

      // Pick first audio as featured (simple and safe)
      if (data.length > 0) {
        setFeaturedAudio(data[0]);
      }
    } catch (error) {
      console.log("FETCH PUBLIC AUDIO ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAudio();
  }, []);

  const getEmbedUrl = (url) => {
    if (!url) return "";

    return `https://w.soundcloud.com/player/?url=${encodeURIComponent(
      url,
    )}&color=%23ff5500&auto_play=false`;
  };

  return (
    <Section>
      <Container>
        {featuredAudio && (
          <div className={styles.featured}>
            <p className={styles.featuredLabel}>Featured Sermon</p>
            <div className={styles.featuredContent}>
              <h2 className={styles.featuredTitle}>{featuredAudio.title}</h2>

              {featuredAudio.speaker && (
                <p className={styles.speaker}>
                  Speaker: {featuredAudio.speaker}
                </p>
              )}

              {featuredAudio.description && (
                <p className={styles.description}>
                  {featuredAudio.description}
                </p>
              )}
            </div>

            <div className={styles.featuredPlayer}>
              <iframe
                width="100%"
                height="166"
                scrolling="no"
                frameBorder="no"
                allow="autoplay"
                src={getEmbedUrl(featuredAudio.audioUrl)}
                title={featuredAudio.title}
                style={{
                  borderRadius: "10px",
                  marginTop: "10px",
                }}
              />
            </div>
          </div>
        )}

        {loading ? (
          <p className={styles.message}>Loading sermons...</p>
        ) : audioList.length === 0 ? (
          <p className={styles.message}>No sermons available yet.</p>
        ) : (
          <div className={styles.grid}>
            {audioList
              .filter((audio) => audio._id !== featuredAudio?._id)
              .map((audio) => (
                <Card
                  key={audio._id}
                  onClick={() => console.log("Clicked:", audio)}
                >
                  <div className={styles.cardContent}>
                    <h3 className={styles.sermonTitle}>{audio.title}</h3>

                    {audio.speaker && (
                      <p className={styles.speaker}>Speaker: {audio.speaker}</p>
                    )}

                    {audio.description && (
                      <p className={styles.description}>{audio.description}</p>
                    )}
                  </div>

                  <div className={styles.embedWrapper}>
                    <iframe
                      width="100%"
                      height="166"
                      scrolling="no"
                      frameBorder="no"
                      allow="autoplay"
                      src={getEmbedUrl(audio.audioUrl)}
                      title={audio.title}
                      style={{
                        borderRadius: "10px",
                        marginTop: "10px",
                      }}
                    />
                  </div>
                </Card>
              ))}
          </div>
        )}
      </Container>
    </Section>
  );
};

export default AudioSermons;
