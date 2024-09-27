// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "@/lib/mongoose";
import User from "@/models/User";
import bcrypt from "bcryptjs"; // For password hashing

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToDatabase();

        // Find the user by email
        const user = await User.findOne({
          $or:[
            { email: credentials.email },
            { username: credentials.username },

            ]
          });

        if (user && user.password) {
          // Verify password
          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
          if (isPasswordValid) {
            return user;
          }
        }

        // If authentication fails, return null
        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, credentials }) {
      await connectToDatabase();

      let existingUser;

      // OAuth sign-in flow
      if (account?.provider) {
        if (account.provider === "google") {
          existingUser = await User.findOne({ googleId: profile.sub });
        } else if (account.provider === "twitter") {
          existingUser = await User.findOne({ twitterId: profile.id_str });
        } else if (account.provider === "github") {
          existingUser = await User.findOne({ githubId: profile.id });
        }

        if (!existingUser) {
          existingUser = await User.findOne({ email: user.email });

          if (existingUser) {
            // Update existing user with new provider ID
            if (account.provider === "google") {
              existingUser.googleId = profile.sub;
            } else if (account.provider === "twitter") {
              existingUser.twitterId = profile.id_str;
            } else if (account.provider === "github") {
              existingUser.githubId = profile.id;
            }

            await existingUser.save();
          } else {
            // Create new user for OAuth
            const newUser = new User({
              username: user.name,
              email: user.email,
              googleId: account.provider === "google" ? profile.sub : null,
              twitterId: account.provider === "twitter" ? profile.id_str : null,
              githubId: account.provider === "github" ? profile.id : null,
              image: user.image,
            });

            await newUser.save();
          }
        }
      } else if (credentials) {
        // Credentials sign-in flow
        existingUser = await User.findOne({ email: credentials.email });

        if (!existingUser) {
          // Create new user if not found
          const hashedPassword = await bcrypt.hash(credentials.password, 10);

          const newUser = new User({
            name: credentials.name,  // Collect 'name' from frontend
            email: credentials.email,
            password: hashedPassword,
          });

          await newUser.save();
        }
      }

      return true;
    },
    async session({ session, token }) {
      const user = await User.findOne({ email: session.user.email });
      session.user.id = user._id;
      session.user.image = user.image;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id;
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/signin",  // Custom sign-in page
  },
});
