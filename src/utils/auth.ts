import { prisma } from '@/utils/prisma'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compare } from 'bcryptjs'
import { ROLE } from './constant'

export const authOptions = {
  providers: [
    // Google Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // Credentials Provider
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'email@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Missing email or password')
        }

        // Find user by email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user || !user.password) {
          throw new Error('Invalid email or password')
        }

        // Verify password using bcryptjs
        const isValid = await compare(credentials.password, user.password)
        if (!isValid) {
          throw new Error('Invalid email or password')
        }

        // If valid, return user object (id must be a string for NextAuth)
        return {
          id: String(user.id),
          name: user.name,
          email: user.email,
          phone: user.phone,
          image: user.image || null,
          role: user.role,
          isActivated: user.isActivated,
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ user }: { user: { email?: string | null; image?: string | null } }) {
      if (!user.email) return false

      let existingUser = await prisma.user.findUnique({
        where: { email: user.email },
      })

      if (!existingUser) {
        // Create new user only if it's from Google (not Credentials)
        existingUser = await prisma.user.create({
          data: {
            email: user.email,
            phone: null,
            password: null,
            image: user.image || null,
            isActivated: false,
            role: ROLE.USER,
          },
        })
      } else if (user.image && !existingUser.image) {
        await prisma.user.update({
          where: { email: user.email },
          data: {
            image: user.image,
          },
        })
      }

      return !!existingUser
    },

    async session({ session, token }: { session: any; token: any }) {
      if (token.email) {
        const user = await prisma.user.findUnique({
          where: { email: token.email },
        })

        if (user) {
          session.user.id = user.id
          session.user.phone = user.phone
          session.user.role = user.role ?? ROLE.USER
          session.user.isActivated = user.isActivated ?? false
        }
      }

      return session
    },

    async jwt({ token, user }: any) {
      if (user) {
        token.email = user.email
      }
      return token
    },
  },

  pages: {
    signIn: '/signin',
    error: '/signin',
  },

  secret: process.env.NEXTAUTH_SECRET || 'beecrzmai',
}
