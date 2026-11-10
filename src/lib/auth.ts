import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { prisma } from './prisma';
import { rateLimit, getClientIp } from './rateLimit';

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, request) {
        if (
          typeof credentials?.email !== 'string' ||
          typeof credentials?.password !== 'string' ||
          !credentials.email ||
          !credentials.password ||
          credentials.email.length > 254 ||
          credentials.password.length > 200
        ) {
          return null;
        }

        // Kaba kuvvet (brute-force) koruması:
        // e-posta başına 15 dakikada 10, IP başına 15 dakikada 30 deneme
        const WINDOW = 15 * 60 * 1000;
        const emailKey = credentials.email.trim().toLowerCase();
        if (!rateLimit(`login:email:${emailKey}`, 10, WINDOW)) return null;
        try {
          const ip = request?.headers ? getClientIp(request.headers) : 'unknown';
          if (ip !== 'unknown' && !rateLimit(`login:ip:${ip}`, 30, WINDOW)) return null;
        } catch {
          // header okunamazsa yalnızca e-posta limiti geçerli
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user) return null;

          const isPasswordValid = await bcrypt.compare(
            credentials.password as string,
            user.password
          );

          if (!isPasswordValid) return null;

          return {
            id: user.id,
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
            role: user.role,
          };
        } catch {
          // DB bağlantısı yok — login mümkün değil
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    // Aday girişi kaldırıldı; tek giriş sayfası admin girişi
    signIn: '/tr/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
