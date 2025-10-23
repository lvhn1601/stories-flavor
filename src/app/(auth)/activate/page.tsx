"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import Activate from "@/components/Auth/Activate";
import { useLoading } from "@/hooks/useLoading";

const ActivatePage = () => {
  const { data: session, status } = useSession();
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    if (status === "loading") {
      showLoading();
    } else {
      hideLoading();
    }
  }, [status]);

  if (status === "loading") {
    return null;
  }

  return (
    <main>
      <Activate user={session?.user} />
    </main>
  );
};

export default ActivatePage;
