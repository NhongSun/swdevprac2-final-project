import userLogin from "@/lib/userLogin";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials) return null;

        const user = await userLogin(credentials.email, credentials.password);

        if (user) {
          // Any object returned will be saved in the `user` property of the JWT
          return user;
        } else {
          // Returning null will display an error message to the user
          return null;
        }
      },
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as typeof session.user;
      return session;
    },
  },
};
