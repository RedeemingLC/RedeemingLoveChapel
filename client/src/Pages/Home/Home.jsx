import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import HeroSection from "../../components/HeroSection/HeroSection";
import HeroImageSection from "../../components/HeroImageSection/HeroImageSection";
import ResourcesSection from "../../components/ResourceSection/ResourcesSection";
import WordOfWisdom from "../../components/WordofWisdom/WordOfWisdom";
import CommunitySections from "../../components/CommunitySections/CommunitySections";

import Container from "../../components/Container/Container";

import styles from "./Home.module.css";
import Section from "../../components/Section/Section";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.replace("#", ""));
      element?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <>
      <Section>
        <div className={styles.heroWrapper}>
          <Container>
            <HeroSection />
            <HeroImageSection />
          </Container>
        </div>
      </Section>
      <ResourcesSection />
      <WordOfWisdom />
      <CommunitySections />
    </>
  );
};

export default Home;
