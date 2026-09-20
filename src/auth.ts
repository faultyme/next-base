import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

if (!process.env.AUTH_SECRET) {
  throw new Error("AUTH_SECRET is not configured");
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
  },

  providers: [
    Credentials({
      credentials: {
        userId: {
          label: "User ID",
          type: "text",
        },
      },

      async authorize(credentials) {
        if (!credentials?.userId) {
          return null;
        }

        return {
          id: credentials.userId as string,
        };
      },
    }),
  ],
});
