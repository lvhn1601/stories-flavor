import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      phone?: string | null;
      isActivated?: boolean;
    };
  }

  interface User {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    phone?: string | null;
    isActivated?: boolean;
  }

  interface JWT {
    phone?: string | null;
  }
}