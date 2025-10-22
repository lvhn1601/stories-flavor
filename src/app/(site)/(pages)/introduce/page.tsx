import Home from "@/components/Home";
import Introduce from "@/components/Introduce";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NextCommerce | Nextjs E-commerce template",
  description: "This is Home for NextCommerce Template",
  // other metadata
};

export default function IntroducePage() {
  return (
    <>
      <Introduce />
    </>
  );
}
