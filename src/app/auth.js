import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';  
import User from "@/Models/User";
import { dbConnect } from "@/lib/db";
import bcryptjs from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID, // Add GitHub client ID
      clientSecret: process.env.GITHUB_CLIENT_SECRET, // Add GitHub client secret
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        const { email, password } = credentials;
        if (!email || !password) {
          throw new Error("Please provide Email and Password");
        }

        await dbConnect();

        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("User not found");
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
          throw new Error("Invalid credentials");
        }

        // Include user ID and name when returning the user object
        return {
          id: user._id, // Ensure you return the user ID
          email: user.email,
          name: user.username, // Add the username to the return object
          role: user.role, // Add role if it's part of your user schema
        };
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async session({ session, token }) {
      // Add user ID, name, and role to the session
      if (token?.sub) {
        session.user.id = token.sub;
      }
      if (token?.name) {
        session.user.name = token.name; // Add the user's name to the session
      }
      if (token?.role) {
        session.user.role = token.role; // Add the user's role to the session
      }
      console.log(session);
      
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id; // Set user ID in token
        token.name = user.name; // Set user name in token
        token.role = user.role; // Set user role in token if applicable
      }
      
      return token;
    },
    async signIn({ user, account }) {
      if (account?.provider === 'google' || account?.provider === 'github') {
        console.log(account.provider);
        
        try {
          const { email, image, name, id } = user;
          await dbConnect();
          const alreadyUser = await User.findOne({ email });
          if (!alreadyUser) {
            const newUser = new User({
              email,
              username: name,
              image,
              googleId: account.provider === 'google' ? id : undefined,
              githubId: account.provider === 'github' ? id : undefined,
            });
            await newUser.save();
          }
        } catch (err) {
          console.error(err);
          throw new Error('Error while creating user');
        }
      }
      console.log("sucessfully github login ");
      
      return true; // Important to return true if the sign-in is successful
    }
  }
});