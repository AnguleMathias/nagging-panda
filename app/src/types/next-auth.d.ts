import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken?: string;
    user: {
      /** The user's access token. */
      accessToken?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    access_token?: string;
  }
}
