import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { ip } from "../../config/config";
const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
        roles: { label: "roles", type: "array" }
      },
      async authorize(credentials) {
        debugger
        const { email, password, roles } = credentials;
        const res = await fetch(`${ip}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, roles }),
        });
        const user = await res.json();
        console.log(user);
        debugger
        if (res.ok && user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: user.token,
          refreshToken: user.refreshToken,
        };
      }

      return token;
    },

    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
        
      return session;
    },
  },
  secret: "supersecret",
  pages: {
    signIn: "/login1",
  },
});
export { handler as GET, handler as POST };