"use client";

import Collection from "@/components/Colllection";
import Hero from "@/components/Home/Hero";
import PromoBanner from "@/components/Home/PromoBanner";
import Stages from "@/components/Home/Stages";
import Stories from "@/components/Home/Stories";
import Testimonials from "@/components/Home/Testimonials";

export default function HomePage() {
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
}
