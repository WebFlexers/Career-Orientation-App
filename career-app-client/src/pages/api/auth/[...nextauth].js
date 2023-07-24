import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;
        // Prepare params
        const url = `${process.env.NEXT_PUBLIC_API_HOST}/api/Users/Login`;
        const data = {
          email,
          password,
        };
        const config = { "content-type": "application/json" };
        // Request
        axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
        const res = await axios.post(url, data, config);

        if (res) {
          return res.data;
        } else return null;
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: user.token,
          userId: user.userId,
        };
      }

      return token;
    },

    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.accessToken = token.accessToken;
      session.user.userId = token.userId;

      return session;
    },

    async signOut({ token, session }) {
      res.setHeader("Set-Cookie", "");

      token = {};
      session = {};
    },
  },
};

export default NextAuth(authOptions);
