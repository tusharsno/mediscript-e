import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import db from "./db";
import bcrypt from "bcryptjs";
import { Role } from "../generated/prisma/client";

declare module "next-auth" {
  interface User {
    id: string;
    role: Role;
  }
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      role: Role;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: Role;
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          throw new Error("User not found");
        }

        // Email verification চেক করা
        if (!user.emailVerified) {
          throw new Error("Please verify your email before logging in");
        }

        const isPasswordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordMatch) {
          throw new Error("Incorrect password");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      // Safe to use because signIn callback handles user creation/linking properly
      allowDangerousEmailAccountLinking: true,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
      // Safe to use because signIn callback handles user creation/linking properly
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role || "PATIENT";
      } else if (account?.provider !== "credentials" && token.email) {
        // For OAuth, ensure we have the user ID in token
        const dbUser = await db.user.findUnique({
          where: { email: token.email },
        });
        if (dbUser) {
          token.id = dbUser.id;
          token.role = dbUser.role;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as Role;
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      try {
        if (!user.email) {
          console.error("No email provided");
          return false;
        }

        // For OAuth providers
        if (account?.provider !== "credentials") {
          try {
            // Check if user exists
            let dbUser = await db.user.findUnique({
              where: { email: user.email },
              include: { patientProfile: true },
            });

            // If user doesn't exist, create them with patient profile
            if (!dbUser) {
              dbUser = await db.user.create({
                data: {
                  email: user.email,
                  name: user.name || (profile as any)?.name || "User",
                  password: "", // OAuth users don't have password
                  role: "PATIENT",
                  emailVerified: true, // OAuth users are auto-verified
                  patientProfile: {
                    create: {
                      dob: new Date(),
                      bloodGroup: "O+",
                    },
                  },
                },
                include: { patientProfile: true },
              });
            } else if (!dbUser.patientProfile) {
              // If user exists but no patient profile, create it
              await db.patientProfile.create({
                data: {
                  userId: dbUser.id,
                  dob: new Date(),
                  bloodGroup: "O+",
                },
              });
            }

            return !!dbUser;
          } catch (dbError) {
            console.error("Database error in signIn:", dbError);
            return false;
          }
        }

        // For credentials provider
        return true;
      } catch (error) {
        console.error("SignIn callback error:", error);
        return false;
      }
    },
  },
};
