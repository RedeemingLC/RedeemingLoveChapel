import React from "react";
import AboutEvangelism from "../../components/evangelism/AboutEvangelism";
import CentralMessage from "../../components/evangelism/CentralMessage";
import MinistryHero from "../../components/ministry/MinisrtyHero";

const Evangelism = () => {
  return (
    <>
      <MinistryHero
        label="Evangelism"
        title="Christ: Our Righteousness"
        image="https://placehold.jp/1200x600.png"
        alt="Evangelism Ministry"
      />
      <AboutEvangelism />
      <CentralMessage />
    </>
  );
};

export default Evangelism;
