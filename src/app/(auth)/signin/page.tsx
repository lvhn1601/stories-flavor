"use client";

import Signin from "@/components/Auth/Signin";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const SigninPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session && session.user) {
      router.push("/");
    }
  }, [session]);

  return (
    <main>
      <Signin />
    </main>
  );
};

export default SigninPage;
