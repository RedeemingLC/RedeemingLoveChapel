import React from "react";
import AboutEvangelism from "../../components/evangelism/AboutEvangelism";
import CentralMessage from "../../components/evangelism/CentralMessage";
import MinistryHero from "../../components/ministry/MinistryHero";

import evangelismHeroImage from "../../assets/images/evangelism.jpg";

const Evangelism = () => {
  return (
    <>
      <MinistryHero
        label="Evangelism"
        title="Christ, Our Righteousness"
        image={evangelismHeroImage}
        alt="A bright golden light spreading across a dark city, gradually illuminating different areas, symbolizing the spread of the gospel and transformation of lives."
      />
      <AboutEvangelism />
      <CentralMessage />
    </>
  );
};

export default Evangelism;
