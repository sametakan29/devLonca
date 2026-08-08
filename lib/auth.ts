import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Lütfen tüm alanları doldurun.");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          throw new Error("Kullanıcı bulunamadı veya şifre hatalı.");
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordValid) {
          throw new Error("Kullanıcı bulunamadı veya şifre hatalı.");
        }

        return {
          id: user.id,
          name: `${user.name} ${user.surname || ""}`.trim(),
          email: user.email,
          image: user.avatarUrl,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
      }

      if (trigger === "update" && session) {
        token = { ...token, ...session };
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        (session.user as any).id = token.id as string;
        
        // Fetch fresh profile metadata
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id as string },
          select: {
            name: true,
            surname: true,
            bio: true,
            githubUrl: true,
            university: true,
            department: true,
            internshipType: true,
            skills: true,
            role: true,
          },
        });

        if (dbUser) {
          (session.user as any).surname = dbUser.surname;
          (session.user as any).bio = dbUser.bio;
          (session.user as any).githubUrl = dbUser.githubUrl;
          (session.user as any).university = dbUser.university;
          (session.user as any).department = dbUser.department;
          (session.user as any).internshipType = dbUser.internshipType;
          (session.user as any).skills = dbUser.skills;
          (session.user as any).role = dbUser.role;
        }
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
  secret: process.env.NEXTAUTH_SECRET || "devlonca-super-secret-key-change-in-production-12345",
};
