"use client";

import { ReduxProvider } from "@/redux/provider";
import Header from "@/components/Header";
import CartSidebarModal from "@/components/Common/CartSidebarModal";
import PreviewSliderModal from "@/components/Common/PreviewSlider";
import ScrollToTop from "@/components/Common/ScrollToTop";
import { SessionProvider } from "next-auth/react";
import SessionCheck from "@/components/Common/SessionCheck";
import { ModalProvider } from "@/app/context/QuickViewModalContext";
import AdminHeader from "@/components/Header/Admin";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <SessionCheck>
        <ModalProvider>
          <AdminHeader />
          {children}
        </ModalProvider>
        <ScrollToTop />
      </SessionCheck>
    </SessionProvider>
  );
}
