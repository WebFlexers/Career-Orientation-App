import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // When the API is ready use the below
        /*const { username, password } = credentials;
        const res = await fetch("/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "appilication/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        });

        const user = await res.json();

        if (res.ok && user) {
          return user;
        } else return null;*/

        const { username, password } = credentials;
        if (username == "admin" && password == "1234") {
          const user = {
            username: username,
            password: password,
            fullname: "ADMIN USER",
            email: "admin@webflexers.gr",
            accessToken: "itsmemariotoken",
          };
          console.log(JSON.stringify(user));
          return JSON.stringify(user);
        } else {
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },
};
export default NextAuth(authOptions);
