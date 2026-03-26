import styles from "./About.module.css";

import AboutHero from "../../components/about/AboutHero";
import VisionStatement from "../../components/about/VisionStatement";
import CoreValues from "../../components/about/CoreValues";
import WhatWeBelieve from "../../components/about/WhatWeBelieve";
import OurMinistries from "../../components/about/OurMinitries";
import OurPastorsSection from "../../components/about/OurPastorsSection/OurPastorsSection";

const About = () => {
  return (
    <>
      <AboutHero />
      <VisionStatement />
      <CoreValues/>
      <WhatWeBelieve/>
      <OurMinistries/>
      <OurPastorsSection/>
    </>
  );
};

export default About;
