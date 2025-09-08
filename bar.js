import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Replace this logic with your DB/auth API call
        if (credentials?.username === "admin" && credentials.password === "pass") {
          return { id: 1, name: "Admin User" };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login", // Optional: custom login page
  },
  session: {
    strategy: "jwt", // or 'database' for session storage
  },
  secret: process.env.NEXTAUTH_SECRET, // add to .env
});
