import React from "react";
import Hero from "./Hero";
import PromoBanner from "./PromoBanner";
import Testimonials from "./Testimonials";
import Collection from "../Colllection";
import Stages from "./Stages";
import Stories from "./Stories";

const Home = () => {
  return (
    <main>
      <Hero />
      <Stages />
      <Collection />
      {/* <BestSeller /> */}
      <Testimonials />
      <Stories />
      <PromoBanner />
    </main>
  );
};

export default Home;
