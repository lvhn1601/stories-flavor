"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ActivateCheck({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (session?.user && !session.user.isActivated) {
      router.replace("/activate");
    }
  }, [session, status, router]);

  if (status === "loading") return null;

  return <>{children}</>;
}
