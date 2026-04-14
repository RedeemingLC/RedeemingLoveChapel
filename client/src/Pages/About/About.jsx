import Section from "../../components/Section/Section";
import Container from "../../components/Container/Container";

import AboutHero from "../../components/about/AboutHero";
import VisionStatement from "../../components/about/VisionStatement";
import CoreValues from "../../components/about/CoreValues";
import WhatWeBelieve from "../../components/about/WhatWeBelieve";
import OurMinistries from "../../components/about/OurMinistries";
import OurPastorsSection from "../../components/about/OurPastorsSection/OurPastorsSection";

const About = () => {
  return (
    <>
      {/* HERO */}

      <Section>
        <Container>
          <AboutHero />
        </Container>
      </Section>

      {/* VISION */}
      <Section variant="alt">
        <Container>
          <VisionStatement />
        </Container>
      </Section>

      {/* CORE VALUES */}
      <Section>
        <Container>
          <CoreValues />
        </Container>
      </Section>

      {/* BELIEFS */}
      <Section>
        <Container>
          <WhatWeBelieve />
        </Container>
      </Section>

      {/* MINISTRIES */}
      <Section variant="alt">
        <Container>
          <OurMinistries />
        </Container>
      </Section>

      {/* PASTORS */}
      <Section>
        <Container>
          <OurPastorsSection />
        </Container>
      </Section>
    </>
  );
};

export default About;
