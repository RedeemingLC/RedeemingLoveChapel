import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import HeroSection from "../../components/HeroSection/HeroSection";
import HeroImageSection from "../../components/HeroImageSection/HeroImageSection";
import ResourcesSection from "../../components/ResourceSection/ResourcesSection";
import BeInspiredSection from "../../components/FeaturedMedia/BeInspiredSection";
import WordOfWisdom from "../../components/WordofWisdom/WordOfWisdom";
import AboutPreview from "../../components/AboutPreview/AboutPreview";
import CommunitySections from "../../components/CommunitySections/CommunitySections";

import Container from "../../components/Container/Container";

import styles from "./Home.module.css";

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
      <section className={styles.heroWrapper}>
        <Container>
          <HeroSection />
          <HeroImageSection />
        </Container>
      </section>
      <ResourcesSection />
      <BeInspiredSection />
      <WordOfWisdom />
      <AboutPreview />
      <CommunitySections />
    </>
  );
};

export default Home;
