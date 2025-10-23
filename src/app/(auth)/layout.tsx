"use client";

import { SessionProvider } from "next-auth/react";
import "../css/style.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}
