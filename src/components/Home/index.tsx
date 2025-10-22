import React from "react";
import Hero from "./Hero";
import PromoBanner from "./PromoBanner";
import Testimonials from "./Testimonials";
import Collection from "../Colllection";
import Stages from "./Stages";

const Home = () => {
  return (
    <main>
      <Hero />
      <Stages />
      <Collection />
      {/* <BestSeller /> */}
      <Testimonials />
      <PromoBanner />
    </main>
  );
};

export default Home;
