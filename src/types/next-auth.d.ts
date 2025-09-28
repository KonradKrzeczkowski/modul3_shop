import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // dodajemy id
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string; // dodajemy id do User
  }
}