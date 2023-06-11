import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: "login",
      async authorize(credentials) {
        try {
          return await Auth.login(credentials);
        } catch (error) {
          throw new Error(error.message);
        }
      },
    }),
    CredentialsProvider({
      id: "signup",
      async authorize(credentials) {
        try {
          return await Auth.signup(credentials);
        } catch (error) {
          throw new Error(error.message);
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (user) return true;

      return false;
    },
    async session({ session }) {
      session.user.isLoggedIn = true;
      return session;
    },
    async jwt({ token, user }) {
      return token;
    },
  },
  // use env variable in production
  secret: "looselipssinkships",
});
