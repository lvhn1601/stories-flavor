"use client";

import { ReduxProvider } from "@/redux/provider";
import { CartModalProvider } from "../context/CartSidebarModalContext";
import { ModalProvider } from "../context/QuickViewModalContext";
import { PreviewSliderProvider } from "../context/PreviewSliderContext";
import Header from "@/components/Header";
import CartSidebarModal from "@/components/Common/CartSidebarModal";
import PreviewSliderModal from "@/components/Common/PreviewSlider";
import ScrollToTop from "@/components/Common/ScrollToTop";
import Footer from "@/components/Footer";
import { SessionProvider } from "next-auth/react";
import SessionCheck from "@/components/Common/SessionCheck";
import ActivateCheck from "@/components/Common/ActivateCheck";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <ActivateCheck>
        <ReduxProvider>
          <CartModalProvider>
            <ModalProvider>
              <PreviewSliderProvider>
                <Header />
                <main className="mt-[85px] xl:mt-[120px] pb-20">
                  {children}
                </main>

                {/* <QuickViewModal /> */}
                <CartSidebarModal />
                <PreviewSliderModal />
              </PreviewSliderProvider>
            </ModalProvider>
          </CartModalProvider>
        </ReduxProvider>
        <ScrollToTop />
        <Footer />
      </ActivateCheck>
    </SessionProvider>
  );
}
