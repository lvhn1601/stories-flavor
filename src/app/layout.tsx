import { THEME } from "@/utils/theme";
import "./css/style.css";
import PreLoader from "@/components/Common/PreLoader";
import { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: THEME.TITLE,
  description: THEME.DESCRIPTION,
  // other metadata
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link rel="icon" href={THEME.LOGO} />
      </head>
      <body>
        <Toaster position="top-right" richColors />
        <PreLoader />
        {children}
      </body>
    </html>
  );
}
