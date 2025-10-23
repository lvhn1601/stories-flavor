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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <SessionCheck>
        <ReduxProvider>
          <CartModalProvider>
            <ModalProvider>
              <PreviewSliderProvider>
                <Header />
                {children}

                {/* <QuickViewModal /> */}
                <CartSidebarModal />
                <PreviewSliderModal />
              </PreviewSliderProvider>
            </ModalProvider>
          </CartModalProvider>
        </ReduxProvider>
        <ScrollToTop />
        <Footer />
      </SessionCheck>
    </SessionProvider>
  );
}
