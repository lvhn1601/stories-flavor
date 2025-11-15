"use client";

import ScrollToTop from "@/components/Common/ScrollToTop";
import { SessionProvider } from "next-auth/react";
import SessionCheck from "@/components/Common/SessionCheck";
import { ModalProvider } from "@/app/context/QuickViewModalContext";
import AdminHeader from "@/components/Header/Admin";
import ActivateCheck from "@/components/Common/ActivateCheck";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <SessionCheck>
        <ActivateCheck>
          <ModalProvider>
            <AdminHeader />
            {children}
          </ModalProvider>
          <ScrollToTop />
        </ActivateCheck>
      </SessionCheck>
    </SessionProvider>
  );
}
